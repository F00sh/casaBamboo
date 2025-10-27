# Repository Guidelines

## Project Structure & Module Organization
- `app/pages`: Route pages (e.g., `index.vue`).
- `app/components`: Reusable Vue components (PascalCase, e.g., `HeroSection.vue`).
- `app/layouts`: App layouts (e.g., `default.vue`).
- `app/assets`: Static styles and images (e.g., `assets/css/main.css`).
- `public`: Public assets served at root (e.g., `apartment-images.json`).
- `scripts`: Utility scripts (e.g., `scripts/scrape.cjs`).
- `nuxt.config.ts`: Nuxt config, head/meta, Tailwind Vite plugin.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server with HMR.
- `npm run build`: Production build.
- `npm run preview`: Preview the production build locally.
- `npm run generate`: Generate a static build.
- `npm run scrape:images`: Puppeteer scraper; writes `public/apartment-images.json`.
- `npm install`: Prepares Nuxt types via `postinstall`.

## Coding Style & Naming Conventions
- **Language**: Vue 3 SFCs with `<script setup lang="ts">` where applicable.
- **Indentation**: 2 spaces; avoid tabs.
- **Components**: PascalCase filenames and tags (e.g., `ApartmentsSection.vue`).
- **Pages/Routes**: Kebab-case route paths derived from filenames in `app/pages`.
- **Styling**: Tailwind CSS (utility-first) + `app/assets/css/main.css` for project-wide styles.
- **Imports**: Use `@/` alias for app source (e.g., `@/components/...`).

## Testing Guidelines
- No formal test suite yet. For changes, provide manual QA steps (URLs, expected behavior).
- If adding tests, prefer: unit (`vitest`), component (`@vue/test-utils`), e2e (Playwright).
- Keep test files near source as `*.spec.ts` and use descriptive names.

## Commit & Pull Request Guidelines
- **Commits**: Short, imperative subject (e.g., "add hero CTA"). Current history is minimal; Conventional Commits are welcome (e.g., `feat:`, `fix:`) but not required.
- **PRs**: Include summary, linked issues, screenshots for UI changes, and manual test notes. Mention any impact on `scripts/scrape.cjs` or `public/` outputs.
- **Scope**: Keep PRs focused and small; update docs when behavior or commands change.

## Security & Configuration Tips
- The scraper launches Puppeteer with `--no-sandbox`; verify this in CI containers. Set timeouts conservatively if pages change.
- Do not commit secrets. Public assets in `public/` are served as-is.

