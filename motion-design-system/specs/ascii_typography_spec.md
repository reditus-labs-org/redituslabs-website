# ASCII & TYPOGRAPHY SPECIFICATION
## Terminal/ASCII Visual System — Frame-Accurate

---

## TYPOGRAPHY SYSTEM

### Font Stack (CSS / Blender Text Objects)
```css
/* Headlines, UI labels */
--font-display: 'Space Grotesk', sans-serif;  /* Variable: wght 300–700 */

/* Body, UI, descriptions */
--font-ui: 'Inter', sans-serif;               /* Variable: wght 400–600 */

/* ASCII, terminal, technical metadata, code */
--font-mono: 'JetBrains Mono', monospace;     /* Variable: wght 400–700 */
```

### Font Weights (Variable Font Settings)
| Usage | Font | Weight (wght) | Size | Tracking |
|-------|------|---------------|------|----------|
| Hero headlines | Space Grotesk | 700 (Bold) | clamp(2.8rem, 4.8vw, 4.4rem) | +0.03em |
| Section titles | Space Grotesk | 600 (SemiBold) | clamp(1.5rem, 2.5vw, 2.2rem) | +0.02em |
| UI labels / CTAs | Inter | 500 (Medium) | 0.875rem | +0.05em |
| Body text | Inter | 400 (Regular) | 1rem | 0 |
| Terminal prompt (`>_`) | JetBrains Mono | 500 | 0.875rem | 0 |
| Terminal output | JetBrains Mono | 400 | 0.8125rem | 0 |
| ASCII art / diagrams | JetBrains Mono | 400 | 0.75rem | 0 |
| Metadata / labels | JetBrains Mono | 400 | 0.6875rem | +0.18em |
| Hairline tagline | Space Grotesk | 300 (Light) | 0.95rem | +0.18em |

---

## ASCII ELEMENTS — PER FRAME SPECIFICATION

### ACT 1: DETECT (Frames 1–60)

| Frame | Element | Content | Animation | Position |
|-------|---------|---------|-----------|----------|
| 5–60 | Terminal Prompt | `>_ INIT_SYSTEM` | Fade in (frames 5–10), then hold | Bottom-left, 5% margin |
| 15–60 | Progress Bar | `[████░░░░░░] 40%` | Bar fills linear, % updates | Below prompt |
| 30–60 | Progress Bar | `[████████░░] 82%` | Updates at frame 30 | Same |
| 45–60 | Status Line | `:: POSSIBLE` | Letter reveal, 50ms/char | Below bar |
| 55–60 | Status Line | `:: PROCESS` | Letter reveal | Below |

**Styling**:
- Prompt: `color: petrol-teal; opacity: 0.9;`
- Progress bar: `color: graphite; background: deep-ink; border: 1px solid petrol-teal;`
- Status lines: `color: seafoam; opacity: 0.7; letter-spacing: 0.1em;`

---

### ACT 2: BRANCH (Frames 61–120)

| Frame | Element | Content | Animation | Position |
|-------|---------|---------|-----------|----------|
| 65–120 | Terminal Prompt | `> BRANCHING...` | Ellipsis cycles (500ms period) | Bottom-left |
| 80–120 | Progress Bar | `[████████████░░] 60%` | Fills to 60% | Below prompt |
| 95–120 | Status Line | `:: STRUCTURE` | Letter reveal | Below bar |
| 110–120 | Progress Bar | `[████████████████] 100%` | Fills to 100% | Same |
| 118–120 | Terminal Prompt | `>_ LATTICE_READY` | Fade in, hold | Bottom-left |

**Styling**: Same as Act 1. Ellipsis: `.` → `..` → `...` → (repeat).

---

### ACT 3: STRUCTURE (Frames 121–180)

| Frame | Element | Content | Animation | Position |
|-------|---------|---------|-----------|----------|
| 125–140 | Product Label | `> PRODUCT_01: MOBILE` | Fade in, hold | Near phone (left) |
| 140–155 | Product Label | `> PRODUCT_02: DASHBOARD` | Fade in, hold | Near dashboard (center) |
| 155–170 | Product Label | `> PRODUCT_03: SERVER` | Fade in, hold | Near server (right) |
| 170–180 | Build Status | `[BUILD: 3/3 COMPLETE]` | Counter: 1/3 → 2/3 → 3/3 | Bottom-center |
| 178–180 | Terminal Prompt | `>_ AWAITING_INTELLIGENCE` | Fade in | Bottom-left |

**Product Label Styling**:
- `font-family: JetBrains Mono; font-size: 0.6875rem; color: petrol-teal; opacity: 0.8;`
- Positioned in 3D space, billboarded to camera
- Connect to product with thin Graphite leader line (0.25px)

---

### ACT 4: INTELLIGENCE (Frames 181–240)

| Frame | Element | Content | Animation | Position |
|-------|---------|---------|-----------|----------|
| 185–240 | Terminal Prompt | `> NEURAL_PATHWAYS_FORMING` | Hold | Bottom-left |
| 200–240 | Status Line | `:: CONNECTION_ESTABLISHED` | Letter reveal, then pulse (opacity 0.7↔1.0, 2Hz) | Below prompt |
| 215–235 | Live Counter | `[PULSE: 2.0Hz]` | Updates every frame | Bottom-center |
| 230–240 | Status Line | `> DATA_FLOW: ACTIVE` | Fade in, hold | Below counter |
| 238–240 | Terminal Prompt | `>_ CONVERGENCE_IMMINENT` | Fade in, urgent (blink 1Hz) | Bottom-left |

**Pulse Counter Styling**:
- `font-family: JetBrains Mono; font-size: 0.75rem; color: petrol-teal;`
- Monospace digits (tabular-nums)
- Background: `deep-ink` at 0.8 opacity, rounded 4px, padding 0.25rem 0.5rem

---

### ACT 5: REALIZE (Frames 241–300)

| Frame | Element | Content | Animation | Position |
|-------|---------|---------|-----------|----------|
| 245–260 | Terminal Prompt | `> CONVERGING...` | Ellipsis cycles (300ms — faster) | Bottom-left |
| 260–300 | System Status | `>_ REDITUS_CORE_ONLINE` | Fade in, hold | Bottom-left |
| 275–300 | Tagline Word 1 | `RETURN.` | Letter reveal, 50ms/char, sync with hairline | Center-bottom, on hairline |
| 283–300 | Tagline Word 2 | `REIMAGINE.` | Letter reveal, 50ms/char | Same line |
| 287–300 | Tagline Word 3 | `REALIZE.` | Letter reveal, 50ms/char | Same line |
| 295–300 | Final Status | `STATUS: REALIZED` | Fade in, hold | Below tagline |

**Tagline Styling (Critical — Brand Signature)**:
```css
.tagline-hairline {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 300;  /* Light */
  font-size: clamp(0.875rem, 1.5vw, 1.125rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: brushed-brass;  /* #B99A5B — ONLY brass usage in animation */
  /* Hairline drawn by canvas/SVG, text sits on it */
}
```

**Hairline Drawing**:
- 1px line, `brushed-brass` color
- Draws left→right, synchronized with letter reveal
- Total draw duration: frames 271–290 (20 frames = 0.67s)
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

---

## ASCII ART COMPONENTS (Reusable, Decorative)

### 1. SYSTEM_STATUS_BOX (Decorative, appears in Hero/Final CTA)
```
┌─────────────────────┐
│ REDITUS_CORE        │
│                     │
│ > ENGINEERED        │
│ > INTELLIGENT       │
│ > RELIABLE          │
│                     │
│ STATUS: ONLINE      │
└─────────────────────┘
```
- Font: JetBrains Mono, 0.6875rem
- Color: Graphite lines, Petrol text, Seafoam "ONLINE"
- Border: 1px Graphite
- Animation: Cursor blink on `>_` (if present), character reveal on load

### 2. PIPELINE_FLOW (Process section, decorative)
```
IDEA
 │
 ▼
REIMAGINE
 │
 ▼
ENGINEER
 │
 ▼
OPTIMIZE
 │
 ▼
REALIZE
```
- Font: JetBrains Mono, 0.75rem
- Arrows: `│` `▼` in Petrol
- Labels: Graphite
- Animation: Sequential reveal top→bottom (200ms/step)

### 3. TERMINAL_BUILD (Vibe-Code Rescue section)
```
> initialize project

[████████████████] 100%

BUILD COMPLETE
```
- Font: JetBrains Mono, 0.8125rem
- Progress bar: Petrol fill, Graphite track
- Animation: Bar fills (2s), "BUILD COMPLETE" fades in

### 4. DECORATIVE_GRID (Background texture, subtle)
```
. . . . . . . . . .
: : : : : : : : : :
+---+---+---+---+
| R | E | D | I |
+---+---+---+---+
```
- Font: JetBrains Mono, 0.625rem
- Color: Graphite at 0.15 opacity
- Static (no animation) — pure texture

---

## CURSOR BLINK SPECIFICATION
```css
@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.cursor::after {
  content: '_';
  animation: cursor-blink 1s infinite steps(1);
  color: petrol-teal;
}
```
- Period: 1s (50% duty cycle)
- Character: `_` (underscore)
- Color: Petrol Teal `#087F8C`

---

## CHARACTER REVEAL TIMING
```javascript
// Per-character reveal
const CHAR_REVEAL_MS = 50;  // 50ms per character
const WORD_GAP_MS = 200;    // 200ms between words
const LINE_GAP_MS = 400;    // 400ms between lines

// Example: "RETURN." = 7 chars × 50ms = 350ms total
// Starts frame 275, ends frame 287 (at 30fps: 12 frames = 400ms ✓)
```

---

## REDUCED MOTION FALLBACKS
| Element | Reduced Motion Behavior |
|---------|------------------------|
| All ASCII animations | Show final state only (no reveal, no blink) |
| Progress bars | Show 100% complete |
| Status lines | Show full text, no letter reveal |
| Tagline hairline | Show fully drawn |
| Cursor blink | Static underscore (no blink) |
| Live counters | Show final value |

---

## IMPLEMENTATION NOTES FOR FRAMESEQUENCEPLAYER

### Overlay Layer (React, above Canvas)
```tsx
// Renders ASCII overlays synced to current frame
<ASCIIOverlay 
  frame={currentFrame} 
  act={currentAct}
  reducedMotion={prefersReducedMotion}
/>
```

### Frame → ASCII Mapping
```typescript
const asciiTimeline = [
  { start: 5, end: 60, element: 'terminal-prompt', content: '>_ INIT_SYSTEM' },
  { start: 15, end: 60, element: 'progress-bar', content: 40 },
  { start: 30, end: 60, element: 'progress-bar', content: 82 },
  { start: 45, end: 60, element: 'status-line', content: ':: POSSIBLE' },
  // ... all 300 frames mapped
];
```

### Canvas Text Rendering (If drawing in WebGL)
```glsl
// Bitmap font approach for JetBrains Mono
// Atlas: 96 chars × 2 (weights) = 192 glyphs
// Render as instanced quads, position synced to frame
```

---

## FILE OUTPUTS NEEDED
```
specs/
  ascii_typography_spec.md       # This file
  
assets/
  fonts/
    SpaceGrotesk-VF.woff2
    Inter-VF.woff2
    JetBrainsMono-VF.woff2
  
components/
  ASCIIOverlay.tsx               # React overlay component
  TerminalPrompt.tsx             # Reusable prompt
  ProgressBar.tsx                # Reusable progress
  TaglineHairline.tsx            # Final tagline + hairline
  
blender/
  text_objects.blend             # Pre-positioned text objects for each act
```