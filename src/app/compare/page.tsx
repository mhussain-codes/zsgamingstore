"use client";

import React from "react";
import Link from "next/link";
import { Scale, Trash2, ShoppingCart, ArrowRight, ShieldCheck, Check, Sparkles } from "lucide-react";
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
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Product Comparison</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Hardware Benchmarking &amp; Comparison</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Compare Hardware &amp; Systems
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comparing {compareList.length} of 4 maximum components side-by-side.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            type="button"
            onClick={clearCompare}
            className="px-3.5 py-2 rounded-xl bg-graphite-900 hover:bg-graphite-800 text-slate-300 text-xs font-bold border border-graphite-700 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
            <span>Clear Comparison</span>
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-graphite-900 border border-graphite-800 space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mx-auto text-yellow-400">
            <Scale className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No items selected for comparison</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click the comparison scale icon on any graphics card, processor, or prebuilt rig to compare specs side-by-side.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/category/graphics-cards"
              className="px-5 py-2.5 rounded-xl bg-yellow-400 text-graphite-950 text-xs font-black hover:bg-yellow-300 transition-colors"
            >
              Compare GPUs
            </Link>
            <Link
              href="/builds"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold hover:from-red-500 hover:to-red-400 transition-colors"
            >
              Compare Prebuilt Rigs
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-graphite-800 bg-graphite-900 shadow-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-graphite-800 bg-graphite-950/80">
                <th className="p-4 w-48 text-slate-400 uppercase tracking-wider text-[11px] font-bold sticky left-0 z-10 bg-graphite-950">
                  Specification
                </th>
                {compareList.map((item) => (
                  <th key={item.id} className="p-4 min-w-[240px] max-w-[300px] align-top">
                    <div className="space-y-3">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-graphite-950 border border-graphite-800 p-2 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-graphite-900/90 hover:bg-red-600 text-slate-400 hover:text-white transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-bold text-white text-sm line-clamp-2">
                        {item.name}
                      </div>

                      <div className="text-base font-black text-yellow-400 font-mono">
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
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
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
                  Category
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
                  <td key={item.id} className="p-4 text-yellow-400 font-bold">
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
                      <td key={item.id} className="p-4 text-slate-200">
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