# Me, Myself, and Eye (React + Vue + Vite)

Personal site app with:
- React routing/layout
- Vue-powered gallery and blog editor components (via Veaury)
- Optional Firebase auth, Firestore, and Storage for admin publishing

## Local setup

```bash
npm install
npm run dev
```

App runs without Firebase env vars for UI testing.

## Firebase-enabled setup (optional)

1. Copy env template:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in values in `.env.local`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

3. Restart the dev server.

When Firebase is configured:
- Google sign-in on `/login` is enabled.
- `/admin` can create/edit blog posts and upload gallery photos.

Without Firebase:
- Public pages still work.
- Login/admin flows show setup messaging instead of failing.

## Build check

```bash
npm run build
```

## Hosting notes

- `firebase.json` is already configured for SPA rewrites to `index.html`.
- `Dockerfile`, `nginx.conf`, and `cloudbuild.yaml` are present for container/cloud deployment paths.
