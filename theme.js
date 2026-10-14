---
---
// Runs before the stylesheet applies so a stored theme never flashes the wrong colors

// The browser bar's color: the accent blue, dark blue on a light page and light
// blue on a dark one (blue-dark and blue-light in _config.yml's palette)
var THEME_COLORS = { light: '{{ site.palette.blue-dark }}', dark: '{{ site.palette.blue-light }}' };
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
