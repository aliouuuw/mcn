#!/usr/bin/env node

/**
 * QR Code Generator for MCN Artifacts
 * Generates QR codes for all artifacts in the museum collection
 * Base URL: https://mcn-liart.vercel.app
 */

import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = 'https://mcn-liart.vercel.app';
const ARTIFACTS_DATA_PATH = path.join(__dirname, '../artifacts_data.json');
const OUTPUT_DIR = path.join(__dirname, '../public/qr-codes');

// QR Code options
const QR_OPTIONS = {
  errorCorrectionLevel: 'M',
  type: 'png',
  quality: 0.92,
  margin: 1,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  },
  width: 512
};

/**
 * Ensure output directory exists
 */
async function ensureOutputDir() {
  try {
    await fs.access(OUTPUT_DIR);
  } catch {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Created output directory: ${OUTPUT_DIR}`);
  }
}

/**
 * Load artifacts data
 */
async function loadArtifactsData() {
  try {
    const data = await fs.readFile(ARTIFACTS_DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading artifacts data:', error.message);
    process.exit(1);
  }
}

/**
 * Generate QR code for a single artifact
 */
async function generateQRCode(artifact) {
  const url = `${BASE_URL}/artifact/${artifact.id}`;
  const filename = `${artifact.id}.png`;
  const outputPath = path.join(OUTPUT_DIR, filename);

  try {
    await QRCode.toFile(outputPath, url, QR_OPTIONS);
    return {
      id: artifact.id,
      title: artifact.titles.fr,
      url,
      filename,
      path: outputPath,
      success: true
    };
  } catch (error) {
    console.error(`❌ Error generating QR code for ${artifact.id}:`, error.message);
    return {
      id: artifact.id,
      title: artifact.titles.fr,
      url,
      filename,
      path: outputPath,
      success: false,
      error: error.message
    };
  }
}

/**
 * Generate QR codes for all artifacts
 */
async function generateAllQRCodes() {
  console.log('🎨 MCN Artifact QR Code Generator');
  console.log('==================================\n');

  // Load artifacts data
  console.log('📖 Loading artifacts data...');
  const artifacts = await loadArtifactsData();
  console.log(`✅ Found ${artifacts.length} artifacts\n`);

  // Ensure output directory exists
  await ensureOutputDir();

  // Generate QR codes
  console.log('🔄 Generating QR codes...\n');
  const results = [];

  for (const artifact of artifacts) {
    console.log(`📱 Generating QR code for: ${artifact.titles.fr}`);
    const result = await generateQRCode(artifact);
    results.push(result);
    
    if (result.success) {
      console.log(`   ✅ ${result.filename} - ${result.url}`);
    } else {
      console.log(`   ❌ Failed: ${result.error}`);
    }
  }

  // Generate summary
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log('\n📊 Generation Summary');
  console.log('====================');
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);

  // Generate index file with all QR codes info
  await generateQRCodeIndex(results);

  if (failed.length > 0) {
    console.log('\n❌ Failed artifacts:');
    failed.forEach(f => console.log(`   - ${f.id}: ${f.error}`));
  }

  console.log('\n🎉 QR code generation complete!');
}

/**
 * Generate an index file with all QR code information
 */
async function generateQRCodeIndex(results) {
  const indexData = {
    generated_at: new Date().toISOString(),
    base_url: BASE_URL,
    total_artifacts: results.length,
    successful_generations: results.filter(r => r.success).length,
    qr_codes: results.map(result => ({
      artifact_id: result.id,
      artifact_title: result.title,
      artifact_url: result.url,
      qr_code_filename: result.filename,
      qr_code_path: `/qr-codes/${result.filename}`,
      generated: result.success,
      error: result.error || null
    }))
  };

  const indexPath = path.join(OUTPUT_DIR, 'index.json');
  await fs.writeFile(indexPath, JSON.stringify(indexData, null, 2));
  console.log(`📋 Generated QR codes index: ${indexPath}`);
}

/**
 * Generate sharing URLs for social media
 */
function generateSharingUrls(artifactUrl, title) {
  const encodedUrl = encodeURIComponent(artifactUrl);
  const encodedTitle = encodeURIComponent(title);
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=Découvrez cet artefact du Musée des Civilisations Noires: ${encodedUrl}`
  };
}

/**
 * Generate sharing component data
 */
async function generateSharingData() {
  const artifacts = await loadArtifactsData();
  
  const sharingData = artifacts.map(artifact => {
    const artifactUrl = `${BASE_URL}/artifact/${artifact.id}`;
    const title = `${artifact.titles.fr} - Musée des Civilisations Noires`;
    
    return {
      artifact_id: artifact.id,
      artifact_title: artifact.titles.fr,
      artifact_url: artifactUrl,
      qr_code_url: `/qr-codes/${artifact.id}.png`,
      sharing_urls: generateSharingUrls(artifactUrl, title)
    };
  });

  const sharingPath = path.join(OUTPUT_DIR, 'sharing-data.json');
  await fs.writeFile(sharingPath, JSON.stringify(sharingData, null, 2));
  console.log(`🔗 Generated sharing data: ${sharingPath}`);
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllQRCodes()
    .then(() => generateSharingData())
    .catch(error => {
      console.error('💥 Fatal error:', error);
      process.exit(1);
    });
}

export { generateAllQRCodes, generateQRCode, generateSharingUrls };
