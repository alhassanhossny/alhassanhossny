# Alhassan Hossny Portfolio

A static personal portfolio website for Alhassan Hossny. The site presents profile details, services, resume history, selected portfolio work, client logos, and a contact form that opens the visitor's email app.

## Features

- Responsive single-page portfolio layout
- Sidebar contact details and social links
- About, resume, portfolio, blog, and contact sections
- Filterable portfolio categories
- Accessible skip link, form labels, button states, and current-page navigation
- Static contact form using `mailto:`
- No build step required

## Project Structure

```text
.
├── index.html
├── assets
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── script.js
│   └── images
└── website-demo-image
```

## Preview Locally

Open `index.html` directly in a browser, or run a small static server from the project root:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Recent Enhancements

- Fixed malformed email markup and stale placeholder profile text
- Added SEO and social metadata
- Improved social links, client links, and portfolio link behavior
- Replaced placeholder blog cards with an honest coming-soon state
- Repaired the embedded map markup
- Added accessible labels and status messaging to the contact form
- Hardened JavaScript so optional sections do not break page behavior
- Added reduced-motion handling and visible keyboard focus styles

## Deployment

This repository can be deployed as a static site with GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any simple web server. No package installation or build command is required.
