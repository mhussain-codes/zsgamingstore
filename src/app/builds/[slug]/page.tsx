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
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/builds" className="hover:text-cyan transition-colors">
          Prebuilt Gaming PCs
        </Link>
        <span>/</span>
        <span className="text-white font-medium">{build.name}</span>
      </nav>

      {/* Main Grid: Gallery & Buying Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-graphite-900 border border-graphite-800 aspect-[16/10] relative">
            <img
              src={activeImage}
              alt={build.name}
              className="w-full h-full object-cover"
            />
            {build.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase rounded-lg bg-cyan text-graphite-950 shadow-md">
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
                    activeImage === img ? "border-cyan" : "border-graphite-800 opacity-60"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* FPS Gaming Benchmarks Table */}
          {build.fpsBenchmarks && build.fpsBenchmarks.length > 0 && (
            <div className="mt-8 p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan" />
                <h3 className="font-bold text-white text-base">
                  Verified Real Gaming Framerates
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Average FPS measured under actual gameplay at max settings with current GPU drivers.
              </p>

              <div className="divide-y divide-graphite-800 border-t border-graphite-800">
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
                      <div className="text-base font-black text-cyan font-mono">
                        {bench.fps} FPS
                      </div>
                      <div className="text-[10px] text-slate-500">{bench.resolution}</div>
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
              <span className="text-cyan font-bold tracking-wider uppercase">
                {build.tier.replace("-", " ")} Series
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
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
          <div className="p-5 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-white font-mono">
                {formatPKR(build.salePrice ?? build.price)}
              </span>
              {build.salePrice && (
                <span className="text-sm text-slate-500 line-through font-mono">
                  {formatPKR(build.price)}
                </span>
              )}
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan" />
              <span>Includes {build.warrantyYears}-Year Comprehensive ZS Hardware Warranty</span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => addToCart(build, 1, "prebuilt")}
                className="w-full py-3.5 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2"
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
                      ? "bg-coral/20 border-coral text-coral"
                      : "bg-graphite-800 border-graphite-700 text-slate-300 hover:text-white"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWished ? "fill-coral" : ""}`} />
                  <span>{isWished ? "In Wishlist" : "Save Wishlist"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => addToCompare(build)}
                  className={`py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    isCompared
                      ? "bg-cyan/20 border-cyan text-cyan"
                      : "bg-graphite-800 border-graphite-700 text-slate-300 hover:text-white"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isCompared ? "In Comparison" : "Compare"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Delivery & Testing Highlights */}
          <div className="p-4 rounded-xl bg-graphite-900/60 border border-graphite-800 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-slate-300">
              <Truck className="w-4 h-4 text-cyan shrink-0" />
              <span>Insured TCS Express shipping to Karachi, Islamabad, Lahore &amp; all cities.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Wrench className="w-4 h-4 text-cyan shrink-0" />
              <span>24h burn-in stress test report included in package.</span>
            </div>
          </div>

          {/* Full Specifications Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              Included Component Specs
            </h3>

            <div className="rounded-2xl bg-graphite-900 border border-graphite-800 divide-y divide-graphite-800 text-xs">
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan" /> Processor
                </span>
                <span className="text-white font-bold text-right">{build.specs.cpu}</span>
              </div>
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1.5">
                  <CircuitBoard className="w-3.5 h-3.5 text-cyan" /> Graphics Card
                </span>
                <span className="text-white font-bold text-right">{build.specs.gpu}</span>
              </div>
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan" /> Motherboard
                </span>
                <span className="text-white font-bold text-right">{build.specs.motherboard}</span>
              </div>
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan" /> Memory (RAM)
                </span>
                <span className="text-white font-bold text-right">{build.specs.ram}</span>
              </div>
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-cyan" /> Primary Storage
                </span>
                <span className="text-white font-bold text-right">{build.specs.storage}</span>
              </div>
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1.5">
                  <Fan className="w-3.5 h-3.5 text-cyan" /> CPU Cooler
                </span>
                <span className="text-white font-bold text-right">{build.specs.cooler}</span>
              </div>
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5 text-cyan" /> Power Supply
                </span>
                <span className="text-white font-bold text-right">{build.specs.psu}</span>
              </div>
              <div className="p-3 flex items-start justify-between gap-4">
                <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-cyan" /> Case / Chassis
                </span>
                <span className="text-white font-bold text-right">{build.specs.case}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
