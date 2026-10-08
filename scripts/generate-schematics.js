import fs from 'fs';
import path from 'path';

const targetDir = path.resolve('public/images/products');
fs.mkdirSync(targetDir, { recursive: true });

function createSvgShell(title, itemNo, dims, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272A" stroke-width="0.8" opacity="0.35"/>
    </pattern>
    <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#18181B" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#0E0E11" stop-opacity="1"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#vignette)"/>
  <rect width="800" height="800" fill="url(#grid)"/>

  <!-- Border Frame -->
  <rect x="24" y="24" width="752" height="752" fill="none" stroke="#27272A" stroke-width="1"/>

  <!-- Corner Registration Marks -->
  <path d="M 24 40 L 40 40 L 40 24" fill="none" stroke="#A1A1AA" stroke-width="1.2"/>
  <path d="M 776 40 L 760 40 L 760 24" fill="none" stroke="#A1A1AA" stroke-width="1.2"/>
  <path d="M 24 760 L 40 760 L 40 776" fill="none" stroke="#A1A1AA" stroke-width="1.2"/>
  <path d="M 776 760 L 760 760 L 760 776" fill="none" stroke="#A1A1AA" stroke-width="1.2"/>

  <!-- Header Technical Spec Bar -->
  <text x="44" y="56" fill="#A1A1AA" font-family="'IBM Plex Mono', monospace" font-size="11" letter-spacing="2">DEXYFIED // HARDWARE SCHEMATIC</text>
  <text x="756" y="56" text-anchor="end" fill="#FF5500" font-family="'IBM Plex Mono', monospace" font-size="11" font-weight="600" letter-spacing="1.5">ITEM REF: ${itemNo}</text>
  <line x1="44" y1="70" x2="756" y2="70" stroke="#27272A" stroke-width="1"/>

  <!-- Central Engineering Drawing -->
  ${content}

  <!-- Footer Technical Annotation -->
  <line x1="44" y1="730" x2="756" y2="730" stroke="#27272A" stroke-width="1"/>
  <text x="44" y="752" fill="#71717A" font-family="'IBM Plex Mono', monospace" font-size="10" letter-spacing="1">DIMENSIONS: ${dims}</text>
  <text x="756" y="752" text-anchor="end" fill="#71717A" font-family="'IBM Plex Mono', monospace" font-size="10" letter-spacing="1">STUDIO PHOTOGRAPHY INGESTION PENDING</text>
</svg>`;
}

// 1. Headphones schematic
const headphonesSvg = createSvgShell(
  'Wireless Over-Ear Stereo Headphones',
  'DX-03',
  'CIRCUMAURAL ENCLOSURE // ADJUSTABLE SUSPENSION',
  `
  <!-- Headband Arc -->
  <path d="M 240 440 C 240 220 560 220 560 440" fill="none" stroke="#3F3F46" stroke-width="14" stroke-linecap="round"/>
  <path d="M 270 420 C 270 250 530 250 530 420" fill="none" stroke="#27272A" stroke-width="4"/>

  <!-- Left Earcup -->
  <g transform="translate(180, 360)">
    <rect x="0" y="0" width="80" height="150" rx="40" fill="#18181B" stroke="#71717A" stroke-width="2"/>
    <rect x="12" y="15" width="56" height="120" rx="28" fill="#121215" stroke="#3F3F46" stroke-width="1"/>
    <!-- Pivot Yoke -->
    <path d="M 40 -20 L 40 10" stroke="#A1A1AA" stroke-width="3"/>
    <circle cx="40" cy="10" r="4" fill="#FF5500"/>
  </g>

  <!-- Right Earcup -->
  <g transform="translate(540, 360)">
    <rect x="0" y="0" width="80" height="150" rx="40" fill="#18181B" stroke="#71717A" stroke-width="2"/>
    <rect x="12" y="15" width="56" height="120" rx="28" fill="#121215" stroke="#3F3F46" stroke-width="1"/>
    <!-- Pivot Yoke -->
    <path d="M 40 -20 L 40 10" stroke="#A1A1AA" stroke-width="3"/>
    <circle cx="40" cy="10" r="4" fill="#FF5500"/>
  </g>

  <!-- Center Measurement Crosshairs -->
  <line x1="400" y1="200" x2="400" y2="600" stroke="#27272A" stroke-dasharray="4 4" stroke-width="1"/>
  <line x1="200" y1="435" x2="600" y2="435" stroke="#27272A" stroke-dasharray="4 4" stroke-width="1"/>
  
  <text x="400" y="440" text-anchor="middle" fill="#A1A1AA" font-family="'IBM Plex Mono', monospace" font-size="12" letter-spacing="2">STEREO DRIVER CHAMBER</text>
  `
);

// 2. Ring schematic
const ringSvg = createSvgShell(
  'Luminous Heartbeat Pattern Finger Ring',
  'DX-04',
  'COMFORT FIT INNER ARCH // 8.0 MM BAND WIDTH',
  `
  <!-- Isometric Ring Geometry -->
  <g transform="translate(400, 390)">
    <!-- Outer Ellipse -->
    <ellipse cx="0" cy="0" rx="220" ry="110" fill="none" stroke="#71717A" stroke-width="3"/>
    <ellipse cx="0" cy="40" rx="220" ry="110" fill="none" stroke="#3F3F46" stroke-width="3"/>
    <path d="M -220 0 L -220 40 M 220 0 L 220 40" stroke="#71717A" stroke-width="3"/>
    
    <!-- Inner Chamfer -->
    <ellipse cx="0" cy="8" rx="170" ry="85" fill="#121215" stroke="#27272A" stroke-width="2"/>
    <ellipse cx="0" cy="48" rx="170" ry="85" fill="none" stroke="#27272A" stroke-width="2"/>

    <!-- Engraved Heartbeat Waveform -->
    <path d="M -160 28 L -70 28 L -50 8 L -30 45 L -10 12 L 10 36 L 25 28 L 60 28 L 75 14 L 90 40 L 105 28 L 160 28" 
          fill="none" stroke="#FF5500" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Glow representation indicator -->
    <circle cx="0" cy="28" r="3" fill="#FF5500"/>
  </g>

  <!-- Dimension Indicator -->
  <line x1="180" y1="560" x2="620" y2="560" stroke="#71717A" stroke-width="1"/>
  <line x1="180" y1="550" x2="180" y2="570" stroke="#71717A" stroke-width="1"/>
  <line x1="620" y1="550" x2="620" y2="570" stroke="#71717A" stroke-width="1"/>
  <text x="400" y="585" text-anchor="middle" fill="#A1A1AA" font-family="'IBM Plex Mono', monospace" font-size="11" letter-spacing="1.5">LUMINOUS ENGRAVED PROFILE</text>
  `
);

// 3. I9 Ultra Max schematic
const i9UltraMaxSvg = createSvgShell(
  'I9 Ultra Max Smart Watch',
  'DX-06',
  '48.1 × 44.6 × 14.0 MM // 2.19" IPS DISPLAY',
  `
  <g transform="translate(400, 390)">
    <!-- Watch Straps Top & Bottom -->
    <rect x="-80" y="-280" width="160" height="130" rx="10" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>
    <rect x="-80" y="150" width="160" height="130" rx="10" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>

    <!-- Strap Ridges -->
    <line x1="-70" y1="-240" x2="70" y2="-240" stroke="#27272A" stroke-width="3"/>
    <line x1="-70" y1="-200" x2="70" y2="-200" stroke="#27272A" stroke-width="3"/>
    <line x1="-70" y1="190" x2="70" y2="190" stroke="#27272A" stroke-width="3"/>
    <line x1="-70" y1="230" x2="70" y2="230" stroke="#27272A" stroke-width="3"/>

    <!-- Watch Chassis -->
    <rect x="-150" y="-160" width="300" height="320" rx="42" fill="#18181B" stroke="#71717A" stroke-width="3"/>

    <!-- Crown Dial (Right side) -->
    <rect x="150" y="-70" width="18" height="50" rx="4" fill="#27272A" stroke="#71717A" stroke-width="2"/>
    <line x1="154" y1="-60" x2="164" y2="-60" stroke="#A1A1AA" stroke-width="1.5"/>
    <line x1="154" y1="-50" x2="164" y2="-50" stroke="#A1A1AA" stroke-width="1.5"/>
    <line x1="154" y1="-40" x2="164" y2="-40" stroke="#A1A1AA" stroke-width="1.5"/>

    <!-- Secondary Button -->
    <rect x="150" y="30" width="12" height="40" rx="3" fill="#27272A" stroke="#52525B" stroke-width="1.5"/>

    <!-- Bezel & Display (2.19" IPS) -->
    <rect x="-125" y="-135" width="250" height="270" rx="26" fill="#09090B" stroke="#27272A" stroke-width="2"/>

    <!-- Screen Mockup Details -->
    <text x="0" y="-60" text-anchor="middle" fill="#FF5500" font-family="'IBM Plex Mono', monospace" font-size="28" font-weight="700">10:42</text>
    <text x="0" y="-30" text-anchor="middle" fill="#A1A1AA" font-family="'IBM Plex Mono', monospace" font-size="11" letter-spacing="2">BT 5.3 // CONNECTED</text>
    
    <path d="M -70 30 L -40 30 L -25 5 L -10 45 L 10 10 L 25 35 L 40 30 L 70 30" 
          fill="none" stroke="#FF5500" stroke-width="2.5" stroke-linecap="round"/>
    <text x="0" y="70" text-anchor="middle" fill="#FAFAFA" font-family="'IBM Plex Mono', monospace" font-size="12">76 BPM // HSR3300</text>
    <text x="0" y="95" text-anchor="middle" fill="#71717A" font-family="'IBM Plex Mono', monospace" font-size="10">240 × 296 RESOLUTION</text>
  </g>
  `
);

// 4. T900 Ultra 2 schematic
const t900Ultra2Svg = createSvgShell(
  'T900 Ultra 2 Smart Watch — Series 9',
  'DX-07',
  '49.0 × 40.0 × 10.7 MM // 320 × 386 IPS PANEL',
  `
  <g transform="translate(400, 390)">
    <!-- Straps -->
    <rect x="-75" y="-270" width="150" height="120" rx="8" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>
    <rect x="-75" y="150" width="150" height="120" rx="8" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>

    <!-- Left Motion Button (Orange Accent Hardware) -->
    <rect x="-162" y="-40" width="12" height="60" rx="3" fill="#FF5500" stroke="#FF5500" stroke-width="1"/>

    <!-- Watch Frame (Zinc Alloy) -->
    <rect x="-150" y="-160" width="300" height="320" rx="48" fill="#18181B" stroke="#A1A1AA" stroke-width="2.5"/>

    <!-- Right Encoder Crown -->
    <rect x="150" y="-80" width="18" height="56" rx="4" fill="#27272A" stroke="#71717A" stroke-width="2"/>
    <!-- Mic Hole -->
    <circle cx="156" cy="0" r="2.5" fill="#71717A"/>
    <!-- Side Button -->
    <rect x="150" y="25" width="12" height="45" rx="3" fill="#27272A" stroke="#52525B" stroke-width="1.5"/>

    <!-- Display Area -->
    <rect x="-128" y="-138" width="256" height="276" rx="32" fill="#09090B" stroke="#3F3F46" stroke-width="2"/>

    <!-- High Res Interface Representation -->
    <circle cx="0" cy="-20" r="60" fill="none" stroke="#27272A" stroke-width="6"/>
    <circle cx="0" cy="-20" r="60" fill="none" stroke="#FF5500" stroke-width="6" stroke-dasharray="260 380"/>
    <text x="0" y="-12" text-anchor="middle" fill="#FAFAFA" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700">09:14</text>
    <text x="0" y="8" text-anchor="middle" fill="#A1A1AA" font-family="'IBM Plex Mono', monospace" font-size="10">YC1133 // IP65</text>
    <text x="0" y="75" text-anchor="middle" fill="#FAFAFA" font-family="'IBM Plex Mono', monospace" font-size="12">TRIPLE BUTTON LAYOUT</text>
    <text x="0" y="95" text-anchor="middle" fill="#71717A" font-family="'IBM Plex Mono', monospace" font-size="10">320 × 386 FULL TOUCH</text>
  </g>
  `
);

// 5. T800 Ultra schematic
const t800UltraSvg = createSvgShell(
  'T800 Ultra — Watch 8 Ultra',
  'DX-08',
  '48.1 × 44.6 × 14.0 MM // 44MM STRAP SLOT',
  `
  <g transform="translate(400, 390)">
    <!-- Ocean Wave Ribbed Strap Top & Bottom -->
    <g transform="translate(-75, -270)">
      <rect x="0" y="0" width="150" height="120" rx="8" fill="#1C1C21" stroke="#3F3F46" stroke-width="2"/>
      <ellipse cx="75" cy="25" rx="50" ry="8" fill="#09090B"/>
      <ellipse cx="75" cy="65" rx="50" ry="8" fill="#09090B"/>
      <ellipse cx="75" cy="105" rx="50" ry="8" fill="#09090B"/>
    </g>
    <g transform="translate(-75, 150)">
      <rect x="0" y="0" width="150" height="120" rx="8" fill="#1C1C21" stroke="#3F3F46" stroke-width="2"/>
      <ellipse cx="75" cy="25" rx="50" ry="8" fill="#09090B"/>
      <ellipse cx="75" cy="65" rx="50" ry="8" fill="#09090B"/>
      <ellipse cx="75" cy="105" rx="50" ry="8" fill="#09090B"/>
    </g>

    <!-- Watch Frame -->
    <rect x="-150" y="-160" width="300" height="320" rx="44" fill="#18181B" stroke="#71717A" stroke-width="2.5"/>

    <!-- Left Speaker Slots -->
    <line x1="-155" y1="-30" x2="-155" y2="-10" stroke="#FF5500" stroke-width="3"/>
    <line x1="-155" y1="10" x2="-155" y2="30" stroke="#FF5500" stroke-width="3"/>

    <!-- Working Crown Dial -->
    <rect x="150" y="-75" width="20" height="55" rx="4" fill="#27272A" stroke="#A1A1AA" stroke-width="2"/>
    <rect x="150" y="25" width="12" height="42" rx="3" fill="#27272A" stroke="#52525B" stroke-width="1.5"/>

    <!-- Screen Bezel -->
    <rect x="-126" y="-136" width="252" height="272" rx="28" fill="#09090B" stroke="#27272A" stroke-width="2"/>

    <!-- Watch Screen Info -->
    <text x="0" y="-45" text-anchor="middle" fill="#FF5500" font-family="'Space Grotesk', sans-serif" font-size="32" font-weight="700">12:30</text>
    <text x="0" y="-15" text-anchor="middle" fill="#A1A1AA" font-family="'IBM Plex Mono', monospace" font-size="11">DUAL SPEAKER AUDIO</text>
    
    <!-- Steps & Calorie Progress -->
    <rect x="-80" y="15" width="160" height="12" rx="6" fill="#18181B" stroke="#27272A"/>
    <rect x="-80" y="15" width="105" height="12" rx="6" fill="#FF5500"/>

    <text x="0" y="55" text-anchor="middle" fill="#FAFAFA" font-family="'IBM Plex Mono', monospace" font-size="12">6,420 STEPS</text>
    <text x="0" y="85" text-anchor="middle" fill="#71717A" font-family="'IBM Plex Mono', monospace" font-size="10">WORKING CROWN DIAL</text>
  </g>
  `
);

fs.writeFileSync(path.join(targetDir, 'headphones-schematic.svg'), headphonesSvg);
fs.writeFileSync(path.join(targetDir, 'ring-schematic.svg'), ringSvg);
fs.writeFileSync(path.join(targetDir, 'i9-ultra-max-schematic.svg'), i9UltraMaxSvg);
fs.writeFileSync(path.join(targetDir, 't900-ultra-2-schematic.svg'), t900Ultra2Svg);
fs.writeFileSync(path.join(targetDir, 't800-ultra-schematic.svg'), t800UltraSvg);

console.log('Successfully generated technical schematic placeholders.');
