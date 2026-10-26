import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Box, Clock, MapPin, AlertCircle, Sparkles } from "lucide-react";

export const metadata = {
  title: "Delivery & Shipping Policy | ZS Gaming Store Pakistan",
  description: "Learn how ZS Gaming Store packages and ships custom PCs and hardware safely via TCS Express across all Pakistani cities.",
};

export default function DeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Delivery &amp; Shipping</span>
      </nav>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[100px] pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-bold uppercase tracking-wider">
          <Truck className="w-4 h-4 text-red-500" />
          <span>Nationwide Logistics Across Pakistan</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Delivery &amp; Courier Protection
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          How we safeguard custom liquid-cooled and air-cooled gaming rigs from courier transit shocks between Lahore, Karachi, and all cities in Pakistan.
        </p>
      </div>

      {/* Policy Notice for Store Owner */}
      <div className="p-4 rounded-xl bg-graphite-900 border border-yellow-400/30 flex items-start gap-3 text-xs text-slate-300">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Transit Guarantee:</strong> Every rig shipped includes 100% full transit insurance with TCS. In the rare event of transit damage, we replace damaged parts immediately at zero cost to you.
        </div>
      </div>

      {/* Shipping Timelines Matrix */}
      <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4 shadow-lg">
        <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          Estimated Shipping Times
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-graphite-950 border border-graphite-800 space-y-1.5 hover:border-yellow-400/30 transition-colors">
            <div className="font-bold text-yellow-400">Lahore &amp; Karachi</div>
            <div className="text-xl font-black text-white font-mono">1 &ndash; 2 Days</div>
            <p className="text-[11px] text-slate-400">
              Same-day delivery available via store rider on confirmed prebuilts.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-graphite-950 border border-graphite-800 space-y-1.5 hover:border-red-500/30 transition-colors">
            <div className="font-bold text-red-400">Islamabad &amp; Rawalpindi</div>
            <div className="text-xl font-black text-white font-mono">1 &ndash; 2 Days</div>
            <p className="text-[11px] text-slate-400">
              Dispatched daily via priority TCS Air / Overland insured cargo.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-graphite-950 border border-graphite-800 space-y-1.5 hover:border-yellow-400/30 transition-colors">
            <div className="font-bold text-yellow-400">All Other Pakistan Cities</div>
            <div className="text-xl font-black text-white font-mono">2 &ndash; 4 Days</div>
            <p className="text-[11px] text-slate-400">
              Peshawar, Multan, Faisalabad, Quetta, Gujranwala, Sialkot, Hyderabad, etc.
            </p>
          </div>
        </div>
      </div>

      {/* Instapak Foam Protection Explanation */}
      <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4 shadow-lg">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-red-500" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Instapak Foam Internal Bracing Protocol
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Modern graphics cards like the RTX 4070 Ti Super and RTX 4080 Super weigh over 1.5 kilograms. During courier handling, road vibrations can cause heavy GPUs or tower coolers to stress the motherboard PCIe slot.
        </p>

        <div className="space-y-2 text-xs text-slate-300 bg-graphite-950 p-4 rounded-xl border border-graphite-800">
          <div className="font-bold text-yellow-400 mb-1">How We Protect Your Rig:</div>
          <p>
            1. We inject custom expanding Instapak foam cushions directly inside the chassis. The foam molds precisely around your graphics card and CPU cooler, preventing any movement.
          </p>
          <p>
            2. The PC chassis is packed into its original high-density Styrofoam box.
          </p>
          <p>
            3. The entire PC box is placed inside a second heavy-duty corrugated outer shipping box with edge protectors and fragile warnings.
          </p>
        </div>
      </div>
    </div>
  );
}