GOAL

Transform the current Collections grid layout into a smooth, infinite vertical scroll gallery inspired by Richard Prescott’s portfolio.
The new version should feel like an endless column of visual discoveries, not a static grid — simple, lightweight, and elegant (white background, no text).

🧩 CORE BEHAVIOR

Infinite Scroll Illusion

Instead of rendering all artifacts at once in a grid, create a vertical scroll flow where a few rows fade in/out as you scroll.

As the user scrolls, new artifacts appear at the bottom while older ones fade away at the top (looped or lazy-loaded).

Scroll-based Motion

Use Lenis or Smooth Scrollbar for smooth scroll inertia.

Each image slightly parallax-shifts on scroll (translateY or scale subtle animation).

Add gentle fade-in/out with Framer Motion or GSAP.

Centered Composition

Move away from the full grid.

Use 1 or 2 columns max (staggered layout) with irregular vertical spacing (gap-y randomization).

Keep the background pure white, and let each artifact breathe in negative space.

Looped Scroll (Optional for prototype)

After reaching the bottom, scroll loops seamlessly to the top (like Richard Prescott’s endless descent).

Implement this by recycling DOM elements with IntersectionObserver or manual scroll reset logic.

Visual Continuity

Each artifact crossfades into the next as the user scrolls — only 1–2 visible at any given viewport height.

The motion should feel like “drifting through an endless vertical museum corridor.”

🎨 DESIGN GUIDELINES

Background: Pure white (bg-white)

Artifacts: Center-aligned, slight scale-up on viewport enter (scale-100 → scale-105 → scale-100)

Spacing: Random vertical gaps (space-y-[10rem~20rem])

No text or UI elements — images only

Transitions: Soft ease-in-out (ease-[cubic-bezier(0.65,0,0.35,1)])

Shadows: None or extremely subtle soft shadow on hover