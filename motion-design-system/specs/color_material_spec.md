# COLOR & MATERIAL SPECIFICATION
## Exact Shader Values for Blender / Three.js Implementation

---

## PALETTE — SINGLE SOURCE OF TRUTH

| Token | Hex | sRGB | Linear (Blender) | Usage |
|-------|-----|------|------------------|-------|
| `deep-ink` | `#0B1114` | (11, 17, 20) | (0.0018, 0.0043, 0.0059) | Background, void |
| `petrol-teal` | `#087F8C` | (8, 127, 140) | (0.0010, 0.254, 0.310) | **Primary brand**, key lines, neural emission |
| `seafoam` | `#A8E6CF` | (168, 230, 207) | (0.376, 0.787, 0.616) | Secondary accents, data particles |
| `bone` | `#F1EDE3` | (241, 237, 227) | (0.876, 0.847, 0.772) | Product surfaces, light fills |
| `graphite` | `#242C30` | (36, 44, 48) | (0.019, 0.029, 0.035) | Wireframe, technical lines, secondary text |
| `brushed-brass` | `#B99A5B` | (185, 154, 91) | (0.475, 0.328, 0.114) | **LIMITED** — final R outline, hairline only |

---

## MATERIAL DEFINITIONS

### 1. MATTE_BONE_PRODUCT
**Used for**: Phone, Dashboard, Server (Act 3)
```glsl
// Blender Principled BSDF / Three.js MeshStandardMaterial
Base Color:     bone (#F1EDE3)          // Linear: 0.876, 0.847, 0.772
Roughness:      0.90
Metalness:      0.00
Subsurface:     0.05
Subsurface Radius: 1.0, 0.2, 0.1
Subsurface Color: bone (slightly warmer)
Clearcoat:      0.05
Clearcoat Roughness: 0.1
```
**Chamfer Highlight**: Separate edge geometry with `BRASS_RIM` material (see below)

---

### 2. GRAPHITE_WIREFRAME
**Used for**: Lattice edges, curve control points (Acts 1–2)
```glsl
// Emission-based for crisp lines
Emission:       graphite (#242C30)      // Linear: 0.019, 0.029, 0.035
Emission Strength: 3.0
// Render as: Lines (not mesh), thickness 0.5px world space
// Or: Thin cylinder mesh, radius 0.0025 world units
```

---

### 3. PETROL_PRIMARY_LINE
**Used for**: Initial bezier curve, primary structural lines (Act 1)
```glsl
Emission:       petrol-teal (#087F8C)   // Linear: 0.0010, 0.254, 0.310
Emission Strength: 5.0
// Thickness: 1.0px world space (thicker than wireframe)
```

---

### 4. PETROL_NEURAL_PATH
**Used for**: Glowing neural pathways (Act 4)
```glsl
// Animated emission — driven by pulse uniform
Emission:       petrol-teal (#087F8C)
Emission Strength: pulse(t) * 15.0      // pulse(t) = 0.5 + 0.5*sin(4π*t)
Roughness:      0.0
Metalness:      1.0
// Bloom threshold: 0.8 (post-process)
// Bloom intensity: 0.3
// Thickness: 0.8px world space
```

---

### 5. SEAFOAM_DATA_PARTICLE
**Used for**: Flowing data dots (Act 4)
```glsl
Base Color:     seafoam (#A8E6CF)       // Linear: 0.376, 0.787, 0.616
Emission:       seafoam
Emission Strength: 8.0
Roughness:      0.1
Metalness:      0.0
Size:           0.008 world units (screen-space constant via shader)
// Trail: Fade over 0.5s, Seafoam→transparent
```

---

### 6. BRASS_RIM (Chamfer Highlight)
**Used for**: 0.2mm chamfer edges on products (Act 3), Isometric R outline, final hairline (Act 5)
```glsl
Base Color:     brushed-brass (#B99A5B) // Linear: 0.475, 0.328, 0.114
Roughness:      0.30
Metalness:      0.85
Anisotropy:     0.80
Anisotropy Rotation: 0.25 (45°)
// Clearcoat for extra pop
Clearcoat:      0.2
Clearcoat Roughness: 0.05
```

---

### 7. ISOMETRIC_R_FACE
**Used for**: Isometric R logomark face (Act 5)
```glsl
Base Color:     bone (#F1EDE3)
Roughness:      0.85
Metalness:      0.0
Subsurface:     0.03
// Outline: BRASS_RIM material on edge geometry
```

---

### 8. DEEP_INK_VOID
**Used for**: World background, shadow catcher
```glsl
Base Color:     deep-ink (#0B1114)
Roughness:      1.0
Metalness:      0.0
// Receive shadows only, no direct lighting visible
```

---

## LIGHTING RIG — EXACT VALUES

### KEY_LIGHT (Area Light)
```
Type:           Rectangular Area
Size:           4.0 × 2.67 (3:2 aspect)
Position:       (3.5, 2.5, 4.0)  // 45° left, 30° up from center
Rotation:       Look at (0, 0, 0)
Color:          #FFF8F0 (warm white, 4800K)
Linear Color:   (0.99, 0.96, 0.93)
Power:          120 W
Spread:         90°
// Casts shadows: YES
// Shadow softness: 0.15
```

### RIM_LIGHT (Line/Area Light)
```
Type:           Line (or narrow Area 0.2 × 4.0)
Position:       (-3.0, -0.5, 2.0)  // Right, slightly down
Rotation:       Look at (0, 0, 0)
Color:          petrol-teal (#087F8C)
Linear Color:   (0.0010, 0.254, 0.310)
Power:          18 W  (15% of key)
Spread:         30°
// Casts shadows: NO
// Only affects: BRASS_RIM, ISOMETRIC_R_FACE, PETROL_NEURAL_PATH
```

### FILL_HDRI (World Environment)
```
Type:           World Shader / Environment Texture
HDRI:           Custom 2-color gradient (procedural)
Nadir (down):   #0F141A  (cool, Linear: 0.008, 0.017, 0.026)
Zenith (up):    #1A1610  (warm, Linear: 0.026, 0.019, 0.010)
Strength:       0.4
// No visible HDRI in reflections — only ambient occlusion contribution
```

---

## POST-PROCESS (BLENDER COMPOSITOR / THREE.JS EFFECTCOMPOSER)

### BLOOM (UnrealBloomPass)
```
Threshold:      0.85
Strength:       0.30
Radius:         0.4
// Only PETROL_NEURAL_PATH and SEAFOAM_DATA_PARTICLE exceed threshold
```

### COLOR GRADING (Optional, subtle)
```
Lift:           deep-ink * 0.02
Gamma:          1.02
Gain:           1.0
// Maintains Deep Ink blacks, prevents washed-out look
```

### VIGNETTE (Subtle)
```
Amount:         0.15
Midpoint:       0.5
Roundness:      1.0
Feather:        0.5
Color:          deep-ink
```

---

## RENDER SETTINGS (BLENDER EEVEE NEXT / CYCLES)

### EEVEE Next (Recommended for 300 frames)
```
Samples:        64 (adaptive)
Shadow Cubemap: 512
SSR:            ON (half-res, 0.5 thickness)
SSGI:           ON (8 bounces, 0.5 radius)
Volumetrics:    OFF (no volumetrics needed)
Motion Blur:    OFF (critical — frames are discrete)
Color Space:    sRGB (output), Linear (internal)
File Format:    WebP
Quality:        85
Compression:    Lossy
```

### Cycles (If photorealism needed)
```
Samples:        128 (denoised)
Denoiser:       OIDN
Max Bounces:    8 (diffuse), 4 (glossy), 8 (transmission)
Caustics:       OFF
```

---

## GEOMETRY SPECIFICS

### CHAMFER DETAIL (Critical for "manufactured" feel)
```
All product hard edges: 0.2mm chamfer (0.002 world units)
Chamfer faces: BRASS_RIM material
Chamfer width: Exactly 2 segments
// This catches RIM_LIGHT → defines silhouette
```

### ISOMETRIC GRID (Act 2)
```
Line color:     graphite (#242C30) at 0.15 opacity
Line thickness: 0.25px world
Spacing:        0.5 world units
Angle:          30° (true isometric)
Extent:         6×6 world units from center
Fade in:        Frames 91–105 (opacity 0→0.15)
```

### CAMERA (Orthographic)
```
Type:           Orthographic
Scale:          4.5 (fits 1280×720 at 16:9 with padding)
Position:       (0, 0, 10)
Rotation:       (0, 0, 0) — looking down -Z
Near:           0.1
Far:            100
// NO ANIMATION — fixed for all 300 frames
```

---

## UNIFORMS FOR SHADER ANIMATION (THREE.JS / BLENDER DRIVERS)

| Uniform | Type | Range | Drives |
|---------|------|-------|--------|
| `u_frame` | int | 1–300 | All frame-dependent logic |
| `u_progress` | float | 0.0–1.0 | Overall timeline (frame/300) |
| `u_act_progress` | float | 0.0–1.0 | Progress within current act |
| `u_pulse` | float | 0.0–1.0 | `0.5 + 0.5*sin(4π*u_progress*10)` for Act 4 |
| `u_branch_gen` | int | 0–3 | Wireframe generation (Act 2) |
| `u_surface_amt` | float | 0.0–1.0 | Wireframe→surface blend (Act 3) |
| `u_converge` | float | 0.0–1.0 | Network collapse→R form (Act 5) |
| `u_hairline_draw` | float | 0.0–1.0 | Tagline hairline draw (Act 5, frames 271–290) |

---

## FILE NAMING CONVENTION
```
blender/
  reditus_story.blend           # Main file
  assets/
    materials.blend             # Linked material library
    rig.blend                   # Linked light/camera rig
  geometry_nodes/
    branching_system.blend      # Recursive branching GN
    neural_paths.blend          # Path generation GN
    converge_system.blend       # Collapse→R formation GN
  renders/
    frames/
      frame_0001.webp
      ...
      frame_0300.webp
  scripts/
    render_frames.py            # Batch render script
    export_manifest.py          # Generate manifest.json
```