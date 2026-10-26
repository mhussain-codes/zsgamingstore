"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/product/ProductCard";
import { PCBuildCard } from "@/components/product/PCBuildCard";

export default function WishlistPage() {
  const { wishlist, products, pcBuilds, toggleWishlist } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));
  const savedBuilds = pcBuilds.filter((b) => wishlist.includes(b.id));

  const totalSaved = savedProducts.length + savedBuilds.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">My Wishlist</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-coral text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-coral" />
            <span>Saved Hardware</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            My Wishlist ({totalSaved})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Saved items remain stored in your browser session for easy comparison and checkout.
          </p>
        </div>
      </div>

      {totalSaved === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
          <Heart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Your wishlist is currently empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the heart icon on any component or prebuilt PC to save it for later review.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/builds"
              className="px-4 py-2 rounded-xl bg-cyan text-graphite-950 text-xs font-bold"
            >
              Browse Gaming PCs
            </Link>
            <Link
              href="/category/graphics-cards"
              className="px-4 py-2 rounded-xl bg-graphite-800 text-white text-xs font-bold border border-graphite-700"
            >
              Browse Components
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {savedBuilds.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Saved Prebuilt PCs ({savedBuilds.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedBuilds.map((build) => (
                  <PCBuildCard key={build.id} build={build} />
                ))}
              </div>
            </div>
          )}

          {savedProducts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Saved Components ({savedProducts.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {savedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
