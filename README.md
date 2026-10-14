# Reditus Labs � continuous landing page

A full-width, continuous landing page using the approved cream, petrol teal and Terminal orange identity. Sections: Hero, About, Mission, Capabilities, Process, Contact and footer. There is one header in the hero and no enclosing section cards.

## Run

Requires Node.js 22 or later.

```sh
npm ci
npm run dev
```

Production: `npm run build`. Deploy the contents of `dist/` to a static host.

## Subject motion

The hero uses a transparent three-layer mountain sprite and an independent textured orange sun. The explorer is part of his supporting summit layer so he remains grounded. GSAP controls different movement rates and a short desktop pinned sequence. About assembles four complementary collage pieces; the eye and service illustrations have their own reveals. The Process scene pins on desktop, progresses through four stages, and moves an orange marker along the road using MotionPath. A single explorer stays centered on the road. The Contact illustration settles into place independently.

Lenis is synchronized with GSAP. SplitText animates headline lines. Three.js adds restrained scroll-responsive atmosphere. Small screens use natural flow with shorter artwork reveals. Reduced-motion mode removes the cinematic animation. Artwork is decorative; all copy, navigation, and form fields are real HTML.

## Contact

The form validates the fields and opens a prefilled email draft to **redtiduslabs@gmail.com**, the address supplied. Visitors send through their email application. A direct email link is also provided. No automatic mail service or submission database is configured.

## Checks and preview

`npm run test` runs structural and isolated Chromium browser checks. Google Chrome must be installed for the browser checks. They cover five widths (320,375,768,1024,1440), horizontal overflow, one header, six sections, menu operation, anchor navigation, validation, actual mountain movement, two desktop pins, Process progress and JavaScript errors. Desktop/mobile and Process screenshots were visually reviewed and defects corrected.

`npm run inspect` opens a separate Chrome window via Playwright. It serves the production files through local request interception at reditus.test; this is a local preview, not a published address. Close that window to end the preview.

The design is adapted from the approved raster concept into a responsive, continuous landing page. It is not a pixel-for-pixel copy of the six-panel presentation board, nor a clone of the reference websites' proprietary effects.
