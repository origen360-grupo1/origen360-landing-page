// Entorno de integración controlado. No es un navegador ni valida hardware o CSS renderizado.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

export const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
export const readProject = relative => readFileSync(new URL(relative, new URL('../../', import.meta.url)), 'utf8');
export const html = readProject('public/index.html');
export const source = readProject('public/assets/scripts/main.js');

export function createDemo({ script = source, markup = html, storage = new Map(), storageMode = {}, camera = {}, media = {} } = {}) {
    const elements = new Map(), hiddenFocus = [], timers = new Map(), streams = [];
    const windowListeners = {}, documentListeners = {}, writes = [], removes = [], scrolls = [];
    let focused = null, timerId = 0;
    const visible = element => {
        for (let current = element; current; current = current.parentElement) if (current.hidden) return false;
        return true;
    };
    class Element {
        constructor(tag = 'div', attributes = {}) {
            this.tagName = tag.toUpperCase();
            this.attributes = { ...attributes };
            this.children = [];
            this.parentElement = null;
            this.listeners = {};
            this.value = attributes.value || '';
            this.disabled = 'disabled' in attributes;
            this.hidden = 'hidden' in attributes;
            this.open = false;
            this.error = null;
            this.readyState = attributes.id === 'camara-qr' ? 2 : 0;
            this.loadCount = 0;
            this._text = '';
            this.className = attributes.class || '';
            this.classList = {
                contains: name => this.className.split(/\s+/).includes(name),
                add: (...names) => { this.className = [...new Set(this.className.split(/\s+/).filter(Boolean).concat(names))].join(' '); },
                remove: (...names) => { this.className = this.className.split(/\s+/).filter(name => !names.includes(name)).join(' '); },
                toggle: (name, force) => {
                    const add = force ?? !this.classList.contains(name);
                    if (add) this.classList.add(name); else this.classList.remove(name);
                    return add;
                }
            };
        }
        get id() { return this.attributes.id || ''; }
        get textContent() { return this._text + this.children.map(child => child.textContent).join(''); }
        set textContent(value) { this.replaceChildren(); this._text = String(value); }
        setAttribute(name, value) {
            this.attributes[name] = String(value);
            if (name === 'class') this.className = String(value);
            if (name === 'hidden') this.hidden = true;
            if (name === 'id') elements.set(String(value), this);
        }
        getAttribute(name) { return name === 'class' ? this.className : this.attributes[name] ?? null; }
        removeAttribute(name) { delete this.attributes[name]; if (name === 'hidden') this.hidden = false; }
        addEventListener(name, callback) { (this.listeners[name] ??= []).push(callback); }
        appendChild(child) { child.parentElement = this; this.children.push(child); return child; }
        replaceChildren(...children) {
            this.children.forEach(child => { child.parentElement = null; });
            this.children = []; this._text = '';
            children.forEach(child => this.appendChild(child));
        }
        focus() {
            if (!visible(this)) hiddenFocus.push(this.id || this.tagName);
            const changed = focused !== this;
            focused = this;
            if (changed) (this.listeners.focus || []).forEach(callback => callback.call(this, { target: this }));
        }
        querySelectorAll(selector) {
            const result = [];
            const walk = node => node.children.forEach(child => {
                if (selector.startsWith('.') ? child.classList.contains(selector.slice(1)) : child.tagName.toLowerCase() === selector) result.push(child);
                walk(child);
            });
            walk(this);
            return result;
        }
        querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
        getBoundingClientRect() { return this.rect || (this.id === 'pasaporte-navegacion' ? { top: 80, bottom: 200 } : { top: 220, bottom: 600 }); }
        showModal() { this.open = true; }
        close() { this.open = false; (this.listeners.close || []).forEach(callback => callback.call(this, { target: this })); }
        load() { this.loadCount++; }
        canPlayType() { return media.compatibility ?? 'probably'; }
        async play() { if (camera.playError) throw new Error('Reproducción simulada fallida'); }
    }
    // Parser limitado al HTML estático del proyecto: etiquetas, atributos y texto.
    const root = new Element('document'), stack = [root];
    const voids = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
    for (const match of markup.matchAll(/<!--[\s\S]*?-->|<![^>]*>|<\/?[a-zA-Z][^>]*>|[^<]+/g)) {
        const token = match[0];
        if (token.startsWith('<!')) continue;
        if (token.startsWith('</')) { stack.pop(); continue; }
        if (!token.startsWith('<')) { stack.at(-1)._text += token.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); continue; }
        const tag = /^<([\w-]+)/.exec(token)[1], attributes = {};
        for (const attribute of token.matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
            if (attribute.index !== 1) attributes[attribute[1]] = attribute[2] ?? attribute[3] ?? attribute[4] ?? '';
        }
        const element = new Element(tag, attributes);
        stack.at(-1).appendChild(element);
        if (element.id) elements.set(element.id, element);
        if (!voids.has(tag) && !token.endsWith('/>')) stack.push(element);
    }
    const document = {
        hidden: false,
        getElementById: id => { assert(elements.has(id), 'ID inexistente: ' + id); return elements.get(id); },
        createElement: tag => new Element(tag),
        querySelectorAll: selector => root.querySelectorAll(selector),
        addEventListener: (name, callback) => (documentListeners[name] ??= []).push(callback),
        get activeElement() { return focused; }
    };
    const localStorage = {
        getItem(key) { if (storageMode.get) throw new Error('Lectura bloqueada'); return storage.get(key) ?? null; },
        setItem(key, value) { if (storageMode.set) throw new Error('Cuota o escritura bloqueada'); writes.push([key, value]); if (!storageMode.silent) storage.set(key, String(value)); },
        removeItem(key) { if (storageMode.remove) throw new Error('Descarte bloqueado'); removes.push(key); storage.delete(key); }
    };
    const window = { isSecureContext: camera.secure !== false, localStorage, scrollBy: value => scrolls.push(value), addEventListener: (name, callback) => (windowListeners[name] ??= []).push(callback) };
    if (storageMode.missing) delete window.localStorage;
    if (camera.detector !== false) window.BarcodeDetector = class {
        static async getSupportedFormats() { if (camera.formatsError) throw new Error('Formatos no disponibles'); return camera.formats || ['qr_code']; }
        async detect() { if (camera.detectError) throw new Error('Imagen no legible'); return camera.detected === undefined ? [] : [{ rawValue: camera.detected }]; }
    };
    const navigator = {};
    if (camera.api !== false) navigator.mediaDevices = { getUserMedia: async () => {
        if (camera.error) throw Object.assign(new Error('Error simulado de cámara'), { name: camera.error });
        const track = { stopped: false, onended: null, stop() { this.stopped = true; } };
        const stream = { getTracks: () => [track], getVideoTracks: () => [track] };
        streams.push(stream); return stream;
    } };
    const context = vm.createContext({ document, window, navigator, console, Date,
        setTimeout: (callback, ms) => { const id = ++timerId; timers.set(id, { callback, ms }); return id; },
        clearTimeout: id => timers.delete(id)
    });
    vm.runInContext(script, context, { filename: 'public/assets/scripts/main.js' });
    const api = vm.runInContext(`({ datosDemo, resolverBusqueda, mostrarConfirmacion, mostrarLoteActivo, obtenerContextoLoteActivo,
        activarPestanaPasaporte, evaluarEstimacionPreventiva, obtenerPrioridadPreventiva, leerRevisionRecepcion,
        get state() { return { loteActivoId, recepcionActiva, pasoRecepcion, pestanaPasaporteActiva }; } })`, context);
    const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };
    const emit = async (target, event = 'click', data = {}) => {
        const element = typeof target === 'string' ? elements.get(target) : target;
        assert(element, 'Destino de evento inexistente: ' + target);
        if (event === 'loadedmetadata') element.readyState = 1;
        if (event === 'canplay') element.readyState = 3;
        const value = { target: element, preventDefault() { this.defaultPrevented = true; }, ...data };
        for (const callback of element.listeners[event] || []) await callback.call(element, value);
        await flush(); return value;
    };
    return {
        elements, context, api, visible, hiddenFocus, storage, storageMode, writes, removes, streams, scrolls, emit, flush,
        get focus() { return focused; },
        text: id => elements.get(id).textContent,
        async windowEvent(name, data = {}) { for (const callback of windowListeners[name] || []) await callback(data); },
        async documentEvent(name, data = {}) { for (const callback of documentListeners[name] || []) await callback(data); },
        async fireTimer(ms) {
            const entry = [...timers.entries()].find(([, timer]) => timer.ms === ms);
            assert(entry, 'Temporizador inexistente: ' + ms);
            timers.delete(entry[0]); await entry[1].callback(); await flush();
        },
        async openPassport(id = 'O360-DEMO-001') { api.mostrarConfirmacion(id); await emit('ver-pasaporte'); },
        async identify(id = 'O360-DEMO-001') {
            if (!api.state.recepcionActiva) await emit('abrir-recepcion');
            elements.get('recepcion-codigo').value = id; await emit('recepcion-form', 'submit');
        }
    };
}

export function withDataset(edit) {
    const data = JSON.parse(JSON.stringify(createDemo().api.datosDemo));
    edit(data);
    const start = source.indexOf('const datosDemo = congelarDatos('), end = source.indexOf('// Única identidad activa.');
    assert(start >= 0 && end > start, 'No se localizó el dataset para crear el fixture en memoria');
    return source.slice(0, start) + 'const datosDemo = congelarDatos(' + JSON.stringify(data) + ');\n\n' + source.slice(end);
}

export function findButton(element, label) {
    if (element.tagName === 'BUTTON' && element.textContent.includes(label)) return element;
    for (const child of element.children) { const match = findButton(child, label); if (match) return match; }
    return null;
}
