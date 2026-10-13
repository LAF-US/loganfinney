// Runs before the stylesheet applies so a stored theme never flashes the wrong colors

// The browser bar's color: the blue the fire doesn't use, light blue on a light
// page and dark blue on a dark one (--blue-light and --blue-dark in styles.css)
var THEME_COLORS = { light: '#a9c7ee', dark: '#1d3f6e' };
function setThemeColor(t) {
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
        meta.content = THEME_COLORS[t];
        meta.removeAttribute('media');
    });
}

try {
    var t = sessionStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
        document.documentElement.setAttribute('data-theme', t);
        setThemeColor(t);
    }
} catch {}
