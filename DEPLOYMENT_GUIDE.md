# Hosting and Domain Configuration Guide for loganfinney.com

## Overview

With the retirement of the Squarespace subscription, your personal landing page and portfolio have been fully reconstructed as a lean, high-performance static website (HTML5, CSS3, vanilla JavaScript). This guide outlines the exact steps to host the site independently using **GitHub Pages** and connect your domain via **Porkbun** so that **loganfinney.com** is fully active without any recurring platform fees [1].

---

## Part 1: Preparing the Static Files

The project directory (`/home/ubuntu/logan-finney-static/`) contains all required files, structured for direct deployment:

| File Name | Description |
| :--- | :--- |
| `index.html` | Home page featuring your professional bio, tagline, and rotating hero background. |
| `resume.html` | Complete resume detailing your experience at Idaho Public Television and education. |
| `work.html` | Portfolio archive covering news writing, video production, and audio/podcast work. |
| `config.js` | Centralized configuration managing hero image rotation (Flickr sources) and theme toggle. |
| `CNAME` | Custom domain file configured with `loganfinney.com` for GitHub Pages routing. |
| `README.md` | Repository documentation and local testing instructions. |

---

## Part 2: Deploying to GitHub Pages

GitHub Pages provides fast, reliable, and free static hosting for personal portfolios [1]. Follow these steps to publish your repository:

### Step 1: Create a GitHub Repository
1. Log in to your [GitHub account](https://github.com/).
2. Click the **+** icon in the top-right corner and select **New repository**.
3. Name the repository `logan-finney` (or `logan-finney-static`).
4. Set visibility to **Public** (required for free GitHub Pages custom domains).
5. Leave "Initialize this repository with a README" unchecked, then click **Create repository**.

### Step 2: Push Your Local Files
Open your terminal in the project directory and run the following commands:

```bash
cd /home/ubuntu/logan-finney-static
git init
git add .
git commit -m "Deploy Logan Finney static portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/logan-finney.git
git push -u origin main
```
*(Note: Replace `YOUR_USERNAME` with your actual GitHub username).*

### Step 3: Configure GitHub Pages Settings
1. Navigate to your repository on GitHub and click on the **Settings** tab.
2. In the left sidebar, click on **Pages**.
3. Under **Build and deployment**, set the **Source** to `Deploy from a branch`.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. In the **Custom domain** field, enter `loganfinney.com` and click **Save**. GitHub will automatically generate a `CNAME` verification check.

---

## Part 3: Configuring Porkbun DNS

To link your custom domain at Porkbun to your new GitHub Pages deployment, you need to configure your DNS records.

### Step 1: Access Porkbun Management
1. Log in to your [Porkbun Account Management Console](https://porkbun.com/).
2. Locate `loganfinney.com` in your domain list and click **Details** or the **DNS** link next to it.

### Step 2: Remove Old Squarespace Records
If there are existing `A`, `CNAME`, or `TXT` records pointing to Squarespace or other legacy providers, delete them to avoid routing conflicts.

### Step 3: Add GitHub Pages DNS Records
Add the standard GitHub Pages `A` records for your apex domain (`loganfinney.com`), and a `CNAME` record for your `www` subdomain:

| Type | Host / Name | Value / Answer | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or leave blank) | `185.199.108.153` | 600 |
| **A** | `@` (or leave blank) | `185.199.109.153` | 600 |
| **A** | `@` (or leave blank) | `185.199.110.153` | 600 |
| **A** | `@` (or leave blank) | `185.199.111.153` | 600 |
| **CNAME** | `www` | `YOUR_USERNAME.github.io.` | 600 |

*(Note: Ensure you include the trailing dot `.` after your GitHub username in the CNAME record value if required by Porkbun).*

---

## Part 4: Verifying SSL and Going Live

1. Once the DNS records propagate (usually between 5 minutes to 2 hours), return to your GitHub repository **Settings > Pages** page.
2. Check the box for **Enforce HTTPS**. GitHub will automatically provision a free Let's Encrypt SSL certificate for `loganfinney.com`.
3. Visit `https://loganfinney.com` in your browser to verify that all pages, styles, and hero image rotations load correctly.

---

## References

[1] GitHub Pages Documentation. *Configuring a custom domain for your GitHub Pages site*. Available online: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site.
