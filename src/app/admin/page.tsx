"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  Package,
  Wrench,
  HelpCircle,
  BookOpen,
  ShoppingBag,
  Bot,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Search,
  Eye,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Product, PCBuild, FAQItem, BuyingGuide, ProductCategory } from "@/types";
import { formatPKR } from "@/utils/format";

type AdminTab = "products" | "builds" | "orders" | "chatbot" | "settings" | "faqs" | "guides";

export default function AdminPage() {
  const {
    products,
    pcBuilds,
    orders,
    faqs,
    guides,
    settings,
    updateProduct,
    addProduct,
    deleteProduct,
    updatePCBuild,
    addPCBuild,
    deletePCBuild,
    updateFAQ,
    addFAQ,
    deleteFAQ,
    updateGuide,
    addGuide,
    deleteGuide,
    updateSettings,
    resetToDefaults,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [geminiStatus, setGeminiStatus] = useState<{ configured: boolean; model: string }>({
    configured: false,
    model: "gemini-2.5-flash",
  });

  // Search & Filter in Admin
  const [productSearch, setProductSearch] = useState("");

  // Product Editing Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Settings form state
  const [storeName, setStoreName] = useState(settings.storeName);
  const [phone, setPhone] = useState(settings.phone);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [email, setEmail] = useState(settings.email);
  const [announcement, setAnnouncement] = useState(settings.announcementBar);
  const [addressLahore, setAddressLahore] = useState(settings.addressLahore);
  const [addressKarachi, setAddressKarachi] = useState(settings.addressKarachi);

  // Check Gemini status on backend
  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => {
        setGeminiStatus({
          configured: Boolean(data.configured),
          model: data.model || "gemini-2.5-flash",
        });
      })
      .catch(() => {
        setGeminiStatus({ configured: false, model: "gemini-2.5-flash" });
      });
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      phone,
      whatsapp,
      email,
      announcementBar: announcement,
      addressLahore,
      addressKarachi,
    });
  };

  const handleSaveProductModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isNewProduct) {
      addProduct(editingProduct);
    } else {
      updateProduct(editingProduct);
    }
    setEditingProduct(null);
  };

  const startCreateProduct = () => {
    const newProd: Product = {
      id: "prod-" + Date.now(),
      name: "",
      slug: "",
      brand: "ASUS",
      category: "graphics-cards",
      price: 150000,
      shortDescription: "",
      description: "",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80",
      inStock: true,
      stockCount: 10,
      rating: 5.0,
      reviewCount: 1,
      specs: {},
    };
    setEditingProduct(newProd);
    setIsNewProduct(true);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Top Banner with Local Demo Notice */}
      <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-white">
              ZS Gaming Store Control Panel
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-graphite-800 text-cyan border border-cyan/30">
              Demo Admin Mode
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Manage live catalog products, prices in PKR, PC builds, FAQs, and store settings. Changes immediately sync to the customer storefront, PC builder, and chatbot knowledge base.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm("Reset all store catalog and settings back to original seed data?")) {
              resetToDefaults();
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-graphite-800 hover:bg-coral/20 hover:text-coral text-slate-300 text-xs font-bold border border-graphite-700 transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Default Catalog</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-graphite-800 pb-3">
        {[
          { id: "products", label: `Products (${products.length})`, icon: Package },
          { id: "builds", label: `PC Builds (${pcBuilds.length})`, icon: Wrench },
          { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: "chatbot", label: "Chatbot & AI Knowledge", icon: Bot },
          { id: "settings", label: "Store Settings", icon: Settings },
          { id: "faqs", label: `FAQs (${faqs.length})`, icon: HelpCircle },
          { id: "guides", label: `Buying Guides (${guides.length})`, icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-cyan text-graphite-950 font-black shadow-cyanHover"
                  : "bg-graphite-900 text-slate-300 hover:text-white border border-graphite-800 hover:bg-graphite-850"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === "products" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search products by name, brand..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-graphite-900 border border-graphite-750 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="button"
              onClick={startCreateProduct}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-bold text-xs shadow-cyanHover transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-graphite-800 bg-graphite-900 shadow-card">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-graphite-800 text-slate-400 uppercase tracking-wider text-[11px] font-bold bg-graphite-950/60">
                  <th className="p-4">Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price (PKR)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Badge</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-800/80">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-graphite-850/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-graphite-950 border border-graphite-750 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate max-w-xs">{p.name}</div>
                          <div className="text-[11px] text-cyan font-semibold">{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300 capitalize">{p.category.replace("-", " ")}</td>
                    <td className="p-4 font-mono font-bold text-white">
                      {formatPKR(p.salePrice ?? p.price)}
                      {p.salePrice && (
                        <div className="text-[10px] text-slate-500 line-through">
                          {formatPKR(p.price)}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.inStock
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-coral/10 text-coral border border-coral/20"
                        }`}
                      >
                        {p.inStock ? `${p.stockCount} in stock` : "Out of stock"}
                      </span>
                    </td>
                    <td className="p-4">
                      {p.badge ? (
                        <span className="px-2 py-0.5 rounded bg-graphite-800 text-slate-300 font-bold text-[10px]">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct({ ...p });
                            setIsNewProduct(false);
                          }}
                          className="p-1.5 rounded-lg bg-graphite-800 hover:bg-graphite-750 text-slate-300 hover:text-white"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete product "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-graphite-800 hover:bg-coral/20 text-slate-300 hover:text-coral"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PC BUILDS MANAGEMENT */}
      {activeTab === "builds" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pcBuilds.map((build) => (
              <div
                key={build.id}
                className="p-5 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4"
              >
                <div className="aspect-video rounded-xl overflow-hidden bg-graphite-950 border border-graphite-750">
                  <img src={build.image} alt={build.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-cyan px-2 py-0.5 rounded bg-cyan/10">
                    {build.tier} Tier
                  </span>
                  <h3 className="font-bold text-white text-base mt-1">{build.name}</h3>
                  <div className="text-sm font-mono font-black text-cyan mt-1">
                    {formatPKR(build.salePrice ?? build.price)}
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1 bg-graphite-950 p-3 rounded-xl border border-graphite-800">
                  <div><strong>CPU:</strong> {build.specs.cpu.split("(")[0]}</div>
                  <div><strong>GPU:</strong> {build.specs.gpu}</div>
                  <div><strong>RAM:</strong> {build.specs.ram}</div>
                  <div><strong>Storage:</strong> {build.specs.storage}</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-graphite-800 text-xs">
                  <Link
                    href={`/builds/${build.slug}`}
                    className="text-cyan hover:underline font-semibold flex items-center gap-1"
                  >
                    View Page <ExternalLink className="w-3 h-3" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      const newPrice = prompt("Enter updated price in PKR:", String(build.price));
                      if (newPrice && !isNaN(Number(newPrice))) {
                        updatePCBuild({ ...build, price: Number(newPrice) });
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-graphite-800 hover:bg-graphite-750 text-white font-bold"
                  >
                    Quick Edit Price
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {activeTab === "orders" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="overflow-x-auto rounded-2xl border border-graphite-800 bg-graphite-900 shadow-card">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-graphite-800 text-slate-400 uppercase tracking-wider text-[11px] font-bold bg-graphite-950/60">
                  <th className="p-4">Order ID &bull; Date</th>
                  <th className="p-4">Customer &bull; City</th>
                  <th className="p-4">Items Count</th>
                  <th className="p-4">Total (PKR)</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-800/80">
                {orders.map((o) => (
                  <tr key={o.orderId} className="hover:bg-graphite-850/50">
                    <td className="p-4">
                      <div className="font-mono font-bold text-white">{o.orderId}</div>
                      <div className="text-[11px] text-slate-400">{o.date}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white">{o.customer.fullName}</div>
                      <div className="text-slate-400">{o.customer.city}, {o.customer.phone}</div>
                    </td>
                    <td className="p-4 text-slate-300">{o.items.length} items</td>
                    <td className="p-4 font-mono font-bold text-cyan">{formatPKR(o.total)}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan/10 border border-cyan/30 text-cyan">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/track?id=${o.orderId}`}
                        className="px-3 py-1.5 rounded-lg bg-graphite-800 hover:bg-cyan hover:text-graphite-950 text-slate-200 text-xs font-bold transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Tracking</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CHATBOT & KNOWLEDGE MANAGEMENT */}
      {activeTab === "chatbot" && (
        <div className="p-8 rounded-3xl bg-graphite-900 border border-graphite-800 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-graphite-800">
            <div>
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-cyan" />
                <h2 className="text-lg font-black text-white">
                  Gemini Chatbot Integration Status
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                The chatbot uses server-side Google Gemini via <code>GEMINI_API_KEY</code>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1.5 ${
                  geminiStatus.configured
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    geminiStatus.configured ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                {geminiStatus.configured ? "Live Gemini Connected" : "Local Grounded Knowledge Active"}
              </span>
            </div>
          </div>

          {/* Setup Guide */}
          <div className="p-5 rounded-2xl bg-graphite-950 border border-graphite-800 space-y-3 text-xs leading-relaxed">
            <h3 className="font-bold text-white text-sm">Server-Side Environment Variable Instructions</h3>
            <p className="text-slate-300">
              To connect live Gemini reasoning, add your API key to <code>.env.local</code> in the project root:
            </p>
            <pre className="p-3 rounded-xl bg-graphite-900 text-cyan font-mono text-[11px] overflow-x-auto border border-graphite-800">
              GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
            </pre>
            <p className="text-slate-400">
              When no key is configured or offline, the store automatically switches to its built-in Grounded Knowledge Assistant, ensuring zero broken interactions for shoppers.
            </p>
          </div>

          {/* Synchronized Knowledge Index */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              Real-Time Synchronized Knowledge Feeds
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-graphite-950 border border-graphite-800">
                <div className="text-slate-400">Catalog Products</div>
                <div className="text-base font-black text-white font-mono mt-0.5">
                  {products.length} Items
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-graphite-950 border border-graphite-800">
                <div className="text-slate-400">Prebuilt PC Systems</div>
                <div className="text-base font-black text-white font-mono mt-0.5">
                  {pcBuilds.length} Builds
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-graphite-950 border border-graphite-800">
                <div className="text-slate-400">Frequently Asked Questions</div>
                <div className="text-base font-black text-white font-mono mt-0.5">
                  {faqs.length} Answers
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-graphite-950 border border-graphite-800">
                <div className="text-slate-400">Buying Guides &amp; Articles</div>
                <div className="text-base font-black text-white font-mono mt-0.5">
                  {guides.length} Guides
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: STORE SETTINGS */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="p-8 rounded-3xl bg-graphite-900 border border-graphite-800 space-y-6 text-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-graphite-800">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                General Store Settings
              </h2>
              <p className="text-slate-400 mt-0.5">Edit store contacts, announcement banner, and branch locations.</p>
            </div>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black shadow-cyanHover transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Customer Support Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">WhatsApp Support Number</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Support Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Announcement Bar Text</label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Lahore Address</label>
              <textarea
                rows={2}
                value={addressLahore}
                onChange={(e) => setAddressLahore(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Karachi Address</label>
              <textarea
                rows={2}
                value={addressKarachi}
                onChange={(e) => setAddressKarachi(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              />
            </div>
          </div>
        </form>
      )}

      {/* TAB 6: FAQS MANAGEMENT */}
      {activeTab === "faqs" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Editable Store FAQs
            </h2>
            <button
              type="button"
              onClick={() => {
                const q = prompt("Enter new FAQ question:");
                const a = prompt("Enter FAQ answer:");
                if (q && a) {
                  addFAQ({
                    id: "faq-" + Date.now(),
                    category: "PC Builds & Testing",
                    question: q,
                    answer: a,
                  });
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan text-graphite-950 text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan uppercase">{f.category}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = prompt("Update answer:", f.answer);
                        if (updated) updateFAQ({ ...f, answer: updated });
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Delete this FAQ?")) deleteFAQ(f.id);
                      }}
                      className="text-slate-400 hover:text-coral"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="font-bold text-white text-sm">{f.question}</div>
                <p className="text-slate-400 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: GUIDES MANAGEMENT */}
      {activeTab === "guides" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Buying Guides &amp; Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((g) => (
              <div
                key={g.id}
                className="p-5 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 text-xs"
              >
                <div className="aspect-video rounded-xl overflow-hidden bg-graphite-950">
                  <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-white text-sm">{g.title}</h3>
                <p className="text-slate-400 line-clamp-2">{g.excerpt}</p>
                <div className="flex items-center justify-between pt-2 border-t border-graphite-800">
                  <Link href={`/guides/${g.slug}`} className="text-cyan hover:underline font-bold">
                    View Guide &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      const newTitle = prompt("Update guide title:", g.title);
                      if (newTitle) updateGuide({ ...g, title: newTitle });
                    }}
                    className="text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Edit Title
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT CREATE / EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-graphite-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-graphite-900 border border-graphite-750 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-graphite-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {isNewProduct ? "Add New Component" : `Edit "${editingProduct.name}"`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProductModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-slate-300">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                        slug: isNewProduct
                          ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                          : editingProduct.slug,
                      })
                    }
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-2.5 text-white focus:border-cyan"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Brand *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, brand: e.target.value })
                    }
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-2.5 text-white focus:border-cyan"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Category *</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as ProductCategory,
                      })
                    }
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-2.5 text-white focus:border-cyan"
                  >
                    <option value="graphics-cards">Graphics Cards</option>
                    <option value="processors">Processors</option>
                    <option value="motherboards">Motherboards</option>
                    <option value="memory">Memory (RAM)</option>
                    <option value="storage">Storage (SSD)</option>
                    <option value="cooling">Cooling</option>
                    <option value="cases">Cases</option>
                    <option value="power-supplies">Power Supplies</option>
                    <option value="monitors">Monitors</option>
                    <option value="peripherals">Peripherals</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Regular Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                    }
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-2.5 text-white focus:border-cyan"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Sale Price (PKR, Optional)</label>
                  <input
                    type="number"
                    value={editingProduct.salePrice || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        salePrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-2.5 text-white focus:border-cyan"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-slate-300">Image URL</label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, image: e.target.value })
                    }
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-2.5 text-white focus:border-cyan"
                  />
                  {editingProduct.image && (
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        src={editingProduct.image}
                        alt="Preview"
                        className="w-12 h-12 rounded object-cover border border-graphite-700"
                      />
                      <span className="text-[11px] text-slate-400">Live image preview</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-slate-300">Short Description</label>
                  <textarea
                    rows={2}
                    value={editingProduct.shortDescription}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        shortDescription: e.target.value,
                      })
                    }
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-2.5 text-white focus:border-cyan"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-graphite-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-graphite-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 text-xs font-black shadow-cyanHover transition-all"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
