// Preflight de solo lectura: no crea builds, artefactos, commits ni despliegues.
import assert from 'node:assert/strict';
import { readdir, readFile, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicRoot = path.join(root, 'public');
const allowedExtensions = new Set(['.html', '.css', '.js', '.ico', '.png', '.svg', '.mp4']);
const files = new Map(), ignored = [], links = [];

async function inventory(directory, prefix = '') {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
        const relative = prefix + entry.name;
        const absolute = path.join(directory, entry.name);
        const stat = await lstat(absolute);
        assert(!stat.isSymbolicLink(), 'No se admiten enlaces simbólicos dentro de public/: ' + relative);
        if (entry.name.startsWith('.')) {
            // upload-pages-artifact excluye dotfiles. .gitkeep no es un recurso del sitio.
            assert.equal(entry.name, '.gitkeep', 'Archivo oculto inesperado en public/: ' + relative);
            ignored.push(relative);
            continue;
        }
        assert(!/(^|\/)(tests?|docs?|node_modules)(\/|$)/i.test(relative), 'Directorio interno dentro del sitio: ' + relative);
        if (stat.isDirectory()) await inventory(absolute, relative + '/');
        else {
            assert(stat.isFile(), 'Recurso no regular: ' + relative);
            assert.equal(stat.nlink, 1, 'No se admiten enlaces físicos dentro de public/: ' + relative);
            assert(allowedExtensions.has(path.extname(relative).toLowerCase()), 'Tipo de archivo no previsto para este sitio: ' + relative);
            assert(!/README|Requisitos_Codex|matriz-aceptacion/i.test(relative), 'Documento interno dentro del sitio: ' + relative);
            assert(stat.size < 100 * 1024 * 1024, 'Archivo de 100 MiB o más: ' + relative);
            files.set(relative, { absolute, bytes: stat.size });
        }
    }
}

await inventory(publicRoot);
assert(files.has('index.html'), 'Falta public/index.html en la raíz del sitio');
const htmlIds = new Map();
for (const [name, file] of files) {
    if (name.endsWith('.html')) {
        const text = await readFile(file.absolute, 'utf8');
        assert(!/<base\b/i.test(text), 'Un elemento base impediría validar las rutas relativas: ' + name);
        htmlIds.set(name, new Set([...text.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])));
        for (const tag of text.matchAll(/<[a-zA-Z][^>]*>/g)) {
            for (const attribute of tag[0].matchAll(/\b(src|href|poster)\s*=\s*["']([^"']+)["']/g)) {
                links.push({ document: name, value: attribute[2], kind: attribute[1], navigation: /^<a\b/i.test(tag[0]) });
            }
        }
    } else if (name.endsWith('.css')) {
        const text = await readFile(file.absolute, 'utf8');
        assert(!/@import\b/i.test(text), 'Se encontró una importación CSS no prevista: ' + name);
        for (const match of text.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) links.push({ document: name, value: match[1], kind: 'url', navigation: false });
    } else if (name.endsWith('.svg')) {
        const text = await readFile(file.absolute, 'utf8');
        // xmlns es un identificador XML; no es una petición HTTP ni contenido mixto.
        for (const match of text.matchAll(/\b(?:xlink:)?href\s*=\s*["']([^"']+)["']/g)) {
            if (!match[1].startsWith('#')) links.push({ document: name, value: match[1], kind: 'svg', navigation: false });
        }
    } else if (name.endsWith('.js')) {
        const text = await readFile(file.absolute, 'utf8');
        assert(!/fetch\s*\(|XMLHttpRequest|new\s+WebSocket|import\s*\(/.test(text), 'Se encontró una dependencia de red no prevista en ' + name);
        assert(!/["'`]http:\/\//i.test(text), 'Se encontró una URL HTTP en el script: ' + name);
    }
}

// Dos bases virtuales: URL propuesta y nombre alternativo de repositorio.
// No se contacta ninguno de estos servidores; URL se usa solo para resolver rutas.
const bases = ['https://origen360-grupo1.github.io/origen360-landing-page/', 'https://pages.example.invalid/otro-repositorio/'];
let localChecks = 0;
const externalNavigation = new Set();
for (const base of bases) {
    const site = new URL(base);
    for (const link of links) {
        assert(!link.value.startsWith('/'), 'Ruta anclada al dominio, incompatible con subdirectorio: ' + link.value);
        const resolved = new URL(link.value, new URL(link.document, site));
        if (/^(?:mailto:|tel:)$/.test(resolved.protocol) && link.navigation) continue;
        if (resolved.protocol === 'data:') continue;
        assert.equal(resolved.protocol, 'https:', 'Recurso o enlace incompatible con HTTPS: ' + link.value);
        if (resolved.origin !== site.origin) {
            assert(link.navigation, 'Dependencia externa del sitio: ' + link.value);
            externalNavigation.add(resolved.href);
            continue;
        }
        assert(resolved.pathname.startsWith(site.pathname), 'La ruta sale del subdirectorio publicable: ' + link.value);
        let relative = decodeURIComponent(resolved.pathname.slice(site.pathname.length));
        if (!relative || relative.endsWith('/')) relative += 'index.html';
        // Map conserva mayúsculas/minúsculas, también al ejecutar sobre Windows.
        assert(files.has(relative), 'Recurso ausente o mayúsculas incorrectas: ' + link.document + ' -> ' + relative);
        if (resolved.hash) {
            assert(htmlIds.get(relative)?.has(decodeURIComponent(resolved.hash.slice(1))), 'Ancla inexistente: ' + link.value);
        }
        localChecks++;
    }
}

const totalBytes = [...files.values()].reduce((total, file) => total + file.bytes, 0);
assert(totalBytes < 1024 * 1024 * 1024, 'El contenido publicable supera 1 GiB');
export const result = {
    directory: 'public/', files: [...files.keys()].sort(), ignored,
    totalBytes, localReferenceChecks: localChecks, projectPrefixes: bases.length,
    externalNavigation: [...externalNavigation], externalAssetDependencies: 0
};
console.log('Preflight de Pages correcto: ' + files.size + ' archivos, ' + localChecks + ' referencias verificadas bajo dos subdirectorios.');
console.log('Contenido publicable: ' + (totalBytes / 1e6).toFixed(2) + ' MB. Excluidos: ' + ignored.join(', '));
console.log('Solo se publicará public/. tests/, docs/, README, requisitos y .github/ quedan fuera del artefacto.');
