# System Patterns: MeMyselfandEye

## Architecture Pattern: React Shell + Vue Micro-Components
- **React** owns the app shell: routing, layout, navigation, and most page content
- **Vue** is used for interactive, stateful UI components that benefit from Vue's reactivity:
  - `PhotoGallery.vue` — IntersectionObserver-based scroll animations, lightbox state, keyboard event handling
  - `BlogEditor.vue` — two-way bound markdown editor with computed live preview
- **veaury** bridges the two: `applyVueInReact(VueComponent)` wraps a Vue component as a React component, props pass through naturally

## Routing
- `react-router-dom` v6 with nested routes under a `<Layout>` component
- Layout renders `<Navbar>` + `<Outlet>` (page content)
- Blog supports dynamic routes: `/blog/:slug` for individual posts

## Styling
- Single `main.css` file with CSS custom properties (design tokens)
- No CSS-in-JS, no preprocessor — plain CSS matching Greg's preference for understanding what's actually happening
- Vue components use `<style scoped>` for component-specific styles
- Responsive via media queries, not a utility framework

## State Management
- No global state library — page-level `useState` in React, `ref()`/`reactive()` in Vue
- Blog posts currently stored as static data in the Blog component (ready for backend integration)
- Gallery photos passed as props from React page to Vue component

## Build Pipeline
- Vite with veaury plugin (`type: 'react'` — React is primary, Vue files handled automatically)
- Production build outputs to `dist/` — static HTML/CSS/JS bundle

## Deployment Patterns
- **Static hosting** (Firebase Hosting): SPA with client-side routing, all paths rewrite to index.html
- **Containerized** (Cloud Run): nginx serves the static build, same SPA rewrite pattern
- Both configured and ready; Firebase is simpler for current needs, Cloud Run available if server-side features are added later
