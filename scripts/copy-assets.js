import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:\\Users\\GH TECH\\.gemini\\antigravity\\brain\\51ad5469-e77e-4e7c-be11-a4bf2d819147\\.user_uploaded';
const brandDir = path.resolve('public/images/brand');
const productsDir = path.resolve('public/images/products');

fs.mkdirSync(brandDir, { recursive: true });
fs.mkdirSync(productsDir, { recursive: true });

const filesToCopy = [
  { src: 'media_1791486483249.jpg', dest: path.join(brandDir, 'dexyfied-logo-raw.jpg') },
  { src: 'media_1791488340501.png', dest: path.join(productsDir, 'laptop-stand-silver.png') },
  { src: 'media_1791488351131.png', dest: path.join(productsDir, 'laptop-stand-black.png') },
  { src: 'media_1791488371081.png', dest: path.join(productsDir, 'airpods-case-black.png') },
  { src: 'media_1791488389821.png', dest: path.join(productsDir, 'airpods-case-white.png') },
];

for (const item of filesToCopy) {
  const fullSrc = path.join(uploadedDir, item.src);
  if (fs.existsSync(fullSrc)) {
    fs.copyFileSync(fullSrc, item.dest);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.warn(`File not found: ${fullSrc}`);
  }
}
