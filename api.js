/**
 * PriceHunt – API Layer
 * Wraps RapidAPI "Real-Time Product Search" calls.
 * Falls back to DEMO_PRODUCTS when USE_REAL_API = false.
 */

const API = (() => {

  // ── Helpers ────────────────────────────────────────────────
  function fmt(n) {
    return CONFIG.CURRENCY_SYMBOL + Number(n).toLocaleString(CONFIG.LOCALE);
  }

  function inr(usd) {
    // Rough conversion; in production use a live FX API
    return Math.round(usd * 83.5);
  }

  /**
   * Map a RapidAPI product object → PriceHunt product shape.
   * The Real-Time Product Search API returns product offers with
   * store name, price, rating, etc.
   */
  function mapApiProduct(raw, index) {
    const offers = (raw.offers || []).slice(0, 3);
    const prices = offers.map(o => ({
      store: o.store_name || "Store",
      color: storeColor(o.store_name),
      url: o.offer_page_url || "#",
      price: inr(parseFloat(o.price) || 0),
    }));
    const bestPrice = prices.length
      ? Math.min(...prices.map(p => p.price))
      : inr(parseFloat(raw.typical_price_range?.[0]) || 0);
    const highPrice = prices.length
      ? Math.max(...prices.map(p => p.price))
      : bestPrice;
    const discount = highPrice > 0
      ? Math.round(((highPrice - bestPrice) / highPrice) * 100)
      : 0;

    return {
      id: raw.product_id || `api_${index}`,
      name: raw.product_title || "Unknown Product",
      cat: raw.product_type || "Electronics",
      emoji: catEmoji(raw.product_type),
      price: bestPrice,
      prices,
      rating: parseFloat(raw.product_star_rating) || 4.0,
      reviews: parseInt(raw.product_num_ratings) || 0,
      discount,
      badge: discount >= 20 ? "deal" : index < 3 ? "new" : "trending",
      thumbnail: raw.product_photo || "",
      specs: {},
      priceHistory: [],
    };
  }

  function storeColor(name = "") {
    const n = name.toLowerCase();
    if (n.includes("amazon"))   return "#FF9900";
    if (n.includes("flipkart")) return "#2874F0";
    if (n.includes("croma"))    return "#FF5E00";
    if (n.includes("samsung"))  return "#1428A0";
    if (n.includes("apple"))    return "#888888";
    if (n.includes("sony"))     return "#000080";
    if (n.includes("oneplus"))  return "#F5010C";
    return "#7C5CFC";
  }

  function catEmoji(type = "") {
    const t = type.toLowerCase();
    if (t.includes("phone") || t.includes("mobile")) return "📱";
    if (t.includes("laptop") || t.includes("computer")) return "💻";
    if (t.includes("headphone") || t.includes("audio") || t.includes("speaker")) return "🎧";
    if (t.includes("watch") || t.includes("wearable")) return "⌚";
    if (t.includes("camera")) return "📷";
    if (t.includes("tablet")) return "📱";
    if (t.includes("gaming")) return "🎮";
    return "🛍️";
  }

  // ── Public API ─────────────────────────────────────────────

  /**
   * Search products.
   * @param {string} query
   * @param {number} page  1-based
   * @returns {Promise<{products: Array, total: number}>}
   */
  async function searchProducts(query = "electronics", page = 1) {
    if (!CONFIG.USE_REAL_API) {
      // Filter demo data
      const q = query.toLowerCase();
      let filtered = DEMO_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        (p.specs.Brand || "").toLowerCase().includes(q)
      );
      if (!filtered.length) filtered = DEMO_PRODUCTS;
      return { products: filtered, total: filtered.length };
    }

    const url = `https://${CONFIG.RAPIDAPI_HOST}/search?q=${encodeURIComponent(query)}&country=in&language=en&page=${page}&limit=${CONFIG.PRODUCTS_PER_PAGE}&sort_by=BEST_MATCH`;
    const res = await fetch(url, {
      headers: {
        "X-RapidAPI-Key":  CONFIG.RAPIDAPI_KEY,
        "X-RapidAPI-Host": CONFIG.RAPIDAPI_HOST,
      },
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    const products = (data.data?.products || []).map(mapApiProduct);
    return { products, total: data.data?.total_products || products.length };
  }

  /**
   * Fetch product details (specs, price history etc.)
   */
  async function getProductDetails(productId) {
    if (!CONFIG.USE_REAL_API) {
      return DEMO_PRODUCTS.find(p => p.id == productId) || null;
    }
    const url = `https://${CONFIG.RAPIDAPI_HOST}/product-details?product_id=${productId}&country=in&language=en`;
    const res = await fetch(url, {
      headers: {
        "X-RapidAPI-Key":  CONFIG.RAPIDAPI_KEY,
        "X-RapidAPI-Host": CONFIG.RAPIDAPI_HOST,
      },
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();
    return data.data || null;
  }

  /**
   * Get all products for initial page load.
   */
  async function getAllProducts() {
    if (!CONFIG.USE_REAL_API) {
      return { products: DEMO_PRODUCTS, total: DEMO_PRODUCTS.length };
    }
    return searchProducts("best electronics india");
  }

  return { searchProducts, getProductDetails, getAllProducts, fmt };
})();
