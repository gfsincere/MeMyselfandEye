# Me, Myself, and Eye

Personal site — React + Vue.js SPA with photo gallery, blog, resume, and project showcase.

## Local development (no Firebase)

The app runs **without Firebase** for testing and evaluation. All public pages work; login and admin require Firebase.

```bash
npm install
npm run dev
```

Open http://localhost:3000

- **Home, Resume, Gallery, Blog, Projects, About, Contact** — work out of the box
- **Login** — shows "Firebase not configured" (button disabled)
- **Admin** — requires login; login requires Firebase

## Firebase setup (for production)

1. Copy `.env.example` to `.env`
2. Add your Firebase project credentials
3. Restart the dev server

```bash
cp .env.example .env
# Edit .env with your Firebase config
npm run dev
```

## Build

```bash
npm run build
```

Output in `dist/`. Preview with `npm run preview`.

## Deploy (Firebase Hosting)

After Firebase is configured:

```bash
firebase deploy
```

## Deploy (Google Cloud)

See `Dockerfile` and `cloudbuild.yaml` for containerized deployment.
