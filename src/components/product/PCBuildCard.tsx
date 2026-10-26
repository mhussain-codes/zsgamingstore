"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  CircuitBoard,
  Zap,
  HardDrive,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  Gauge,
  Heart,
  Scale,
} from "lucide-react";
import { PCBuild } from "@/types";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";
import { SafeImage } from "@/components/ui/SafeImage";

interface PCBuildCardProps {
  build: PCBuild;
}

export const PCBuildCard: React.FC<PCBuildCardProps> = ({ build }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
  } = useStore();

  const isWished = isInWishlist(build.id);
  const isCompared = isInCompare(build.id);
  const topBenchmark = build.fpsBenchmarks?.[0];

  const tierColors = {
    budget: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    "mid-range": "text-cyan bg-cyan/10 border-cyan/30",
    enthusiast: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    extreme: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  }[build.tier];

  return (
    <div className="group relative bg-graphite-900 border border-graphite-800 hover:border-cyan/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      {/* Top Media & Tags */}
      <div className="relative">
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
          <span
            className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border backdrop-blur-md ${tierColors}`}
          >
            {build.tier.replace("-", " ")}
          </span>
          {build.badge && (
            <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-coral text-white shadow">
              {build.badge}
            </span>
          )}
        </div>

        {/* Quick Wishlist & Compare */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(build.id);
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
              addToCompare(build);
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

        {/* Visual Image */}
        <Link
          href={`/builds/${build.slug}`}
          className="block rounded-xl overflow-hidden bg-graphite-950 group-hover:scale-[1.02] transition-transform duration-300"
        >
          <SafeImage
            src={build.image}
            alt={build.name}
            category="cases"
            aspectRatio="video"
          />
        </Link>
      </div>

      {/* Main Details */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1 text-cyan font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan" />
              {build.warrantyYears}-Year ZS Warranty
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">
              Ready to Ship
            </span>
          </div>

          <Link href={`/builds/${build.slug}`}>
            <h3 className="font-bold text-white text-base group-hover:text-cyan transition-colors leading-snug">
              {build.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {build.shortDescription}
          </p>

          {/* Key Specs Matrix */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-graphite-850/80 border border-graphite-800 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-300 truncate">
              <Cpu className="w-3.5 h-3.5 text-cyan shrink-0" />
              <span className="truncate">{build.specs.cpu.split("(")[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 truncate">
              <CircuitBoard className="w-3.5 h-3.5 text-cyan shrink-0" />
              <span className="truncate">{build.specs.gpu.split("GeForce")[1] || build.specs.gpu}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 truncate">
              <Zap className="w-3.5 h-3.5 text-cyan shrink-0" />
              <span className="truncate">{build.specs.ram.split("(")[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 truncate">
              <HardDrive className="w-3.5 h-3.5 text-cyan shrink-0" />
              <span className="truncate">{build.specs.storage.split("(")[0]}</span>
            </div>
          </div>

          {/* FPS Highlight if available */}
          {topBenchmark && (
            <div className="mt-2.5 flex items-center justify-between px-3 py-1.5 rounded-lg bg-cyan/5 border border-cyan/20 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                <Gauge className="w-3.5 h-3.5 text-cyan" />
                {topBenchmark.game.split("(")[0]}
              </span>
              <span className="font-extrabold text-cyan font-mono">
                {topBenchmark.fps} FPS
              </span>
            </div>
          )}
        </div>

        {/* Pricing and Action Buttons */}
        <div className="mt-5 pt-3.5 border-t border-graphite-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-black text-white font-mono tracking-tight">
              {formatPKR(build.salePrice ?? build.price)}
            </div>
            {build.salePrice && (
              <div className="text-[11px] text-slate-500 line-through font-mono">
                {formatPKR(build.price)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/builds/${build.slug}`}
              className="px-3 py-2 rounded-xl bg-graphite-800 hover:bg-graphite-700 text-slate-200 border border-graphite-700 text-xs font-bold transition-colors"
            >
              Specs
            </Link>
            <button
              type="button"
              onClick={() => addToCart(build, 1, "prebuilt")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 text-xs font-black transition-all shadow-cyanHover"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
