# REDITUS 3D MOTION DESIGN SYSTEM — MASTER SPECIFICATION
## Protocol: SPECIFY → VERIFY → ENVIRONMENT

---

## 🎯 PROJECT MISSION
Create a **10-second scroll-scrub frame sequence** (300 frames @ 30fps) that tells the REDITUS agency story:
**From ideas → to possibilities** — using the brand's exact visual language (Petrol × Seafoam × Bone, Isometric R, ASCII/Terminal aesthetic).

**Output**: WebP frame sequence (1280×720) + React `FrameSequencePlayer` component + Blender source files + Integration guide.

---

## 📐 BRAND CONSTRAINTS (NON-NEGOTIABLE)

### Color Palette — ONLY THESE 5 HUES
| Role | Hex | Usage |
|------|-----|-------|
| Deep Ink | `#0B1114` | Background, dark sections |
| Petrol Teal | `#087F8C` | **Primary brand**, key highlights, CTAs |
| Seafoam | `#A8E6CF` | Secondary accents, illustrations, hover |
| Bone | `#F1EDE3` | Light backgrounds, cards, whitespace |
| Graphite | `#242C30` | Secondary text, borders, technical lines |
| Brushed Brass | `#B99A5B` | **Extremely limited** — special labels only |

### Typography
- **Headlines**: Space Grotesk (variable weight)
- **UI/Body**: Inter
- **ASCII/Technical**: JetBrains Mono

### Visual Language
- Isometric perspective (30° angle)
- Thin technical lines (0.5–1px)
- Architectural/blueprint aesthetic
- ASCII/terminal decorative elements
- Dotted grids, coordinate marks, construction lines
- **NO**: gradients, glassmorphism, photorealistic 3D, particles, glowing effects

---

## 🎬 STORYBOARD — 10 SECONDS / 300 FRAMES

| Time | Frames | Scene | Visual Description |
|------|--------|-------|-------------------|
| 0:00–0:02 | 1–60 | **DETECT** | Single bezier curve draws center-out (Petrol on Deep Ink). ASCII: `>_ INIT_SYSTEM [████████░░] 82%` |
| 0:02–0:04 | 61–120 | **BRANCH** | Curve bifurcates recursively → wireframe lattice expands (Fibonacci branching). Isometric grid emerges. |
| 0:04–0:06 | 121–180 | **STRUCTURE** | Wireframe surfaces → matte Bone product silhouettes (phone, dashboard, server). 0.2mm chamfers catch light. |
| 0:06–0:08 | 181–240 | **INTELLIGENCE** | Geometries flicker → edges become glowing Petrol neural pathways. Nodes pulse at 2Hz (sine wave). |
| 0:08–0:10 | 241–300 | **REALIZE** | All converges → centered Isometric R logomark. Gold hairline draws: `RETURN. REIMAGINE. REALIZE.` |

---

## ⚙️ TECHNICAL REQUIREMENTS

### Frame Sequence
- **Resolution**: 1280×720 (16:9)
- **Format**: WebP, quality 85
- **Naming**: `frame_0001.webp` → `frame_0300.webp`
- **Total size target**: <40 MB
- **Manifest**: `manifest.json` array of frame paths

### Camera
- **Projection**: Orthographic (parallel)
- **FOV equivalent**: 50mm
- **Position**: Fixed, center-frame
- **NO camera motion** — geometry transforms only

### Lighting (Three-Source Editorial Rig)
1. **Key**: Rectangular area, 45° left, 30° up, `#FFF8F0` (4800K)
2. **Rim**: Line light, right, 10° down, `#087F8C` (Petrol), 15% intensity
3. **Fill**: Ambient occlusion HDRI — cool `#0F141A` nadir, warm `#1A1610` zenith

### Materials
- **Matte Bone**: SSS 0.05, roughness 0.9
- **Graphite Wireframe**: Emission `#087F8C`, thickness 0.5px
- **Petrol Neural**: Emission `#087F8C`, bloom threshold high
- **Brass Accent**: Anisotropic 0.8, roughness 0.3 (only final 1.5s)

### Easing (Custom)
```
cubic-bezier(0.22, 1, 0.36, 1)  // ease-out-expo feel
```
- Wireframe growth: Accelerating (Fibonacci)
- Product solidification: Sigmoid
- Neural pulse: 2Hz sine oscillation
- Final lock: Overshoot 1.15× → settle 1.0

---

## 📦 DELIVERABLES PER AGENT

### Agent 1: CREATIVE DIRECTOR (Specify)
- [ ] `specs/storyboard_detailed.md` — Frame-by-frame breakdown with timing
- [ ] `specs/color_material_spec.md` — Exact shader values, node setups
- [ ] `specs/ascii_typography_spec.md` — ASCII elements per frame
- [ ] `specs/brand_compliance_checklist.md` — Verify against PRD

### Agent 2: 3D TECHNICAL ARTIST (Environment - Blender)
- [ ] `blender/reditus_story.blend` — Complete Blender file
- [ ] `blender/geometry_nodes_setup.md` — Procedural branching system
- [ ] `blender/render_pipeline.md` — Render settings, compositing
- [ ] `blender/frame_extraction_script.py` — Batch render 300 frames

### Agent 3: MOTION SYSTEMS ENGINEER (Environment - Web)
- [ ] `components/FrameSequencePlayer.tsx` — React component
- [ ] `components/FrameSequencePlayer.css` — Styles
- [ ] `components/useFrameSequence.ts` — Hook for frame logic
- [ ] `components/lazyFrameLoader.ts` — Lazy loading (±5 frames)
- [ ] `integration/GSAP_ScrollTrigger_setup.md` — Scrub config

### Agent 4: QUALITY VERIFIER (Verify)
- [ ] `verification/frame_quality_report.md` — Visual consistency check
- [ ] `verification/brand_compliance_report.md` — Palette, typography, style
- [ ] `verification/performance_benchmarks.md` — Load time, memory, FPS
- [ ] `verification/accessibility_audit.md` — Reduced motion, contrast

### Agent 5: INTEGRATION ENGINEER (Environment - Codebase)
- [ ] `integration/HeroStorySection.tsx` — Drop-in Hero replacement
- [ ] `integration/story_page_route.tsx` — `/story` page
- [ ] `integration/asset_pipeline.md` — Vite/public folder setup
- [ ] `integration/README.md` — How to deploy

---

## 🔄 COMMUNICATION PROTOCOL

### Message Format (JSON)
```json
{
  "from": "agent_id",
  "to": "agent_id|broadcast",
  "phase": "specify|verify|environment",
  "type": "deliverable|question|approval|blocker",
  "payload": {},
  "timestamp": "ISO8601"
}
```

### Shared Communication Folder
`motion-design-system/communication/`
- `messages.jsonl` — Append-only message log
- `shared_state.json` — Current phase, blockers, approvals
- `asset_registry.json` — Track all generated assets

### Phase Gates
| Phase | Gate | Required Approvals |
|-------|------|-------------------|
| SPECIFY → ENVIRONMENT | Creative Director approves specs | CD + QA |
| ENVIRONMENT → VERIFY | All assets delivered | 3D Artist + Motion Eng + Integration |
| VERIFY → COMPLETE | QA signs off | QA + CD |

---

## ⏱️ TIMELINE
- **Phase 1 (Specify)**: 30 min — Creative Director produces specs
- **Phase 2 (Environment)**: 60 min — 3D Artist + Motion Eng + Integration work in parallel
- **Phase 3 (Verify)**: 30 min — QA reviews, requests fixes
- **Phase 4 (Finalize)**: 15 min — Fixes applied, final delivery

---

## 🚨 BLOCKER ESCALATION
If any agent is blocked >10 min:
1. Post to `communication/messages.jsonl` with `type: "blocker"`
2. Tag `@CREATIVE_DIRECTOR` and `@QA_VERIFIER`
3. Wait for unblocking decision

---

## ✅ DEFINITION OF DONE
All deliverables exist in `output/` folders, verified by QA, integrated into codebase, and `communication/shared_state.json` shows `"status": "COMPLETE"`.