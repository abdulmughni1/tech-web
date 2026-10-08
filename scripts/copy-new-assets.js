import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:\\Users\\GH TECH\\.gemini\\antigravity\\brain\\51ad5469-e77e-4e7c-be11-a4bf2d819147\\.user_uploaded';
const productsDir = path.resolve('public/images/products');

fs.mkdirSync(productsDir, { recursive: true });

const newFiles = [
  { src: 'media_1791492710036.png', dest: path.join(productsDir, 'i9-ultra-max.png') },
  { src: 'media_1791492721858.png', dest: path.join(productsDir, 'luminous-ring.png') },
  { src: 'media_1791492771407.png', dest: path.join(productsDir, 'wireless-headphones.png') },
  { src: 'media_1791492855850.png', dest: path.join(productsDir, 't800-ultra.png') },
  { src: 'media_1791492910852.png', dest: path.join(productsDir, 't900-ultra-2.png') },
];

for (const item of newFiles) {
  const fullSrc = path.join(uploadedDir, item.src);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, item.dest);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.warn(`File not found: ${fullSrc}`);
  }
}
