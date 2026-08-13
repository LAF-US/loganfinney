// Hero Images Configuration
// Update the URLs below to change hero images across ALL pages automatically
const HERO_IMAGES = [
    'https://live.staticflickr.com/65535/54182454660_c81075673a_b.jpg',
    'https://live.staticflickr.com/65535/55018540576_bf68c1f794_b.jpg',
    'https://live.staticflickr.com/65535/55018540576_bf68c1f794_b.jpg',
    'https://live.staticflickr.com/65535/54182454575_3de8877cca_b.jpg',
    'https://live.staticflickr.com/65535/54182454530_8f9g0h1i2j_b.jpg'
];

// Initialize hero image rotation
function initHeroRotation() {
    const heroBgs = document.querySelectorAll('.hero-bg');
    
    // Populate hero images from config
    HERO_IMAGES.forEach((imageUrl, index) => {
        if (heroBgs[index]) {
            heroBgs[index].style.backgroundImage = `url('${imageUrl}')`;
        }
    });
    
    let currentIndex = 0;

    function rotateHeroImage() {
        heroBgs[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % heroBgs.length;
        heroBgs[currentIndex].classList.add('active');
    }

    // Rotate every 5 seconds
    setInterval(rotateHeroImage, 5000);
}

// Initialize theme toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    initHeroRotation();
    initThemeToggle();
});
