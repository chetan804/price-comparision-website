/**
 * PriceHunt – UI Helpers
 */

const UI = (() => {

  // ── Toast ──────────────────────────────────────────────────
  let toastTimer;
  function toast(msg, type = "success") {
    const el   = document.getElementById("toast");
    const msgEl= document.getElementById("toastMsg");
    const icon = document.getElementById("toastIcon");
    if (!el) return;
    msgEl.textContent = msg;
    el.className = `toast${type === "error" ? " error" : ""}`;
    icon.className = type === "error"
      ? "ti ti-x toast-icon"
      : "ti ti-check toast-icon";
    el.style.color = type === "error" ? "var(--red)" : "var(--green)";
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }

  // ── Format helpers ─────────────────────────────────────────
  function fmt(n) {
    return CONFIG.CURRENCY_SYMBOL + Number(n).toLocaleString(CONFIG.LOCALE);
  }
  function stars(r) {
    const full = Math.floor(r);
    return "★".repeat(full) + "☆".repeat(5 - full);
  }
  function fmtReviews(n) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "k" : n;
  }

  // ── Price history mini chart ───────────────────────────────
  function priceHistChart(history) {
    if (!history || !history.length) return "";
    const max = Math.max(...history);
    const min = Math.min(...history);
    const range = max - min || 1;
    const bars = history.map(v => {
      const h = Math.round(((v - min) / range) * 80 + 10);
      const color = v === min ? "var(--green)" : "var(--accent)";
      return `<div style="flex:1;height:${h}%;background:${color};opacity:0.6;border-radius:2px 2px 0 0;min-height:4px"></div>`;
    }).join("");
    return `
      <div style="margin:0.5rem 0 0.25rem">
        <div style="font-size:0.68rem;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em">12-month price trend</div>
        <div style="background:var(--bg4);border-radius:8px;padding:8px 8px 0;height:56px;display:flex;align-items:flex-end;gap:2px">${bars}</div>
        <div style="display:flex;justify-content:space-between;font-size:0.68rem;color:var(--text3);margin-top:2px">
          <span>Low: ${fmt(min)}</span><span>High: ${fmt(max)}</span>
        </div>
      </div>`;
  }

  // ── Product Card ───────────────────────────────────────────
  function productCard(p, opts = {}) {
    const bestPrice = Math.min(...p.prices.map(x => x.price));
    const highPrice = Math.max(...p.prices.map(x => x.price));
    const savings = highPrice - bestPrice;
    const inWishlist = Store.wishlist.has(p.id);
    const inCompare  = Store.compare.has(p.id);
    const hasAlert   = Store.alerts.has(p.id);
    const badgeClass = { deal: "badge-deal", new: "badge-new", trending: "badge-trending" }[p.badge] || "badge-deal";
    const badgeText  = { deal: `-${p.discount}% OFF`, new: "NEW", trending: "TRENDING" }[p.badge] || "DEAL";

    const priceRows = p.prices.map(pr => `
      <div class="price-row">
        <span class="price-store">
          <span class="store-dot" style="background:${pr.color}"></span>
          ${pr.store}
        </span>
        <a href="${pr.url}" target="_blank" rel="noopener" class="price-val ${pr.price === bestPrice ? "price-best" : "price-high"}"
           onclick="event.stopPropagation()">${fmt(pr.price)}</a>
      </div>`).join("");

    const img = p.thumbnail
      ? `<img src="${p.thumbnail}" alt="${p.name}" loading="lazy" style="max-height:170px;max-width:100%;object-fit:contain"/>`
      : `<span class="card-emoji">${p.emoji}</span>`;

    return `
<article class="product-card" data-id="${p.id}" tabindex="0" role="listitem">
  <div class="card-img">
    <span class="card-badge ${badgeClass}">${badgeText}</span>
    <button class="wishlist-btn ${inWishlist ? "on" : ""}" data-action="wishlist" data-id="${p.id}"
            aria-label="${inWishlist ? "Remove from wishlist" : "Add to wishlist"}" title="Wishlist">
      <i class="ti ti-heart${inWishlist ? "-filled" : ""}" aria-hidden="true"></i>
    </button>
    ${img}
  </div>
  <div class="card-body">
    <div class="card-cat">${p.cat}</div>
    <div class="card-name">${p.name}</div>
    <div class="card-rating">
      <span class="stars" aria-label="${p.rating} out of 5">${stars(p.rating)}</span>
      <span class="rating-txt">${p.rating} (${fmtReviews(p.reviews)} reviews)</span>
    </div>
    <div class="price-list">${priceRows}</div>
    ${savings > 0 ? `<div class="discount-tag"><i class="ti ti-tag" aria-hidden="true"></i> Save up to ${fmt(savings)} (${p.discount}% off)</div>` : ""}
    ${opts.showHistory !== false ? priceHistChart(p.priceHistory) : ""}
    <div class="card-actions">
      <button class="btn-compare ${inCompare ? "added" : ""}" data-action="compare" data-id="${p.id}">
        ${inCompare ? "✓ Added" : "+ Compare"}
      </button>
      <button class="btn-bell ${hasAlert ? "alert-on" : ""}" data-action="alert" data-id="${p.id}"
              title="${hasAlert ? "Alert set" : "Set price alert"}" aria-label="Price alert">
        <i class="ti ti-bell${hasAlert ? "-ringing" : ""}" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</article>`;
  }

  // ── Compare bar ────────────────────────────────────────────
  function updateCompareBar(allProducts) {
    const bar   = document.getElementById("compareBar");
    const chips = document.getElementById("compareChips");
    if (!bar || !chips) return;
    const ids = Store.compare.ids();
    if (!ids.length) { bar.classList.remove("visible"); return; }
    bar.classList.add("visible");
    chips.innerHTML = ids.map(id => {
      const p = allProducts.find(x => x.id == id);
      if (!p) return "";
      return `<div class="compare-chip">
        ${p.emoji} ${p.name}
        <button onclick="Store.compare.remove(${p.id});UI.updateCompareBar(window._allProducts||[])" aria-label="Remove">×</button>
      </div>`;
    }).join("");
  }

  // ── Modal ──────────────────────────────────────────────────
  function openAlertModal(p) {
    const modal = document.getElementById("alertModal");
    const sub   = document.getElementById("modalSubtitle");
    const price = document.getElementById("alertPrice");
    const email = document.getElementById("alertEmail");
    const err   = document.getElementById("modalError");
    if (!modal) return;
    const best = Math.min(...p.prices.map(x => x.price));
    sub.textContent = `${p.name} — Best price now: ${fmt(best)}`;
    price.value = "";
    email.value = "";
    if (err) err.textContent = "";
    modal.dataset.productId = p.id;
    modal.classList.add("open");
    price.focus();
  }

  function closeModal() {
    const modal = document.getElementById("alertModal");
    if (modal) modal.classList.remove("open");
  }

  // ── Counter animation ──────────────────────────────────────
  function animateCounters() {
    document.querySelectorAll(".stat-num[data-target]").forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 1600;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        if (target >= 1000000) {
          el.textContent = (current / 1000000).toFixed(1) + "M+";
        } else if (target >= 1000) {
          el.textContent = "₹" + (current / 10000000).toFixed(1) + "Cr";
        } else {
          el.textContent = current + (target === 99 ? "%" : "");
        }
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }

  return { toast, fmt, stars, fmtReviews, productCard, updateCompareBar, openAlertModal, closeModal, animateCounters, priceHistChart };
})();
