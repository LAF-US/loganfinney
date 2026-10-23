---
---
// Hero photos: every image in images/hero/
const HERO_DIR = 'images/hero/';
const HERO_IMAGES = [
{%- assign photos = site.static_files | where_exp: "file", "file.path contains '/images/hero/'" %}
{%- for photo in photos %}
    {{ photo.name | jsonify }}{% unless forloop.last %},{% endunless %}
{%- endfor %}
];

// Each photo's caption and description, by file name: _data/hero.yml
const HERO_PHOTOS = {{ site.data.hero | jsonify }};

// Shuffle the photo order once per visit (Fisher-Yates), so every photo shows
// once per cycle. The order is kept for the rest of the visit and reshuffled
// on the next one.
function shuffleHeroImages() {
    const key = 'heroOrder';
    let saved = null;
    try {
        saved = JSON.parse(sessionStorage.getItem(key));
    } catch {
        saved = null;
    }
    const sameSet = Array.isArray(saved)
        && saved.length === HERO_IMAGES.length
        && new Set(saved).size === HERO_IMAGES.length
        && saved.every((name) => HERO_IMAGES.includes(name));
    let order = HERO_IMAGES.slice();
    if (sameSet) {
        order = saved;
    } else {
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        try {
            sessionStorage.setItem(key, JSON.stringify(order));
        } catch {
            // Storage unavailable: the order still holds for this page view
        }
    }
    HERO_IMAGES.splice(0, HERO_IMAGES.length, ...order);
}

// Initialize hero image rotation
function initHeroRotation() {
    const figure = document.querySelector('figure');

    // Nothing to rotate without the photo's figure and photos
    if (!figure || HERO_IMAGES.length === 0) {
        return;
    }

    const frame = figure.querySelector('div');
    const caption = figure.querySelector('figcaption');
    // The photo goes into the page once the first one has loaded
    const photo = document.createElement('img');

    shuffleHeroImages();

    let current = 0;
    // The rotation waits until the first photo is on screen
    let ready = false;

    // Called once the photo has loaded, so it replaces the last one at once
    function show(index) {
        const name = HERO_IMAGES[index];
        const about = HERO_PHOTOS[name] || {};
        photo.alt = about.alt || '';
        photo.src = HERO_DIR + name;
        caption.textContent = about.caption || '';
        if (!photo.isConnected) {
            frame.append(photo);
        }
    }

    // Show the first photo that loads, so a missing file never leaves the hero empty
    function showFirst(index) {
        const img = new Image();
        let settled = false;
        // A photo that fails, or doesn't answer within 7 seconds, hands off to the next one
        const tryNext = () => {
            if (settled) {
                return;
            }
            settled = true;
            if (index + 1 < HERO_IMAGES.length) {
                showFirst(index + 1);
            }
        };
        const timedOut = setTimeout(tryNext, 7000);
        img.onload = () => {
            clearTimeout(timedOut);
            if (settled) {
                return;
            }
            settled = true;
            current = index;
            show(index);
            ready = true;
        };
        img.onerror = () => {
            clearTimeout(timedOut);
            tryNext();
        };
        img.src = HERO_DIR + HERO_IMAGES[index];
    }

    showFirst(0);
    if (HERO_IMAGES.length < 2) {
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer = null;
    let loading = false;

    // Load the next photo first so the switch never shows a blank photo.
    // Only one load runs at a time, and a photo that fails to load is skipped.
    function rotate() {
        if (!ready || loading) {
            return;
        }
        loading = true;
        const next = (current + 1) % HERO_IMAGES.length;
        const img = new Image();
        // A request that never answers counts as failed, so the rotation can't freeze
        let expired = false;
        const timedOut = setTimeout(() => {
            expired = true;
            loading = false;
            current = next;
        }, 10000);
        img.onerror = () => {
            clearTimeout(timedOut);
            loading = false;
            current = next;
        };
        img.onload = () => {
            clearTimeout(timedOut);
            // A photo that arrives after its timeout is ignored
            if (expired) {
                return;
            }
            loading = false;
            // Reduced motion may have been switched on while this photo loaded
            if (reducedMotion.matches) {
                return;
            }
            show(next);
            current = next;
        };
        img.src = HERO_DIR + HERO_IMAGES[next];
    }

    // Rotate every 7 seconds, stopping or resuming if the motion preference changes
    function updateRotation() {
        if (reducedMotion.matches) {
            clearInterval(timer);
            timer = null;
        } else if (timer === null) {
            timer = setInterval(rotate, 7000);
        }
    }

    updateRotation();
    reducedMotion.addEventListener('change', updateRotation);
}

document.addEventListener('DOMContentLoaded', initHeroRotation);
