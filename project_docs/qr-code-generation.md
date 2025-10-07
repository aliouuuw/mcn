# QR Code Generation for MCN Artifacts

## Overview

This document describes the QR code generation system for the Musée des Civilisations Noires (MCN) artifacts. The system generates QR codes that link directly to each artifact's detail page on the website.

## Generated QR Codes

✅ **Successfully generated 9 QR codes** for all artifacts in the collection:

1. **Armure du chasseur Dogon (Mali)**
   - URL: https://mcn-liart.vercel.app/artifact/armure-du-chasseur-dogon-mali
   - QR Code: `/qr-codes/armure-du-chasseur-dogon-mali.png`

2. **Babouches de Serigne Babacar Sy (Sénégal)**
   - URL: https://mcn-liart.vercel.app/artifact/babouches-de-serigne-babacar-sy-senegal
   - QR Code: `/qr-codes/babouches-de-serigne-babacar-sy-senegal.png`

3. **Masque Ndomo (Bambara – Mali)**
   - URL: https://mcn-liart.vercel.app/artifact/masque-ndomo-bambara-mali
   - QR Code: `/qr-codes/masque-ndomo-bambara-mali.png`

4. **Reproduction du crâne d'Homo Senegalensis (Sénégal)**
   - URL: https://mcn-liart.vercel.app/artifact/reproduction-du-crane-dhomo-senegalensis-senegal
   - QR Code: `/qr-codes/reproduction-du-crane-dhomo-senegalensis-senegal.png`

5. **Masque cérémoniel Sérère (Sénégal)**
   - URL: https://mcn-liart.vercel.app/artifact/masque-ceremoniel-serere-senegal
   - QR Code: `/qr-codes/masque-ceremoniel-serere-senegal.png`

6. **Tambour royal du Royaume du Djolof (Sénégal)**
   - URL: https://mcn-liart.vercel.app/artifact/tambour-royal-du-royaume-du-djolof-senegal
   - QR Code: `/qr-codes/tambour-royal-du-royaume-du-djolof-senegal.png`

7. **Pagne tissé Lébou (Sénégal)**
   - URL: https://mcn-liart.vercel.app/artifact/pagne-tisse-lebou-senegal
   - QR Code: `/qr-codes/pagne-tisse-lebou-senegal.png`

8. **Statue Dogon de l'esprit protecteur (Mali)**
   - URL: https://mcn-liart.vercel.app/artifact/statue-dogon-de-lesprit-protecteur-mali
   - QR Code: `/qr-codes/statue-dogon-de-lesprit-protecteur-mali.png`

9. **Bracelet en or de l'Empire Ashanti (Ghana)**
   - URL: https://mcn-liart.vercel.app/artifact/bracelet-en-or-de-lempire-ashanti-ghana
   - QR Code: `/qr-codes/bracelet-en-or-de-lempire-ashanti-ghana.png`

## Usage

### Generate QR Codes

Run the QR code generation script:

```bash
# Using npm script (recommended)
npm run qr:generate

# Or directly with node
node scripts/generate-qr-codes.js
```

### Output Files

The script generates the following files in `public/qr-codes/`:

- **Individual QR codes**: `{artifact-id}.png` (512x512 pixels)
- **Index file**: `index.json` - Complete metadata about all generated QR codes
- **Sharing data**: `sharing-data.json` - Pre-configured social media sharing URLs

## QR Code Specifications

- **Format**: PNG
- **Size**: 512x512 pixels
- **Error Correction**: Medium (M)
- **Colors**: Black on white background
- **Margin**: 1 module

## File Structure

```
public/qr-codes/
├── armure-du-chasseur-dogon-mali.png
├── babouches-de-serigne-babacar-sy-senegal.png
├── bracelet-en-or-de-lempire-ashanti-ghana.png
├── masque-ceremoniel-serere-senegal.png
├── masque-ndomo-bambara-mali.png
├── pagne-tisse-lebou-senegal.png
├── reproduction-du-crane-dhomo-senegalensis-senegal.png
├── statue-dogon-de-lesprit-protecteur-mali.png
├── tambour-royal-du-royaume-du-djolof-senegal.png
├── index.json
└── sharing-data.json
```

## Integration with Sharing Component

The generated `sharing-data.json` file contains pre-configured URLs for social media sharing:

```json
{
  "artifact_id": "bracelet-en-or-de-lempire-ashanti-ghana",
  "artifact_title": "Bracelet en or de l'Empire Ashanti (Ghana)",
  "artifact_url": "https://mcn-liart.vercel.app/artifact/bracelet-en-or-de-lempire-ashanti-ghana",
  "qr_code_url": "/qr-codes/bracelet-en-or-de-lempire-ashanti-ghana.png",
  "sharing_urls": {
    "facebook": "https://www.facebook.com/sharer/sharer.php?u=...",
    "twitter": "https://twitter.com/intent/tweet?url=...&text=...",
    "whatsapp": "https://wa.me/?text=...",
    "linkedin": "https://www.linkedin.com/sharing/share-offsite/?url=...",
    "email": "mailto:?subject=...&body=..."
  }
}
```

## Museum Implementation

### Physical Display

1. **Print QR codes** at appropriate sizes for museum displays
2. **Place near artifacts** with clear instructions in French, English, and Wolof
3. **Include text**: "Scannez pour découvrir l'histoire / Scan to discover the story / Scan ngir gëm taariix bi"

### Digital Integration

1. **Artifact pages** can display their own QR codes for easy sharing
2. **Admin interface** can use the index.json for QR code management
3. **Analytics** can track QR code usage through URL parameters

## Technical Details

### Dependencies

- `qrcode`: QR code generation library
- Node.js built-in modules: `fs/promises`, `path`

### Script Features

- ✅ Automatic directory creation
- ✅ Error handling and reporting
- ✅ Progress tracking with emojis
- ✅ Comprehensive logging
- ✅ JSON metadata generation
- ✅ Social media URL generation

### Regeneration

The script can be run multiple times safely:
- Existing QR codes will be overwritten
- New artifacts will get new QR codes
- Removed artifacts will leave orphaned QR codes (manual cleanup needed)

## Future Enhancements

1. **Analytics Integration**: Add UTM parameters to track QR code usage
2. **Batch Operations**: Support for generating specific artifact QR codes
3. **Custom Styling**: Museum-branded QR codes with logos
4. **Print Templates**: Generate print-ready layouts for museum displays
5. **Multi-language**: Generate separate QR codes for different language versions

## Troubleshooting

### Common Issues

1. **Permission errors**: Ensure write access to `public/qr-codes/` directory
2. **Missing artifacts**: Check `artifacts_data.json` format and content
3. **Network issues**: QR codes are generated locally, no network required

### Verification

Check generated QR codes by:
1. Scanning with a mobile device
2. Verifying URLs redirect correctly
3. Testing on different QR code readers

---

*Generated on: 2025-10-07 at 20:35 UTC*
*Total artifacts: 9*
*Success rate: 100%*
