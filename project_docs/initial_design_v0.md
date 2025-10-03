Read pasted-text.txtThought for 7s### Design Concepts for Musée des Civilisations Noires

I'll propose three distinct experiential concepts that break from traditional landing page structures while honoring the museum's cultural significance:

## Concept 1: "The Infinite Gallery Scroll"

**Core Experience:** A continuous vertical journey through time and space

**Technical Approach:**

- **Lenis smooth scroll** + **GSAP ScrollTrigger** for buttery parallax
- **Three.js** for 3D artifact models that float and rotate as you scroll
- **Canvas-based particle system** representing cultural connections across the diaspora


**Visual Flow:**

1. **Entry Portal** - Dark void with a single illuminated artifact spinning slowly, text fades in: "4 continents. 1 heritage. Infinite stories."
2. **Scroll Revelation** - As you scroll, artifacts emerge from darkness in a staggered 3D space, each with subtle ambient lighting
3. **Interactive Nodes** - Hover over artifacts to see cultural connections drawn as light threads between pieces
4. **Immersive Transitions** - Scroll sections morph between museum galleries using WebGL shaders (dissolve/ripple effects)
5. **Call to Action** - Natural integration: "Begin your journey" appears as the final artifact in the scroll sequence


**Minimalist Touch:** Black background, white/gold accents, generous whitespace, single serif typeface (Cormorant or similar), no UI chrome until needed

---

## Concept 2: "The Living Archive"

**Core Experience:** An interactive grid that breathes and responds to user exploration

**Technical Approach:**

- **WebGL shader-based grid** with displacement mapping
- **Cursor-reactive particles** using custom fragment shaders
- **Smooth state transitions** with Framer Motion
- **Audio-reactive elements** (subtle ambient soundscape)


**Visual Flow:**

1. **Awakening** - Grid of blurred artifact thumbnails pulses gently like a heartbeat
2. **Exploration** - Mouse movement creates ripples across the grid, revealing artifacts in focus
3. **Discovery** - Click any artifact → entire grid morphs into an immersive detail view with 3D model, audio narration auto-plays
4. **Navigation** - Swipe gestures or arrow keys to flow between artifacts, grid reforms in background
5. **Depth Layers** - Background shows faint cultural patterns (Adinkra symbols, Kente patterns) that shift with scroll


**Minimalist Touch:** Monochromatic base with single accent color (terracotta/gold), typography appears only on interaction, generous negative space

---

## Concept 3: "The Portal Experience"  *Recommended*

**Core Experience:** A cinematic WebGL journey that feels like entering the museum itself

**Technical Approach:**

- **Three.js scene** with camera movement along a spline path
- **GLTF 3D models** of key artifacts positioned in virtual space
- **Post-processing effects** (bloom, depth of field, chromatic aberration)
- **Lenis scroll** controlling camera position through the 3D scene
- **GLSL shaders** for material effects (gold leaf, bronze patina, fabric textures)


**Visual Flow:**

1. **The Entrance** (0-10% scroll)

1. Camera starts outside, facing museum doors
2. Doors slowly open revealing golden light
3. Text overlay: "Musée des Civilisations Noires"



2. **The Corridor** (10-40% scroll)

1. Camera glides through a minimalist corridor
2. Artifacts float in glass cases on either side
3. Subtle ambient audio (footsteps, distant voices)
4. Key stats appear as floating text: "4 continents", "10,000+ artifacts", "1 heritage"



3. **The Gallery** (40-70% scroll)

1. Camera enters main gallery space
2. Artifacts arranged in a circular formation
3. Each artifact has a hotspot - hover to see name/era
4. Click to "approach" (camera zooms, detail panel slides in)



4. **The Connection** (70-90% scroll)

1. Camera pulls back to reveal all artifacts connected by light threads
2. Map of Africa appears, showing cultural connections
3. Text: "Scan. Listen. Discover. From anywhere."



5. **The Invitation** (90-100% scroll)

1. Camera exits to exterior view at sunset
2. QR code appears: "Start your journey"
3. Simple footer with hackathon info, language selector





**Minimalist Touch:**

- Neutral color palette (cream, charcoal, gold accents)
- Single elegant serif for headings (Freight Display)
- Sans-serif for body (Inter or Söhne)
- No traditional UI elements - everything contextual
- Generous use of darkness and light contrast


---

## Technical Stack Recommendation

```plaintext
Core:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4

3D/Animation:
- Three.js + React Three Fiber
- @react-three/drei (helpers)
- @react-three/postprocessing
- GSAP + ScrollTrigger
- Lenis (smooth scroll)

Performance:
- Lazy loading for 3D models
- Progressive enhancement
- Mobile-first with simplified 3D on mobile
- Preload critical assets
```