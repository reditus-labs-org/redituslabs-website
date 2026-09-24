# REDITUS website

Run `npm install`, then `npm run dev`. On Windows with PowerShell script restrictions, use `npm.cmd`.

`npm run build` runs TypeScript checking and creates the production site in `dist`.

The three reference layouts are at `#home`, `#approach`, and `#industries`. Shared navigation also accepts `#capabilities`, `#architectures`, `#cases`, `#insights`, and `#contact`, including on a fresh page load. Service, industry, article, architecture and solution detail pages have individual hash URLs. Browser back and forward are supported.

## Site owner configuration

Copy `.env.example` to `.env.local` and supply `VITE_CONTACT_ENDPOINT`. The endpoint must accept a JSON POST with `name`, `email`, and `message`, support the site's origin, and return a successful HTTP status only when the message is accepted. No secrets belong in Vite environment variables. Without an endpoint, the form preserves the user's text and explicitly reports that it has not sent the message.

Set `VITE_SOCIAL_LINKEDIN`, `VITE_SOCIAL_X`, `VITE_SOCIAL_YOUTUBE`, and `VITE_SOCIAL_INSTAGRAM` to the official profile URLs. The existing platform homepage links remain fallbacks until those URLs are supplied.

The supplied reference only defines three page layouts. Additional destination copy is an editorial starting point. The solution examples are explicitly labeled illustrative; approve the articles and replace provisional privacy/terms notes before publication. The story button opens a three-chapter visual story because no studio video was provided.

## Reference assets

Eleven matching scenes were reconstructed with built-in image generation and exported to `public/assets/images/4k/`. High-resolution assets remain in use for the completed hero, approach, and contact imagery.
