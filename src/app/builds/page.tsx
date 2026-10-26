"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PCBuildCard } from "@/components/product/PCBuildCard";

function BuildsContent() {
  const { pcBuilds } = useStore();
  const searchParams = useSearchParams();
  const initialTier = searchParams.get("tier") || "all";

  const [selectedTier, setSelectedTier] = useState<string>(initialTier);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [filterSearch, setFilterSearch] = useState<string>("");

  const filteredBuilds = useMemo(() => {
    return pcBuilds
      .filter((b) => {
        if (selectedTier !== "all" && b.tier !== selectedTier) return false;
        if (filterSearch.trim()) {
          const q = filterSearch.toLowerCase();
          return (
            b.name.toLowerCase().includes(q) ||
            b.specs.gpu.toLowerCase().includes(q) ||
            b.specs.cpu.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [pcBuilds, selectedTier, sortBy, filterSearch]);

  return (
    <div className="space-y-8">
      {/* Filter and Sort Toolbar */}
      <div className="p-4 rounded-2xl bg-graphite-900 border border-graphite-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tier filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan" /> Tier:
          </span>
          {[
            { id: "all", label: "All Builds" },
            { id: "budget", label: "Budget (1080p)" },
            { id: "mid-range", label: "Mid-Range (1440p)" },
            { id: "enthusiast", label: "Enthusiast (4K)" },
            { id: "extreme", label: "Extreme (Flagship)" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTier(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedTier === t.id
                  ? "bg-cyan text-graphite-950 shadow-sm"
                  : "bg-graphite-800 text-slate-300 hover:text-white hover:bg-graphite-750"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="relative flex-1 md:w-56">
            <input
              type="text"
              placeholder="Filter by GPU, CPU..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className="w-full bg-graphite-950 border border-graphite-750 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            {filterSearch && (
              <button
                type="button"
                onClick={() => setFilterSearch("")}
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
              className="bg-graphite-950 border border-graphite-750 rounded-xl px-2.5 py-1.5 text-xs text-white focus:border-cyan"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Builds Grid */}
      {filteredBuilds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuilds.map((build) => (
            <PCBuildCard key={build.id} build={build} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
          <SlidersHorizontal className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No PC builds found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try resetting your budget tier or search terms to see available configurations.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedTier("all");
              setFilterSearch("");
            }}
            className="px-4 py-2 rounded-xl bg-cyan text-graphite-950 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function BuildsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Prebuilt Gaming PCs</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-cyan text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>24-Hour Stress Tested &bull; Plug &amp; Play</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Prebuilt Gaming PCs &amp; Custom Rigs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every ZS prebuilt system is hand-assembled, thermal-stress tested with FurMark, and shipped with all original manufacturer component boxes and 1 to 3 Year hardware warranty.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 animate-pulse">Loading builds catalog...</div>}>
        <BuildsContent />
      </Suspense>
    </div>
  );
}
