// The footer fire: the PlayStation Doom fire effect, after Filipe Deschamps's
// doom-fire-algorithm (https://github.com/filipedeschamps/doom-fire-algorithm).
// The spread rule is his; this file sizes the fire to fill the footer and
// draws it in the page's grid squares and the site's colors, behind the
// footer text. It lights the first time the footer scrolls into view, pauses
// while the footer is off screen and carries on when it comes back, lights
// again from nothing when the theme switches, and never runs when the reader
// has asked for reduced motion.
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
// row above cools by 0 to 2 steps
const FIRE_HEAT = 36;

// The fire is as tall as its heat reaches: the source row and the 36 above it,
// 37 squares in all, from the footer rule to the foot of the page. The footer
// in styles.css matches it
const FIRE_ROWS = FIRE_HEAT + 1;

// The fire's 37 colors, after Doom's: Doom's hand-picked palette runs roughly
// from black at heat 0 through red-orange at 12 and dark yellow at 32 to white
// at 36. Here the key colors are the site's own (styles.css), set at the heats
// below, with the heats between two keys blended evenly from one to the next.
// "far" takes the family's shade farther from the page color (dark on a light
// page, light on a dark one), so the fire follows the palette and each theme.
// To swap in other key colors, change the names here
const FIRE_KEYS = [
    [0, '--bg'],
    [6, 'far', '--grey-light', '--grey-dark'],
    [12, 'far', '--blue-light', '--blue-dark'],
    [20, 'far', '--green-light', '--green-dark'],
    [32, 'far', '--red-light', '--red-dark'],
    [36, '--ink'],
];

// One step of the fire every 50 milliseconds (20 a second), as in the original
const FIRE_STEP_MS = 50;

// Read a theme color as red, green, blue. The colors are written as
// light-dark(), which only the browser can resolve, so each is read back from
// a hidden element that uses it
let probe = null;
function readColor(name) {
    if (!probe) {
        probe = document.createElement('span');
        probe.hidden = true;
        document.body.append(probe);
    }
    probe.style.color = `var(${name})`;
    return getComputedStyle(probe).color.match(/[\d.]+/g).slice(0, 3).map(Number);
}

// Relative luminance (WCAG), to tell which shade is farther from the page color
function luminance(rgb) {
    const [r, g, b] = rgb.map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// The 37 fire colors for the current theme: each key color at its heat, and
// the heats between two keys blended evenly from one to the next. They are
// worked out again only after the theme changes: the theme switch sets
// data-theme on the page, or the reader's system switches between light and dark
let paletteCache = null;
const clearPalette = () => { paletteCache = null; };
new MutationObserver(clearPalette).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', clearPalette);

function firePalette() {
    if (paletteCache) {
        return paletteCache;
    }
    const page = readColor('--bg');
    const keys = FIRE_KEYS.map(([heat, ...names]) => [heat, ...names.map(
        (name) => (name.startsWith('--') ? readColor(name) : name),
    )]);
    const distance = (rgb) => Math.abs(luminance(rgb) - luminance(page));
    const stops = keys.map(([heat, first, ...shades]) => {
        if (first !== 'far' && first !== 'near') {
            return [heat, first];
        }
        shades.sort((a, b) => distance(a) - distance(b));
        return [heat, first === 'near' ? shades[0] : shades[1]];
    });
    const palette = [];
    for (let heat = 0; heat <= FIRE_HEAT; heat++) {
        const next = stops.findIndex(([at]) => at >= heat);
        const [toHeat, to] = stops[next];
        const [fromHeat, from] = stops[Math.max(next - 1, 0)];
        const t = toHeat === fromHeat ? 1 : (heat - fromHeat) / (toHeat - fromHeat);
        palette.push(from.map((c, k) => Math.round(c + (to[k] - c) * t)));
    }
    paletteCache = palette.map((rgb) => `rgb(${rgb.join(',')})`);
    return paletteCache;
}

function initFooterFire() {
    const canvas = document.querySelector('.footer-fire');
    const footer = canvas && canvas.closest('footer');
    if (!footer || !('IntersectionObserver' in window)) {
        return;
    }

    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let columns = 0;
    let square = 0;
    let scale = 1;
    let pixels = new Uint8Array(0);
    let timer = null;
    // Burning: the fire has been lit and not put out, whether running or paused
    let burning = false;
    let visible = false;

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
        if (burning) {
            light();
        } else {
            update();
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

    // Lights the fire the first time, and carries on a paused one
    function start() {
        if (timer !== null || columns === 0) {
            return;
        }
        if (!burning) {
            light();
            burning = true;
        }
        timer = setInterval(step, FIRE_STEP_MS);
    }

    // Pausing keeps the fire as it is, ready to carry on
    function pause() {
        clearInterval(timer);
        timer = null;
    }

    // Stopping puts the fire out. It only stops when the reader turns on
    // reduced motion, and lights again from nothing if they turn it off
    function stop() {
        if (!burning) {
            return;
        }
        pause();
        burning = false;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        if (reducedMotion.matches) {
            stop();
        } else if (visible) {
            start();
        } else {
            pause();
        }
    }

    resize();
    new ResizeObserver(resize).observe(canvas.parentElement);
    // The fire runs while any of the footer is on screen
    new IntersectionObserver((entries) => {
        visible = entries[entries.length - 1].isIntersecting;
        update();
    }).observe(footer);
    reducedMotion.addEventListener('change', update);
}

document.addEventListener('DOMContentLoaded', initFooterFire);
