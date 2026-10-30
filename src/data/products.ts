import { Product, BundleTier } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'aurora-luxe',
    name: 'The Aurora Luxe Handbag',
    sku: 'RG-AU-001',
    category: 'Shoulder Bags',
    shortDescription: 'Sculpted from Italian calfskin leather with a signature brushed champagne turn-lock closure.',
    detailedDescription: 'The Aurora Luxe is the pinnacle of timeless craftsmanship. Hand-stitched from full-grain calfskin leather, it showcases architectural symmetry balanced with soft interior compartmentalization. Equipped with custom champagne-gold hardware and a detachable leather shoulder strap, it transitions effortlessly from power meetings to galas.',
    pricePKR: 38500,
    compareAtPricePKR: 45000,
    discountPercent: 14,
    images: [
      '/src/assets/images/product_aurora_luxe_1793381777301.jpg',
      '/src/assets/images/hero_handbag_campaign_1793381774762.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Noir Black', hex: '#111111', inStock: true },
      { name: 'Champagne Gold', hex: '#D4AF66', inStock: true },
      { name: 'Bordeaux Red', hex: '#4A1525', inStock: true }
    ],
    sizes: ['Medium (28cm x 20cm x 11cm)'],
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 48,
    dimensions: '28 cm (W) × 20 cm (H) × 11 cm (D)',
    material: 'Full-Grain Italian Calfskin Leather',
    hardware: '24K Brushed Champagne Gold Galvanized Alloy',
    lining: 'Suede-finish microsuede lining in soft ivory',
    careInstructions: 'Protect from direct moisture and prolonged sun exposure. Use included microfiber dust bag when stored.'
  },
  {
    id: 'rose-signature-tote',
    name: 'The Rose Signature Tote',
    sku: 'RG-RS-002',
    category: 'Tote Bags',
    shortDescription: 'Dual-tone dusty rose and champagne leather tote adorned with an engraved heritage lock charm.',
    detailedDescription: 'Spacious yet exquisitely refined, The Rose Signature Tote features our signature monogram padlock and reinforced hand-burnished rolled handles. Crafted to carry laptops, tablets, and daily essentials with ease, it is designed for the modern woman who demands luxury and supreme functionality.',
    pricePKR: 44500,
    compareAtPricePKR: 52000,
    discountPercent: 14,
    images: [
      '/src/assets/images/product_rose_signature_1793381777449.jpg',
      '/src/assets/images/hero_handbag_collection_1793381775635.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Dusty Rose & Champagne', hex: '#B87B84', inStock: true },
      { name: 'Classic Ivory', hex: '#F0ECE1', inStock: true },
      { name: 'Midnight Onyx', hex: '#18181A', inStock: true }
    ],
    sizes: ['Large (38cm x 28cm x 14cm)'],
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewCount: 64,
    dimensions: '38 cm (W) × 28 cm (H) × 14 cm (D)',
    material: 'Supple Double-Tanned French Calfskin',
    hardware: 'Engraved Rose & Gold Monogram Padlock & Key',
    lining: 'Water-resistant jacquard silk-blend lining',
    careInstructions: 'Spot clean gently with a damp luxury leather cloth. Store upright with tissue stuffing.'
  },
  {
    id: 'golden-muse-shoulder',
    name: 'The Golden Muse Shoulder Bag',
    sku: 'RG-GM-003',
    category: 'Shoulder Bags',
    shortDescription: 'Chevron quilted metallic champagne leather with a sliding jewelry-grade gourmette chain strap.',
    detailedDescription: 'Turn heads at every soiree with The Golden Muse. Its chevron quilted leather captures low evening light, while the solid gold-toned chain strap can be worn single for a long drop or doubled for a chic shoulder length. Finished with our signature lock clasp and internal zippered security compartment.',
    pricePKR: 36000,
    compareAtPricePKR: 42000,
    discountPercent: 14,
    images: [
      '/src/assets/images/product_golden_muse_1793381796640.jpg',
      '/src/assets/images/hero_handbag_campaign_1793381774762.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#D4AF66', inStock: true },
      { name: 'Onyx Quilted', hex: '#141414', inStock: true },
      { name: 'Silver Moon', hex: '#C0C0C0', inStock: false }
    ],
    sizes: ['Medium (26cm x 17cm x 8cm)'],
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 37,
    dimensions: '26 cm (W) × 17 cm (H) × 8 cm (D)',
    material: 'Metallic lambskin with chevron artisanal quilting',
    hardware: 'Jewelry-polished Gourmette Chain & Push Lock',
    lining: 'Burgundy grosgrain interior with dual card pockets',
    careInstructions: 'Avoid friction with abrasive fabrics to preserve metallic foil finish.'
  },
  {
    id: 'bella-everyday-bag',
    name: 'The Bella Everyday Bag',
    sku: 'RG-BE-004',
    category: 'Crossbody Bags',
    shortDescription: 'Deep bordeaux smooth leather doctor satchel silhouette with top zip and adjustable strap.',
    detailedDescription: 'The Bella is designed for effortless day-to-night movement. With its structured Boston doctor-bag profile, extended double-pull zipper, and rich wine undertones, it comfortably houses your phone, wallet, cosmetics, and keys while resting lightly on your shoulder or hand.',
    pricePKR: 32000,
    compareAtPricePKR: 37500,
    discountPercent: 15,
    images: [
      '/src/assets/images/product_bella_everyday_1793381818001.jpg',
      '/src/assets/images/hero_handbag_campaign_1793381774762.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Bordeaux Wine', hex: '#521422', inStock: true },
      { name: 'Caramel Tan', hex: '#9E5B32', inStock: true },
      { name: 'Classic Black', hex: '#191919', inStock: true }
    ],
    sizes: ['Classic (27cm x 18cm x 13cm)'],
    inStock: true,
    stockCount: 19,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 52,
    dimensions: '27 cm (W) × 18 cm (H) × 13 cm (D)',
    material: 'Semi-aniline full grain box leather',
    hardware: 'Heavyweight brass buckles and engraved pullers',
    lining: 'Soft cotton twill in antique cream',
    careInstructions: 'Apply organic leather balm once every season to retain suppleness.'
  },
  {
    id: 'celeste-evening-clutch',
    name: 'The Celeste Evening Clutch',
    sku: 'RG-CE-005',
    category: 'Evening Bags',
    shortDescription: 'Pleated lustrous silk satin clutch crowned with a radiant crystal and gold rosette brooch clasp.',
    detailedDescription: 'The Celeste is wearable jewelry. Featuring couture hand-pleated black duchess satin framed in architectural gold alloy and adorned with a brilliant multi-faceted Austrian crystal brooch, it commands instant fascination. Includes a concealable fine gold drop chain.',
    pricePKR: 29500,
    compareAtPricePKR: 35000,
    discountPercent: 16,
    images: [
      '/src/assets/images/product_celeste_evening_1793381797334.jpg',
      '/src/assets/images/hero_handbag_collection_1793381775635.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Midnight Satin & Crystal', hex: '#0B0B0D', inStock: true },
      { name: 'Emerald Velvet', hex: '#0D3823', inStock: true },
      { name: 'Pearl Champagne', hex: '#EBE5D8', inStock: true }
    ],
    sizes: ['Evening (22cm x 13cm x 6cm)'],
    inStock: true,
    stockCount: 7,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 29,
    dimensions: '22 cm (W) × 13 cm (H) × 6 cm (D)',
    material: 'Heavyweight Silk-Satin & Hand-Set Crystals',
    hardware: 'Sculpted Golden Box Minaudière Clasp',
    lining: 'Mulberry silk satin lining with slip mirror pocket',
    careInstructions: 'Keep away from liquids and sprays. Store in the velvet presentation box.'
  },
  {
    id: 'royal-crossbody-bag',
    name: 'The Royal Crossbody Bag',
    sku: 'RG-RC-006',
    category: 'Crossbody Bags',
    shortDescription: 'Architectural saddle silhouette in forest emerald leather with signature keyhole clasp.',
    detailedDescription: 'A classic equestrian saddle silhouette reinterpreted for royalty. Cut from smooth British bridle leather in royal forest emerald and framed with bevelled edges and champagne-gold hardware, The Royal Crossbody embodies quiet confidence and aristocratic grace.',
    pricePKR: 35000,
    compareAtPricePKR: 41000,
    discountPercent: 15,
    images: [
      '/src/assets/images/product_royal_crossbody_1793381797486.jpg',
      '/src/assets/images/hero_handbag_campaign_1793381774762.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Royal Emerald', hex: '#114B32', inStock: true },
      { name: 'Cognac Saddle', hex: '#874D28', inStock: true },
      { name: 'Obsidian Black', hex: '#161618', inStock: true }
    ],
    sizes: ['Crossbody (24cm x 19cm x 9cm)'],
    inStock: true,
    stockCount: 14,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 31,
    dimensions: '24 cm (W) × 19 cm (H) × 9 cm (D)',
    material: 'Hand-glazed smooth bridle saddle leather',
    hardware: 'Engraved Brushed Champagne Gold Lock Buckle',
    lining: 'Raw interior split leather with bonded slip pocket',
    careInstructions: 'Natural patina develops with time. Buff with dry soft flannel.'
  },
  {
    id: 'sophia-classic-tote',
    name: 'The Sophia Classic Tote',
    sku: 'RG-SC-007',
    category: 'Tote Bags',
    shortDescription: 'Structured grain leather everyday shopper with gold hardware feet and discreet inner zip pouch.',
    detailedDescription: 'The definitive executive tote. The Sophia combines architectural lines with resilient textured calfskin that resists daily scratches. Fitted with reinforced handle studs, protective gold metal feet, and an internal suede security clutch, it delivers effortless poise from boardroom to airport lounge.',
    pricePKR: 42000,
    compareAtPricePKR: 49000,
    discountPercent: 14,
    images: [
      '/src/assets/images/product_sophia_tote_1793381818304.jpg',
      '/src/assets/images/hero_handbag_campaign_1793381774762.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Graphite Black', hex: '#1F2022', inStock: true },
      { name: 'Taupe Stone', hex: '#8F857D', inStock: true },
      { name: 'Navy Midnight', hex: '#1A233A', inStock: false }
    ],
    sizes: ['Large (36cm x 29cm x 15cm)'],
    inStock: true,
    stockCount: 10,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 42,
    dimensions: '36 cm (W) × 29 cm (H) × 15 cm (D)',
    material: 'Scratch-resistant textured pebbled calfskin',
    hardware: 'Subtle debossed gold foil logo & reinforced hardware',
    lining: 'Signature micro-twill with padded laptop divider',
    careInstructions: 'Wipe clean with a damp microfiber cloth.'
  },
  {
    id: 'elise-mini-bag',
    name: 'The Élise Mini Bag',
    sku: 'RG-EM-008',
    category: 'Evening Bags',
    shortDescription: 'Petite structured ivory pebble leather micro bag with round button lock and elegant strap.',
    detailedDescription: 'Delicate in proportion yet monumental in attitude, The Élise Mini is handcrafted from buttery ivory pebbled leather. Features an arched top handle and our signature disc turn-lock. Perfect for modern essentials: your smartphone, lipstick, cards, and compact.',
    pricePKR: 28000,
    compareAtPricePKR: 33000,
    discountPercent: 15,
    images: [
      '/src/assets/images/product_elise_mini_1793381797909.jpg',
      '/src/assets/images/hero_handbag_collection_1793381775635.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Alabaster Ivory', hex: '#F4EFE6', inStock: true },
      { name: 'Rosewater Pink', hex: '#DFB3B6', inStock: true },
      { name: 'Onyx Noir', hex: '#121212', inStock: true }
    ],
    sizes: ['Petite (20cm x 15cm x 8cm)'],
    inStock: true,
    stockCount: 16,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 22,
    dimensions: '20 cm (W) × 15 cm (H) × 8 cm (D)',
    material: 'Milled French pebbled calf leather',
    hardware: 'Circular brushed champagne gold turn-lock',
    lining: 'Ivory velour lining with embossed card compartment',
    careInstructions: 'Avoid prolonged contact with dark denim or unwashed dyes.'
  },
  {
    id: 'grace-premium-handbag',
    name: 'The Grace Premium Handbag',
    sku: 'RG-GP-009',
    category: 'Shoulder Bags',
    shortDescription: 'Cognac tan leather flap bag with circular brushed gold lock and gourmette strap.',
    detailedDescription: 'A tribute to classical luxury, The Grace balances rich caramel cognac tones with an iconic circular brushed gold front lock. With dual compartments and an ergonomic rolled top handle, it embodies understated royalty for the discerning modern collector.',
    pricePKR: 39500,
    compareAtPricePKR: 46000,
    discountPercent: 14,
    images: [
      '/src/assets/images/product_grace_premium_1793381818687.jpg',
      '/src/assets/images/hero_handbag_campaign_1793381774762.jpg',
      '/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg'
    ],
    colors: [
      { name: 'Cognac Caramel', hex: '#995629', inStock: true },
      { name: 'Espresso Brown', hex: '#3B271F', inStock: true },
      { name: 'Champagne Tan', hex: '#C29F6C', inStock: true }
    ],
    sizes: ['Standard (29cm x 21cm x 11cm)'],
    inStock: true,
    stockCount: 11,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewCount: 56,
    dimensions: '29 cm (W) × 21 cm (H) × 11 cm (D)',
    material: 'Vegetable-tanned artisanal Italian leather',
    hardware: 'Iconic Circular Gold Medallion Lock & Chain',
    lining: 'Warm beige suedette with dual gusset pockets',
    careInstructions: 'Condition twice annually with natural beeswax conditioner.'
  }
];

export const BUNDLE_TIERS: BundleTier[] = [
  {
    id: 'bundle-1',
    title: 'Individual Luxury',
    tagline: 'Select any 1 Handbag',
    quantity: 1,
    discountPercent: 0,
    isRecommended: false,
    savingsLabel: 'Standard Single Product Price'
  },
  {
    id: 'bundle-2',
    title: 'The Duo Ensemble',
    tagline: 'Select any 2 Handbags',
    quantity: 2,
    discountPercent: 10,
    isRecommended: true,
    badge: 'MOST POPULAR',
    savingsLabel: 'Save 10% on your combined order'
  },
  {
    id: 'bundle-3',
    title: 'The Haute Trio',
    tagline: 'Select any 3 Handbags',
    quantity: 3,
    discountPercent: 15,
    isRecommended: false,
    badge: 'BEST VALUE',
    savingsLabel: 'Save 15% on your combined order'
  }
];

export const COLLECTIONS = [
  {
    name: 'Shoulder Bags',
    slug: 'shoulder-bags',
    category: 'Shoulder Bags',
    description: 'Sculpted silhouettes with jewelry-grade straps for seamless day-to-evening transitions.',
    image: '/src/assets/images/product_aurora_luxe_1793381777301.jpg',
    count: 3
  },
  {
    name: 'Tote Bags',
    slug: 'tote-bags',
    category: 'Tote Bags',
    description: 'Architectural volumes crafted to effortlessly house executive and daily essentials.',
    image: '/src/assets/images/product_rose_signature_1793381777449.jpg',
    count: 2
  },
  {
    name: 'Crossbody Bags',
    slug: 'crossbody-bags',
    category: 'Crossbody Bags',
    description: 'Hands-free versatility in timeless saddle and satchel profiles.',
    image: '/src/assets/images/product_royal_crossbody_1793381797486.jpg',
    count: 2
  },
  {
    name: 'Evening Bags',
    slug: 'evening-bags',
    category: 'Evening Bags',
    description: 'Jeweled clasps, couture satin, and petite frames created for celebratory galas.',
    image: '/src/assets/images/product_celeste_evening_1793381797334.jpg',
    count: 2
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Lady Vivienne Sterling',
    location: 'London, UK',
    productName: 'The Aurora Luxe Handbag',
    quote: 'The craftsmanship of the Aurora Luxe matches bespoke Parisian houses I have collected for decades. The champagne gold hardware has the exact warm, quiet brilliance a luxury bag must have.',
    rating: 5,
    verifiedPurchase: true
  },
  {
    id: 't-2',
    name: 'Amina Al-Mansoor',
    location: 'Dubai, UAE',
    productName: 'The Rose Signature Tote',
    quote: 'Arrived packaged in a velvet dust box with gold ribbon. The leather quality is remarkable—soft to the touch yet remarkably structured. Rose & Gold is truly in a league of its own.',
    rating: 5,
    verifiedPurchase: true
  },
  {
    id: 't-3',
    name: 'Clara Delacroix',
    location: 'Toronto, Canada',
    productName: 'The Golden Muse Shoulder Bag',
    quote: 'The bundle discount was so compelling I ordered The Golden Muse and The Bella satchel. Both are showstoppers; I receive compliments every time I wear them.',
    rating: 5,
    verifiedPurchase: true
  }
];
