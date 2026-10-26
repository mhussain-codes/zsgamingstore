"use client";

import React, { useState, useMemo, use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Filter,
  ArrowUpDown,
  Search,
  X,
  SlidersHorizontal,
  Flame,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";

interface CategoryContentProps {
  slug: string;
}

function CategoryContent({ slug }: CategoryContentProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { products, categories } = useStore();

  const isAll = slug === "all";
  const currentCategory = categories.find((c) => c.slug === slug);

  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [searchFilter, setSearchFilter] = useState<string>(initialQuery);

  const availableBrands = useMemo(() => {
    const list = isAll
      ? products
      : products.filter((p) => p.category === slug);
    const brands = Array.from(new Set(list.map((p) => p.brand)));
    return brands.sort();
  }, [products, isAll, slug]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (!isAll && p.category !== slug) return false;
        if (selectedBrand !== "all" && p.brand !== selectedBrand) return false;
        if (inStockOnly && !p.inStock) return false;
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [products, isAll, slug, selectedBrand, inStockOnly, searchFilter, sortBy]);

  return (
    <div className="space-y-8">
      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-300 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-yellow-400" /> Brand:
          </span>
          <button
            type="button"
            onClick={() => setSelectedBrand("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              selectedBrand === "all"
                ? "bg-yellow-400 text-obsidian-950 shadow-yellowHover"
                : "bg-white/5 text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            All Brands
          </button>
          {availableBrands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedBrand === brand
                  ? "bg-yellow-400 text-obsidian-950 font-black shadow-yellowHover"
                  : "bg-white/5 text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Search, In-Stock Toggle & Sort */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded bg-black border-white/20 text-yellow-400 focus:ring-yellow-400"
            />
            <span>In Stock Only</span>
          </label>

          <div className="relative flex-1 md:w-48">
            <input
              type="text"
              placeholder="Search in category..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-black border border-white/15 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-yellow-400"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-yellow-400 font-medium"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
          <SlidersHorizontal className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your brand filter or search query to find matching hardware components.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedBrand("all");
              setSearchFilter("");
              setInStockOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-yellow-400 text-obsidian-950 text-xs font-black"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const { categories } = useStore();

  const isAll = slug === "all";
  const currentCategory = categories.find((c) => c.slug === slug);

  const categoryTitle = isAll
    ? "All Hardware & Components"
    : currentCategory?.name || slug.replace("-", " ");
  const categoryDesc = isAll
    ? "Browse genuine boxed PC components with official manufacturer warranties across Pakistan."
    : currentCategory?.description || "High quality components for your custom PC build.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-500">Components</span>
        <span>/</span>
        <span className="text-white font-medium capitalize">{categoryTitle}</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-yellow-500/30 relative overflow-hidden shadow-xl">
        <div className="ambient-glow-yellow absolute inset-0 pointer-events-none" />

        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="text-xs font-black text-red-500 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-yellow-400" />
            Genuine Boxed Hardware &bull; Local Pakistani Distributor Warranty
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {categoryTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {categoryDesc}
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 animate-pulse">Loading category products...</div>}>
        <CategoryContent slug={slug} />
      </Suspense>
    </div>
  );
}
