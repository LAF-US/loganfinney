---
---
// Hero photos: every image in images/hero/
const HERO_DIR = {{ '/images/hero/' | relative_url | jsonify }};
const HERO_IMAGES = [
{%- assign photos = site.static_files | where_exp: "file", "file.path contains '/images/hero/'" %}
{%- for photo in photos %}
    {{ photo.name | jsonify }}{% unless forloop.last %},{% endunless %}
{%- endfor %}
];

// Each photo's caption (the place) and its description for people who can't
// see it (alt), by file name. The caption follows the photo, so the
// description leaves the place out. The build stops if a photo in
// images/hero/ has no entry here, or an entry has no photo
const HERO_PHOTOS = {
    'priest-lake.jpg': {
        caption: 'Priest Lake',
        alt: 'A forested island in a lake, with snowy mountains behind it'
    },
    'state-capitol-pride.jpg': {
        caption: 'State Capitol',
        alt: 'A rainbow flag held up at a rally on the front steps'
    },
    'anderson-ranch.jpg': {
        caption: 'Anderson Ranch',
        alt: 'A dam and its concrete spillway in a rocky canyon'
    },
    'schweitzer.jpg': {
        caption: 'Schweitzer',
        alt: 'Snow-covered ski runs on a mountain at sunset'
    },
    'coeur-dalene.jpg': {
        caption: "Coeur d'Alene",
        alt: 'A drive-in restaurant on a street corner at sunset'
    },
    'blackfoot.jpg': {
        caption: 'Blackfoot',
        alt: 'The Eastern Idaho State Fair entrance sign at dusk'
    },
    'shoshone-falls.jpg': {
        caption: 'Shoshone Falls',
        alt: 'A wide waterfall over pale cliffs'
    },
    'owyhee-reservoir.jpg': {
        caption: 'Owyhee Reservoir',
        alt: 'A reservoir between cliffs and sagebrush hills'
    },
    'south-fork-payette.jpg': {
        caption: 'South Fork Payette',
        alt: 'A river below hillsides of living and burned pine trees'
    },
    'bruneau-river.jpg': {
        caption: 'Bruneau River',
        alt: 'A river in a dry, grassy canyon on a cloudy day'
    },
    'state-capitol-protest.jpg': {
        caption: 'State Capitol',
        alt: 'A full public gallery above a legislative chamber'
    }
};

// Shuffle the photos (Fisher-Yates), so each page load starts somewhere new
// and every photo shows once per cycle
function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
}

// Load a photo before it is shown, so the switch never shows a blank photo.
// Resolves once it has loaded; rejects if it fails or doesn't answer within
// 10 seconds. A promise settles only once, so a photo that arrives after its
// 10 seconds is ignored
function preload(name) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const timeout = setTimeout(reject, 10000);
        img.onload = () => {
            clearTimeout(timeout);
            resolve();
        };
        img.onerror = () => {
            clearTimeout(timeout);
            reject();
        };
        img.src = HERO_DIR + name;
    });
}

// Initialize hero image rotation
function initHeroRotation() {
    const figure = document.querySelector('figure');

    // Nothing to rotate without the photo's figure and photos
    if (!figure || HERO_IMAGES.length === 0) {
        return;
    }

    const frame = figure.querySelector('div');
    const caption = figure.querySelector('figcaption');
    // The photo goes into the page once the first one has loaded
    const photo = document.createElement('img');

    shuffle(HERO_IMAGES);

    let current = 0;
    // The rotation waits until the first photo is on screen
    let ready = false;

    // Called once the photo has loaded, so it replaces the last one at once
    function show(index) {
        const name = HERO_IMAGES[index];
        const about = HERO_PHOTOS[name] || {};
        photo.alt = about.alt || '';
        photo.src = HERO_DIR + name;
        caption.textContent = about.caption || '';
        if (!photo.isConnected) {
            frame.append(photo);
        }
        current = index;
    }

    // Show the first photo that loads, so a missing file never leaves the hero empty
    function showFirst(index) {
        preload(HERO_IMAGES[index]).then(() => {
            show(index);
            ready = true;
        }, () => {
            if (index + 1 < HERO_IMAGES.length) {
                showFirst(index + 1);
            }
        });
    }

    showFirst(0);
    if (HERO_IMAGES.length < 2) {
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer = null;
    let loading = false;

    // The next photo, once it has loaded. Only one load runs at a time, and a
    // photo that fails to load is skipped
    function rotate() {
        if (!ready || loading) {
            return;
        }
        loading = true;
        const next = (current + 1) % HERO_IMAGES.length;
        preload(HERO_IMAGES[next]).then(() => {
            // Reduced motion may have been switched on while this photo loaded
            if (!reducedMotion.matches) {
                show(next);
            }
        }, () => {
            current = next;
        }).finally(() => {
            loading = false;
        });
    }

    // Rotate every 7 seconds, stopping while the motion preference is on or
    // the page is out of sight (another tab, or a minimized window)
    function updateRotation() {
        if (reducedMotion.matches || document.hidden) {
            clearInterval(timer);
            timer = null;
        } else if (timer === null) {
            timer = setInterval(rotate, 7000);
        }
    }

    updateRotation();
    reducedMotion.addEventListener('change', updateRotation);
    document.addEventListener('visibilitychange', updateRotation);
}

document.addEventListener('DOMContentLoaded', initHeroRotation);
