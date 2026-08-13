# Logan Finney - Personal Landing Page

A clean, static portfolio website built with HTML, CSS, and JavaScript. Features a rotating hero image gallery, dark/light mode toggle, and responsive design.

## Features

- **Rotating Hero Images** - Automatically cycles through your Flickr photos every 5 seconds
- **Dark/Light Mode** - Theme preference persists in browser localStorage
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Clean Editorial Layout** - Serif typography with blue accents
- **No Dependencies** - Pure HTML, CSS, and JavaScript (no build tools required)

## File Structure

```
logan-finney-static/
├── index.html          # Home page with hero section
├── resume.html         # Resume with employment and education history
├── work.html           # Portfolio with writing, video, and audio work
├── config.js           # Theme toggle and hero image rotation
└── README.md           # This file
```

## Customization

### Update Hero Images

Edit `config.js` and replace the `HERO_IMAGES` array with your own image URLs:

```javascript
const HERO_IMAGES = [
    'https://your-image-url-1.jpg',
    'https://your-image-url-2.jpg',
    'https://your-image-url-3.jpg',
    // ... add more URLs
];
```

For Flickr images, use the direct image URL format:
```
https://live.staticflickr.com/{server-id}/{id}_{secret}_b.jpg
```

### Update Content

- **Home**: Edit the bio and tagline in `index.html`
- **Resume**: Update employment and education sections in `resume.html`
- **Work**: Add portfolio items in `work.html`

### Customize Colors

The primary accent color is blue (#2563eb). To change it globally, search and replace in all HTML files:
- Find: `#2563eb`
- Replace with: your desired color

## Deployment to GitHub Pages

### 1. Create a GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/logan-finney-static.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository settings
2. Scroll to "GitHub Pages" section
3. Select "main" branch as the source
4. Save

Your site will be available at: `https://yourusername.github.io/logan-finney-static/`

### 3. Connect Your Custom Domain

1. In repository settings, add your domain (e.g., loganfinney.com) in the "Custom domain" field
2. Update your domain's DNS settings to point to GitHub Pages:
   - Add an `A` record pointing to GitHub's IP addresses
   - Or add a `CNAME` record pointing to `yourusername.github.io`

For detailed instructions, see [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Local Testing

To test locally before deploying:

```bash
# Python 3
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2026 Logan Finney. All rights reserved.
