# Hatim Soni — React portfolio

A responsive React + TypeScript portfolio with a CSS 3D illustration, filterable project section, CV download, experience timeline, and Web3Forms contact integration.

## Run locally

```sh
npm install
npm run dev
```

Open the URL Vite prints. This project requires a development server; opening index.html directly will not render TSX.

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory to any static host (such as Netlify). Use `npm run build` as the build command and `dist` as the publish directory.

## Connect the contact form

1. Obtain your access key from https://web3forms.com/.
2. Copy `.env.example` to `.env.local`.
3. Set `VITE_WEB3FORMS_ACCESS_KEY` to your key and restart Vite.
4. For deployment, set the same environment variable on your host and rebuild.

Web3Forms access keys are intended to be used in browser forms. Do not put private API credentials in VITE environment variables. The form includes HTML validation, a honeypot, pending/success/error states, and a request timeout. Without a key, it explains that the form is not connected and provides a direct email link; it never reports a successful submission.

Integration reference: https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/simple-react-contact-form

## Add your projects

Edit `src/projects.ts`, the shared source for both pages. It includes the 13 web projects and FMB Connect Android app supplied by Hatim. Set `featured: true` to show a project on the homepage. Each record contains a category, description, stack tags, feature list, live URL (optional), accent color, and typographic cover initials.

`src/ProjectCard.tsx` renders shared project cards. Covers are designed title graphics, not screenshots of the live websites. No app download URL is assumed for FMB Connect; add its URL when available.

The homepage displays six selected projects. “More projects” navigates to `/projects.html`, a separate page with all 14 projects, category filters, technology/name search, and an empty state. `src/projects-main.tsx` implements this page. Vite builds both HTML entry points, so direct navigation and refresh work on static hosting without rewrite rules. Deploy the entire `dist` directory.

Personal copy and links live in `src/main.tsx`; design styles live in `src/styles.css`. The original CV is served at `public/Hatim-Mustafa-Soni-CV.pdf`. Fonts load from Google Fonts, with local sans-serif fallbacks. Reduced-motion preferences are respected.

The legacy `styles.css`, `script.js`, and `README.txt` are retained for reference and are not used by the React app.

## Visitor features

- Each project has a native, keyboard-accessible details dialog with its features, stack, live link (when supplied), and a prefilled email enquiry link. Escape closes the dialog and returns focus to its trigger.
- The homepage includes services, an expandable FAQ, and a copy-email action with an explicit fallback when clipboard access is unavailable.
- The projects page stores search/category filters in its URL. Share or reload that URL to restore the view. Press `/` or Ctrl/Cmd+K to focus search, and Escape in the search box to clear it.
- Both pages support light/dark mode, remember the visitor's selection, and default to dark mode until a selection is made.
