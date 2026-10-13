// Runs before the stylesheet applies so a stored theme never flashes the wrong colors
try {
    var t = sessionStorage.getItem('theme');
    if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
} catch {}
