// Verified brand facts and catalogue. Sources: docs/BRAND_RESEARCH.md, docs/PRODUCT_CATALOGUE_RESEARCH.md,
// and the owner's product list (2026-11-08). Do not add prices, sizes, ingredients or benefits here
// unless the owner has published them.

export const brand = {
  name: "Elixira Ayurveda",
  tagline: "Glow Naturally. Heal Deeply.",
  founder: "Dr. Syeda Tanzeel Saher",
  founderShort: "Dr. Tanzeel",
  qualifications: "BAMS, MD (Ayurveda)",
  phoneDisplay: "+91 70195 56628",
  phoneE164: "+917019556628",
  instagramHandle: "@elixira_ayurveda",
  instagramUrl: "https://www.instagram.com/elixira_ayurveda/",
  address: {
    line: "Near Nida College of Nursing, Haq Colony",
    city: "Bidar",
    region: "Karnataka",
    country: "IN",
  },
  hours: "9:00 am – 6:00 pm",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Nida+College+of+Nursing+Haq+Colony+Bidar",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${brand.phoneE164.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export type Product = {
  name: string;
  /** Only sizes the owner has published. */
  sizes?: string[];
};

export type Collection = {
  id: string;
  name: string;
  /** Short, claim-free description of what the collection is. */
  note: string;
  imageSlot: ImageSlotId;
  products: Product[];
};

// Face first, then hair, then body: the range is not a hair brand.
export const collections: Collection[] = [
  {
    id: "face-serums",
    name: "Face Serums",
    note: "Kumkumadi and botanical serums for the daily face ritual.",
    imageSlot: "C3",
    products: [
      { name: "Kumkumadi Face Serum" },
      { name: "24K Kumkumadi Face Serum" },
      { name: "Anti-acne Face Serum" },
      { name: "Premium Face Serum" },
      { name: "Glowing Face Serum" },
    ],
  },
  {
    id: "face-packs",
    name: "Face Packs",
    note: "Powder packs of saffron, coffee, cinnamon and herbs, mixed fresh.",
    imageSlot: "C4",
    products: [
      { name: "Kumkumadi Face Pack" },
      { name: "Saffron and Coffee Face Pack" },
      { name: "Cinnamon and Coffee Face Pack" },
      { name: "Anti-acne Face Pack" },
      { name: "Glowing Skin Face Pack" },
      { name: "Detan Face Pack" },
      { name: "Pigmentation and Spots Face Pack" },
    ],
  },
  {
    id: "gels",
    name: "Gels",
    note: "Light gels of sandalwood, rose, papaya and mulethi.",
    imageSlot: "C5",
    products: [
      { name: "Sandalwood Gel" },
      { name: "Rose Gel" },
      { name: "Papaya Gel" },
      { name: "Mulethi Gel" },
    ],
  },
  {
    id: "hair-oils",
    name: "Hair Oils",
    note: "Herbal hair oils, homemade in small batches.",
    imageSlot: "C1",
    products: [
      { name: "Premium Hair Oil", sizes: ["100 ml", "200 ml"] },
      { name: "Anti-hairfall Hair Oil" },
      { name: "Hair Oil for Volume" },
      { name: "Hair Oil for Shine" },
      { name: "Neem & Curry Leaves Hair Oil" },
      { name: "Black Seed Hair Oil" },
      { name: "Anti-Dandruff Hair Oil" },
      { name: "Hair Growth Oil" },
    ],
  },
  {
    id: "hair-care",
    name: "Hair Care",
    note: "A herbal hair pack and an Ayurvedic shampoo.",
    imageSlot: "C2",
    products: [{ name: "Herbal Hair Pack" }, { name: "Homemade Ayurvedic Shampoo" }],
  },
  {
    id: "soaps",
    name: "Soaps",
    note: "Hand-cut bars, from kumkumadi to goat milk.",
    imageSlot: "C6",
    products: [
      { name: "Kumkumadi Soap" },
      { name: "Orange Soap" },
      { name: "Neem & Tulsi Soap" },
      { name: "Goat Milk Soap" },
      { name: "Skin Brightening Soap" },
      { name: "Detan Soap" },
    ],
  },
  {
    id: "lips-body",
    name: "Lips & Body",
    note: "Lip balms and scrubs for face and body.",
    imageSlot: "C7",
    products: [
      { name: "Natural Lip Balms" },
      { name: "Premium Body Scrub" },
      { name: "Premium Face Scrub" },
    ],
  },
];

export const productCount = collections.reduce((n, c) => n + c.products.length, 0);

/**
 * Herb-to-bottle film chapters. Face, hair and body alternate. Every herb is named in the product's
 * own name or in a published ingredient list; `note` states only that link, never a benefit.
 */
export type Chapter = {
  area: "Face" | "Hair" | "Body";
  herb: string;
  latin: string;
  note: string;
  product: string;
  productSlot: ImageSlotId;
  collectionId: string;
  sizes?: string[];
  fact?: string;
};

export const chapters: Chapter[] = [
  {
    area: "Face",
    herb: "Kumkuma",
    latin: "Crocus sativus",
    note: "Kumkumadi takes its name from kumkuma, the Sanskrit word for saffron.",
    product: "Kumkumadi Face Serum",
    productSlot: "P1",
    collectionId: "face-serums",
  },
  {
    area: "Hair",
    herb: "Curry leaf",
    latin: "Murraya koenigii",
    note: "Named on the bottle, alongside neem.",
    product: "Neem & Curry Leaves Hair Oil",
    productSlot: "P2",
    collectionId: "hair-oils",
  },
  {
    area: "Face",
    herb: "Sandalwood",
    latin: "Santalum album",
    note: "The wood that gives the Sandalwood Gel its name.",
    product: "Sandalwood Gel",
    productSlot: "P3",
    collectionId: "gels",
  },
  {
    area: "Hair",
    herb: "Black seed",
    latin: "Nigella sativa",
    note: "Prepared into oil in small batches.",
    product: "Black Seed Hair Oil",
    productSlot: "P4",
    collectionId: "hair-oils",
  },
  {
    area: "Body",
    herb: "Neem & tulsi",
    latin: "Azadirachta indica · Ocimum tenuiflorum",
    note: "The two leaves named on the bar.",
    product: "Neem & Tulsi Soap",
    productSlot: "P5",
    collectionId: "soaps",
  },
];

/** Image slots: set `src` (and optionally `srcDesktop` for full-bleed stills) when the owner supplies a file.
 *  Generation prompts: docs/IMAGE_PROMPTS.md. */
export type ImageSlotId =
  | "H1" | "E1" | "E2" | "R1"
  | "P1" | "P2" | "P3" | "P4" | "P5"
  | "C1" | "C2" | "C3" | "C4" | "C5" | "C6" | "C7"
  | "G1" | "G2" | "G3" | "G4" | "G5" | "G6";

export type ImageSlot = {
  label: string;
  /** Portrait (mobile-first) file under /public. */
  src?: string;
  /** Optional landscape file for ≥1024px full-bleed stills. */
  srcDesktop?: string;
  alt?: string;
};

// Owner-generated product images (AI mockups of the brand's packaging), 2026-11-09.
// Originals: assets/brand-input/product-images/. The founder portrait (E1) is still to come.
const img = (file: string, alt: string) => ({ src: `/images/${file}`, alt });

export const imageSlots: Record<ImageSlotId, ImageSlot> = {
  H1: { label: "Hero still", ...img("hero-trio.webp", "Elixira Kumkumadi Face Serum, Premium Hair Oil and a handmade soap bar on dark slate with jasmine, saffron and a brass mortar") },
  E1: { label: "Founder portrait 4:5" },
  E2: { label: "Saffron and oil", ...img("saffron-oil-drop.webp", "A drop of oil falling from a dropper onto saffron threads in a brass bowl") },
  R1: { label: "Herbal Hair Pack", ...img("herbal-hair-pack.webp", "Elixira Herbal Hair Pack jar with herbal powder, hibiscus and amla") },
  P1: { label: "Kumkumadi Face Serum", ...img("kumkumadi-face-serum.webp", "Elixira Kumkumadi Face Serum dropper bottle with saffron and jasmine on dark stone") },
  P2: { label: "Neem & Curry Leaves Hair Oil", ...img("neem-curry-leaves-hair-oil.webp", "Elixira Neem & Curry Leaves Hair Oil bottle among neem and curry leaves") },
  P3: { label: "Sandalwood Gel", ...img("sandalwood-gel.webp", "Open jar of Elixira Premium Sandalwood Gel beside sandalwood sticks") },
  P4: { label: "Black Seed Hair Oil", ...img("black-seed-hair-oil.webp", "Elixira Black Seed Hair Oil bottle with black seeds and nigella flowers") },
  P5: { label: "Neem & Tulsi Soap", ...img("neem-tulsi-soap.webp", "Elixira Neem & Tulsi Soap box and green soap bar with neem and tulsi leaves") },
  C1: { label: "Hair Oils", ...img("premium-hair-oil.webp", "Elixira Premium Hair Oil bottle with hibiscus and amla") },
  C2: { label: "Hair Care", ...img("herbal-hair-shampoo.webp", "Elixira Herbal Hair Shampoo pump bottle with hibiscus and herbs") },
  C3: { label: "Face Serums", ...img("24k-kumkumadi-face-serum.webp", "Elixira 24K Kumkumadi Face Serum dropper bottle with saffron") },
  C4: { label: "Face Packs", ...img("saffron-coffee-face-pack.webp", "Elixira Saffron & Coffee Face Pack jar with saffron and coffee beans") },
  C5: { label: "Gels", ...img("rose-gel.webp", "Open jar of Elixira Rose Gel with roses and petals") },
  C6: { label: "Soaps", ...img("kumkumadi-soap.webp", "Elixira Kumkumadi Soap box and bar with saffron and roses") },
  C7: { label: "Lips & Body", ...img("premium-body-scrub.webp", "Open jar of Elixira Premium Body Scrub with coffee beans and coconut") },
  G1: { label: "Detan Soap", ...img("detan-soap.webp", "Elixira Detan Soap box and bar") },
  G2: { label: "Papaya Gel", ...img("papaya-gel.webp", "Open jar of Elixira Papaya Gel with papaya") },
  G3: { label: "Orange Soap", ...img("orange-soap.webp", "Elixira Orange Soap box and bar with oranges") },
  G4: { label: "Glowing Skin Face Pack", ...img("glowing-skin-face-pack.webp", "Elixira Glowing Skin Face Pack jar with roses and turmeric") },
  G5: { label: "Goat Milk Soap", ...img("goat-milk-soap.webp", "Elixira Goat Milk Soap box and bar with milk") },
  G6: { label: "Skin Brightening Soap", ...img("skin-brightening-soap.webp", "Elixira Skin Brightening Soap box and bar with saffron") },
};

export const navLinks = [
  { href: "#formulas", label: "Formulas" },
  { href: "#collections", label: "Collections" },
  { href: "#ritual", label: "Ritual" },
  { href: "#practice", label: "Our practice" },
] as const;

/** Lets any "see the collection" link open the matching tab in the Collections section. */
export const OPEN_COLLECTION_EVENT = "elixira:open-collection";
