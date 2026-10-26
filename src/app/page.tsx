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
      desc: "Smooth 1080p competitive FPS in CS2, Valorant, GTA V, and Fortnite.",
      badge: "Best Value",
    },
    {
      title: "1440p Sweet Spot",
      range: "Rs. 180k - 350,000",
      tier: "mid-range",
      desc: "High framerate 2K gaming with modern DLSS 3 and 16GB VRAM cards.",
      badge: "Most Popular",
    },
    {
      title: "Enthusiast 4K",
      range: "Rs. 350k - 600,000",
      tier: "enthusiast",
      desc: "Maxed ray tracing, high-refresh 1440p / 4K gaming, and content streaming.",
      badge: "Hardcore",
    },
    {
      title: "Extreme Flagship",
      range: "Rs. 600,000+",
      tier: "extreme",
      desc: "Uncapped RTX 4080 Super & 4090 rigs, liquid cooled with 64GB DDR5.",
      badge: "Zero Compromise",
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
    "graphics-cards": <CircuitBoard className="w-6 h-6 text-cyan" />,
    "processors": <Cpu className="w-6 h-6 text-cyan" />,
    "motherboards": <Layers className="w-6 h-6 text-cyan" />,
    "memory": <Zap className="w-6 h-6 text-cyan" />,
    "storage": <HardDrive className="w-6 h-6 text-cyan" />,
    "cooling": <Fan className="w-6 h-6 text-cyan" />,
    "cases": <Box className="w-6 h-6 text-cyan" />,
    "power-supplies": <BatteryCharging className="w-6 h-6 text-cyan" />,
    "monitors": <Monitor className="w-6 h-6 text-cyan" />,
    "peripherals": <Headphones className="w-6 h-6 text-cyan" />,
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-graphite-900 via-graphite-950 to-graphite-950 pt-8 pb-16 sm:py-20 border-b border-graphite-850 tech-grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-transparent to-graphite-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Value Props, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pakistan&apos;s Custom PC Specialist &bull; Official Warranties</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase">
                Power Your Play. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-teal-accent to-white">
                  Built For Precision.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Assembled by master technicians in Lahore &amp; Karachi. Every rig features genuine boxed components, clean cable routing, optimal fan curves, and mandatory 24-hour stress testing before insured delivery across Pakistan.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/builds"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Prebuilt PCs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/pc-builder"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-graphite-850 hover:bg-graphite-800 text-white font-bold text-sm border border-graphite-700 hover:border-cyan/40 transition-all flex items-center justify-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-cyan" />
                  <span>Configure Custom PC</span>
                </Link>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-graphite-800/80 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    24h
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Stress &amp; Thermal Test
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-cyan font-mono">
                    1-3 Yr
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Official ZS Warranty
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    100%
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Insured Nationwide
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl bg-gradient-to-b from-graphite-850 to-graphite-900 border border-graphite-750 p-5 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan/15 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan/20 border border-cyan/40 text-cyan font-black uppercase text-[10px] tracking-wider">
                    Flagship of the Month
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    In Stock in Lahore
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden bg-graphite-950 aspect-[16/10] relative">
                  <img
                    src="https://images.unsplash.com/photo-1587202372574-633385848590?w=800&auto=format&fit=crop&q=80"
                    alt="ZS Phantom Apex RTX 4080 Super Custom Gaming PC"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-graphite-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-graphite-750 text-[11px] font-mono font-bold text-cyan">
                    4K Ultra &bull; 104+ FPS (Cyberpunk)
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-400 font-medium">Enthusiast Rig</div>
                  <h3 className="text-lg font-black text-white">ZS Phantom Apex RTX 4080 Super</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    Ryzen 7 7800X3D, ASUS ROG Strix RTX 4080 Super 16GB, 32GB DDR5 6000MHz, 2TB Gen4 SSD, 360mm AIO.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-graphite-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Complete Ready Rig</div>
                    <div className="text-xl font-black text-white font-mono">
                      Rs. 775,000
                    </div>
                  </div>
                  <Link
                    href="/builds/zs-phantom-apex-rtx-4080-super"
                    className="px-4 py-2 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 text-xs font-black transition-colors"
                  >
                    View Build &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY BUDGET TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-cyan text-xs font-bold uppercase tracking-wider mb-1">
              Smart Purchasing in Pakistan
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Shop Gaming PCs By Budget
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Directly find balanced configurations tailored to your price range in PKR with zero bottlenecks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {budgetTiers.map((tier, idx) => (
            <Link
              key={idx}
              href={`/builds?tier=${tier.tier}`}
              className="group p-5 rounded-2xl bg-graphite-900 border border-graphite-800 hover:border-cyan/50 hover:bg-graphite-850 transition-all duration-300 hover:shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20 text-cyan">
                    {tier.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-cyan transition-colors">
                  {tier.title}
                </h3>
                <div className="text-cyan font-mono font-black text-sm mt-1">
                  {tier.range}
                </div>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-graphite-800 text-[11px] font-semibold text-slate-400 group-hover:text-white flex items-center gap-1">
                <span>View Matching Builds</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-cyan text-xs font-bold uppercase tracking-wider mb-1">
              Browse Components
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Popular Hardware Categories
            </h2>
          </div>
          <Link
            href="/category/graphics-cards"
            className="text-xs text-cyan hover:underline font-bold hidden sm:inline-flex items-center gap-1"
          >
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group p-4 rounded-xl bg-graphite-900 border border-graphite-800 hover:border-cyan/40 hover:bg-graphite-850 transition-all text-center flex flex-col items-center justify-center gap-2.5"
            >
              <div className="p-3 rounded-xl bg-graphite-800 group-hover:bg-cyan/10 group-hover:text-cyan transition-colors">
                {categoryIcons[cat.slug] || <Layers className="w-6 h-6 text-cyan" />}
              </div>
              <span className="font-bold text-xs text-white group-hover:text-cyan transition-colors">
                {cat.name.split(" ")[0]}
              </span>
              <span className="text-[10px] text-slate-400">
                Official Stock
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED GAMING PCS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-cyan text-xs font-bold uppercase tracking-wider mb-1">
              Engineered &amp; Verified
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Prebuilt Gaming PCs
            </h2>
          </div>
          <Link
            href="/builds"
            className="text-xs text-cyan hover:underline font-bold inline-flex items-center gap-1"
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

      {/* 5. INTERACTIVE BUILD-YOUR-OWN-PC CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-cyan/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="px-3 py-1 rounded-full bg-cyan/20 border border-cyan/40 text-cyan text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              Custom PC Configurator
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Build Your Own Custom PC With Live Compatibility Check
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Select your CPU, motherboard, RAM, GPU, storage, and cooling with real-time AM5/LGA1700 socket validation, DDR4/DDR5 match checks, and estimated PSU wattage calculations in Pakistani Rupees.
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan" /> Socket AM5 &amp; LGA1700 Validation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan" /> DDR5 Memory Compatibility
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan" /> PSU Headroom Wattage Calculation
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/pc-builder"
                className="px-6 py-3.5 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-sm shadow-cyanHover transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Launch Interactive PC Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quote"
                className="px-6 py-3.5 rounded-xl bg-graphite-800 hover:bg-graphite-700 text-white font-bold text-sm border border-graphite-700 transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BESTSELLING COMPONENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-cyan text-xs font-bold uppercase tracking-wider mb-1">
              In-Demand Hardware
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Bestselling Components
            </h2>
          </div>
          <Link
            href="/category/graphics-cards"
            className="text-xs text-cyan hover:underline font-bold hidden sm:inline-flex items-center gap-1"
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

      {/* 7. BRAND PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 border-y border-graphite-850">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Authorized Local Distributor Components &amp; Brands
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 font-black text-sm sm:text-base tracking-wider uppercase opacity-75">
          {brandLogos.map((brand, i) => (
            <span
              key={i}
              className="hover:text-cyan hover:opacity-100 transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS & SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-cyan text-xs font-bold uppercase tracking-wider mb-1">
            Verified Experiences
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Trusted by Pakistani Gamers &amp; Streamers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Read verified feedback from customers who bought custom rigs and components from our Lahore &amp; Karachi branches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &quot;Ordered the ZS CyberForge RTX 4070 Ti Super build to Islamabad. The Instapak foam packaging completely secured the GPU. Booted up right away with XMP and fan curves properly configured.&quot;
            </p>
            <div className="pt-2 border-t border-graphite-800 text-xs">
              <div className="font-bold text-white">Haris Tariq</div>
              <div className="text-slate-400">Islamabad &bull; Verified Build Buyer</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &quot;Picked up an AMD Ryzen 7 7800X3D and Corsair DDR5 kit directly from their Hafeez Centre store. Genuine boxed local distributor warranty and their technician helped update my BIOS for free.&quot;
            </p>
            <div className="pt-2 border-t border-graphite-800 text-xs">
              <div className="font-bold text-white">Usman Rauf</div>
              <div className="text-slate-400">Lahore &bull; Local Pickup</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &quot;Their interactive PC builder made choosing compatible parts super simple. Received my complete rig in Karachi within 2 business days via TCS with all original boxes included.&quot;
            </p>
            <div className="pt-2 border-t border-graphite-800 text-xs">
              <div className="font-bold text-white">Fahad Noor</div>
              <div className="text-slate-400">Karachi &bull; Custom Build Customer</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. USEFUL FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <div className="text-cyan text-xs font-bold uppercase tracking-wider mb-1">
            Common Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need to know about testing, shipping, warranties, and payments.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-graphite-900 border border-graphite-800 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-cyan transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-graphite-850">
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
            className="text-xs text-cyan hover:underline font-bold inline-flex items-center gap-1"
          >
            View all store FAQs &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
