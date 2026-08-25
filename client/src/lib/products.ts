/** Dawn Ledger content model: concise, sensory product information for mobile-first shopping. */
export type Product = {
  id: string;
  name: string;
  origin: string;
  roast: string;
  notes: string;
  price: number;
  description: string;
  bestFor: string;
  image?: string;
  visual: string;
};

export const heroImage = "/manus-storage/morrow-hero-morning-coffee_f63847c5.jpg";
export const ethiopiaImage = "/manus-storage/morrow-product-ethiopia_edcfec8f.jpg";
export const ritualImage = "/manus-storage/morrow-brew-ritual_d16a3e26.jpg";
export const logoImage = "/manus-storage/morrow-logo-mark_baa48472.png";

export const products: Product[] = [
  {
    id: "ethiopia-bloom",
    name: "Ethiopia Bloom",
    origin: "Gedeb, Ethiopia",
    roast: "Light roast",
    notes: "Apricot · bergamot · tea",
    price: 14,
    description: "A clean, floral cup that opens gently with apricot sweetness and settles into a tea-like finish.",
    bestFor: "Filter brewing and slow weekend mornings",
    image: ethiopiaImage,
    visual: "ethiopia",
  },
  {
    id: "slow-morning",
    name: "Slow Morning",
    origin: "Huila, Colombia",
    roast: "Medium roast",
    notes: "Cocoa · red apple · almond",
    price: 13.5,
    description: "Round, familiar, and gently sweet, with enough fruit to keep every cup interesting.",
    bestFor: "Pour-over, cafetière, and an easy daily cup",
    image: ritualImage,
    visual: "morning",
  },
  {
    id: "gentle-start",
    name: "The Gentle Start",
    origin: "Minas Gerais, Brazil",
    roast: "Medium-light",
    notes: "Toffee · orange · hazelnut",
    price: 12.5,
    description: "An uncomplicated, comforting roast with soft orange brightness and a nutty finish.",
    bestFor: "Espresso, moka pot, or milk-based coffee",
    visual: "gentle",
  },
  {
    id: "blue-hour-decaf",
    name: "Blue Hour Decaf",
    origin: "Cauca, Colombia",
    roast: "Medium roast",
    notes: "Caramel · plum · cocoa nib",
    price: 13,
    description: "A syrupy decaf that keeps the ritual without the late-day rush, with plum-like fruit and cocoa depth.",
    bestFor: "After-dinner coffee and slower evenings",
    visual: "blue",
  },
  {
    id: "sundown",
    name: "Sundown",
    origin: "Antigua, Guatemala",
    roast: "Medium-dark",
    notes: "Brown sugar · cacao · spice",
    price: 13.75,
    description: "A deeper, more comforting profile with enough lift to remain clear rather than heavy.",
    bestFor: "Espresso, flat whites, and rainy afternoons",
    visual: "sundown",
  },
  {
    id: "field-notes",
    name: "Field Notes",
    origin: "Nyamasheke, Rwanda",
    roast: "Light roast",
    notes: "Blackberry · florals · cane sugar",
    price: 15,
    description: "Bright berry fruit and floral aromatics for anyone who enjoys a more expressive filter coffee.",
    bestFor: "V60, batch brew, and curious palates",
    visual: "field",
  },
  {
    id: "weekender",
    name: "Weekender",
    origin: "Kirinyaga, Kenya",
    roast: "Light-medium",
    notes: "Raspberry · citrus · honey",
    price: 15.5,
    description: "Lively but balanced, with raspberry brightness softened by a honey-like sweetness.",
    bestFor: "Long breakfasts and shared pots of coffee",
    visual: "weekender",
  },
  {
    id: "first-three",
    name: "First Three",
    origin: "A rotating trio",
    roast: "Discovery pack",
    notes: "Light · medium · deeper roast",
    price: 18,
    description: "Three 100g coffees selected to make your first Morrow & Roast order easy to explore.",
    bestFor: "Finding your usual cup without overthinking it",
    visual: "sampler",
  },
];

export const getProduct = (id: string) => products.find((product) => product.id === id);
export const formatPrice = (value: number) => `£${value.toFixed(2)}`;
