import { test } from './helpers/test-runner.mjs';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { createDemo, projectRoot, readProject, html, source } from './helpers/demo-environment.mjs';

const css = readProject('public/assets/styles/styles.css');
const sha256 = value => createHash('sha256').update(value).digest('hex');
const core = ['US01', 'US02', 'US03', 'US04', 'US07', 'US08', 'US09', 'US10', 'US11', 'US13', 'US15', 'US17', 'US19', 'US20', 'US21', 'US24', 'US25', 'US26', 'US27', 'US28', 'US31', 'US32', 'US33', 'US35', 'US39', 'US40', 'US41', 'US42', 'US43', 'US45'];

test('T01 — sintaxis, estructura HTML e IDs sin duplicaciones', () => {
    new vm.Script(source);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size);
    const stack = [], voids = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
    for (const match of html.matchAll(/<!--[\s\S]*?-->|<![^>]*>|<\/?([a-zA-Z][\w-]*)[^>]*>/g)) {
        if (match[0].startsWith('<!')) continue;
        const tag = match[1].toLowerCase();
        if (match[0].startsWith('</')) assert.equal(stack.pop(), tag);
        else if (!voids.has(tag) && !match[0].endsWith('/>')) stack.push(tag);
    }
    assert.equal(stack.length, 0);
});

test('T02 — referencias locales, ARIA y cinco paneles asociados', () => {
    const demo = createDemo();
    for (const element of demo.elements.values()) {
        for (const attribute of ['aria-controls', 'aria-labelledby', 'aria-describedby', 'for']) {
            for (const id of (element.getAttribute(attribute) || '').split(/\s+/).filter(Boolean)) assert(demo.elements.has(id), attribute + ': ' + id);
        }
    }
    for (const match of html.matchAll(/\b(?:src|href|poster)="([^"]+)"/g)) {
        if (match[1].startsWith('#')) assert(demo.elements.has(match[1].slice(1)), match[1]);
        else if (!/^(?:[a-z]+:|\/\/)/i.test(match[1])) assert(existsSync(path.join(projectRoot, 'public', match[1])), match[1]);
    }
    const tabs = [...demo.elements.values()].filter(element => element.getAttribute('role') === 'tab');
    const panels = [...demo.elements.values()].filter(element => element.getAttribute('role') === 'tabpanel');
    assert.equal(tabs.length, 5); assert.equal(panels.length, 5);
    for (const tab of tabs) assert.equal(demo.elements.get(tab.getAttribute('aria-controls')).getAttribute('aria-labelledby'), tab.id);
});

test('T03 — dataset y relaciones conservados, sin nuevas dependencias o servicios', () => {
    const data = createDemo().api.datosDemo;
    assert.equal(sha256(JSON.stringify(data)), '6102171696a071bbe3e234dcf6699a469a564d5db0d2fa81e2843d05b5ac08f3');
    for (const collection of ['trazabilidad', 'evidencias', 'alertas', 'estimaciones']) {
        for (const record of data[collection]) assert(data.lotes[record.loteId], record.id);
    }
    assert(Object.isFrozen(data));
    assert(!/fetch\(|XMLHttpRequest|require\(|^import\s/m.test(source));
    assert(!/@import|@font-face/.test(css));
    assert(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(html));
});

test('T04 — reglas QR comerciales para 481, 768 y 960 px (comprobación estática)', () => {
    const marker = '@media (min-width: 481px) and (max-width: 960px)';
    const start = css.indexOf(marker); assert(start >= 0);
    const open = css.indexOf('{', start); let depth = 1, end = open + 1;
    for (; end < css.length && depth; end++) { if (css[end] === '{') depth++; else if (css[end] === '}') depth--; }
    const rules = css.slice(open + 1, end - 1);
    for (const width of [481, 768, 960]) {
        assert(width >= 481 && width <= 960);
        assert.match(rules, /\.recepcion \.consulta-qr-acceso\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\) auto/);
        assert.match(rules, /\.recepcion \.consulta-qr-acceso h4\s*\{[^}]*grid-column:\s*1;[^}]*grid-row:\s*1/);
        assert.match(rules, /\.recepcion \.consulta-qr-acceso p\s*\{[^}]*grid-column:\s*1;[^}]*grid-row:\s*2/);
        assert.match(rules, /\.recepcion \.consulta-qr-acceso button\s*\{[^}]*grid-column:\s*2/);
    }
    assert.equal(createDemo().elements.get('recepcion-qr-titulo').tagName, 'H4');
    // No calcula geometría de navegador, zoom ni desbordamiento real.
});

test('T05 — foco de recepción usa color oscuro con contraste suficiente', () => {
    const color = /--color-focus:\s*(#[\da-f]{6})/i.exec(css)[1];
    const luminance = hex => {
        const values = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
        return .2126 * values[0] + .7152 * values[1] + .0722 * values[2];
    };
    for (const background of ['#FFFFFF', '#F7F5EF', '#EDF3EE']) {
        const values = [luminance(color), luminance(background)].sort((a, b) => a - b);
        assert((values[1] + .05) / (values[0] + .05) >= 3);
    }
    assert.match(css, /\.recepcion-panel:focus\s*\{[^}]*outline:\s*3px solid var\(--color-focus\)/);
    assert.match(css, /\.recepcion-registro:focus\s*\{[^}]*outline:\s*3px solid var\(--color-focus\)/);
});

test('T06 — videos, imágenes y favicon originales conservan sus hashes', () => {
    const manifest = {
        'public/favicon.ico': 'f823441c1dfd41b71fd88ea9c082c175059020ad23de5c3f9fe090ebb1f314f0',
        'public/assets/videos/.gitkeep': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        'public/assets/videos/campo-cosecha.mp4': '8bf57313fd91e4da0731cf938521f00d6fc99d8369456f5b2f86f7d0315ca548',
        'public/assets/videos/distribucion.mp4': '10ff1706f29330d1b08e40f29b6f9a643277b80d98e583c1ffda1add7430aab7',
        'public/assets/videos/mercado.mp4': 'ac5d9be95e7f9c8b38e306abd8274eafe6c3e6ae27c216258b0ea09466194063',
        'public/assets/images/logo-origen360.png': '8cb9d1181db0b78fee1de524a3d9daf491ed19a093c0f6aa23d35849b09015c0',
        'public/assets/images/portada-cosecha.svg': '053cb70c33ac3ec5be0c4d146e37a4fdfede6abe07bd8f01da8d2cda43b04475',
        'public/assets/images/portada-distribucion.svg': 'ce23e7d705a2ad52da519bbb9ad328649854f0111f165f400baab3a4749ae3d9',
        'public/assets/images/portada-mercado.svg': 'd3322d1a9bc0b468d5c19e297c667f3ce80132d8da8d3ea0b2a17be43315e7bb'
    };
    for (const [file, expected] of Object.entries(manifest)) assert.equal(sha256(readFileSync(path.join(projectRoot, file))), expected, file);
});

test('T07 — las 50 User Stories y sus criterios no se modifican', () => {
    const requirements = readProject('Origen360_Requisitos_Codex_AV2.md').replace(/\r\n/g, '\n');
    assert.equal(sha256(requirements), '8abff0544a043c66d676b500626b52afa743f7f99399c87bf80cb0d1ae473ddd');
    assert.equal([...requirements.matchAll(/^### US\d{2}/gm)].length, 50);
});

test('T08 — matriz incluye exactamente 100 criterios literales y mantiene pendientes manuales', () => {
    const requirements = readProject('Origen360_Requisitos_Codex_AV2.md').replace(/\r\n/g, '\n');
    const matrix = readProject('docs/matriz-aceptacion.md');
    const selected = new Set([...core, 'US46', 'US47', 'US48', 'US49', 'US50']);
    const rows = matrix.split('\n').filter(line => /^\| US\d{2}-CA\d+ \|/.test(line));
    assert.equal(rows.length, 100); assert.equal(new Set(rows.map(line => line.split('|')[1].trim())).size, 100);
    for (const story of requirements.matchAll(/^### (US\d{2})[^]*?(?=^### US\d{2}|^## Formato|$(?![^]))/gm)) {
        if (!selected.has(story[1])) continue;
        for (const criterion of story[0].matchAll(/^  (\d+)\. (.+)$/gm)) {
            const id = story[1] + '-CA' + criterion[1], row = rows.find(line => line.startsWith('| ' + id + ' |'));
            assert(row, id); assert(row.includes(criterion[2].trim().replace(/\|/g, '\\|')), id);
            assert(row.includes('Pendiente manual'), id);
        }
    }
});
