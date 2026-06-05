# 🔍 PriceHunt – Smart Product Price Comparison Website

A fully deployable, production-ready static website for comparing product prices across multiple e-commerce stores (Amazon, Flipkart, Croma, and more).

---

## 📁 Project Structure

```
pricehunt/
├── index.html            ← Home page (search, browse, filter)
├── css/
│   └── style.css         ← Full stylesheet (dark theme, responsive)
├── js/
│   ├── config.js         ← 🔑 RapidAPI key & settings (edit this first)
│   ├── data.js           ← Demo/fallback product data
│   ├── api.js            ← RapidAPI integration layer
│   ├── store.js          ← State management (localStorage)
│   ├── ui.js             ← Reusable UI helpers & rendering
│   └── main.js           ← Home page controller
└── pages/
    ├── compare.html      ← Side-by-side product comparison
    ├── wishlist.html     ← Saved products
    ← alerts.html        ← Price alert management
    └── auth.html         ← Sign In / Sign Up
```

---

## 🚀 Deployment: GitHub Pages (Step-by-Step)

### Step 1 – Create a GitHub repository
1. Go to https://github.com/new
2. Name it `pricehunt` (or any name)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 – Upload project files
```bash
# Option A: via GitHub Desktop or drag-and-drop on github.com

# Option B: via Git CLI
git init
git add .
git commit -m "Initial PriceHunt project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pricehunt.git
git push -u origin main
```

### Step 3 – Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select branch: `main`, folder: `/ (root)`
3. Click **Save**
4. Your site will be live at: `https://YOUR_USERNAME.github.io/pricehunt/`

---

## 🔑 Connecting RapidAPI (Live Prices)

### Step 1 – Get your API key
1. Sign up at https://rapidapi.com
2. Search for **"Real-Time Product Search"** by letscrape
3. Subscribe to the **Basic (free)** plan
4. Copy your **X-RapidAPI-Key**

### Step 2 – Add it to the project
Open `js/config.js` and update:

```javascript
const CONFIG = {
  RAPIDAPI_KEY: "YOUR_KEY_HERE",   // ← paste here
  USE_REAL_API: true,              // ← change to true
  ...
};
```

### Step 3 – Deploy again
Push your updated `config.js` to GitHub → Pages auto-rebuilds.

---

## ✨ Features

| Feature                               | Description                                  |
|---                                    |---                                           |
| **Live Price Search**                 | Searches RapidAPI or falls back to demo data |
| **Multi-Store Comparison**            | Amazon, Flipkart, Croma, brand stores        |
| **Best Price Highlight**              | Green highlight on lowest price per product  |
| **Price History Chart**               | 12-month mini bar chart per product          |
| **Wishlist**                          | Persistent across sessions (localStorage)    |
| **Compare Tool**                      | Side-by-side specs for up to 4 products      |
| **Price Alerts**                      | Set target price + email per product         |
| **Authentication UI**                 | Sign In / Sign Up / Social login (demo)      |
| **Search + Filter**                   | By category, deal type, text query           |
| **Sort**                              | Price, discount, rating, popularity          |
| **Grid / List view**                  | Toggle between layouts                       |
| **Responsive**                        | Mobile-first, works on all screen sizes      |
| **Dark theme**                        | Polished dark UI throughout                  |
| **Animated counters**                 | Stats bar animation on load                  |

---

## 🔌 Adding Real Email Alerts (Optional)

The alerts page stores alerts in localStorage. To send real emails:

### Option A – EmailJS (no backend needed)
1. Sign up at https://emailjs.com
2. Create a service + email template
3. Add to `js/config.js`:
   ```javascript
   EMAILJS_SERVICE_ID: "your_service_id",
   EMAILJS_TEMPLATE_ID: "your_template_id",
   EMAILJS_PUBLIC_KEY: "your_public_key",
   ```
4. In `js/store.js` `alerts.set()`, call `emailjs.send(...)` after saving

### Option B – FastAPI backend on Render
Deploy a FastAPI app that:
- Accepts POST `/alerts` with `{product_id, target_price, email}`
- Stores in SQLite
- Runs a cron job to check prices and send emails via SendGrid

---

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Tabler Icons (CDN)
- **Fonts**: Syne + DM Sans (Google Fonts)
- **State**: localStorage (no backend required)
- **API**: RapidAPI Real-Time Product Search
- **Deployment**: GitHub Pages (static hosting)

---



> Developed a full-stack Product Price Comparison Website enabling users to find the best deals across 28+ e-commerce platforms in real time. Built with Vanilla JavaScript, HTML5, and CSS3, integrated with RapidAPI's Real-Time Product Search API for live price aggregation. Key features include multi-store price comparison with best-price highlighting, 12-month price history charts, wishlist management, a side-by-side product comparison tool (up to 4 products), price alert system with email notification support, and user authentication UI. Implemented advanced search, category filtering, multi-criteria sorting, and grid/list view toggling. Deployed on GitHub Pages with full localStorage-based state persistence.

---

Built by Chetan | VBIT, Hyderabad
