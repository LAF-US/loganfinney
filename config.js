// Hero Images Configuration
// Each photo shows with its caption; edit this list to change the rotation
const HERO_IMAGES = [
    { src: 'images/hero/278.jpg', caption: "Idaho State Capitol \u2022 Women's March" },
    { src: 'images/hero/83.jpg', caption: "Idaho State Capitol \u2022 Women's March \u2022 Paulette Jordan" },
    { src: 'images/hero/55.jpg', caption: 'Idaho State Capitol \u2022 50501 Protest' },
    { src: 'images/hero/249.jpg', caption: 'Idaho State Capitol \u2022 COVID Protest \u2022 Paul Shepherd' },
    { src: 'images/hero/260.jpg', caption: 'Idaho State Capitol \u2022 COVID Protest \u2022 Judy Boyle' },
    { src: 'images/hero/262.jpg', caption: 'Idaho State Capitol \u2022 COVID Protest \u2022 Tammy Nichols' },
    { src: 'images/hero/334.jpg', caption: 'Priest Lake, Bartoo Island' },
    { src: 'images/hero/331.jpg', caption: 'Payette River, South Fork' },
    { src: 'images/hero/177.jpg', caption: 'Boise River, Anderson Ranch Dam' },
    { src: 'images/hero/164.jpg', caption: 'Little Camas Reservoir, Castle Rocks' },
    { src: 'images/hero/270.jpg', caption: 'Juniper Buttes, St. Anthony Sand Dunes' },
    { src: 'images/hero/78.jpg', caption: 'Hot Creek, Bruneau River' },
    { src: 'images/hero/345.jpg', caption: 'Schweitzer Mountain Resort, Selkirk Mountains' },
    { src: 'images/hero/sq1.jpg', caption: 'Big Wood River, Coy Creek Rd Bridge' },
    { src: 'images/hero/sq4.jpg', caption: 'Idaho State Capitol' }
];

// Initialize hero image rotation
function initHeroRotation() {
    const layers = document.querySelectorAll('.hero-bg');
    const caption = document.getElementById('heroCaption');

    // Pages without a hero section (resume, work) load this script too
    if (layers.length < 2 || HERO_IMAGES.length === 0) {
        return;
    }

    let current = 0;
    let front = 0;

    function show(index, layer) {
        layers[layer].style.backgroundImage = `url('${HERO_IMAGES[index].src}')`;
        if (caption) {
            caption.textContent = HERO_IMAGES[index].caption;
        }
    }

    show(0, 0);
    if (HERO_IMAGES.length < 2) {
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer = null;

    // Load the next photo first so the crossfade never reveals a blank layer
    function rotate() {
        const next = (current + 1) % HERO_IMAGES.length;
        const img = new Image();
        img.onload = () => {
            const back = 1 - front;
            show(next, back);
            layers[back].classList.add('active');
            layers[front].classList.remove('active');
            front = back;
            current = next;
        };
        img.src = HERO_IMAGES[next].src;
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
