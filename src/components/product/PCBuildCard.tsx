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
  Sparkles,
  Flame,
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
    budget: "text-white bg-white/10 border-white/30",
    "mid-range": "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
    enthusiast: "text-red-400 bg-red-500/10 border-red-500/30",
    extreme: "text-yellow-300 bg-red-600/30 border-red-500",
  }[build.tier];

  return (
    <div className="group relative bg-obsidian-900 border border-white/10 hover:border-yellow-400/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-cardHover hover:-translate-y-2 backdrop-blur-sm">
      {/* Top Media & Tags */}
      <div className="relative">
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
          <span
            className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border backdrop-blur-md shadow-sm ${tierColors}`}
          >
            {build.tier.replace("-", " ")}
          </span>
          {build.badge && (
            <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-red-600 text-white shadow-md flex items-center gap-1">
              <Flame className="w-2.5 h-2.5 text-yellow-300" />
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
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isWished
                ? "bg-red-600 text-white scale-110"
                : "bg-black/80 text-slate-300 hover:text-white hover:bg-black"
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
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isCompared
                ? "bg-yellow-400 text-black scale-110"
                : "bg-black/80 text-slate-300 hover:text-white hover:bg-black"
            }`}
            aria-label="Compare toggle"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Image */}
        <Link
          href={`/builds/${build.slug}`}
          className="block rounded-xl overflow-hidden bg-black/60 p-3 group-hover:scale-[1.02] transition-transform duration-300 border border-white/5"
        >
          <SafeImage
            src={build.image}
            alt={build.name}
            category="cases"
            className="w-full h-52 object-contain rounded-lg"
          />
        </Link>

        {/* FPS Benchmark Pill Badge */}
        {topBenchmark && (
          <div className="mt-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 text-[11px] text-white">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Gauge className="w-3.5 h-3.5 text-yellow-400" />
              {topBenchmark.game} ({topBenchmark.resolution})
            </span>
            <span className="font-mono font-black text-yellow-400">
              {topBenchmark.fps} FPS
            </span>
          </div>
        )}
      </div>

      {/* Build Details */}
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/builds/${build.slug}`}
            className="block text-base font-black text-white hover:text-yellow-400 transition-colors"
          >
            {build.name}
          </Link>
          <p className="mt-1 text-xs text-slate-400 line-clamp-2">
            {build.shortDescription}
          </p>

          {/* Key Spec Grid */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-[11px] bg-black/60 p-2.5 rounded-xl border border-white/5">
            <div className="flex items-center gap-1.5 text-slate-200 truncate">
              <CircuitBoard className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">{build.specs.gpu}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200 truncate">
              <Cpu className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span className="truncate">{build.specs.cpu}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200 truncate">
              <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              <span className="truncate">{build.specs.ram}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200 truncate">
              <HardDrive className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">{build.specs.storage}</span>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              3-Yr Hardware Warranty
            </span>
            <span className="text-[10px] text-white/80 font-bold bg-red-600/20 px-2 py-0.5 rounded border border-red-500/30">
              FurMark Tested
            </span>
          </div>
        </div>

        {/* Pricing and Action CTAs */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Complete Rig Price
            </span>
            <span className="text-lg font-black text-white font-mono tracking-tight">
              {formatPKR(build.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/builds/${build.slug}`}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-bold"
              title="View system breakdown"
            >
              Specs
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addToCart(build, 1);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-black text-xs transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-white" />
              Order Rig
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
