# BeyondStride — 3D/4D Spatial Edition (Framer Framework)

An ultra-luxury, high-performance athletic performance landing experience inspired by and engineered beyond **Beyond Strats** (`beyondstrats.com`). Built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

---

## 3D/4D Visual & Interactive Architecture

### 1. Spatial Interactive Canvas (`SpatialCanvas.tsx`)
- Native 3D perspective point-cloud and kinetic vector mesh running on `requestAnimationFrame`.
- Proximity-based dynamic force vectors linking points in 3D coordinate space.
- Mouse gravity and vortex attraction reacting smoothly to cursor movement.

### 2. Multi-Layer 3D Gyroscopic Hero Card (`Interactive3DHeroCard.tsx`)
- Smooth cursor tilt physics (`rotateX`, `rotateY`, `scale: 1.02`) with spring physics.
- `preserve-3d` spatial depth layering:
  - **Layer -40px**: Orbiting caustic rings and rotating dashed compass.
  - **Layer 0px**: Architectural glass panel with crosshairs and GPS coordinates.
  - **Layer +35px**: Iconic -15° BeyondStride kinetic monogram with live trajectory curve.
  - **Layer +75px**: Floating spatial chips (`[ 73.4% Kinetic Return ]`, `[ 0.00g Friction ]`).
  - **Interactive Mode Switcher**: Toggle between "Biotech" and "Aero" visualization modes.
  - **Specular Gloss Reflection**: Dynamic cursor-following radial highlight.

### 3. Editorial Luxury Navigation (`Navbar.tsx`)
- Floating pill dock with glassmorphism blur (`backdrop-filter: blur(16px)`).
- **Live Timezone Clock**: Real-time ticking clock with detected user GMT offset (signature BeyondStrats feature).
- Genesis waitlist status beacon with animated pulse ring.
- Magnetic action button with spring hover physics.

### 4. Interactive Bento Grid Submersion (`BentoShowcase.tsx`)
- **Module 01 (Biomechanical Telemetry)**: Interactive SVG ground reaction force curve with scrub points across 0k–42k marathon milestones.
- **Module 02 (0g Fabric Intelligence)**: Tactile micro-weave simulation, -2.4°C microclimate telemetry, and tensile metrics.
- **Module 03 (Genesis Batch Allocation)**: Live category selector (Endurance, Club, Hybrid) with animated progress bar (`412 / 500 Claimed`).
- **Module 04 (48h Production & Logistics)**: Three-stage timeline from biomechanical fit to trackside priority dispatch.

### 5. Kinetic Text Box & Form (`WaitlistForm.tsx`)
- Frosted glass input capsule with focus glow.
- Real-time live format verification badge.
- Dual-arrow magnetic button transition.
- Celebratory confetti burst via `canvas-confetti` upon priority slot reservation.
- Generated pass number assignment: `PASS #412`.

### 6. Obsidian Dark Mode Manifesto (`ManifestoSection.tsx`)
- Editorial typography pairing `Plus Jakarta Sans` with `Playfair Display` luxury italic.
- High-contrast telemetry counter cards (`73%`, `0g`, `500`, `+15°`).
- Three discipline pillar cards with interactive hover elevation.

---

## Running the Application

```bash
# Start development server
npm run dev

# Production build
npm run build
```

Live on **http://localhost:3000**.
