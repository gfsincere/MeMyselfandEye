# Active Context: MeMyselfandEye

## Current State (2026-02-24)
- **Initial build complete** — all pages, components, styles, and deployment config in place
- **Pushed to GitHub**: https://github.com/gfsincere/MeMyselfandEye
- **Build verified**: `npm run build` passes cleanly (2.21s, ~303KB JS + ~11.5KB CSS gzipped to ~104KB + ~3KB)
- **Not yet deployed** to GCP — deployment config is ready but needs GCP project setup

## What Was Done This Session
1. Cloned `resumechallenge` repo and analyzed all templates, CSS, JS, and image assets
2. Extracted design tokens: Manrope font, black primary, #bd5d38 links, side nav pattern, gallery layout, typography scale
3. Scaffolded Vite project with React + Vue via veaury bridge
4. Built React app shell: routing (7 routes), Layout, Navbar (preserving side nav with profile image)
5. Built all React pages: Home, Resume, Gallery, Blog, Projects, About, Contact
6. Built Vue components: PhotoGallery (IntersectionObserver scroll animations, lightbox with keyboard nav), BlogEditor (markdown toolbar, live preview)
7. Ported all CSS — design tokens as custom properties, responsive breakpoints, all page-specific styles
8. Copied all 17 image assets from resumechallenge
9. Created GCP deployment configs: Dockerfile + nginx.conf (Cloud Run), firebase.json (Firebase Hosting), cloudbuild.yaml
10. Committed and pushed to gfsincere/MeMyselfandEye

## Pending / Next Steps
- **Deploy to GCP** — set up Firebase project or Cloud Run service, map gregoriethomas.com
- **Blog persistence** — currently static data; needs Firebase Firestore or similar backend for saving posts
- **Gallery upload** — currently static images in public/; needs upload mechanism (Cloud Storage + admin UI)
- **Notion MCP** — not configured in Cursor; once added, can pull/update Greg's resume challenge project page for tracking
- **Additional features Greg mentioned**: Spotify "what I'm listening to" module, bug bounty checklist from Notion
- **Content updates**: Replace sample blog post with real content, add more projects

## Known Issues
- `.firebaserc` project ID (`gregoriethomas-site`) is a placeholder — needs to match actual GCP project
- `cloudbuild.yaml` region set to `us-central1` — Greg is in NZ, may want `australia-southeast1` or similar
- Blog editor saves to console.log only — no persistence layer yet
