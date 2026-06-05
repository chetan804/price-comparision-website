/**
 * PriceHunt – Main (index.html)
 */

(async () => {
  let allProducts = [];
  let filteredProducts = [];
  let currentFilter = "all";
  let currentSort   = "relevance";
  let currentCat    = "all";
  let searchQuery   = "";
  let isListView    = false;
  let currentModal  = null;

  // expose for compare bar close btn
  window._allProducts = allProducts;

  const grid       = document.getElementById("productGrid");
  const searchInp  = document.getElementById("searchInput");
  const searchBtn  = document.getElementById("searchBtn");
  const sortSel    = document.getElementById("sortSelect");
  const gridBtn    = document.getElementById("gridBtn");
  const listBtn    = document.getElementById("listBtn");
  const filterGrp  = document.getElementById("filterGroup");
  const tagRow     = document.getElementById("tagRow");
  const compareBar = document.getElementById("compareBar");
  const modalSave  = document.getElementById("saveAlertBtn");
  const modalClose = document.getElementById("modalClose");
  const modalOverlay = document.getElementById("alertModal");
  const hamburger  = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const clearCompBtn = document.getElementById("compareClear");

  // ── Load products ──────────────────────────────────────────
  async function loadProducts(query) {
    grid.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Fetching best prices…</p></div>`;
    try {
      const { products } = await API[query ? "searchProducts" : "getAllProducts"](query);
      allProducts = products;
      window._allProducts = allProducts;
      applyFilters();
    } catch (e) {
      console.error(e);
      allProducts = DEMO_PRODUCTS;
      window._allProducts = allProducts;
      document.getElementById("apiBannerMsg").textContent =
        "API error – showing demo data. Check your key in js/config.js.";
      applyFilters();
    }
  }

  // ── Filter + Sort ──────────────────────────────────────────
  function applyFilters() {
    let list = [...allProducts];

    // category tag
    if (currentCat !== "all") list = list.filter(p => p.cat === currentCat);

    // deal filter
    if (currentFilter === "hot")      list = list.filter(p => p.discount >= 20);
    else if (currentFilter === "new") list = list.filter(p => p.badge === "new");
    else if (currentFilter === "trending") list = list.filter(p => p.badge === "trending");

    // sort
    if (currentSort === "price-asc")   list.sort((a,b) => a.price - b.price);
    else if (currentSort === "price-desc") list.sort((a,b) => b.price - a.price);
    else if (currentSort === "discount")   list.sort((a,b) => b.discount - a.discount);
    else if (currentSort === "rating")     list.sort((a,b) => b.rating - a.rating);
    else if (currentSort === "popular")    list.sort((a,b) => b.reviews - a.reviews);

    filteredProducts = list;
    renderGrid();
  }

  function renderGrid() {
    if (!filteredProducts.length) {
      grid.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><p>No products found. Try a different search.</p></div>`;
      return;
    }
    grid.className = `product-grid${isListView ? " list-view" : ""}`;
    grid.innerHTML = filteredProducts.map(p => UI.productCard(p)).join("");
    UI.updateCompareBar(allProducts);
    Store.syncBadges();
  }

  // ── Events: search ─────────────────────────────────────────
  let searchTimer;
  searchInp.addEventListener("input", e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { searchQuery = e.target.value.trim(); loadProducts(searchQuery); }, 420);
  });
  searchBtn.addEventListener("click", () => { searchQuery = searchInp.value.trim(); loadProducts(searchQuery); });
  searchInp.addEventListener("keydown", e => { if (e.key === "Enter") searchBtn.click(); });

  // ── Events: tags ───────────────────────────────────────────
  tagRow.addEventListener("click", e => {
    const btn = e.target.closest(".tag");
    if (!btn) return;
    tagRow.querySelectorAll(".tag").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    applyFilters();
  });

  // ── Events: filter pills ───────────────────────────────────
  filterGrp.addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterGrp.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("on"));
    btn.classList.add("on");
    currentFilter = btn.dataset.filter;
    applyFilters();
  });

  // ── Events: sort ───────────────────────────────────────────
  sortSel.addEventListener("change", () => { currentSort = sortSel.value; applyFilters(); });

  // ── Events: view toggle ────────────────────────────────────
  gridBtn.addEventListener("click", () => {
    isListView = false;
    gridBtn.classList.add("active"); listBtn.classList.remove("active");
    renderGrid();
  });
  listBtn.addEventListener("click", () => {
    isListView = true;
    listBtn.classList.add("active"); gridBtn.classList.remove("active");
    renderGrid();
  });

  // ── Events: card actions (wishlist, compare, alert) ────────
  grid.addEventListener("click", e => {
    const action = e.target.closest("[data-action]");
    if (!action) return;
    e.stopPropagation();
    const id = action.dataset.id;
    const p  = allProducts.find(x => x.id == id);
    if (!p) return;

    if (action.dataset.action === "wishlist") {
      Store.wishlist.toggle(id);
      UI.toast(Store.wishlist.has(id)
        ? `${p.name} added to wishlist ❤️`
        : `Removed from wishlist`, Store.wishlist.has(id) ? "success" : "error");
      renderGrid();
      Store.syncBadges();

    } else if (action.dataset.action === "compare") {
      const result = Store.compare.toggle(id);
      if (result === "full") {
        UI.toast(`Max ${CONFIG.MAX_COMPARE} products can be compared`, "error");
      } else {
        UI.toast(result === "added" ? `${p.name} added to compare` : `${p.name} removed from compare`,
                 result === "added" ? "success" : "error");
        renderGrid();
      }

    } else if (action.dataset.action === "alert") {
      currentModal = p;
      UI.openAlertModal(p);
    }
  });

  // ── Events: modal ──────────────────────────────────────────
  modalSave.addEventListener("click", () => {
    const price = document.getElementById("alertPrice").value.trim();
    const email = document.getElementById("alertEmail").value.trim();
    const err   = document.getElementById("modalError");
    if (!price || isNaN(price) || Number(price) <= 0) { err.textContent = "Please enter a valid price."; return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = "Please enter a valid email."; return; }
    err.textContent = "";
    Store.alerts.set(currentModal.id, { price: Number(price), email, name: currentModal.name, emoji: currentModal.emoji });
    UI.toast(`Alert set for ${currentModal.name} at ${UI.fmt(Number(price))}`);
    UI.closeModal();
    Store.syncBadges();
    renderGrid();
  });

  modalClose.addEventListener("click", UI.closeModal);
  modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) UI.closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") UI.closeModal(); });

  // ── Events: compare bar clear ──────────────────────────────
  if (clearCompBtn) {
    clearCompBtn.addEventListener("click", () => {
      Store.compare.clear();
      renderGrid();
    });
  }

  // ── Hamburger ──────────────────────────────────────────────
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  }

  // ── Counter animation on page load ─────────────────────────
  UI.animateCounters();

  // ── Init ───────────────────────────────────────────────────
  await loadProducts();
  Store.syncBadges();
})();
