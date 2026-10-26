"use client";

import React from "react";
import Link from "next/link";
import { Heart, Scale, ShoppingCart, Check, Zap, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";
import { SafeImage } from "@/components/ui/SafeImage";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
  } = useStore();

  const isWished = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const hasDiscount = Boolean(product.salePrice && product.salePrice < product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <div className="group relative bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1.5 backdrop-blur-sm">
      {/* Top Badges & Actions */}
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span
              className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md shadow-md ${
                product.badge === "Bestseller"
                  ? "bg-amber-400 text-obsidian-950 font-black"
                  : product.badge === "Hot Deal"
                  ? "bg-coral text-white font-black"
                  : "bg-cyan-400 text-obsidian-950 font-black"
              }`}
            >
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 text-[9px] font-black rounded-md bg-coral/20 border border-coral/40 text-coral tracking-tight">
              SAVE {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist & Compare floating buttons */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            title={isWished ? "Remove from wishlist" : "Add to wishlist"}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isWished
                ? "bg-coral text-white scale-110"
                : "bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-3.5 h-3.5 ${isWished ? "fill-white" : ""}`} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCompare(product);
            }}
            title={isCompared ? "In comparison" : "Add to comparison"}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isCompared
                ? "bg-cyan-400 text-obsidian-950 scale-110"
                : "bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
            aria-label="Compare toggle"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          className="block rounded-xl overflow-hidden bg-slate-950/60 p-2 group-hover:scale-[1.02] transition-transform duration-300"
        >
          <SafeImage
            src={product.image}
            alt={product.name}
            category={product.category}
            className="w-full h-44 object-contain rounded-lg"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="mt-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
            <span className="uppercase tracking-wider text-cyan-400 font-mono">
              {product.brand}
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {product.inStock && product.stockCount > 0 ? "In Stock" : "On Order"}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="block text-sm font-bold text-white hover:text-cyan-400 line-clamp-2 transition-colors leading-snug"
          >
            {product.name}
          </Link>

          {/* Quick Specs Pill Preview */}
          <div className="mt-2 flex flex-wrap gap-1">
            {Object.entries(product.specs)
              .slice(0, 2)
              .map(([key, value]) => (
                <span
                  key={key}
                  className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60"
                >
                  {value}
                </span>
              ))}
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-[11px] text-slate-500 line-through font-mono">
                {formatPKR(product.price)}
              </span>
            )}
            <span className="text-base font-black text-white font-mono tracking-tight">
              {formatPKR(product.salePrice ?? product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-obsidian-950 font-black transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-xs"
            title="Add to cart"
          >
            <ShoppingCart className="w-4 h-4 text-obsidian-950" />
            <span className="font-bold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
