# Artifacts Directory

This directory contains the museum collection artifacts used in the infinite scroll gallery.

## Current Assets

### Images
- `jayanth-muppaneni-DiIP-FT2hjc-unsplash.jpg` - Traditional African mask
- `the-cleveland-museum-of-art-lJ13ir2oClo-unsplash.jpg` - Ancient sculpture
- `pyx-photography-8BuIYlCzI8A-unsplash.jpg` - Contemporary art piece
- `wadi-lissa-H0PgP6Ng440-unsplash.jpg` - Kente textile

### Mock Videos (Placeholders)
The following video files are referenced in the gallery but are currently using thumbnail images as placeholders:
- `sample-video-1.mp4` - Ritual dance video (using `pyx-photography-8BuIYlCzI8A-unsplash.jpg` as thumbnail)
- `sample-video-2.mp4` - Ancestral ceremony video (using `jayanth-muppaneni-DiIP-FT2hjc-unsplash.jpg` as thumbnail)
- `sample-video-3.mp4` - Funeral ritual video (using `the-cleveland-museum-of-art-lJ13ir2oClo-unsplash.jpg` as thumbnail)
- `sample-video-4.mp4` - Cultural performance video (using `wadi-lissa-H0PgP6Ng440-unsplash.jpg` as thumbnail)

**Note**: To add actual video content, place `.mp4` files with these names in this directory. The gallery will automatically use the thumbnails until actual video files are present.

## Adding New Artifacts

To add new artifacts to the gallery:

1. Add image or video files to this directory
2. Update the `artifacts` array in `/src/components/Collections.jsx`
3. Include:
   - `id`: Unique identifier
   - `type`: 'image' or 'video'
   - `src`: Path to the asset
   - `thumbnail`: (For videos only) Path to thumbnail image
   - `title`: Display title
   - `period`: Historical period
   - `culture`: Cultural origin
   - `column`: Column index (0, 1, 2 for 3 columns)

## Video Format Requirements

For optimal performance, videos should be:
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 or lower
- Duration: 15-60 seconds
- File size: Under 50MB

## Gallery Structure

The gallery uses a 3-column layout with different scroll speeds for each column:
- Column 0 (Left): Ancient artifacts, scroll speed 0.3
- Column 1 (Center): Sculptures and ceremonial pieces, scroll speed 0.5
- Column 2 (Right): Contemporary works, scroll speed 0.2

Each column loops infinitely and creates a parallax scrolling effect.