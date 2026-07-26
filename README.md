# Rupesh K R — Portfolio

A single-page portfolio built with plain **HTML, CSS, and JavaScript** — no build tools, no frameworks, so it's easy to edit in VS Code and deploy straight to GitHub Pages.

## Files

```
portfolio/
├── index.html          # all page content/sections
├── style.css            # theme, layout, colors, animations
├── script.js             # theme toggle, typewriter, filters, form, analytics hooks
├── robots.txt            # tells search engines they can crawl the site
├── sitemap.xml            # helps search engines index the single page
├── assets/
│   ├── profile.jpg       # your photo
│   ├── resume.pdf        # your resume
│   ├── favicon.svg        # browser tab icon (vector)
│   ├── favicon.ico        # fallback tab icon
│   ├── favicon-*.png      # PNG icons at multiple sizes
│   ├── apple-touch-icon.png  # iOS home-screen icon
│   └── og-image.png       # social share preview (LinkedIn/WhatsApp/Twitter)
└── README.md
```

## 1. Open the project in VS Code

1. Install [VS Code](https://code.visualstudio.com/) if you don't have it.
2. Unzip/copy this `portfolio` folder somewhere on your computer.
3. Open VS Code → `File > Open Folder...` → select the `portfolio` folder.
4. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab (`Ctrl+Shift+X` / `Cmd+Shift+X`) — this lets you preview the site with auto-reload.
5. Right-click `index.html` in the file explorer → **"Open with Live Server"**. It'll open in your browser at something like `http://127.0.0.1:5500`.

## 2. Personalize it

Your photo, resume, GitHub (`github.com/Ru942`), and LinkedIn links are already wired in. If anything changes:

- **Photo & resume**: replace `profile.jpg` / `resume.pdf` in `assets/` with a new file of the same name.
- **Links**: search `index.html` for `github.com/Ru942` or `linkedin.com/in/rupesh-k-r-70864a204` to update them.
- **Text content**: every section is plain HTML in `index.html` — edit directly.
- **Colors**: all colors live as CSS variables at the top of `style.css` under `:root` (`--blue`, `--purple`, `--green`, `--bg`, etc.) — change those to re-theme the whole site instantly.
- **Domain**: once your GitHub Pages URL is live, replace every `https://ru942.github.io/portfolio/` in `index.html`, `robots.txt`, and `sitemap.xml` with your real live URL (these power the social-preview and search-engine tags).

## 3. Connect the contact form (do this before sharing the link)

The form currently points at a placeholder Formspree ID, so submissions won't go anywhere until you set it up:

1. Go to [formspree.io](https://formspree.io/) and create a free account.
2. Create a new form — Formspree gives you an endpoint like `https://formspree.io/f/abcd1234`.
3. In `index.html`, find:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
   and replace `YOUR_FORM_ID` with your real ID.
4. Submissions will now land in your Formspree inbox (and can be auto-forwarded to your email). The free tier covers 50 submissions/month — plenty for a portfolio.

Until you set this, the button will honestly say it isn't connected instead of pretending to send — so you'll never think a message went through when it didn't.

## 4. Turn on analytics (optional but recommended)

The site ships with [GoatCounter](https://www.goatcounter.com/) wired in — free, privacy-friendly, no cookie banner required (GDPR-friendly by design).

1. Sign up free at [goatcounter.com](https://www.goatcounter.com/).
2. Pick a site code (e.g. `rupeshkr`) — your dashboard will live at `https://rupeshkr.goatcounter.com`.
3. In `index.html`, find:
   ```html
   <script data-goatcounter="https://YOURCODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
   ```
   and replace `YOURCODE` with your real site code.
4. Visit your dashboard any time to see pageviews, referrers, browsers, and countries.

Prefer Google Analytics instead? Swap that one script tag for your GA4 snippet — same spot, nothing else changes.

## 5. Push it to GitHub

Open the built-in terminal in VS Code (`` Ctrl+` `` / `` Cmd+` ``) and run:

```bash
cd path/to/portfolio
git init
git add .
git commit -m "Initial portfolio commit"
```

Then create a new empty repository on GitHub (no README/license, so it stays empty):
1. Go to [github.com/new](https://github.com/new)
2. Name it e.g. `portfolio` (or `yourusername.github.io` for a root-domain site — see note below)
3. Don't initialize with a README
4. Click **Create repository**

Copy the commands GitHub shows you under "…or push an existing repository":

```bash
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

## 6. Turn on GitHub Pages (free hosting)

1. In your GitHub repo, go to **Settings → Pages**.
2. Under "Build and deployment" → Source, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)` → **Save**.
4. Wait ~1 minute, then refresh — GitHub shows your live URL, typically:
   - `https://yourusername.github.io/portfolio/` (if repo is named `portfolio`)
   - `https://yourusername.github.io/` (if repo is named exactly `yourusername.github.io`)

That's it — the site is live and will auto-update every time you `git push` new changes.

## 7. Making future edits

```bash
# edit files in VS Code, then:
git add .
git commit -m "Update projects section"
git push
```

GitHub Pages redeploys automatically within a minute or two of each push.

## Notes

- The theme toggle (sun/moon icon, top right) switches between dark and light and remembers your choice via `localStorage`.
- The typewriter role list is set in the `roles` array near the top of `script.js` — edit that list to change what types/erases in the hero.
- Project filter buttons (All / JavaScript / Tailwind / HTML-CSS) work by matching each project card's `data-tag` attribute in `index.html` — add a new project by copying a `.project-card` block and giving it the right `data-tag`, plus a matching "Live Demo" / "Code" button pair.
- `favicon.svg`, `favicon.ico`, and `og-image.png` were generated to match the site's exact color palette (blue → purple → green) — regenerate them if you change `--blue` / `--purple` / `--green` in `style.css` so social previews stay consistent.
- If you rename the repo or use a custom domain, remember to update the canonical URL, `og:url`, `og:image`, `twitter:image`, the JSON-LD `url`, `robots.txt`, and `sitemap.xml` — all currently point at `https://ru942.github.io/portfolio/`.
