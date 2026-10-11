// The footer fire: the PlayStation Doom fire effect, after Filipe Deschamps's
// doom-fire-algorithm (https://github.com/filipedeschamps/doom-fire-algorithm).
// The spread rule and the fire's size are his; this file draws it in the page's
// grid squares and theme colors at 35% opacity, fainter still in the squares
// that hold text. It lights the first time the footer scrolls into view and
// keeps burning, lights again from nothing when the theme switches, and never
// runs when the reader has asked for reduced motion.
//
// MIT License
//
// Copyright (c) 2019 Filipe Deschamps
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// As in Doom, heat runs from 0 (out) to 36 (the source row): 37 colors. Each
// row above cools by 0 to 2 steps, so the flames reach about 36 squares up
const FIRE_HEAT = 36;

// The fire is 40 squares tall, as in the original, drawn in the page's own grid
// squares and standing on the footer rule. The band in styles.css matches it
const FIRE_ROWS = 40;

// A green fire in the site's cedar and moss: its heat runs from the page color
// (cold) through deep cedar, cedar and moss to pale moss (hottest), brightening
// as Doom's fire does, in either theme
const FIRE_COLORS = ['--bg', '--cedar-deep', '--cedar', '--moss', '--moss-pale'];

// The fire is drawn at 35% opacity, and 25 points fainter than that (10%)
// in the squares that hold text
const FIRE_OPACITY = 0.35;
const TEXT_OPACITY = FIRE_OPACITY - 0.25;

// One step of the fire every 50 milliseconds (20 a second), as in the original
const FIRE_STEP_MS = 50;

// Read a CSS color (#rrggbb or rgb()) as red, green, blue
function parseColor(value) {
    const probe = document.createElement('canvas').getContext('2d');
    probe.fillStyle = value.trim();
    const hex = probe.fillStyle;
    if (hex.startsWith('#')) {
        return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    }
    return hex.match(/\d+/g).slice(0, 3).map(Number);
}

// The 37 fire colors for the current theme: FIRE_COLORS spaced evenly from
// cold to hottest, blended in between. They are worked out again only when
// the theme's colors change
let paletteKey = '';
let paletteCache = [];
function firePalette() {
    const body = getComputedStyle(document.body);
    const values = FIRE_COLORS.map((name) => body.getPropertyValue(name).trim());
    const key = values.join();
    if (key === paletteKey) {
        return paletteCache;
    }
    const colors = values.map(parseColor);
    const palette = [];
    for (let heat = 0; heat <= FIRE_HEAT; heat++) {
        const at = (heat / FIRE_HEAT) * (colors.length - 1);
        const from = Math.min(Math.floor(at), colors.length - 2);
        const t = at - from;
        palette.push(colors[from].map((c, k) => Math.round(c + (colors[from + 1][k] - c) * t)));
    }
    paletteKey = key;
    paletteCache = palette.map((rgb) => `rgb(${rgb.join(',')})`);
    return paletteCache;
}

function initFooterFire() {
    const canvas = document.querySelector('.footer-fire');
    const footer = canvas && canvas.closest('.site-footer');
    if (!footer || !('IntersectionObserver' in window)) {
        return;
    }

    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let columns = 0;
    let square = 0;
    let scale = 1;
    let pixels = new Uint8Array(0);
    // Squares with text in them, where the fire is drawn fainter (1 = text)
    let covered = new Uint8Array(0);
    let timer = null;
    let lit = false;

    // One grid square (1rlh) in CSS pixels
    function measureSquare() {
        const root = getComputedStyle(document.documentElement);
        return parseFloat(root.lineHeight);
    }

    // Size the fire to whole grid squares: an even number of columns, centered
    // like the page grid, so the fire's squares sit on the grid's squares
    function resize() {
        const nextSquare = measureSquare();
        const nextScale = window.devicePixelRatio || 1;
        const width = canvas.parentElement.clientWidth;
        const nextColumns = 2 * Math.ceil(width / nextSquare / 2);
        // A hidden fire (reduced motion) has no width; keep its last size
        if (nextColumns === 0
            || (nextColumns === columns && nextSquare === square && nextScale === scale)) {
            return;
        }
        columns = nextColumns;
        square = nextSquare;
        scale = nextScale;
        canvas.style.width = `${columns * square}px`;
        canvas.style.height = `${FIRE_ROWS * square}px`;
        canvas.width = Math.round(columns * square * scale);
        canvas.height = Math.round(FIRE_ROWS * square * scale);
        pixels = new Uint8Array(columns * FIRE_ROWS);
        findText();
        if (timer !== null) {
            light();
        } else {
            update();
        }
    }

    // Mark every square that any line of text touches, so the fire burns
    // fainter behind the words. A line that only grazes a square (less than a
    // quarter of it) leaves it alone
    function findText() {
        covered = new Uint8Array(columns * FIRE_ROWS);
        if (columns === 0) {
            return;
        }
        const box = canvas.getBoundingClientRect();
        const graze = square / 4;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            if (!node.data.trim()) {
                continue;
            }
            range.selectNodeContents(node);
            for (const rect of range.getClientRects()) {
                if (rect.bottom <= box.top || rect.top >= box.bottom
                    || rect.right <= box.left || rect.left >= box.right) {
                    continue;
                }
                const top = Math.max(0, Math.floor((rect.top - box.top + graze) / square));
                const bottom = Math.min(FIRE_ROWS - 1, Math.floor((rect.bottom - box.top - graze) / square));
                const left = Math.max(0, Math.floor((rect.left - box.left) / square));
                const right = Math.min(columns - 1, Math.ceil((rect.right - box.left) / square) - 1);
                for (let row = top; row <= bottom; row++) {
                    covered.fill(1, row * columns + left, row * columns + right + 1);
                }
            }
        }
    }

    // The bottom row is the fire source
    function light() {
        pixels.fill(0);
        pixels.fill(FIRE_HEAT, (FIRE_ROWS - 1) * columns);
    }

    // Each square takes the heat of the one below it, cooled by 0 to 2 steps,
    // and lands up to 2 squares to the right, which leans the flames as if in
    // wind. This is the original mirrored: it leaned left, working along each
    // row from the left; this works along each row from the right. The source
    // row is never written over
    function spread() {
        const source = pixels.length - columns;
        for (let row = 0; row < FIRE_ROWS - 1; row++) {
            for (let column = columns - 1; column >= 0; column--) {
                const i = row * columns + column;
                const decay = Math.floor(Math.random() * 3);
                const target = i + decay;
                if (target < source) {
                    pixels[target] = Math.max(pixels[i + columns] - decay, 0);
                }
            }
        }
    }

    // Heat is drawn in the site's colors (see firePalette), so the fire follows
    // the light and dark themes. Each square is filled inside its grid lines,
    // which stay visible on its top and left edges
    function draw(palette) {
        const line = 1 * scale;
        const size = square * scale;
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < pixels.length; i++) {
            const heat = pixels[i];
            if (heat === 0) {
                continue;
            }
            context.globalAlpha = covered[i] ? TEXT_OPACITY : FIRE_OPACITY;
            context.fillStyle = palette[heat];
            const x = Math.round((i % columns) * size);
            const y = Math.round(Math.floor(i / columns) * size);
            const nextX = Math.round(((i % columns) + 1) * size);
            const nextY = Math.round((Math.floor(i / columns) + 1) * size);
            context.fillRect(x + line, y + line, nextX - x - line, nextY - y - line);
        }
    }

    // Switching between light and dark puts the fire out and lights it again
    // from nothing, in the new theme's colors
    let shownPalette = null;
    function step() {
        const palette = firePalette();
        if (palette !== shownPalette) {
            if (shownPalette !== null) {
                light();
            }
            shownPalette = palette;
        }
        spread();
        draw(palette);
    }

    function start() {
        if (timer !== null || columns === 0) {
            return;
        }
        light();
        timer = setInterval(step, FIRE_STEP_MS);
    }

    // Stopping clears the fire. It only stops when the reader turns on reduced
    // motion, and lights again from nothing if they turn it off
    function stop() {
        if (timer === null) {
            return;
        }
        clearInterval(timer);
        timer = null;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        if (lit && !reducedMotion.matches) {
            start();
        } else {
            stop();
        }
    }

    resize();
    new ResizeObserver(resize).observe(canvas.parentElement);
    // Text moves when the page reflows or the web fonts arrive
    new ResizeObserver(findText).observe(document.body);
    document.fonts.ready.then(findText);
    // The first time the footer comes into view, the fire lights for good
    const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
            lit = true;
            observer.disconnect();
            update();
        }
    });
    observer.observe(footer);
    reducedMotion.addEventListener('change', update);
}

document.addEventListener('DOMContentLoaded', initFooterFire);
