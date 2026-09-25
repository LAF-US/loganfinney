// Hero Images Configuration
// Update the URLs below to change hero images on the home page
const HERO_IMAGES = [
    'https://live.staticflickr.com/65535/54182454660_c81075673a_b.jpg',
    'https://live.staticflickr.com/65535/55018540576_bf68c1f794_b.jpg',
    'https://live.staticflickr.com/65535/54182454575_3de8877cca_b.jpg'
];

// Apply the stored (or system-preferred) theme as early as possible
// to avoid a flash of the wrong theme. This runs at parse time,
// before DOMContentLoaded.
(function applyInitialTheme() {
    try {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') {
            document.documentElement.setAttribute('data-theme', stored);
        }
    } catch (e) {
        // localStorage can be unavailable (private mode); fall back to
        // the prefers-color-scheme handling in CSS.
    }
})();

// Initialize hero image rotation
function initHeroRotation() {
    const heroBgs = document.querySelectorAll('.hero-bg');

    // Pages without a hero section (resume, work) load this script too
    if (heroBgs.length === 0) {
        return;
    }

    // Populate hero images from config
    HERO_IMAGES.forEach((imageUrl, index) => {
        if (heroBgs[index]) {
            heroBgs[index].style.backgroundImage = `url('${imageUrl}')`;
        }
    });

    if (heroBgs.length < 2) {
        return;
    }

    let currentIndex = 0;

    // Rotate every 7 seconds
    setInterval(() => {
        heroBgs[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % heroBgs.length;
        heroBgs[currentIndex].classList.add('active');
    }, 7000);
}

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener('click', () => {
        const root = document.documentElement;
        const current = root.getAttribute('data-theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
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
