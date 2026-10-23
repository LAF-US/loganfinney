---
---
// The light and dark themes: a stored choice is applied before the stylesheet,
// so the page never flashes the wrong colors, and the switch in the header is
// wired up once the page has loaded

// The browser bar's color: the accent blue, dark blue on a light page and light
// blue on a dark one (blue-dark and blue-light in _config.yml's palette)
const THEME_COLORS = { light: '{{ site.palette.blue-dark }}', dark: '{{ site.palette.blue-light }}' };
function setThemeColor(theme) {
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
        meta.content = THEME_COLORS[theme];
        meta.removeAttribute('media');
    });
}

try {
    const stored = sessionStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
        document.documentElement.setAttribute('data-theme', stored);
        setThemeColor(stored);
    }
} catch {
    // Storage unavailable: the page follows the system's light or dark setting
}

function initThemeToggle() {
    const themeToggle = document.querySelector('header button');
    if (!themeToggle) {
        return;
    }

    const root = document.documentElement;
    const currentTheme = () => root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // The label names the theme the button switches to, for screen readers
    const updateLabel = () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
    };
    updateLabel();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateLabel);

    themeToggle.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        setThemeColor(next);
        updateLabel();
        try {
            sessionStorage.setItem('theme', next);
        } catch {
            // Ignore storage failures; the toggle still works for this page view.
        }
    });
}

document.addEventListener('DOMContentLoaded', initThemeToggle);
