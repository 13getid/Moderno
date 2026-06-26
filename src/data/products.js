export const newArrivals = [
  { id: 1, name: "Luna 3-Seater Sofa",   price: 799, category: "Living Room", image: "/images/products/sofa.jpg" },
  { id: 2, name: "Nova Coffee Table",    price: 199,  category: "Living Room", image: "/images/products/coffee-table.jpg" },
  { id: 3, name: "Elle Accent Chair",    price: 100,  category: "Living Room", image: "/images/products/accent-chair.jpg" },
  { id: 4, name: "Haven Sideboard",      price: 750,  category: "Living Room", image: "/images/products/sideboard.jpg" },
  { id: 5, name: "Woven Pendant Light",  price: 150,  category: "Decor",       image: "/images/products/pendant-light.jpg" },
]

export const allProducts = [
  // Living Room
  { id: 1,  name: "Luna 3-Seater Sofa",    price: 799, category: "Living Room", image: "/images/products/sofa.jpg" },
  { id: 2,  name: "Nova Coffee Table",     price: 199,  category: "Living Room", image: "/images/products/coffee-table.jpg" },
  { id: 3,  name: "Elle Accent Chair",     price: 100,  category: "Living Room", image: "/images/products/accent-chair.jpg" },
  { id: 4,  name: "Haven Sideboard",       price: 750,  category: "Living Room", image: "/images/products/sideboard.jpg" },
  { id: 5,  name: "Woven Pendant Light",   price: 150,  category: "Decor",       image: "/images/products/pendant-light.jpg" },
  // Bedroom
  { id: 6,  name: "Drift Bed Frame",       price: 90,  category: "Bedroom",     image: "/images/products/bed-frame.jpg" },
  { id: 7,  name: "Linen Bedside Table",   price: 200,  category: "Bedroom",     image: "/images/products/bedside-table.jpg" },
  { id: 8,  name: "Arch Floor Lamp",       price: 250,  category: "Bedroom",     image: "/images/products/floor-lamp.jpg" },
  // Dining Room
  { id: 9,  name: "Oak Dining Table",      price: 140, category: "Dining Room", image: "/images/products/dining-table.jpg" },
  { id: 10, name: "Rattan Dining Chair",   price: 280,  category: "Dining Room", image: "/images/products/dining-chair.jpg" },
  { id: 11, name: "Linen Pendant Set",     price: 200,  category: "Dining Room", image: "/images/products/dining-pendant.jpg" },
  // Office
  { id: 12, name: "Solid Oak Desk",        price: 850,  category: "Office",      image: "/images/products/desk.jpg" },
  { id: 13, name: "Ergonomic Desk Chair",  price: 550,  category: "Office",      image: "/images/products/desk-chair.jpg" },
  // Outdoor
  { id: 14, name: "Teak Garden Bench",     price: 480,  category: "Outdoor",     image: "/images/products/garden-bench.jpg" },
  { id: 15, name: "Rope Lounge Chair",     price: 600,  category: "Outdoor",     image: "/images/products/lounge-chair.jpg" },
]

export const categoryList = [
  "Living Room", "Bedroom", "Dining Room", "Office", "Outdoor", "Decor"
]

export const priceRanges = [
  { label: "Under KSh 30,000",        min: 0,      max: 30000 },
  { label: "KSh 30,000 – KSh 60,000",  min: 30000,  max: 60000 },
  { label: "KSh 60,000 – KSh 100,000", min: 60000,  max: 100000 },
  { label: "Over KSh 100,000",        min: 100000, max: Infinity },
]
