"use client";

import React from "react";
import Link from "next/link";
import { Scale, Trash2, ShoppingCart, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";
import { Product, PCBuild } from "@/types";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, addToCart } = useStore();

  // Extract all unique spec keys across compared items
  const allSpecKeys = Array.from(
    new Set(
      compareList.flatMap((item) => {
        if ("specs" in item && typeof item.specs === "object") {
          return Object.keys(item.specs);
        }
        return [];
      })
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Product Comparison</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-cyan text-xs font-bold uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Side-by-Side Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Compare Hardware &amp; Systems
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comparing {compareList.length} of 4 maximum items.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="px-3.5 py-2 rounded-xl bg-graphite-900 hover:bg-graphite-800 text-slate-300 text-xs font-bold border border-graphite-700 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5 text-coral" />
            <span>Clear Comparison</span>
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
          <Scale className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No items in comparison</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the scale icon on any product or prebuilt PC to compare technical specifications side-by-side.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/category/graphics-cards"
              className="px-4 py-2 rounded-xl bg-cyan text-graphite-950 text-xs font-bold"
            >
              Browse Components
            </Link>
            <Link
              href="/builds"
              className="px-4 py-2 rounded-xl bg-graphite-800 text-white text-xs font-bold border border-graphite-700"
            >
              Browse Prebuilt PCs
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-graphite-800 bg-graphite-900 shadow-card">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-graphite-800">
                <th className="p-4 w-48 text-slate-400 uppercase tracking-wider text-[11px] font-bold bg-graphite-950/60 sticky left-0 z-10">
                  Feature
                </th>
                {compareList.map((item) => (
                  <th key={item.id} className="p-4 min-w-[220px] max-w-[280px] align-top">
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-graphite-950 border border-graphite-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-graphite-900/80 hover:bg-coral text-slate-400 hover:text-white transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-bold text-white text-sm line-clamp-2">
                        {item.name}
                      </div>

                      <div className="text-base font-black text-cyan font-mono">
                        {formatPKR(item.salePrice ?? item.price)}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(
                            item,
                            1,
                            "specs" in item && "cpu" in (item as any).specs
                              ? "prebuilt"
                              : "product"
                          )
                        }
                        className="w-full py-2 px-3 rounded-lg bg-cyan hover:bg-cyan-400 text-graphite-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-800/80">
              <tr>
                <td className="p-4 font-bold text-slate-300 bg-graphite-950/60 sticky left-0">
                  Type / Category
                </td>
                {compareList.map((item) => (
                  <td key={item.id} className="p-4 text-white font-medium capitalize">
                    {"category" in item ? item.category.replace("-", " ") : "Prebuilt Gaming Rig"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-300 bg-graphite-950/60 sticky left-0">
                  Brand / Manufacturer
                </td>
                {compareList.map((item) => (
                  <td key={item.id} className="p-4 text-cyan font-bold">
                    {"brand" in item ? item.brand : "ZS Assembled Rig"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-300 bg-graphite-950/60 sticky left-0">
                  Availability
                </td>
                {compareList.map((item) => (
                  <td key={item.id} className="p-4 text-emerald-400 font-bold">
                    {item.inStock ? "Ready to Dispatch" : "Backorder"}
                  </td>
                ))}
              </tr>

              {/* Dynamic Technical Specifications */}
              {allSpecKeys.map((key) => (
                <tr key={key}>
                  <td className="p-4 font-bold text-slate-300 bg-graphite-950/60 sticky left-0">
                    {key}
                  </td>
                  {compareList.map((item) => {
                    const val =
                      "specs" in item && item.specs && (item.specs as any)[key]
                        ? (item.specs as any)[key]
                        : "-";
                    return (
                      <td key={item.id} className="p-4 text-slate-300">
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
