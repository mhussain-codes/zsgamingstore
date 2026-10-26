"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  CircuitBoard,
  Wrench,
  Zap,
  Truck,
  CheckCircle2,
  Star,
  ChevronDown,
  Layers,
  Sparkles,
  Award,
  Play,
  Monitor,
  HardDrive,
  Fan,
  Box,
  BatteryCharging,
  Headphones,
  Flame,
  MessageSquare,
  ThermometerSnowflake,
  Cable,
  Check,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PCBuildCard } from "@/components/product/PCBuildCard";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPKR } from "@/utils/format";

export default function HomePage() {
  const { pcBuilds, products, categories, faqs, settings } = useStore();
  const [activeFaq, setActiveFaq] = useState<string | null>(faqs[0]?.id || null);

  const featuredBuilds = pcBuilds.slice(0, 3);
  const bestsellers = products.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const hotDeals = products.filter((p) => p.salePrice || p.badge === "Hot Deal").slice(0, 4);

  const budgetTiers = [
    {
      title: "Budget Esports",
      range: "Under Rs. 180,000",
      tier: "budget",
      desc: "Smooth 1080p competitive FPS in CS2, Valorant, GTA V & Fortnite with room to upgrade.",
      badge: "Best Value",
      fps: "Valorant: 280+ FPS",
    },
    {
      title: "1440p Sweet Spot",
      range: "Rs. 180k - 350,000",
      tier: "mid-range",
      desc: "High framerate 2K gaming with modern DLSS 3, 16GB VRAM GPUs, and DDR5 memory.",
      badge: "Most Popular",
      fps: "Warzone: 145+ FPS",
    },
    {
      title: "Enthusiast 4K",
      range: "Rs. 350k - 600,000",
      tier: "enthusiast",
      desc: "Maxed Ray Tracing, 4K high-refresh gaming, and seamless 1080p60 streaming rigs.",
      badge: "Hardcore",
      fps: "Cyberpunk: 95+ FPS",
    },
    {
      title: "Extreme Flagship",
      range: "Rs. 600,000+",
      tier: "extreme",
      desc: "Uncapped RTX 4080 Super & 4090 monsters, custom AIO liquid cooling, 64GB DDR5.",
      badge: "Zero Bottlenecks",
      fps: "4K Max: 140+ FPS",
    },
  ];

  const brandLogos = [
    "ASUS ROG",
    "MSI GAMING",
    "AMD RYZEN",
    "INTEL",
    "NVIDIA GEFORCE",
    "CORSAIR",
    "LIAN LI",
    "DEEPCOOL",
    "GIGABYTE",
    "KINGSTON FURY",
    "SAMSUNG",
    "RAZER",
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    "graphics-cards": <CircuitBoard className="w-6 h-6 text-cyan-400" />,
    "processors": <Cpu className="w-6 h-6 text-cyan-400" />,
    "motherboards": <Layers className="w-6 h-6 text-cyan-400" />,
    "memory": <Zap className="w-6 h-6 text-cyan-400" />,
    "storage": <HardDrive className="w-6 h-6 text-cyan-400" />,
    "cooling": <Fan className="w-6 h-6 text-cyan-400" />,
    "cases": <Box className="w-6 h-6 text-cyan-400" />,
    "power-supplies": <BatteryCharging className="w-6 h-6 text-cyan-400" />,
    "monitors": <Monitor className="w-6 h-6 text-cyan-400" />,
    "peripherals": <Headphones className="w-6 h-6 text-cyan-400" />,
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-obsidian-900 via-obsidian-950 to-obsidian-950 pt-8 pb-16 sm:py-20 border-b border-slate-800/80 tech-grid-pattern">
        {/* Ambient atmospheric glow */}
        <div className="ambient-glow-cyan absolute inset-0 pointer-events-none" />
        <div className="ambient-glow-emerald absolute inset-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Value Props, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wide shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse"></span>
                <span>Pakistan&apos;s Trusted PC Builders &bull; Sealed Official Parts</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                We Build Monster PCs <br />
                <span className="text-gradient-aurora">You Can Actually Trust.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Handcrafted by passionate gamers in Pakistan. Every rig gets brand-new sealed parts, clean cable routing, optimal fan curves, and a <strong>3-hour FurMark thermal stress test with video proof sent to your WhatsApp</strong> before delivery.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/pc-builder"
                  className="btn-shimmer w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-obsidian-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95"
                >
                  <Wrench className="w-4 h-4 text-obsidian-950" />
                  <span>Configure Your Custom PC</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/builds"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700/80 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-95"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Browse Ready-to-Ship PCs</span>
                </Link>
              </div>

              {/* Trust Metrics Pill Bar */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left max-w-lg mx-auto lg:mx-0">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  <div className="text-lg sm:text-xl font-black text-white font-mono">
                    3-Hour
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    WhatsApp Video Proof
                  </div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  <div className="text-lg sm:text-xl font-black text-cyan-400 font-mono">
                    3-Year
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Local ZS Warranty
                  </div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
                    100%
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Insured Shipping (TCS)
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Card */}
            <div className="lg:col-span-5 relative animate-floatSlow">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-slate-900/90 border border-slate-700/80 p-5 shadow-2xl overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-black uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Top Pick Rig of The Month
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Ready to Dispatch
                  </span>
                </div>

                <div className="rounded-2xl overflow-hidden bg-slate-950 aspect-[16/10] relative p-2 border border-slate-800/80 group">
                  <img
                    src="https://images.unsplash.com/photo-1587202372574-633385848590?w=800&auto=format&fit=crop&q=80"
                    alt="ZS Phantom Apex RTX 4080 Super Custom Gaming PC"
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-[11px] font-mono font-bold text-cyan-400 shadow-md">
                    Cyberpunk 4K Ultra: 104+ FPS
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-wider">
                    Enthusiast Flagship Rig
                  </div>
                  <h3 className="text-lg font-black text-white mt-0.5">
                    ZS Phantom Apex RTX 4080 Super
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    Ryzen 7 7800X3D, ASUS ROG Strix RTX 4080 Super 16GB, 32GB DDR5 6000MHz, 2TB Gen4 SSD, 360mm Liquid AIO.
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-800/90 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">
                      Full Assembled System
                    </div>
                    <div className="text-xl font-black text-white font-mono">
                      Rs. 775,000
                    </div>
                  </div>
                  <Link
                    href="/builds/zs-phantom-apex-rtx-4080-super"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-obsidian-950 text-xs font-black transition-all hover:scale-105 shadow-md"
                  >
                    View Rig Specs &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY PAKISTANI GAMERS TRUST ZS GAMING STORE (Humanized Trust Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            The ZS Gaming Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Why Pakistani Gamers Trust Us With Their Dream Rigs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            We know buying a gaming PC in Pakistan can be stressful with counterfeit or abused mining hardware in the market. Here is how we guarantee your peace of mind:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">100% Sealed Distributor Parts</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Never gray-market or pulled from crypto rigs. Every GPU, processor, and PSU comes with its original serial number and official Pakistani distributor warranty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">3-Hour Thermal Video Proof</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              We run extensive FurMark and Cinebench stress tests in a Pakistani climate chamber and WhatsApp you the thermal video proof before boxing your build.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Cable className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Airflow-First Cable Routing</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Custom zip-tied cable channels that maximize internal case airflow, keeping your CPU and GPU 6°C to 10°C cooler during peak summer gaming sessions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-coral/10 border border-coral/30 flex items-center justify-center text-coral mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Instapak Foam Transit Protection</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              We inject expanding foam inside the chassis to support heavy modern graphics cards, then double-box with wooden crate options for zero transit damage.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY BUDGET TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Transparent PKR Pricing
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Shop Gaming PCs By Budget
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Directly find balanced configurations tailored to your price range in PKR with zero component bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {budgetTiers.map((tier, idx) => (
            <Link
              key={idx}
              href={`/builds?tier=${tier.tier}`}
              className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-850 transition-all duration-300 hover:shadow-cardHover hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    {tier.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                  {tier.title}
                </h3>
                <div className="text-cyan-400 font-mono font-black text-sm mt-1">
                  {tier.range}
                </div>
                <div className="mt-2 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                  {tier.fps}
                </div>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] font-bold text-slate-400 group-hover:text-white flex items-center justify-between">
                <span>Explore Configurations</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              Component Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Popular Hardware Categories
            </h2>
          </div>
          <Link
            href="/category/graphics-cards"
            className="text-xs text-cyan-400 hover:underline font-bold hidden sm:inline-flex items-center gap-1"
          >
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all text-center flex flex-col items-center justify-center gap-2.5 hover:-translate-y-1 hover:shadow-cardHover"
            >
              <div className="p-3 rounded-xl bg-slate-800/80 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                {categoryIcons[cat.slug] || <Layers className="w-6 h-6 text-cyan-400" />}
              </div>
              <span className="font-bold text-xs text-white group-hover:text-cyan-400 transition-colors">
                {cat.name.split(" ")[0]}
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">
                Official Stock
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. FEATURED GAMING PCS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              Tested &amp; Ready To Ship
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Prebuilt Gaming PCs
            </h2>
          </div>
          <Link
            href="/builds"
            className="text-xs text-cyan-400 hover:underline font-bold inline-flex items-center gap-1"
          >
            View All Prebuilts ({pcBuilds.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBuilds.map((build) => (
            <PCBuildCard key={build.id} build={build} />
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE BUILD-YOUR-OWN-PC CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-cyan-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
              <Wrench className="w-3.5 h-3.5" />
              Guided PC Configurator
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Build Your Dream PC With Real-Time Compatibility Validation
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Pick your processor, motherboard, memory, GPU, power supply, and cooler with instant AM5 / LGA1700 socket validation, DDR4/DDR5 matching, and PSU headroom calculation in PKR.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Socket AM5 &amp; LGA1700 Validation
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DDR5 Speed &amp; Clearance Checks
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> PSU Headroom Wattage Calculation
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/pc-builder"
                className="btn-shimmer px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-obsidian-950 font-black text-sm shadow-cyanHover transition-all inline-flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>Launch Interactive PC Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quote"
                className="px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all inline-flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BESTSELLING HARDWARE COMPONENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              In-Demand Upgrades
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Bestselling Components
            </h2>
          </div>
          <Link
            href="/category/graphics-cards"
            className="text-xs text-cyan-400 hover:underline font-bold hidden sm:inline-flex items-center gap-1"
          >
            View All Components <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 8. AUTHORIZED DISTRIBUTOR BRANDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 border-y border-slate-800/80">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Official Distributor Hardware in Pakistan
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 font-black text-sm sm:text-base tracking-wider uppercase opacity-80">
          {brandLogos.map((brand, i) => (
            <span
              key={i}
              className="hover:text-cyan-400 hover:opacity-100 transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* 9. REAL PAKISTANI GAMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            Verified Customer Stories
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Trusted by Gamers Across Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Real feedback from customers who bought custom rigs and components delivered safely to their doorsteps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &quot;Ordered the ZS CyberForge RTX 4070 Ti Super build to Islamabad. The expanding Instapak foam secured the heavy GPU completely during transit. Booted up right away with XMP and fan curves properly tuned.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Haris Tariq</div>
                <div className="text-slate-400">Islamabad &bull; Verified Build Buyer</div>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                Verified TCS
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &quot;Picked up an AMD Ryzen 7 7800X3D and Corsair DDR5 kit directly from their Hafeez Centre store. 100% genuine boxed distributor warranty and their technician helped update my motherboard BIOS for free.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Usman Rauf</div>
                <div className="text-slate-400">Lahore &bull; In-Store Pickup</div>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                Hafeez Centre
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &quot;Their interactive PC builder made choosing compatible parts super simple. Received my complete rig in Karachi within 2 business days via TCS with all original boxes included.&quot;
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Fahad Noor</div>
                <div className="text-slate-400">Karachi &bull; Custom Build Customer</div>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                Clifton, KHI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. USEFUL FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            Common Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need to know about thermal stress testing, nationwide courier, warranties, and payment methods.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-cyan-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="text-xs text-cyan-400 hover:underline font-bold inline-flex items-center gap-1"
          >
            View all store FAQs &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
