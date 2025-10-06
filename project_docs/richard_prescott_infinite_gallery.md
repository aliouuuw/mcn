Spatial Metaphor

The entire experience is a single vertical canvas, like an architectural shaft.

Each “section” (project or message) is spatially aligned along the Y-axis — but with depth cues (scaling, lighting, perspective) that make it feel 3D even though it’s a flat composition.

The scroll isn’t about moving between pages; it’s about descending deeper.

🎬 Motion Language

Scroll → Camera travel.
The scroll controls a virtual camera’s z/y movement (not the DOM position).

Continuous easing.
Smooth inertial motion (using Lenis, GSAP, or a custom lerp) creates a cinematic rhythm — it never feels like hard jumps between states.

Content fade-throughs.
Projects morph into one another — fading opacity, overlapping blend modes, and depth blur simulate transitions instead of abrupt cuts.

🧱 Structural Breakdown
Layer	Description	Tooling/Tech
Canvas Layer (Background)	A single WebGL or WebGPU surface where the parallax imagery, textures, and lighting gradients evolve with scroll.	Likely custom GLSL fragment shaders + Three.js planes.
Text Overlay Layer	Typography (project names, metadata) rendered as DOM or HTMLCanvas overlayed with mix-blend-mode.	Framer Motion / Lenis controlling fade, slide, opacity.
Scroll Manager	Smooth scroll mapping to camera Y-position and animation timelines.	Lenis, GSAP ScrollTrigger, or custom scroll proxy.
Interaction Layer	Click/hover triggers deeper detail animations, but without leaving the “shaft.”	Intersection observers + modal overlays.
🎨 Visual Style

Negative space as storytelling. Every project breathes; minimal UI noise.

Palette: Monochrome base (off-white or charcoal), accented by shifting tints per project (warm beige → cool blue, etc.).

Typography: Oversized but weightless — vertically aligned, fading like museum placards in space.

Depth cues: Parallax shadows, ambient gradients, and subtle vignetting enhance immersion.

No scrollbars or navbars. The experience is self-guided and meditative.

🧠 UX Philosophy

The infinite vertical motion evokes time — a journey downward into the archive of the artist’s consciousness.

Projects emerge from the void, float momentarily, and dissolve — suggesting impermanence and flow rather than static showcase.

The user becomes the camera, exploring rather than clicking.

🧩 What Makes It Special

No hard transitions. Every pixel flows.

No “end.” You could scroll infinitely, and the experience would still feel intentional.

No hierarchy. Every piece is equally weighted in the flow — which subtly challenges portfolio conventions.

🔮 Inspiration for Your Project

If we transpose this philosophy to Musée des Civilisations Noires, we could have:

“An infinite vertical corridor of civilization.”

As the user scrolls, they descend chronologically (Ancient → Medieval → Modern → Contemporary African art).

Each layer could have subtle ambient cues — shifting light color, distant tribal music, environmental textures (sand → bronze → fabric → glass).

Instead of a traditional footer, the scroll could loop back to the start, symbolizing cyclical heritage.