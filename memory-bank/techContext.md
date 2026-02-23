# Tech Context: MeMyselfandEye

## Stack
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework (primary)** | React 18 | Main app shell, routing (react-router-dom v6), layout, most pages |
| **Framework (secondary)** | Vue 3 | Interactive components — PhotoGallery (scroll animations, lightbox) and BlogEditor (markdown toolbar, live preview) |
| **Bridge** | veaury | Renders Vue components inside React via `applyVueInReact()` |
| **Build** | Vite 6 | Handles both .jsx and .vue files via veaury's vite plugin |
| **Styling** | Custom CSS | Ported from resumechallenge; no CSS framework, Bootstrap design tokens preserved as CSS variables |
| **Icons** | Font Awesome 6.3.0 | CDN loaded |
| **Fonts** | Google Fonts | Manrope (primary body/UI), Saira Extra Condensed (available for headings) |

## Key Dependencies
```
react, react-dom, react-router-dom
vue, veaury
react-markdown, remark-gfm (available for future markdown rendering)
@vitejs/plugin-vue-jsx (required by veaury)
```

## Build & Dev
- `npm run dev` — local dev server on port 3000
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build

## Deployment (GCP)
Two deployment paths are configured:

### Option A: Firebase Hosting (simpler, static SPA)
- `firebase.json` — SPA rewrites, cache headers for assets
- `.firebaserc` — project ID placeholder (`gregoriethomas-site`)
- Deploy: `firebase deploy --only hosting`

### Option B: Cloud Run (containerized, if backend needed later)
- `Dockerfile` — multi-stage: node build → nginx serve on port 8080
- `nginx.conf` — SPA fallback, gzip, cache headers
- `cloudbuild.yaml` — Cloud Build pipeline: docker build → push to GCR → deploy to Cloud Run
- Deploy: `gcloud builds submit`

### Custom Domain (gregoriethomas.com)
- Map in Firebase Hosting console or Cloud Run domain mappings
- Greg already owns the domain

## Project Structure
```
MySite/
├── public/images/          # 17 image assets (photos, profile, favicon)
├── src/
│   ├── components/
│   │   ├── Layout.jsx      # React layout wrapper (nav + outlet)
│   │   ├── Navbar.jsx      # React side navigation (fixed, black bg, profile img)
│   │   └── vue/
│   │       ├── PhotoGallery.vue   # Vue: scroll-reveal gallery, lightbox, keyboard nav
│   │       └── BlogEditor.vue     # Vue: markdown editor with toolbar + live preview
│   ├── pages/
│   │   ├── Home.jsx        # Hero: "Hacker/IT Architect/Photographer" + CTAs
│   │   ├── Resume.jsx      # Full CV with work history, skills, education
│   │   ├── GalleryPage.jsx # React wrapper mounting Vue PhotoGallery
│   │   ├── Blog.jsx        # Blog listing + individual posts + Vue editor
│   │   ├── Projects.jsx    # Project cards with tech tags
│   │   ├── About.jsx       # Original resume challenge writeup
│   │   └── Contact.jsx     # Email + LinkedIn
│   ├── styles/
│   │   └── main.css        # All styles — design tokens, nav, pages, responsive
│   ├── App.jsx             # React Router routes
│   └── main.jsx            # Entry point
├── Dockerfile
├── nginx.conf
├── cloudbuild.yaml
├── firebase.json
├── .firebaserc
├── vite.config.js
└── package.json
```
