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
    <header className="sticky top-0 z-40 w-full bg-graphite-950/95 backdrop-blur-md border-b border-graphite-800">
      {/* Top Utility / Announcement Bar */}
      <div className="bg-graphite-900 border-b border-graphite-800 text-[11px] text-slate-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
              </span>
              Pakistan Delivery
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="truncate max-w-[320px] sm:max-w-none text-slate-300">
              {settings.announcementBar}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-cyan" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Support</span>
            </a>
            <Link
              href="/admin"
              className="text-xs px-2 py-0.5 rounded bg-graphite-800 hover:bg-graphite-700 text-slate-300 hover:text-cyan border border-graphite-700 transition-colors"
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
              className="w-full bg-graphite-900 border border-graphite-700/80 rounded-xl py-2 pl-10 pr-10 text-sm text-white placeholder-slate-400 focus:border-cyan focus:ring-1 focus:ring-cyan transition-all"
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
            <div className="absolute left-0 right-0 top-full mt-2 bg-graphite-900 border border-graphite-700 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-2 border-b border-graphite-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Matching Hardware &amp; Systems
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-graphite-800">
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={
                      item.itemKind === "build"
                        ? `/builds/${item.slug}`
                        : `/products/${item.slug}`
                    }
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-graphite-800 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded bg-graphite-800 p-1 shrink-0 overflow-hidden border border-graphite-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white group-hover:text-cyan truncate">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.itemKind === "build" ? "Prebuilt PC" : item.brand}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-cyan shrink-0">
                      {formatPKR(item.salePrice ?? item.price)}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-2 bg-graphite-950 text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs text-cyan hover:underline font-medium inline-flex items-center gap-1"
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
            className="hover:text-cyan transition-colors flex items-center gap-1.5"
          >
            Gaming PCs
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/30">
              Tested
            </span>
          </Link>
          <Link
            href="/pc-builder"
            className="hover:text-cyan transition-colors flex items-center gap-1.5 text-white bg-graphite-800/80 px-3 py-1.5 rounded-lg border border-graphite-700 hover:border-cyan/40"
          >
            <Wrench className="w-3.5 h-3.5 text-cyan" />
            PC Builder
          </Link>
          <Link
            href="/category/graphics-cards"
            className="hover:text-cyan transition-colors"
          >
            Components
          </Link>
          <Link href="/guides" className="hover:text-cyan transition-colors">
            Buying Guides
          </Link>
          <Link href="/track" className="hover:text-cyan transition-colors">
            Track Order
          </Link>
          <Link href="/about" className="hover:text-cyan transition-colors">
            About
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Compare Link */}
          <Link
            href="/compare"
            title="Compare Products"
            className="relative p-2 rounded-xl bg-graphite-900 border border-graphite-800 text-slate-300 hover:text-white hover:border-graphite-700 transition-colors hidden sm:flex items-center justify-center"
          >
            <Scale className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan text-graphite-950 font-bold text-[10px] flex items-center justify-center shadow">
                {compareList.length}
              </span>
            )}
          </Link>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            title="Wishlist"
            className="relative p-2 rounded-xl bg-graphite-900 border border-graphite-800 text-slate-300 hover:text-white hover:border-graphite-700 transition-colors hidden sm:flex items-center justify-center"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-coral text-white font-bold text-[10px] flex items-center justify-center shadow">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-bold text-sm shadow-cyanHover transition-all group"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-graphite-950" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-graphite-950 text-cyan text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline font-mono font-extrabold">
              {formatPKR(cartTotal)}
            </span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-graphite-900 border border-graphite-800 text-slate-300 hover:text-white"
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
      <div className="hidden md:block bg-graphite-900/90 border-t border-graphite-800/80 px-4 sm:px-8 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 text-xs font-semibold text-slate-400 whitespace-nowrap">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] pr-2 font-bold">
            Categories:
          </span>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-2.5 py-1 rounded-md hover:bg-graphite-800 hover:text-cyan transition-colors"
            >
              {cat.name.split(" ")[0]}
            </Link>
          ))}
          <Link
            href="/quote"
            className="ml-auto text-cyan hover:underline font-bold text-xs flex items-center gap-1"
          >
            Get a Build Quote <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-graphite-950 border-b border-graphite-800 px-6 py-6 space-y-4 animate-slideDown">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search gaming PCs, graphics cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-graphite-900 border border-graphite-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-cyan"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <nav className="flex flex-col space-y-3 font-semibold text-base text-slate-200">
            <Link
              href="/builds"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-graphite-850"
            >
              <span>Featured Gaming PCs</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan/10 text-cyan">
                Prebuilts
              </span>
            </Link>
            <Link
              href="/pc-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-graphite-850 text-cyan"
            >
              <span className="flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Custom PC Builder
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/category/graphics-cards"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-graphite-850"
            >
              All Components &amp; Hardware
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-graphite-850"
            >
              <span>Compare Hardware</span>
              <span className="text-xs px-2 py-0.5 rounded bg-graphite-800 text-slate-300">
                {compareList.length} items
              </span>
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-graphite-850"
            >
              <span>My Wishlist</span>
              <span className="text-xs px-2 py-0.5 rounded bg-coral/20 text-coral">
                {wishlist.length} saved
              </span>
            </Link>
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-graphite-850"
            >
              PC Buying Guides
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-graphite-850"
            >
              Track Your Order
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-graphite-850"
            >
              About ZS Gaming Store
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-graphite-850"
            >
              Contact Us &amp; Stores
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-cyan font-bold"
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
