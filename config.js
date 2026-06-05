/**
 * PriceHunt – Configuration
 * ─────────────────────────
 * 1. Sign up at https://rapidapi.com
 * 2. Subscribe to "Real-Time Product Search" API
 *    (https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-product-search)
 * 3. Paste your key below and set USE_REAL_API = true
 */

const CONFIG = {
  // ── RapidAPI credentials ──────────────────────────────────
  RAPIDAPI_KEY: "YOUR_RAPIDAPI_KEY_HERE",      // ← replace this
  RAPIDAPI_HOST: "real-time-product-search.p.rapidapi.com",
  USE_REAL_API: false,                          // set true after adding key

  // ── Currency & locale ──────────────────────────────────────
  CURRENCY: "INR",
  LOCALE: "en-IN",
  CURRENCY_SYMBOL: "₹",

  // ── Pagination ─────────────────────────────────────────────
  PRODUCTS_PER_PAGE: 12,

  // ── Max compare slots ──────────────────────────────────────
  MAX_COMPARE: 4,

  // ── localStorage keys ─────────────────────────────────────
  STORAGE: {
    WISHLIST:  "ph_wishlist",
    COMPARE:   "ph_compare",
    ALERTS:    "ph_alerts",
    USER:      "ph_user",
  },
};
