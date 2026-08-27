const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const standaloneDir = path.join(__dirname, '../.next/standalone');
const staticSrc = path.join(__dirname, '../.next/static');
const staticDest = path.join(standaloneDir, '.next/static');
const publicSrc = path.join(__dirname, '../public');
const publicDest = path.join(standaloneDir, 'public');

if (fs.existsSync(standaloneDir)) {
  console.log('Copying static assets to standalone directory...');
  copyDir(staticSrc, staticDest);
  copyDir(publicSrc, publicDest);
  console.log('Done copying static assets.');
} else {
  console.log('Standalone directory not found. Skipping copy.');
}
