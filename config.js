// Hero Images Configuration
// Edit this list to change the hero photo rotation; it alternates people and places
const HERO_DIR = 'images/hero/';
const HERO_IMAGES = [
    '278.jpg',
    '334.jpg',
    '83.jpg',
    '331.jpg',
    '55.jpg',
    '177.jpg',
    '249.jpg',
    '164.jpg',
    '260.jpg',
    '270.jpg',
    '262.jpg',
    '78.jpg',
    'sq4.jpg',
    '345.jpg',
    'sq1.jpg'
];

// Initialize hero image rotation
function initHeroRotation() {
    const layers = document.querySelectorAll('.hero-bg');

    // Pages without a hero section (resume, work) load this script too
    if (layers.length < 2 || HERO_IMAGES.length === 0) {
        return;
    }

    let current = 0;
    let front = 0;

    function show(index, layer) {
        layers[layer].style.backgroundImage = `url('${HERO_DIR}${HERO_IMAGES[index]}')`;
    }

    // Show the first photo that loads, so a missing file never leaves the hero empty
    function showFirst(index) {
        const img = new Image();
        img.onload = () => {
            current = index;
            show(index, 0);
        };
        img.onerror = () => {
            if (index + 1 < HERO_IMAGES.length) {
                showFirst(index + 1);
            }
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
        if (loading) {
            return;
        }
        loading = true;
        const next = (current + 1) % HERO_IMAGES.length;
        const img = new Image();
        img.onerror = () => {
            loading = false;
            current = next;
        };
        img.onload = () => {
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
