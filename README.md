# IronHub Fitness Club (Austin, TX)

Premier Strength & Conditioning Club flagship web application located on South Congress Ave, Austin, TX.

## Tech Stack
- **Frontend**: Semantic HTML5, Vanilla CSS Design System, Modern Vanilla ES Modules
- **Bundler & Dev Server**: Vite 6
- **Hosting & Edge Delivery**: Cloudflare Pages via Wrangler

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Starts local server at `http://localhost:5173/`.

### 3. Run Automated Validation Suite
```bash
npm test
```
Validates JSON-LD schema (`ExerciseGym`, `FAQPage`), USA Austin address, USD currency compliance, and phone formatting.

### 4. Build for Production
```bash
npm run build
```
Compiles optimized static assets to `dist/`, including:
- `dist/index.html` (minified production page)
- `dist/404.html` (custom branded error page)
- `dist/_headers` (Cloudflare CDN caching & security headers)
- `dist/_redirects` (Canonical edge 301 redirects)
- `dist/sitemap.xml` & `dist/robots.txt`

---

## Cloudflare Pages Deployment

### Option A: Cloudflare Dashboard (GitHub CI/CD)
When connecting this repository in Cloudflare Pages:
* **Framework preset**: `Vite` (or `None`)
* **Build command**: `npm run build`
* **Build output directory**: `dist`
* **Root directory**: `/` (leave empty)
* **Environment variables (optional)**: `NODE_VERSION: 20`

### Option B: Direct Terminal CLI Deploy
```bash
npm run deploy
```
or:
```bash
npx wrangler pages deploy dist --project-name ironhub-fitness-club
```
