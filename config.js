// Hero Images Configuration
// Edit this list to change the hero photo rotation; photos of Logan alternate with his own photography
const HERO_DIR = 'images/hero/';
const HERO_IMAGES = [
    '278.jpg',
    'me-sand-dunes.jpg',
    '334.jpg',
    'me-studio-guests.jpg',
    '83.jpg',
    'me-selfie-mountains.jpg',
    '331.jpg',
    'me-ktvb-2022.jpg',
    '55.jpg',
    'me-capitol-rotunda.jpg',
    '177.jpg',
    'me-nicar.jpg',
    '249.jpg',
    'me-dialogue.jpg',
    '164.jpg',
    'me-ptv-mosaic.jpg',
    '260.jpg',
    'me-award.jpg',
    '270.jpg',
    'me-capitol-steps.jpg',
    '262.jpg',
    'me-ptv-portrait.jpg',
    '78.jpg',
    'sq4.jpg',
    '345.jpg',
    'sq1.jpg'
];
// Where to anchor photos whose subject is off-center, so narrow screens keep it in frame
const HERO_FOCUS = {
    'me-sand-dunes.jpg': '69% center',
    'me-selfie-mountains.jpg': '24% center',
    'me-dialogue.jpg': '70% center',
    'me-ptv-mosaic.jpg': '82% 100%',
    'me-award.jpg': '28% center'
};

// Initialize hero image rotation
function initHeroRotation() {
    const layers = document.querySelectorAll('.hero-bg');

    // Pages without a hero section (resume, work) load this script too
    if (layers.length < 2 || HERO_IMAGES.length === 0) {
        return;
    }

    let current = 0;
    let front = 0;
    // The rotation waits until the first photo is on screen
    let ready = false;

    function show(index, layer) {
        const name = HERO_IMAGES[index];
        layers[layer].style.backgroundImage = `url('${HERO_DIR}${name}')`;
        layers[layer].style.backgroundPosition = HERO_FOCUS[name] || '';
    }

    // Show the first photo that loads, so a missing file never leaves the hero empty
    function showFirst(index) {
        const img = new Image();
        let settled = false;
        // A photo that fails, or doesn't answer within 10 seconds, hands off to the next one
        const tryNext = () => {
            if (settled) {
                return;
            }
            settled = true;
            if (index + 1 < HERO_IMAGES.length) {
                showFirst(index + 1);
            }
        };
        const timedOut = setTimeout(tryNext, 10000);
        img.onload = () => {
            clearTimeout(timedOut);
            if (settled) {
                return;
            }
            settled = true;
            current = index;
            show(index, 0);
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

    // Load the next photo first so the crossfade never reveals a blank layer.
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
            const back = 1 - front;
            show(next, back);
            layers[back].classList.add('active');
            layers[front].classList.remove('active');
            front = back;
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

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        return;
    }

    const root = document.documentElement;
    const currentTheme = () => root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const syncPressed = () => themeToggle.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
    syncPressed();

    themeToggle.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        syncPressed();
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Ignore storage failures; the toggle still works for this page view.
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    initHeroRotation();
    initThemeToggle();
});
