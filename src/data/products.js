export const newArrivals = [
  { id: 1, name: "Luna 3-Seater Sofa",   price: 799, category: "Living Room", emoji: "🛋️" },
  { id: 2, name: "Nova Coffee Table",    price: 299, category: "Living Room", emoji: "☕" },
  { id: 3, name: "Elle Accent Chair",    price: 349, category: "Living Room", emoji: "🪑" },
  { id: 4, name: "Haven Sideboard",      price: 599, category: "Living Room", emoji: "🗄️" },
  { id: 5, name: "Woven Pendant Light",  price: 129, category: "Decor",       emoji: "💡" },
]

export const allProducts = [
  // Living Room
  { id: 1,  name: "Luna 3-Seater Sofa",    price: 799, category: "Living Room", emoji: "🛋️" },
  { id: 2,  name: "Nova Coffee Table",     price: 299, category: "Living Room", emoji: "☕" },
  { id: 3,  name: "Elle Accent Chair",     price: 349, category: "Living Room", emoji: "🪑" },
  { id: 4,  name: "Haven Sideboard",       price: 599, category: "Living Room", emoji: "🗄️" },
  { id: 5,  name: "Woven Pendant Light",   price: 129, category: "Decor",       emoji: "💡" },
  // Bedroom
  { id: 6,  name: "Drift Bed Frame",        price: 899, category: "Bedroom",     emoji: "🛏️" },
  { id: 7,  name: "Linen Bedside Table",   price: 189, category: "Bedroom",     emoji: "🪴" },
  { id: 8,  name: "Arch Floor Lamp",       price: 219, category: "Bedroom",     emoji: "🔆" },
  // Dining Room
  { id: 9,  name: "Oak Dining Table",       price: 1099, category: "Dining Room", emoji: "🍽️" },
  { id: 10, name: "Rattan Dining Chair",   price: 249, category: "Dining Room", emoji: "🪑" },
  { id: 11, name: "Linen Pendant Set",     price: 179, category: "Dining Room", emoji: "💡" },
  // Office
  { id: 12, name: "Solid Oak Desk",         price: 649, category: "Office",      emoji: "🖥️" },
  { id: 13, name: "Ergonomic Desk Chair",  price: 449, category: "Office",      emoji: "💺" },
  // Outdoor
  { id: 14, name: "Teak Garden Bench",     price: 399, category: "Outdoor",     emoji: "🌿" },
  { id: 15, name: "Rope Lounge Chair",     price: 499, category: "Outdoor",     emoji: "🪢" },
]

export const categoryList = [
  "Living Room", "Bedroom", "Dining Room", "Office", "Outdoor", "Decor"
]

export const priceRanges = [
  { label: "Under $200",    min: 0,   max: 200 },
  { label: "$200 – $500",   min: 200, max: 500 },
  { label: "$500 – $1000",  min: 500, max: 1000 },
  { label: "Over $1000",    min: 1000, max: Infinity },
]