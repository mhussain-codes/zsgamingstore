"use client";

import React from "react";
import Link from "next/link";
import { Heart, Scale, ShoppingCart, Check, Zap } from "lucide-react";
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
    <div className="group relative bg-graphite-900 border border-graphite-800 hover:border-cyan/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      {/* Top Badges & Actions */}
      <div className="relative">
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span
              className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md shadow ${
                product.badge === "Bestseller"
                  ? "bg-amber-400 text-graphite-950"
                  : product.badge === "Hot Deal"
                  ? "bg-coral text-white"
                  : "bg-cyan text-graphite-950"
              }`}
            >
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-coral/20 border border-coral/40 text-coral">
              -{discountPercent}%
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
            className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
              isWished
                ? "bg-coral text-white"
                : "bg-graphite-950/70 text-slate-300 hover:text-white hover:bg-graphite-800"
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
            className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
              isCompared
                ? "bg-cyan text-graphite-950"
                : "bg-graphite-950/70 text-slate-300 hover:text-white hover:bg-graphite-800"
            }`}
            aria-label="Compare toggle"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          className="block rounded-xl overflow-hidden bg-graphite-950 group-hover:scale-[1.02] transition-transform duration-300"
        >
          <SafeImage
            src={product.image}
            alt={product.name}
            category={product.category}
            aspectRatio="square"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
            <span className="text-cyan font-bold tracking-wider uppercase">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {product.inStock ? "In Stock" : "Pre-order"}
            </span>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-white text-sm line-clamp-2 group-hover:text-cyan transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quick Specs Pills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {product.compatibility?.socket && (
              <span className="px-1.5 py-0.5 rounded bg-graphite-800 border border-graphite-700 text-[10px] text-slate-300">
                {product.compatibility.socket}
              </span>
            )}
            {product.compatibility?.ramType && (
              <span className="px-1.5 py-0.5 rounded bg-graphite-800 border border-graphite-700 text-[10px] text-slate-300">
                {product.compatibility.ramType}
              </span>
            )}
            {product.specs["VRAM"] && (
              <span className="px-1.5 py-0.5 rounded bg-graphite-800 border border-graphite-700 text-[10px] text-slate-300">
                {product.specs["VRAM"]}
              </span>
            )}
            {product.specs["Wattage"] && (
              <span className="px-1.5 py-0.5 rounded bg-graphite-800 border border-graphite-700 text-[10px] text-slate-300">
                {product.specs["Wattage"]}
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Add To Cart */}
        <div className="mt-4 pt-3 border-t border-graphite-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-white font-mono tracking-tight">
              {formatPKR(product.salePrice ?? product.price)}
            </div>
            {hasDiscount && (
              <div className="text-[11px] text-slate-500 line-through font-mono">
                {formatPKR(product.price)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, 1, "product")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-graphite-800 hover:bg-cyan hover:text-graphite-950 text-slate-200 border border-graphite-700 hover:border-cyan text-xs font-bold transition-all shadow-sm"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
