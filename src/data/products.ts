import { Product } from '../types/product';

export const SHIPPING_FEE = 150; // PKR 150 Nationwide across Pakistan
export const RETURN_PERIOD_DAYS = 7;

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    itemNumber: 1,
    name: 'Adjustable Portable Laptop Desktop Stand',
    slug: 'adjustable-portable-laptop-stand',
    category: 'Workspace',
    shortStatement: 'Foldable ergonomic riser for laptops and tablets.',
    description: 'A compact, multi-angle adjustable desktop stand engineered to elevate your laptop screen to eye level. Built with an open structural frame to improve passive cooling airflow and equipped with silicone grip pads for stability.',
    originalPrice: 3000,
    salePrice: 1500,
    availability: 'in_stock',
    isFeatured: true,
    variants: [
      {
        id: 'var-01-silver',
        name: 'Silver',
        colorCode: '#D4D4D8',
        inStock: true,
        image: '/images/products/laptop-stand-silver.png'
      },
      {
        id: 'var-01-black',
        name: 'Black',
        colorCode: '#18181B',
        inStock: true,
        image: '/images/products/laptop-stand-black.png'
      }
    ],
    images: [
      {
        url: '/images/products/laptop-stand-silver.png',
        alt: 'Adjustable Portable Laptop Stand in Silver anodized finish',
        variantColor: 'Silver'
      },
      {
        url: '/images/products/laptop-stand-black.png',
        alt: 'Adjustable Portable Laptop Stand in Matte Black finish',
        variantColor: 'Black'
      }
    ],
    features: [
      'Multi-level angle and elevation adjustment',
      'Dual-strut foldable architecture for compact transport',
      'Anti-slip silicone surface pads and protective cradle hooks',
      'Open-air ventilation structure for passive heat dissipation'
    ],
    specifications: [
      { label: 'FINISH OPTIONS', value: 'Silver Anodized / Matte Black' },
      { label: 'STRUCTURE', value: 'Dual-rail Folding Framework' },
      { label: 'DEVICE COMPATIBILITY', value: 'Laptops, Notebooks & Tablets' },
      { label: 'CONTACT PADS', value: 'High-friction Silicone Grip' },
      { label: 'PORTABILITY', value: 'Collapsible Flat-Pack Profile' }
    ],
    packageContents: [
      '1 × Adjustable Portable Laptop Stand',
      '1 × Storage Sleeve'
    ]
  },
  {
    id: 'prod-02',
    itemNumber: 2,
    name: 'Touch Screen AirPods Case',
    slug: 'touch-screen-airpods-case',
    category: 'Audio',
    shortStatement: 'Wireless audio case featuring interactive front touch display.',
    description: 'An advanced wireless in-ear audio kit featuring an integrated full-color front touch display on the charging case. Directly monitor battery percentages for both earbuds and case, cycle audio modes, and view device status without opening your phone.',
    originalPrice: 5000,
    salePrice: 3200,
    availability: 'in_stock',
    isFeatured: true,
    variants: [
      {
        id: 'var-02-black',
        name: 'Black',
        colorCode: '#18181B',
        inStock: true,
        image: '/images/products/airpods-case-black.png'
      },
      {
        id: 'var-02-white',
        name: 'White',
        colorCode: '#F4F4F5',
        inStock: true,
        image: '/images/products/airpods-case-white.png'
      }
    ],
    images: [
      {
        url: '/images/products/airpods-case-black.png',
        alt: 'Touch Screen Wireless Earbuds Case in Gloss Black with active display',
        variantColor: 'Black'
      },
      {
        url: '/images/products/airpods-case-white.png',
        alt: 'Touch Screen Wireless Earbuds Case in Ceramic White open configuration',
        variantColor: 'White'
      }
    ],
    features: [
      'Front-facing interactive full-color touch display',
      'Direct on-case left/right bud and case battery status indicators',
      'On-screen ambient sound and playback controls',
      'Ergonomic stem-style in-ear earbuds with silicone ear tips'
    ],
    specifications: [
      { label: 'DISPLAY TYPE', value: 'Front Interactive Touch Panel' },
      { label: 'AVAILABLE FINISHES', value: 'Black / White' },
      { label: 'STATUS MONITORING', value: 'Real-time L/R Earbud + Case Battery %' },
      { label: 'FORM FACTOR', value: 'In-Ear TWS with Smart Charging Casing' }
    ],
    packageContents: [
      '2 × Wireless In-Ear Earbuds (Left & Right)',
      '1 × Smart Touchscreen Charging Case',
      '1 × USB Charging Cable'
    ]
  },
  {
    id: 'prod-03',
    itemNumber: 3,
    name: 'Wireless Over-Ear Stereo Headphones',
    slug: 'wireless-over-ear-stereo-headphones',
    category: 'Audio',
    shortStatement: 'Full-size wireless stereo listening with cushioned enclosure.',
    description: 'Over-ear wireless stereo headphones built for immersive audio playback and everyday comfort. Engineered with plush circumaural earcups, an adjustable headband suspension, and physical onboard control buttons.',
    originalPrice: 5000,
    salePrice: 3500,
    availability: 'in_stock',
    isFeatured: false,
    variants: [
      {
        id: 'var-03-standard',
        name: 'Standard Dark',
        colorCode: '#18181B',
        inStock: true
      }
    ],
    images: [
      {
        url: '/images/products/wireless-headphones.png',
        alt: 'Wireless Over-Ear Stereo Headphones in Silver White finish'
      }
    ],
    features: [
      'Circumaural over-ear cushioned earcups for passive isolation',
      'Extendable padded headband for universal fit',
      'Wireless stereo audio connection',
      'Integrated tactile playback and volume controls'
    ],
    specifications: [
      { label: 'ACOUSTIC DESIGN', value: 'Closed-Back Over-Ear Circumaural' },
      { label: 'CONNECTIVITY', value: 'Wireless Stereo Audio' },
      { label: 'CUSHION MATERIAL', value: 'High-density Foam / Textured Leatherette' },
      { label: 'CONTROLS', value: 'Integrated Tactile Side Buttons' }
    ],
    packageContents: [
      '1 × Wireless Over-Ear Stereo Headphones',
      '1 × Charging Cable',
      '1 × Documentation'
    ]
  },
  {
    id: 'prod-04',
    itemNumber: 4,
    name: 'Luminous Heartbeat Pattern Finger Ring',
    slug: 'luminous-heartbeat-pattern-finger-ring',
    category: 'Wearables',
    shortStatement: 'Durable band with integrated phosphorescent heartbeat motif.',
    description: 'A minimalist finger ring crafted with a precision-engraved ECG heartbeat pattern that absorbs ambient light and emits a distinct luminous glow in dark environments.',
    originalPrice: 1800,
    salePrice: 550,
    availability: 'in_stock',
    isFeatured: false,
    variants: [
      {
        id: 'var-04-glow',
        name: 'Luminous Dark',
        colorCode: '#27272A',
        inStock: true
      }
    ],
    images: [
      {
        url: '/images/products/luminous-ring.png',
        alt: 'Luminous Heartbeat Pattern Finger Ring showing luminescent green ECG wave'
      }
    ],
    features: [
      'Photo-luminescent heartbeat wave engraving',
      'Comfort-fit contoured inner edge',
      'Durable scratch-resistant surface finish',
      'Glows autonomously in darkness after light exposure'
    ],
    specifications: [
      { label: 'DESIGN PATTERN', value: 'Phosphorescent Heartbeat Wave' },
      { label: 'LUMINESCENCE', value: 'Passive Photo-responsive Glow' },
      { label: 'PROFILE', value: 'Smooth Comfort-Fit Band' }
    ],
    packageContents: [
      '1 × Luminous Heartbeat Finger Ring'
    ]
  },
  {
    id: 'prod-06',
    itemNumber: 6,
    name: 'I9 Ultra Max Smart Watch',
    slug: 'i9-ultra-max-smart-watch',
    category: 'Smart Watches',
    shortStatement: '2.19" IPS Bluetooth-calling smartwatch with 64MB flash.',
    description: 'An expansive 2.19-inch IPS display smartwatch powered by the JL7011 processor. Encased in a zinc-alloy front shell with black ABS+PC backing, it supports Bluetooth 5.3 calling, notifications from WhatsApp, Instagram, and Facebook, and everyday activity tracking.',
    originalPrice: 3300,
    salePrice: 2500,
    availability: 'in_stock',
    isFeatured: true,
    disclaimer: 'Notice: Health-related functions (heart rate, blood pressure, blood oxygen, ECG, sleep) are designed strictly for general fitness and activity tracking purposes, and are not medical devices or intended for clinical diagnosis.',
    variants: [
      {
        id: 'var-06-black',
        name: 'Black Silicone',
        colorCode: '#18181B',
        inStock: true
      }
    ],
    images: [
      {
        url: '/images/products/i9-ultra-max.png',
        alt: 'I9 Ultra Max Smart Watch in Black Zinc Alloy with Ocean Strap'
      }
    ],
    features: [
      '2.19-inch IPS full-touch display (240 × 296 resolution)',
      'Bluetooth 5.3 voice calling with phonebook and call records',
      'WhatsApp, Instagram, and Facebook social notifications',
      'Activity tracking: 7 sport modes, step counter, calories, sedentary alert',
      'Heart-rate, blood-oxygen, blood-pressure & sleep monitoring',
      'IP67 water resistance rating',
      'Always-on display & raise-to-wake function',
      'AI voice assistant, calendar, calculator, and games'
    ],
    specifications: [
      { label: 'WATCH HEAD DIMENSIONS', value: '48.1 × 44.6 × 14 mm' },
      { label: 'BAND WIDTH', value: '22 mm' },
      { label: 'WEIGHT', value: '60 g' },
      { label: 'DISPLAY', value: '2.19-inch IPS' },
      { label: 'RESOLUTION', value: '240 × 296' },
      { label: 'INTERACTION', value: 'Full-touch Screen' },
      { label: 'FRONT SHELL', value: 'Zinc Alloy' },
      { label: 'BACK CASE', value: 'Black ABS + PC' },
      { label: 'STRAP', value: 'Silicone' },
      { label: 'CPU', value: 'JL7011' },
      { label: 'G-SENSOR', value: 'SC7A20E' },
      { label: 'HEART-RATE SENSOR', value: 'Tianyi Hexin HSR3300' },
      { label: 'BLUETOOTH', value: '5.3 + 5.3 LE + Basic' },
      { label: 'BATTERY', value: '200 mAh Lithium Battery' },
      { label: 'STANDBY DURATION', value: '10–15 Days' },
      { label: 'WORKING DURATION', value: '5–7 Days' },
      { label: 'CHARGING METHOD', value: 'Magnetic Charging' },
      { label: 'INTERNAL FLASH', value: '64 MB' },
      { label: 'WATER RESISTANCE', value: 'IP67' },
      { label: 'COMPANION APP', value: 'FitPro' }
    ],
    packageContents: [
      '1 × I9 Ultra Max Smart Watch',
      '1 × Magnetic Charging Cable',
      '1 × User Manual'
    ]
  },
  {
    id: 'prod-07',
    itemNumber: 7,
    name: 'T900 Ultra 2 Smart Watch — Series 9',
    slug: 't900-ultra-2-smart-watch-series-9',
    category: 'Smart Watches',
    shortStatement: 'High-res 320×386 display, zinc alloy chassis, triple-button layout.',
    description: 'An affordable fitness and everyday smartwatch featuring a 2.19-inch IPS panel with 320 × 386 resolution. Encased in zinc alloy with a three-button tactile system (side button, rotary encoder, motion button) and wireless charging.',
    originalPrice: 3500,
    salePrice: 2000,
    availability: 'in_stock',
    isFeatured: true,
    disclaimer: 'Notice: Health and fitness metrics are for personal wellness tracking only and not certified for medical diagnostic use.',
    variants: [
      {
        id: 'var-07-orange',
        name: 'Orange',
        colorCode: '#FF5500',
        inStock: true
      },
      {
        id: 'var-07-black',
        name: 'Black',
        colorCode: '#18181B',
        inStock: true
      },
      {
        id: 'var-07-white',
        name: 'White',
        colorCode: '#F4F4F5',
        inStock: true
      }
    ],
    images: [
      {
        url: '/images/products/t900-ultra-2.png',
        alt: 'T900 Ultra 2 Smart Watch Series 9 with Metallic Link Bracelet'
      }
    ],
    features: [
      'High-resolution 2.19-inch IPS screen (320 × 386 pixels)',
      'Triple hardware control: Rotary Encoder + Side Button + Motion Button',
      'Bluetooth 5.0 calling with built-in speaker and microphone',
      'Heart-rate tracking, pedometer, and sleep monitoring',
      'Magnetic wireless charging cradle',
      'IP65 water resistance rating',
      'Universal OS compatibility (Android & iOS)'
    ],
    specifications: [
      { label: 'CHASSIS DIMENSIONS', value: '49 × 40 × 10.7 mm' },
      { label: 'CHASSIS MATERIAL', value: 'Zinc Alloy' },
      { label: 'PROCESSOR', value: 'YC1133' },
      { label: 'FLASH MEMORY', value: '32 MB + 32 MB' },
      { label: 'DISPLAY SPECIFICATION', value: '2.19-inch IPS Full-Touch' },
      { label: 'DISPLAY RESOLUTION', value: '320 × 386' },
      { label: 'SENSORS', value: 'G-sensor SC7A20, M-sensor, Tianyi Hexin HSR3300' },
      { label: 'BLUETOOTH', value: '5.0' },
      { label: 'HARDWARE BUTTONS', value: 'Side Button + Encoder + Motion Button' },
      { label: 'BATTERY CAPACITY', value: '360 mAh' },
      { label: 'AUDIO HARDWARE', value: 'Built-in Speaker, Receiver & Mic' },
      { label: 'CHARGING', value: 'Magnetic Wireless Charging' },
      { label: 'WATER INGRESS RATING', value: 'IP65' }
    ],
    packageContents: [
      '1 × T900 Ultra 2 Smart Watch',
      '1 × Wireless Charger',
      '1 × User Manual'
    ]
  },
  {
    id: 'prod-08',
    itemNumber: 8,
    name: 'T800 Ultra — Watch 8 Ultra',
    slug: 't800-ultra-watch-8-ultra',
    category: 'Smart Watches',
    shortStatement: 'Rugged titanium-style casing with working crown and ocean strap.',
    description: 'An Ultra-series smartwatch featuring a working rotary crown, dual built-in speakers, and full Bluetooth calling capabilities. Supplied with a flexible ribbed Ocean strap and magnetic wireless charging pad.',
    originalPrice: 3000,
    salePrice: 2000,
    availability: 'in_stock',
    isFeatured: true,
    disclaimer: 'Notice: Provided specifications reflect raw hardware declarations. Health sensors are meant solely for casual fitness tracking. Screen dimension specifications are listed as provided without alteration.',
    variants: [
      {
        id: 'var-08-orange',
        name: 'Orange',
        colorCode: '#FF5500',
        inStock: true
      },
      {
        id: 'var-08-black',
        name: 'Black',
        colorCode: '#18181B',
        inStock: true
      },
      {
        id: 'var-08-grey',
        name: 'Grey',
        colorCode: '#71717A',
        inStock: true
      },
      {
        id: 'var-08-green',
        name: 'Green',
        colorCode: '#22543D',
        inStock: true
      }
    ],
    images: [
      {
        url: '/images/products/t800-ultra.png',
        alt: 'T800 Ultra Watch 8 Ultra with Titanium-finish chassis and Sport Band'
      }
    ],
    features: [
      'Functional working crown dial and full-touch navigation',
      'Wireless magnetic charging',
      'Bluetooth calling with dual built-in speakers',
      'WhatsApp, Instagram, and Facebook notifications',
      'Activity tracking: steps, calories, heart-rate detection, sleep monitoring',
      '44 mm exchangeable ribbed Ocean strap',
      'Anti-loss reminder and Find Phone function'
    ],
    specifications: [
      { label: 'WATCH HEAD DIMENSIONS', value: '48.1 × 44.6 × 14 mm' },
      { label: 'BAND WIDTH', value: '22 mm (44 mm Exchangeable Slot)' },
      { label: 'WEIGHT', value: '60 g' },
      { label: 'DISPLAY LISTING', value: '2.19" IPS / 1.99" Full-Touch Panel' },
      { label: 'RESOLUTION', value: '240 × 296' },
      { label: 'BLUETOOTH', value: '3.0 / 4.0 / 5.0' },
      { label: 'AUDIO HARDWARE', value: 'Two Built-in Speakers' },
      { label: 'CHARGING METHOD', value: 'Wireless Magnetic Charging' },
      { label: 'OS COMPATIBILITY', value: 'iOS & Android' }
    ],
    packageContents: [
      '1 × T800 Ultra Smart Watch',
      '1 × Ribbed Ocean Strap',
      '1 × Wireless Charger'
    ]
  }
];

export const CATEGORIES = ['All', 'Workspace', 'Audio', 'Smart Watches', 'Wearables'] as const;
