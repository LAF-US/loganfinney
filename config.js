// Hero Images Configuration
// Update the URLs below to change hero images on the home page
const HERO_IMAGES = [
    'https://live.staticflickr.com/65535/54182454660_c81075673a_b.jpg',
    'https://live.staticflickr.com/65535/55018540576_bf68c1f794_b.jpg',
    'https://live.staticflickr.com/65535/54182454575_3de8877cca_b.jpg'
];

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

    // Only slides that received an image may rotate; extras would show blank
    const slides = Array.from(heroBgs).slice(0, HERO_IMAGES.length);
    if (slides.length < 2) {
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentIndex = 0;
    let timer = null;

    function rotate() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
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
