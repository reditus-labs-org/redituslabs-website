# DETAILED STORYBOARD — 300 FRAMES @ 30FPS
## REDITUS 10-Second Scroll-Scrub Sequence

---

### GLOBAL SETTINGS
- **Resolution**: 1280×720 (16:9)
- **Camera**: Orthographic, fixed position, 50mm equivalent FOV
- **Background**: Deep Ink `#0B1114` (solid)
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` — ease-out-expo
- **Lighting**: 3-source editorial rig (Key 45° left, Rim Petrol right, Fill HDRI)

---

## ACT 1: DETECT (Frames 1–60 | 0:00–2:00)
**Theme**: "From ideas" — Single intent emerging from void

| Frame Range | Geometry State | ASCII/Terminal Overlay | Key Visual Moment |
|-------------|----------------|------------------------|-------------------|
| 1–10 | Void. Single point at center. | `>_ INIT_SYSTEM` (fade in, frame 5) | System boot |
| 11–25 | Bezier curve draws center→out (Petrol `#087F8C`, 1px). Left branch first, then right. | `[████░░░░░░] 40%` (frame 15) | Intent forms |
| 26–40 | Curve completes full S-shape. Control points visible as Graphite `#242C30` dots. | `[████████░░] 82%` (frame 30) | Precision |
| 41–50 | Curve holds. Subtle glow pulse on endpoints (Petrol, 0.5s period). | `:: POSSIBLE` (frame 45, letter-by-letter) | Potential |
| 51–60 | Curve stabilizes. Ready to branch. | `:: PROCESS` (frame 55) | Transition |

**Animation Notes**:
- Curve drawing: `stroke-dashoffset` animation, linear in time
- Progress bar: Linear fill
- Text: Character reveal, 50ms/char
- Endpoint glow: Sine wave, amplitude 20% opacity

---

## ACT 2: BRANCH (Frames 61–120 | 2:00–4:00)
**Theme**: "Structure emerging" — Recursive bifurcation

| Frame Range | Geometry State | ASCII/Terminal Overlay | Key Visual Moment |
|-------------|----------------|------------------------|-------------------|
| 61–75 | Curve endpoints bifurcate → 2 branches each (4 total). Angle: ±30° from tangent. | `> BRANCHING...` (frame 65) | Division |
| 76–90 | Each branch bifurcates again → 8 branches. Fibonacci spacing (1,1,2,3,5,8...). | `[████████████░░] 60%` (frame 80) | Growth |
| 91–105 | 3rd generation → 16 branches. Isometric grid (30°) begins forming beneath. | `:: STRUCTURE` (frame 95) | Order |
| 106–115 | Wireframe lattice complete. 31 nodes, 30 edges. Graphite lines, 0.5px. | `[████████████████] 100%` (frame 110) | Completion |
| 116–120 | Lattice pulses once (scale 1.0→1.02→1.0). Nodes highlight sequentially. | `>_ LATTICE_READY` (frame 118) | Handoff |

**Animation Notes**:
- Branching: Recursive function, each generation completes before next
- Fibonacci timing: Generation n duration = Fib(n) × base_duration
- Grid: Fades in under lattice, opacity 0→0.15
- Node highlight: Sequential, 100ms delay, Petrol glow

---

## ACT 3: STRUCTURE (Frames 121–180 | 4:00–6:00)
**Theme**: "Digital products materializing" — Wireframe → solid

| Frame Range | Geometry State | ASCII/Terminal Overlay | Key Visual Moment |
|-------------|----------------|------------------------|-------------------|
| 121–135 | Lattice nodes become product anchors. 3 hero products emerge: Phone (left), Dashboard (center), Server (right). | `> PRODUCT_01: MOBILE` (frame 125) | Phone |
| 136–150 | Products surface: Matte Bone `#F1EDE3`, SSS 0.05. Chamfers 0.2mm catch rim light. Wireframe fades (opacity 1→0). | `> PRODUCT_02: DASHBOARD` (frame 140) | Dashboard |
| 151–165 | Products rotate slightly (±5°) to show dimensionality. Server rack details: slots, vents, cable ports. | `> PRODUCT_03: SERVER` (frame 155) | Server |
| 166–175 | Products settle into hero positions. Shadows cast (soft, HDRI-based). | `[BUILD: 3/3 COMPLETE]` (frame 170) | Arrival |
| 176–180 | Hold. Subtle idle breathing (scale 1.0↔1.005, 4s period). | `>_ AWAITING_INTELLIGENCE` (frame 178) | Anticipation |

**Animation Notes**:
- Surfacing: Sigmoid curve (slow start, fast middle, slow end)
- Rotation: Ease-out, stops at hero angle
- Chamfer highlight: Rim light catches 0.2mm edge — critical for "manufactured" feel
- Breathing: Shared sine wave, products phase-offset by 1.33s

---

## ACT 4: INTELLIGENCE (Frames 181–240 | 6:00–8:00)
**Theme**: "AI systems awakening" — Geometry becomes neural

| Frame Range | Geometry State | ASCII/Terminal Overlay | Key Visual Moment |
|-------------|----------------|------------------------|-------------------|
| 181–195 | Product edges fracture → glowing Petrol `#087F8C` paths. Nodes become pulse centers. | `> NEURAL_PATHWAYS_FORMING` (frame 185) | Transformation |
| 196–210 | Paths connect across products → unified network. Pulse wave travels: Phone→Dashboard→Server→Phone. | `:: CONNECTION_ESTABLISHED` (frame 200) | Unity |
| 211–225 | 2Hz pulse (sine, 30fps = 15 frames/cycle). Amplitude: emission 0→1→0. Bloom on Petrol paths. | `[PULSE: 2.0Hz]` (frame 215, live counter) | Rhythm |
| 226–235 | Data packets (tiny Seafoam `#A8E6CF` dots) flow along paths. Speed increases. | `> DATA_FLOW: ACTIVE` (frame 230) | Life |
| 236–240 | Network reaches critical mass. All products glow. Ready to converge. | `>_ CONVERGENCE_IMMINENT` (frame 238) | Climax |

**Animation Notes**:
- Fracture: Geometry displacement along normals, noise-based
- Pulse: `emission = sin(time × 4π) × 0.5 + 0.5` (0–1 range)
- Bloom: Post-process, threshold 0.8, intensity 0.3
- Data particles: 50 particles, Bezier paths, lifetime 2s

---

## ACT 5: REALIZE (Frames 241–300 | 8:00–10:00)
**Theme**: "Return. Reimagine. Realize." — Resolution

| Frame Range | Geometry State | ASCII/Terminal Overlay | Key Visual Moment |
|-------------|----------------|------------------------|-------------------|
| 241–255 | Network collapses inward (scale 1.0→0.3). Paths merge → single Isometric R forms at center. | `> CONVERGING...` (frame 245) | Collapse |
| 256–270 | Isometric R draws: vertical stem, then diagonal arm, then counter-curve. Brass `#B99A5B` outline. | `>_ REDITUS_CORE_ONLINE` (frame 260) | Mark |
| 271–280 | R settles (overshoot 1.15→1.0, spring). Hairline (1px, Brass) draws beneath: left→right. | `RETURN.` (frame 275, letter reveal) | Return |
| 281–290 | Hairline continues: `REIMAGINE.` (frame 283), `REALIZE.` (frame 287). | `REIMAGINE. REALIZE.` | Tagline |
| 291–300 | Final hold. R breathes (scale 1.0↔1.003). Subtle Petrol rim pulse (4s period). | `STATUS: REALIZED` (frame 295) | Complete |

**Animation Notes**:
- Collapse: Ease-in-expo (accelerating)
- R drawing: Stroke path animation, 3 segments sequential
- Overshoot: Spring(1, 80, 10) — mass 1, stiffness 80, damping 10
- Hairline: Draw speed matches letter reveal (50ms/char)
- Final breath: Shared with Hero section idle state

---

## FRAME MANIFEST STRUCTURE
```json
{
  "frames": [
    "frames/webp/frame_0001.webp",
    "frames/webp/frame_0002.webp",
    ...
    "frames/webp/frame_0300.webp"
  ],
  "metadata": {
    "fps": 30,
    "duration": 10,
    "totalFrames": 300,
    "resolution": [1280, 720],
    "acts": [
      {"name": "DETECT", "start": 1, "end": 60},
      {"name": "BRANCH", "start": 61, "end": 120},
      {"name": "STRUCTURE", "start": 121, "end": 180},
      {"name": "INTELLIGENCE", "start": 181, "end": 240},
      {"name": "REALIZE", "start": 241, "end": 300}
    ]
  }
}
```

---

## REDUCED MOTION FALLBACK
- Show only frame 300 (final REALIZE state)
- Static Isometric R + tagline
- No animation, no scroll binding