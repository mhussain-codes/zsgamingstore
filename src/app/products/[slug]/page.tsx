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
  Cpu,
  Zap,
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
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-yellow-400 transition-colors capitalize"
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
          <div className="rounded-2xl overflow-hidden bg-graphite-900 border border-graphite-800 aspect-square relative p-8 flex items-center justify-center group shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase rounded-lg bg-yellow-400 text-graphite-950 shadow-md">
                {product.badge}
              </span>
            )}
            {hasDiscount && (
              <span className="absolute top-4 right-4 px-2.5 py-1 text-xs font-black rounded-lg bg-red-600 text-white shadow-md">
                SAVE {discountPercent}%
              </span>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-graphite-900 border border-graphite-800 flex items-center gap-3 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0" />
              <div>
                <p className="font-bold text-white">Official Warranty</p>
                <p className="text-[11px] text-slate-400">100% Sealed Distro Pack</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-graphite-900 border border-graphite-800 flex items-center gap-3 text-slate-300">
              <Truck className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <p className="font-bold text-white">TCS Insured Express</p>
                <p className="text-[11px] text-slate-400">Doorstep delivery across PK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Product Details & Buy Box (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="text-yellow-400 font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-yellow-400/10 border border-yellow-400/20">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="font-black text-white text-xs">{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & Stock Status */}
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-5 shadow-lg">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-yellow-400 font-mono">
                {formatPKR(product.salePrice ?? product.price)}
              </span>
              {hasDiscount && (
                <span className="text-base text-slate-500 line-through font-mono">
                  {formatPKR(product.price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">
                {product.inStock
                  ? `In Stock at Lahore & Karachi warehouses (${product.stockCount} units)`
                  : "Available on 24h Supplier Backorder"}
              </span>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center border border-graphite-700 bg-graphite-850 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-slate-400 hover:text-white"
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
                  className="p-2.5 text-slate-400 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product, quantity, "product")}
                className="flex-1 w-full sm:w-auto py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-sm shadow-redHover transition-all flex items-center justify-center gap-2 active:scale-95"
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
                className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  isWished
                    ? "bg-red-500/20 border-red-500 text-red-400"
                    : "bg-graphite-800 border-graphite-700 text-slate-300 hover:text-white"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWished ? "fill-red-500 text-red-500" : ""}`} />
                <span>{isWished ? "In Wishlist" : "Add to Wishlist"}</span>
              </button>

              <button
                type="button"
                onClick={() => addToCompare(product)}
                className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  isCompared
                    ? "bg-yellow-400/20 border-yellow-400 text-yellow-400"
                    : "bg-graphite-800 border-graphite-700 text-slate-300 hover:text-white"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isCompared ? "In Comparison" : "Compare Specs"}</span>
              </button>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Technical Specifications
            </h3>

            <div className="rounded-2xl bg-graphite-900 border border-graphite-800 divide-y divide-graphite-800 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="p-3.5 flex items-center justify-between gap-4">
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
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Related Hardware
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Frequently paired components and alternatives
              </p>
            </div>
            <Link
              href={`/category/${product.category}`}
              className="text-xs text-yellow-400 hover:underline font-bold inline-flex items-center gap-1"
            >
              More in this Category <ArrowRight className="w-3.5 h-3.5" />
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