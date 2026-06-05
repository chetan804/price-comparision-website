/**
 * PriceHunt – Store (State Management)
 * All persistent state lives in localStorage.
 */

const Store = (() => {

  function load(key, fallback = []) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }

  // ── Wishlist ───────────────────────────────────────────────
  const wishlist = {
    ids() { return load(CONFIG.STORAGE.WISHLIST, []); },
    has(id) { return this.ids().includes(id); },
    add(id) {
      const ids = this.ids();
      if (!ids.includes(id)) { ids.push(id); save(CONFIG.STORAGE.WISHLIST, ids); }
    },
    remove(id) {
      save(CONFIG.STORAGE.WISHLIST, this.ids().filter(x => x !== id));
    },
    toggle(id) { this.has(id) ? this.remove(id) : this.add(id); },
    count() { return this.ids().length; },
  };

  // ── Compare ────────────────────────────────────────────────
  const compare = {
    ids() { return load(CONFIG.STORAGE.COMPARE, []); },
    has(id) { return this.ids().includes(id); },
    add(id) {
      const ids = this.ids();
      if (ids.length >= CONFIG.MAX_COMPARE) return false;
      if (!ids.includes(id)) { ids.push(id); save(CONFIG.STORAGE.COMPARE, ids); }
      return true;
    },
    remove(id) {
      save(CONFIG.STORAGE.COMPARE, this.ids().filter(x => x !== id));
    },
    toggle(id) {
      if (this.has(id)) { this.remove(id); return "removed"; }
      return this.add(id) ? "added" : "full";
    },
    clear() { save(CONFIG.STORAGE.COMPARE, []); },
    count() { return this.ids().length; },
  };

  // ── Alerts ─────────────────────────────────────────────────
  const alerts = {
    all() { return load(CONFIG.STORAGE.ALERTS, {}); },
    get(id) { return this.all()[id] || null; },
    set(id, data) {
      const a = this.all();
      a[id] = data;
      save(CONFIG.STORAGE.ALERTS, a);
    },
    remove(id) {
      const a = this.all();
      delete a[id];
      save(CONFIG.STORAGE.ALERTS, a);
    },
    has(id) { return !!this.get(id); },
    count() { return Object.keys(this.all()).length; },
  };

  // ── Auth (local demo only) ─────────────────────────────────
  const auth = {
    user() { return load(CONFIG.STORAGE.USER, null); },
    login(data) { save(CONFIG.STORAGE.USER, data); },
    logout() { localStorage.removeItem(CONFIG.STORAGE.USER); },
    isLoggedIn() { return !!this.user(); },
  };

  // ── Sync all nav badges ────────────────────────────────────
  function syncBadges() {
    const wlEl = document.getElementById("wl-count");
    const alEl = document.getElementById("alert-count");
    if (wlEl) wlEl.textContent = wishlist.count();
    if (alEl) alEl.textContent = alerts.count();
  }

  return { wishlist, compare, alerts, auth, syncBadges };
})();
