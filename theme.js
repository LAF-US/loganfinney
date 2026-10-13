// Runs before the stylesheet applies so a stored theme never flashes the wrong colors

// The browser bar's color: the accent blue, dark blue on a light page and light
// blue on a dark one (--blue-dark and --blue-light in styles.css)
var THEME_COLORS = { light: '#1d3f6e', dark: '#a9c7ee' };
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
