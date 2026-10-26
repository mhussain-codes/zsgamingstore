import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Wrench,
  Truck,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Flame,
} from "lucide-react";

export const metadata = {
  title: "About Us | ZS Gaming Store Pakistan",
  description:
    "Learn about ZS Gaming Store, Pakistan's dedicated custom PC builder and hardware supplier located in Lahore Hafeez Centre and Karachi Techno City.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">About ZS Gaming Store</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none" />
        <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-red-500" />
          Our Heritage &amp; Craftsmanship
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Crafting High-Performance Gaming Systems For Pakistan
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Founded by passionate PC builders and hardware enthusiasts, ZS Gaming Store bridges the gap between raw cutting-edge components and professionally calibrated, turnkey gaming computers.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 hover:border-yellow-400/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Genuine Boxed Parts Only</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            We never deal in unverified tray CPUs or grey-market components without warranties. Every processor, graphics card, and power supply includes full boxed serials and official local distributor warranty coverage.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 hover:border-red-500/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
            <Wrench className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">3-Hour FurMark &amp; Cinebench Stress Testing</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Before any system is boxed for shipping, our technicians execute continuous Cinebench R23, FurMark 4K stress tests, and MemTest86 runs. We measure thermal deltas to ensure CPU and GPU temperatures stay cool in Pakistani summers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 hover:border-yellow-400/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">TCS Insured Nationwide Shipping</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Heavy modern graphics cards can crack PCIe slots during transit if unsupported. We deploy internal expanding Instapak foam bracing directly inside the case, double-box the chassis in dense foam, and insure the shipment via TCS.
          </p>
        </div>
      </div>

      {/* Physical Stores Section */}
      <div className="p-8 sm:p-10 rounded-3xl bg-graphite-900 border border-graphite-800 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
            Physical Retail &amp; Service Centers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Visit Our Walk-in Branches
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Want to test before you buy or discuss a bespoke water-cooled workstation in person? Our technicians are ready to assist you six days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Lahore */}
          <div className="p-6 rounded-2xl bg-graphite-950 border border-graphite-800 space-y-3 hover:border-yellow-400/30 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Lahore Experience Store</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                Main Hub
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Shop #24-B, 3rd Floor, Hafeez Centre, Main Boulevard, Gulberg III, Lahore</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-white font-mono">+92 300 9742646</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <span>Mon - Sat: 11:30 AM &ndash; 9:30 PM (PKT)</span>
              </div>
            </div>
          </div>

          {/* Karachi */}
          <div className="p-6 rounded-2xl bg-graphite-950 border border-graphite-800 space-y-3 hover:border-red-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">Karachi Tech Center</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/10 text-red-400 border border-red-600/20">
                Regional Hub
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Shop #104, 1st Floor, Techno City Mall, I.I. Chundrigar Road, Karachi</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-white font-mono">+92 321 8892110</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Mon - Sat: 12:00 PM &ndash; 9:00 PM (PKT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assembly Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
            Precision Craftsmanship
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            The ZS 10-Point Build Standard
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We treat every PC as if it were our own personal battle station. No shortcuts, no zip-tie nests, and no unstable overclocks.
          </p>

          <div className="space-y-3 text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Flashing the latest stable Motherboard BIOS with security microcode patches</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Enabling AMD EXPO / Intel XMP 3.0 memory profiles at verified 6000MHz+ timings</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>Custom fan curves configured for silent idle and sub-68°C gaming temperatures</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>All original boxes, manual booklets, warranty cards, and spare cables safely packed</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-graphite-900 border border-graphite-800 aspect-video shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1587202372574-633385848590?w=800&auto=format&fit=crop&q=80"
            alt="ZS Gaming Store PC Assembled Workbench"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}