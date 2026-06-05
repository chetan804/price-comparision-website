/**
 * PriceHunt – Demo / Fallback Data
 * Used when USE_REAL_API = false or API quota is exceeded.
 */

const DEMO_PRODUCTS = [
  {
    id: 1, name: "Sony WH-1000XM5", cat: "Audio", emoji: "🎧",
    price: 24999,
    prices: [
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in", price: 24999 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com", price: 26499 },
      { store: "Croma",   color: "#FF5E00", url: "https://croma.com", price: 27999 },
    ],
    rating: 4.8, reviews: 12400, discount: 28, badge: "deal",
    specs: { Brand:"Sony", Type:"Over-ear", ANC:"Yes", Battery:"30hr", Bluetooth:"5.2", Weight:"250g" },
    priceHistory: [28000,27500,26800,25999,25200,24999,24500,24999,25500,26000,25000,24999],
  },
  {
    id: 2, name: "iPhone 15 Pro Max", cat: "Phones", emoji: "📱",
    price: 132999,
    prices: [
      { store: "Apple",   color: "#888888", url: "https://apple.com/in", price: 134900 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in", price: 132999 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com", price: 133500 },
    ],
    rating: 4.9, reviews: 8720, discount: 5, badge: "trending",
    specs: { Brand:"Apple", Display:"6.7\" Super Retina XDR", Chip:"A17 Pro", Storage:"256GB", Camera:"48MP ProRAW", Battery:"4422mAh" },
    priceHistory: [134900,134500,133999,133500,133200,132999,133000,132800,132999,133200,133500,132999],
  },
  {
    id: 3, name: "Samsung Galaxy S24 Ultra", cat: "Phones", emoji: "📲",
    price: 97499,
    prices: [
      { store: "Samsung", color: "#1428A0", url: "https://samsung.com/in", price: 99999 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",      price: 97499 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com",   price: 98000 },
    ],
    rating: 4.7, reviews: 6340, discount: 12, badge: "deal",
    specs: { Brand:"Samsung", Display:"6.8\" Dynamic AMOLED", Chip:"Snapdragon 8 Gen 3", Storage:"256GB", Camera:"200MP", Battery:"5000mAh" },
    priceHistory: [109999,107000,104000,101000,99999,98500,97999,97499,98000,97500,97499,97499],
  },
  {
    id: 4, name: "MacBook Air M3", cat: "Laptops", emoji: "💻",
    price: 112999,
    prices: [
      { store: "Apple",   color: "#888888", url: "https://apple.com/in", price: 114900 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",    price: 112999 },
      { store: "Croma",   color: "#FF5E00", url: "https://croma.com",    price: 116000 },
    ],
    rating: 4.9, reviews: 4200, discount: 8, badge: "new",
    specs: { Brand:"Apple", Chip:"Apple M3", RAM:"8GB", Storage:"256GB SSD", Display:"13.6\" Liquid Retina", Battery:"18hr" },
    priceHistory: [119900,118000,116000,115500,114900,113500,112999,113000,112999,113500,114000,112999],
  },
  {
    id: 5, name: "Dell XPS 15", cat: "Laptops", emoji: "🖥️",
    price: 155000,
    prices: [
      { store: "Dell",    color: "#007DB8", url: "https://dell.com/en-in", price: 159990 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",      price: 155000 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com",   price: 157990 },
    ],
    rating: 4.6, reviews: 3100, discount: 15, badge: "deal",
    specs: { Brand:"Dell", CPU:"Intel Core i7-13700H", RAM:"16GB DDR5", Storage:"512GB NVMe", Display:"15.6\" OLED 3.5K", Battery:"86Whr" },
    priceHistory: [180000,175000,170000,165000,162000,159990,158000,155000,156000,155000,155000,155000],
  },
  {
    id: 6, name: "Apple Watch Series 9", cat: "Wearables", emoji: "⌚",
    price: 39999,
    prices: [
      { store: "Apple",   color: "#888888", url: "https://apple.com/in", price: 41900 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",    price: 39999 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com", price: 40500 },
    ],
    rating: 4.8, reviews: 9100, discount: 10, badge: "trending",
    specs: { Brand:"Apple", Display:"Always-On Retina", Chip:"S9 SiP", GPS:"Yes", WaterResist:"50m", Battery:"18hr" },
    priceHistory: [44900,43900,42900,42000,41900,41000,40500,39999,40200,39999,40000,39999],
  },
  {
    id: 7, name: "Sony A7 IV", cat: "Cameras", emoji: "📷",
    price: 204999,
    prices: [
      { store: "Sony",    color: "#000080", url: "https://sony.co.in",    price: 209990 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",     price: 204999 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com",  price: 207000 },
    ],
    rating: 4.9, reviews: 2300, discount: 7, badge: "new",
    specs: { Brand:"Sony", Sensor:"33MP Full-Frame BSI", "4K Video":"120fps", IBIS:"5-axis", AF:"Real-time Eye AF", Battery:"560 shots" },
    priceHistory: [219900,218000,215000,212000,210000,209990,208000,205000,204999,205000,204999,204999],
  },
  {
    id: 8, name: "JBL Flip 7", cat: "Audio", emoji: "🔊",
    price: 12999,
    prices: [
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",    price: 12999 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com", price: 13500 },
      { store: "JBL",     color: "#E87722", url: "https://in.jbl.com",   price: 14999 },
    ],
    rating: 4.6, reviews: 18700, discount: 35, badge: "deal",
    specs: { Brand:"JBL", Type:"Portable Speaker", Waterproof:"IP67", Battery:"12hr", Power:"30W", Bluetooth:"5.3" },
    priceHistory: [19999,18000,16500,15500,14999,14000,13500,12999,13200,12999,13000,12999],
  },
  {
    id: 9, name: "OnePlus 12", cat: "Phones", emoji: "📱",
    price: 62999,
    prices: [
      { store: "OnePlus", color: "#F5010C", url: "https://oneplus.in",   price: 64999 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",    price: 62999 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com", price: 63500 },
    ],
    rating: 4.7, reviews: 11200, discount: 18, badge: "trending",
    specs: { Brand:"OnePlus", Display:"6.82\" 2K AMOLED", Chip:"Snapdragon 8 Gen 3", Storage:"256GB", Camera:"50MP Hasselblad", Battery:"5400mAh" },
    priceHistory: [74999,72000,70000,68000,66000,64999,63500,62999,63000,62999,63000,62999],
  },
  {
    id: 10, name: "GoPro Hero 12", cat: "Cameras", emoji: "🎥",
    price: 34999,
    prices: [
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",    price: 34999 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com", price: 36000 },
      { store: "Croma",   color: "#FF5E00", url: "https://croma.com",    price: 37500 },
    ],
    rating: 4.6, reviews: 5400, discount: 22, badge: "deal",
    specs: { Brand:"GoPro", Video:"5.3K 60fps", Waterproof:"10m", Stabilization:"HyperSmooth 6.0", Battery:"156min", LCD:"Touch" },
    priceHistory: [44999,42000,40000,38000,36999,35999,34999,34500,34999,35000,34999,34999],
  },
  {
    id: 11, name: "Samsung Galaxy Watch 6", cat: "Wearables", emoji: "⌚",
    price: 22999,
    prices: [
      { store: "Samsung", color: "#1428A0", url: "https://samsung.com/in", price: 24999 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",      price: 22999 },
      { store: "Flipkart",color: "#2874F0", url: "https://flipkart.com",   price: 23500 },
    ],
    rating: 4.5, reviews: 6700, discount: 25, badge: "deal",
    specs: { Brand:"Samsung", Display:"1.5\" Super AMOLED", Health:"ECG, BIA, Sleep", GPS:"Yes", Battery:"40hr", WaterResist:"5ATM" },
    priceHistory: [30499,28000,27000,26000,25000,24999,24000,23500,22999,23000,22999,22999],
  },
  {
    id: 12, name: "Bose QuietComfort 45", cat: "Audio", emoji: "🎵",
    price: 25499,
    prices: [
      { store: "Bose",    color: "#000000", url: "https://bose.com/en_in", price: 26900 },
      { store: "Amazon",  color: "#FF9900", url: "https://amazon.in",      price: 25499 },
      { store: "Croma",   color: "#FF5E00", url: "https://croma.com",      price: 27000 },
    ],
    rating: 4.7, reviews: 7800, discount: 20, badge: "deal",
    specs: { Brand:"Bose", Type:"Over-ear", ANC:"Yes", Battery:"24hr", Bluetooth:"5.1", Weight:"238g" },
    priceHistory: [31900,30000,29000,28000,27000,26900,26500,25999,25499,25500,25499,25499],
  },
];
