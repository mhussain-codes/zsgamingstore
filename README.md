# ZS Gaming Store (Pakistan) 🎮⚡

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini_2.5_Flash-4285F4?style=flat-square&logo=google)](https://aistudio.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A premier, high-performance custom PC-building and gaming hardware e-commerce store engineered specifically for Pakistani gamers. Features an interactive 10-slot custom PC configurator with real-time socket and wattage compatibility checking, browsable prebuilt gaming systems with real FPS benchmarks, side-by-side component comparison, live order tracking, a local demo admin dashboard, and a server-side Google Gemini tech assistant grounded in live catalog data.

---

## 🌟 Key Highlights

- **⚡ Interactive Custom PC Builder:**
  - 10-component configurator (CPU, Motherboard, RAM, GPU, Storage, CPU Cooler, PSU, Case, Monitor, Peripherals).
  - **Live Compatibility Diagnostics:** Catches Socket AM5 vs LGA1700 mismatches, enforces DDR5 for AM5, verifies RAM support, computes dynamic system TDP with PSU wattage headroom warnings, and checks GPU clearance in chassis.
  - One-click *Add Custom Build to Cart* with parts breakdown.
- **🖥️ Prebuilt Gaming Rigs:**
  - 4 budget tiers: *Budget 1080p*, *Mid-Range 1440p*, *Enthusiast 4K*, and *Extreme Flagship*.
  - Real gaming FPS benchmark tables for *Cyberpunk 2077 (4K RT)*, *Black Myth: Wukong*, *Warzone*, and *CS2*.
- **🤖 Server-Side Google Gemini Hardware Specialist:**
  - Integrated via `@google/genai` on server-side route `/api/chat`.
  - Zero frontend key exposure (`GEMINI_API_KEY` in server-only environment).
  - Grounded directly in live catalog prices in PKR (Rs.), stock status, and FAQs.
  - Automatic fallback to local grounded knowledge assistant when offline or without an API key.
- **📦 Pakistan E-Commerce & Checkout:**
  - Localized address validation across all Pakistani provinces and 17+ cities (Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Multan, Faisalabad, Quetta, etc.).
  - Demo payment options: Direct Bank Transfer (IBFT - Meezan, HBL, Bank Alfalah), Cash on Delivery (COD), Easypaisa/JazzCash, and simulated demo card.
- **🚚 Live Order Tracking Pipeline:**
  - Visual 6-step build and courier tracking pipeline (*Order Confirmed* &rarr; *Component Serialization* &rarr; *Assembly & Cable Management* &rarr; *24h FurMark Stress Testing* &rarr; *Dispatched via TCS Express* &rarr; *Delivered*).
- **🛠️ Admin Control Panel (`/admin`):**
  - Add, edit, and delete products, live prices in PKR, and images.
  - Manage PC builds, store policies, FAQs, buying guides, and announcement banners.
  - Monitor demo orders and check Gemini AI connection status.
  - "Reset to Factory Catalog" button to restore initial seed data.

---

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/mhussain-codes/zsgamingstore.git
cd zsgamingstore

# Install dependencies
npm install

# (Optional) Add your Google Gemini API key to .env.local
cp .env.example .env.local
# Edit .env.local and add GEMINI_API_KEY=your_key_here

# Run development server
npm run dev

# Or create an optimized production build
npm run build
npm run start
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## ☁️ Deploying to Vercel

### Option 1: 1-Click Import via Vercel Web Dashboard (Recommended)
1. Go to **[vercel.com/new](https://vercel.com/new)**.
2. Sign in with GitHub and select the **`mhussain-codes/zsgamingstore`** repository.
3. In **Environment Variables**, add:
   - `GEMINI_API_KEY` = *(Your Gemini API key from Google AI Studio)*
4. Click **Deploy**. Vercel will build and assign you a live `.vercel.app` URL with free automated SSL.

### Option 2: Deploying via Vercel CLI
```bash
npx vercel login
npx vercel --prod
```

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.svg          # Original ZS Monogram Favicon
│   ├── logo.svg             # Scalable Vector Brand Logo
│   └── robots.txt           # SEO Crawling Rules
├── src/
│   ├── app/
│   │   ├── api/chat/        # Server-side Gemini AI Chatbot Route
│   │   ├── builds/          # Prebuilt Gaming PCs & Detail Pages
│   │   ├── category/        # Hardware Category Grid Pages
│   │   ├── products/        # Product Detail & Specs Showcase
│   │   ├── pc-builder/      # Guided Custom PC Configurator
│   │   ├── compare/         # Side-by-Side Component Comparison
│   │   ├── cart/            # Cart with Custom Build Breakdown
│   │   ├── checkout/        # Pakistan Demo Checkout
│   │   ├── track/           # 6-Step Visual Order Tracking
│   │   ├── admin/           # Content & Catalog Management
│   │   ├── guides/          # Buying Guides & Articles
│   │   ├── quote/           # Custom Rig Quote Form
│   │   ├── about/           # Store & Workshop Story
│   │   ├── contact/         # Store Locations & WhatsApp
│   │   └── sitemap.ts       # Dynamic XML Sitemap Generator
│   ├── components/
│   │   ├── brand/           # Logo & Typography Components
│   │   ├── chat/            # Floating Chatbot Widget
│   │   ├── layout/          # Navbar, Categories Strip, Footer
│   │   ├── product/         # ProductCard & PCBuildCard
│   │   └── ui/              # SafeImage & Toast Container
│   ├── context/
│   │   └── StoreContext.tsx # Central State, Cart, Wishlist, Admin CRUD
│   ├── data/
│   │   └── initialData.ts   # 32+ Components, 6 Builds, FAQs, Guides
│   └── types/               # TypeScript Data Contracts
└── .env.example             # Server-only Environment Configuration Template
```

---

## 🛡️ License
Released under the [MIT License](LICENSE). Built for Pakistani gamers and PC enthusiasts.
