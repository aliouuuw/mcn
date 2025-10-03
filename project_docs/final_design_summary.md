# Final Design Choice: The Portal Experience

This document summarizes the final design choice for the Musée des Civilisations Noires website, which is the "Portal Experience" concept. This concept offers a cinematic and immersive journey through the museum, with the ability to explore artifacts in more detail within each scene.

## Concept Overview

The "Portal Experience" is a scroll-based website that takes users on a virtual tour of the Musée des Civilisations Noires. The experience is divided into five distinct scenes:

1.  **Threshold (0–15%)**: Exterior shot, doors opening, tagline.
2.  **Processional Corridor (15–40%)**: Minimal corridor with encased artifacts.
3.  **Central Gallery (40–70%)**: Circular atrium with orbiting artifacts.
4.  **Constellation of Connections (70–90%)**: Macro view of light threads weaving artifacts into a glowing network.
5.  **Invitation Exit (90–100%)**: Camera reverses out through the doorway, overlay emerges.

## Key Features

*   **Cinematic Journey**: A smooth, scroll-controlled camera movement guides users through the museum.
*   **Artifact Exploration**: Users can pause the journey and explore artifacts in more detail within each scene.
*   **Immersive Experience**: High-quality visuals, audio, and motion create a captivating and engaging experience.
*   **Multilingual Support**: The website will support French, English, and Wolof.
*   **QR Code Integration**: On-site visitors can scan QR codes to access artifact details.

## Scene Details

### 1. Threshold (0–15%)

*   Exterior shot of the museum at dusk, with the doors slowly opening.
*   Tagline: "Enter the soul of Black Civilizations."
*   Subtle cursor-following parallax on the tagline text.

### 2. Processional Corridor (15–40%)

*   Minimal corridor inspired by the museum interior, lit with linear brass strips.
*   Encased artifacts line the walls.
*   When the user stops scrolling, the nearest artifact smoothly enlarges and centers.
    *   Metadata fades in below (name, era, origin).
    *   Audio icon appears—click to play a 15-second snippet.
    *   A subtle "Explore" button appears—clicking it transitions to a dedicated artifact modal.
*   On scroll resume, the artifact smoothly shrinks back into its case, and the camera journey continues.

### 3. Central Gallery (40–70%)

*   Circular atrium with orbiting artifacts.
*   Instead of hover-based focus, artifacts now pulse gently.
*   When the user clicks an artifact, it smoothly flies to the foreground, pausing the camera.
    *   Detail card glides in with audio toggle, FR/EN/WO language chips, plus "Scan QR to explore on-site" badge.
    *   Background audio dims, artifact’s story track takes over.
    *   A subtle "Back to Gallery" button appears.
*   On "Back to Gallery" click, the artifact returns to its orbit, and the camera remains paused. The user can now click another artifact.
*   On scroll resume, the selected artifact returns to its orbit, the detail card retracts, and the camera journey continues.

### 4. Constellation of Connections (70–90%)

*   Macro view of light threads weaving artifacts into a glowing network.
*   When the user stops scrolling, the camera slowly pans across the constellation, highlighting different clusters.
    *   Clicking a cluster zooms in to reveal the artifacts within.
    *   Each artifact has a subtle "Explore" button—clicking it transitions to the dedicated artifact modal.
*   On scroll resume, the camera returns to its original position, and the journey continues.

### 5. Invitation Exit (90–100%)

*   Camera reverses out through the doorway.
*   Overlay emerges:
    *   "Join the digital museum."
    *   Buttons: "Explore Prototype," "View Artifact Stories," "Hackathon Demo Deck."
    *   QR code pinned with "Scan on-site" for judges to test.
*   A subtle "Explore the Collection" button appears, linking to a dedicated artifact catalog page (outside the scope of the hackathon, but we can mock it up).

## Artifact Modal Details

*   Appears as a full-screen overlay with a blurred background.
*   Features a high-resolution image of the artifact, a detailed description, audio narration, and a QR code.
*   Includes FR/EN/WO language options.
*   Has a prominent "Close" button to return to the previous scene.
