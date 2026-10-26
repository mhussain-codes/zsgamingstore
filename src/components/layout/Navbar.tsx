"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  Menu,
  X,
  Phone,
  MessageSquare,
  Wrench,
  ShieldCheck,
  Truck,
  ArrowRight,
  ExternalLink,
  Flame,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Logo } from "@/components/brand/Logo";
import { formatPKR } from "@/utils/format";

export const Navbar = () => {
  const router = useRouter();
  const {
    cartCount,
    cartTotal,
    wishlist,
    compareList,
    settings,
    products,
    pcBuilds,
    categories,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter search matches
  const searchResults = searchQuery.trim()
    ? [
        ...pcBuilds
          .filter(
            (b) =>
              b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.specs.gpu.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.specs.cpu.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 3)
          .map((b) => ({ ...b, itemKind: "build" as const })),
        ...products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5)
          .map((p) => ({ ...p, itemKind: "product" as const })),
      ]
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    router.push(`/category/all?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian-950/90 backdrop-blur-xl border-b border-slate-800/80 transition-colors">
      {/* Top Utility / Announcement Bar */}
      <div className="bg-obsidian-900/90 border-b border-slate-800/60 text-[11px] text-slate-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Pakistan Delivery Active
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="truncate max-w-[320px] sm:max-w-none text-slate-300">
              ⚡ Free Insured Shipping Over Rs. 25,000 • Stress-Tested Before Dispatch
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/admin"
              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700/80 transition-colors"
            >
              Admin Mode
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Global Instant Search */}
        <div ref={searchRef} className="relative flex-1 max-w-lg hidden lg:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search RTX 4080, Ryzen 7800X3D, Prebuilts, DDR5..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="w-full bg-slate-900/90 border border-slate-700/70 rounded-xl py-2 pl-10 pr-10 text-sm text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Autocomplete Dropdown */}
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl animate-fadeIn">
              <div className="p-2.5 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Matching Hardware &amp; Systems</span>
                <span className="text-[10px] text-cyan-400 font-mono">Instant Results</span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/80">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={
                      item.itemKind === "build"
                        ? `/builds/${item.slug}`
                        : `/products/${item.slug}`
                    }
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-slate-800/80 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-950 p-1 shrink-0 overflow-hidden border border-slate-700/70">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-400 truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.itemKind === "build" ? "Prebuilt PC" : item.brand}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-cyan-400 shrink-0 font-mono">
                      {formatPKR(item.salePrice ?? item.price)}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-2.5 bg-slate-950 text-center border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs text-cyan-400 hover:underline font-semibold inline-flex items-center gap-1"
                >
                  View all results for &quot;{searchQuery}&quot;{" "}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Primary Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-300">
          <Link
            href="/builds"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            Gaming PCs
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Tested
            </span>
          </Link>
          <Link
            href="/pc-builder"
            className="btn-shimmer hover:text-white transition-all flex items-center gap-1.5 text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 px-3.5 py-1.5 rounded-xl font-bold shadow-cyanHover"
          >
            <Wrench className="w-3.5 h-3.5" />
            PC Builder
          </Link>
          <Link
            href="/category/graphics-cards"
            className="hover:text-cyan-400 transition-colors"
          >
            Components
          </Link>
          <Link href="/guides" className="hover:text-cyan-400 transition-colors">
            Buying Guides
          </Link>
          <Link href="/track" className="hover:text-cyan-400 transition-colors">
            Track Order
          </Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors">
            About Us
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2.5">
          {/* Compare Link */}
          <Link
            href="/compare"
            title="Compare Products"
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all hidden sm:flex items-center justify-center hover:scale-105"
          >
            <Scale className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-obsidian-950 font-black text-[9px] flex items-center justify-center shadow">
                {compareList.length}
              </span>
            )}
          </Link>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            title="Wishlist"
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all hidden sm:flex items-center justify-center hover:scale-105"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-coral text-white font-black text-[9px] flex items-center justify-center shadow">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-obsidian-950 font-black text-sm shadow-cyanHover transition-all group hover:scale-[1.02]"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-obsidian-950" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 w-4 h-4 rounded-full bg-obsidian-950 text-cyan-400 text-[10px] font-black flex items-center justify-center border border-cyan-400/40">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline font-mono font-black">
              {formatPKR(cartTotal)}
            </span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Secondary Categories Strip */}
      <div className="hidden md:block bg-obsidian-900/80 border-t border-slate-800/60 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs font-semibold text-slate-400 whitespace-nowrap">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] pr-2 font-bold flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            Quick Categories:
          </span>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-2.5 py-1 rounded-lg hover:bg-slate-800 hover:text-cyan-400 transition-colors"
            >
              {cat.name.split(" ")[0]}
            </Link>
          ))}
          <Link
            href="/quote"
            className="ml-auto text-cyan-400 hover:underline font-bold text-xs flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Get Custom Quote <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-obsidian-950 border-b border-slate-800 px-6 py-6 space-y-4 animate-slideDown">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search gaming PCs, graphics cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-cyan-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/builds"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-white hover:text-cyan-400 text-center"
            >
              Gaming PCs
            </Link>
            <Link
              href="/pc-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-cyan-500 text-obsidian-950 text-sm font-black text-center"
            >
              Custom PC Builder
            </Link>
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-2 text-sm font-medium text-slate-300">
            <Link
              href="/category/graphics-cards"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-cyan-400"
            >
              Graphics Cards (GPUs)
            </Link>
            <Link
              href="/category/processors"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-cyan-400"
            >
              Processors (CPUs)
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-cyan-400"
            >
              PC Buying Guides
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-cyan-400"
            >
              Compare Products ({compareList.length})
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-cyan-400"
            >
              My Wishlist ({wishlist.length})
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-cyan-400"
            >
              Track Your Order
            </Link>
            <Link
              href="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-cyan-400"
            >
              Request a Custom Quote
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-cyan-400"
            >
              About ZS Gaming Store
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
