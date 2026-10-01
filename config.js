// Hero Images Configuration
// Edit this list to change the hero photo rotation
const HERO_DIR = 'images/hero/';
const HERO_IMAGES = [
    '334.jpg',
    '278.jpg',
    '177.jpg',
    '260.jpg'
];

// Caption shown under each photo, by file name. Leave a photo out to show no caption.
const HERO_CAPTIONS = {
};

// Initialize hero image rotation
function initHeroRotation() {
    const layers = document.querySelectorAll('.hero-bg');
    const caption = document.querySelector('.photo-caption');

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
        layers[layer].style.setProperty('--photo', `url('${HERO_DIR}${name}')`);
        if (caption) {
            caption.textContent = HERO_CAPTIONS[name] || '';
        }
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

    // The visible word names the theme the button switches to; the label says so for screen readers
    const updateLabel = () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
    };
    updateLabel();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLabel);

    themeToggle.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        updateLabel();
        try {
            localStorage.setItem('theme', next);
        } catch (e) {
            // Ignore storage failures; the toggle still works for this page view.
        }
    });
}

// Button-block tabs. Without scripts every panel shows, stacked; with them, one shows at a time.
function initTabs() {
    const tabs = Array.from(document.querySelectorAll('.tabs [role="tab"]'));
    if (!tabs.length) return;
    function select(tab, focus) {
        tabs.forEach(function (t) {
            const on = t === tab;
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab, false); });
        tab.addEventListener('keydown', function (e) {
            let next = null;
            if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
            else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
            else if (e.key === 'Home') next = tabs[0];
            else if (e.key === 'End') next = tabs[tabs.length - 1];
            if (next) { e.preventDefault(); select(next, true); }
        });
    });
    select(tabs[0], false);
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    initHeroRotation();
    initThemeToggle();
    initTabs();
});
