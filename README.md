# REDITUS website

Run `npm install`, then `npm run dev`. On Windows with PowerShell script restrictions, use `npm.cmd`.

`npm run build` runs TypeScript checking and creates the production site in `dist`.

The three reference layouts are at `#home`, `#approach`, and `#industries`. Shared navigation also accepts `#capabilities`, `#architectures`, `#cases`, `#insights`, and `#contact`, including on a fresh page load. Service, industry, article, architecture and solution detail pages have individual hash URLs. Browser back and forward are supported.

## Site owner configuration

Copy `.env.example` to `.env.local` and supply `VITE_CONTACT_ENDPOINT`. The endpoint must accept a JSON POST with `name`, `email`, and `message`, support the site's origin, and return a successful HTTP status only when the message is accepted. No secrets belong in Vite environment variables. Without an endpoint, the form preserves the user's text and explicitly reports that it has not sent the message.

Set `VITE_SOCIAL_LINKEDIN`, `VITE_SOCIAL_X`, `VITE_SOCIAL_YOUTUBE`, and `VITE_SOCIAL_INSTAGRAM` to the official profile URLs. The existing platform homepage links remain fallbacks until those URLs are supplied.

The supplied reference only defines three page layouts. Additional destination copy is an editorial starting point. The solution examples are explicitly labeled illustrative; approve the articles and replace provisional privacy/terms notes before publication. The story button opens a three-chapter visual story because no studio video was provided.

## Reference assets and verification

`refernce image/ChatGPT Image Sep 6, 2026, 05_44_15 PM.png` is the supplied 1024 × 1536 composite. The old `reference_*.jpg` crops are no longer used by the website. Eleven matching scenes were reconstructed with built-in image generation and exported to `public/assets/images/4k/`. Landscape masters are 3840 × 2160 and portrait masters are 2160 × 3840; these are high-quality bicubic exports from new 1672 × 941 / 941 × 1672 generated artwork, not native 4K generations or enlarged reference thumbnails. Responsive image sets select lighter versions for cards. Original generated artwork is preserved in `output/imagegen/`. The full prompts and generation provenance are recorded in `scripts/image-assets.json`; `scripts/export-image-assets.ps1` reproduces exports and `scripts/image-export-report.json` records source and output dimensions. High-resolution existing assets remain in use for the completed hero, approach and contact imagery.

`node scripts/verify-site.mjs` checks navigation, cross-page scroll alignment, carousels, form behavior, direct destinations, images, browser back, and mobile menu behavior against a running local server. It uses the existing Puppeteer dependency and installed Chrome; change its executable path for a different OS. It also captures the three main pages at desktop and mobile sizes.
