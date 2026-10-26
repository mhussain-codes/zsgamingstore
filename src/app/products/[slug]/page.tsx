"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Scale,
  ShoppingCart,
  CheckCircle2,
  Minus,
  Plus,
  Star,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = use(params);
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
  } = useStore();

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const [quantity, setQuantity] = useState(1);
  const isWished = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const hasDiscount = Boolean(product.salePrice && product.salePrice < product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-cyan transition-colors capitalize"
        >
          {product.category.replace("-", " ")}
        </Link>
        <span>/</span>
        <span className="text-white font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Image (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-graphite-900 border border-graphite-800 aspect-square relative p-6 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-xl"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase rounded-lg bg-cyan text-graphite-950 shadow">
                {product.badge}
              </span>
            )}
            {hasDiscount && (
              <span className="absolute top-4 right-4 px-2 py-1 text-xs font-black rounded-lg bg-coral text-white shadow">
                Save {discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Right Product Details & Buy Box (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="text-cyan font-bold tracking-wider uppercase">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-white text-xs">{product.rating}</span>
                <span className="text-slate-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Stock Status */}
          <div className="p-5 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white font-mono">
                {formatPKR(product.salePrice ?? product.price)}
              </span>
              {hasDiscount && (
                <span className="text-base text-slate-500 line-through font-mono">
                  {formatPKR(product.price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">
                {product.inStock
                  ? `In Stock (${product.stockCount} units available)`
                  : "Available on Backorder"}
              </span>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center border border-graphite-700 bg-graphite-850 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-400 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-slate-400 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product, quantity, "product")}
                className="flex-1 w-full sm:w-auto py-3.5 px-6 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add {quantity > 1 ? `(${quantity})` : ""} to Cart</span>
              </button>
            </div>

            {/* Wishlist & Compare Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  isWished
                    ? "bg-coral/20 border-coral text-coral"
                    : "bg-graphite-800 border-graphite-700 text-slate-300 hover:text-white"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWished ? "fill-coral" : ""}`} />
                <span>{isWished ? "In Wishlist" : "Add to Wishlist"}</span>
              </button>

              <button
                type="button"
                onClick={() => addToCompare(product)}
                className={`py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  isCompared
                    ? "bg-cyan/20 border-cyan text-cyan"
                    : "bg-graphite-800 border-graphite-700 text-slate-300 hover:text-white"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isCompared ? "In Comparison" : "Compare Specs"}</span>
              </button>
            </div>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-graphite-900 border border-graphite-800 flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-cyan shrink-0" />
              <span>Official Distributor Warranty</span>
            </div>
            <div className="p-3 rounded-xl bg-graphite-900 border border-graphite-800 flex items-center gap-2.5 text-slate-300">
              <Truck className="w-5 h-5 text-cyan shrink-0" />
              <span>Express Delivery in Pakistan</span>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              Technical Specifications
            </h3>

            <div className="rounded-2xl bg-graphite-900 border border-graphite-800 divide-y divide-graphite-800 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="p-3 flex items-center justify-between gap-4">
                  <span className="text-slate-400 font-medium">{key}</span>
                  <span className="text-white font-bold text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-graphite-850">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Related Hardware
            </h2>
            <Link
              href={`/category/${product.category}`}
              className="text-xs text-cyan hover:underline font-bold inline-flex items-center gap-1"
            >
              More in this Category <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
