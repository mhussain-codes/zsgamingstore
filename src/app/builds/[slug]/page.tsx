"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  Wrench,
  Gauge,
  ShoppingCart,
  Heart,
  Scale,
  CheckCircle2,
  Cpu,
  CircuitBoard,
  Layers,
  Zap,
  HardDrive,
  Fan,
  BatteryCharging,
  Box,
  Share2,
  Flame,
  MessageSquare,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";
import { SafeImage } from "@/components/ui/SafeImage";

interface BuildDetailProps {
  params: Promise<{ slug: string }>;
}

export default function BuildDetailPage({ params }: BuildDetailProps) {
  const { slug } = use(params);
  const {
    pcBuilds,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    showToast,
  } = useStore();

  const build = pcBuilds.find((b) => b.slug === slug);
  if (!build) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState<string>(build.image);
  const isWished = isInWishlist(build.id);
  const isCompared = isInCompare(build.id);

  const images = build.gallery && build.gallery.length > 0 ? build.gallery : [build.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/builds" className="hover:text-yellow-400 transition-colors">
          Prebuilt Gaming PCs
        </Link>
        <span>/</span>
        <span className="text-white font-medium">{build.name}</span>
      </nav>

      {/* Main Grid: Gallery & Buying Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl overflow-hidden bg-obsidian-900 border border-white/10 aspect-[16/10] relative p-3">
            <img
              src={activeImage}
              alt={build.name}
              className="w-full h-full object-contain rounded-2xl"
            />
            {build.badge && (
              <span className="absolute top-6 left-6 px-3 py-1 text-xs font-black uppercase rounded-lg bg-red-600 text-white shadow-lg flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-yellow-300" />
                {build.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === img ? "border-yellow-400" : "border-white/10 opacity-60"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* FPS Gaming Benchmarks Table */}
          {build.fpsBenchmarks && build.fpsBenchmarks.length > 0 && (
            <div className="mt-8 p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-base">
                  Verified Real Gaming Framerates (1080p / 1440p / 4K)
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Average FPS benchmarked under actual gameplay at Ultra settings in Pakistani ambient room temperatures.
              </p>

              <div className="divide-y divide-white/5 border-t border-white/10">
                {build.fpsBenchmarks.map((bench, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{bench.game}</div>
                      <div className="text-[11px] text-slate-400">{bench.settings}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-black text-yellow-400 font-mono">
                        {bench.fps} FPS
                      </div>
                      <div className="text-[10px] text-slate-400">{bench.resolution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Info & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-yellow-400 font-black tracking-wider uppercase">
                {build.tier.replace("-", " ")} Series Rig
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                Assembled &bull; In Stock
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {build.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {build.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-yellow-400 font-mono">
                {formatPKR(build.salePrice ?? build.price)}
              </span>
              {build.salePrice && (
                <span className="text-sm text-slate-500 line-through font-mono">
                  {formatPKR(build.price)}
                </span>
              )}
            </div>

            <div className="text-xs text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              <span>Includes {build.warrantyYears}-Year Comprehensive ZS Hardware Warranty</span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => addToCart(build, 1, "prebuilt")}
                className="btn-shimmer w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-black text-sm shadow-redHover transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart &bull; Ready to Ship</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => toggleWishlist(build.id)}
                  className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    isWished
                      ? "bg-red-600 text-white border-red-500"
                      : "bg-white/5 border-white/10 text-slate-200 hover:text-white"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWished ? "fill-white" : ""}`} />
                  <span>{isWished ? "In Wishlist" : "Wishlist"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => addToCompare(build)}
                  className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    isCompared
                      ? "bg-yellow-400 text-obsidian-950 border-yellow-400 font-black"
                      : "bg-white/5 border-white/10 text-slate-200 hover:text-white"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isCompared ? "In Comparison" : "Compare"}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-yellow-400" />
                <span>Free Insured TCS Courier across Pakistan (2-4 business days)</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-yellow-400" />
                <span>3-Hour FurMark thermal stress test video proof sent to WhatsApp</span>
              </div>
            </div>
          </div>

          {/* System Component Specs Breakdown */}
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
            <h3 className="font-bold text-white text-base">Included Rig Hardware</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/60 border border-white/5">
                <CircuitBoard className="w-4 h-4 text-red-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Graphics Card</div>
                  <div className="font-bold text-white">{build.specs.gpu}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/60 border border-white/5">
                <Cpu className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Processor</div>
                  <div className="font-bold text-white">{build.specs.cpu}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/60 border border-white/5">
                <Layers className="w-4 h-4 text-white shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Motherboard</div>
                  <div className="font-bold text-white">{build.specs.motherboard}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/60 border border-white/5">
                <Zap className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">RAM</div>
                  <div className="font-bold text-white">{build.specs.ram}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/60 border border-white/5">
                <HardDrive className="w-4 h-4 text-red-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Storage</div>
                  <div className="font-bold text-white">{build.specs.storage}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/60 border border-white/5">
                <Fan className="w-4 h-4 text-white shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Cooling Solution</div>
                  <div className="font-bold text-white">{build.specs.cooler}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/60 border border-white/5">
                <BatteryCharging className="w-4 h-4 text-red-500 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Power Supply</div>
                  <div className="font-bold text-white">{build.specs.psu}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/60 border border-white/5">
                <Box className="w-4 h-4 text-yellow-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Chassis</div>
                  <div className="font-bold text-white">{build.specs.case}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
