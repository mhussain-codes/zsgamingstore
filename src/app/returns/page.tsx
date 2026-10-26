import React from "react";
import Link from "next/link";
import { RotateCcw, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Returns & Replacement Policy | ZS Gaming Store Pakistan",
  description: "Understand the returns, replacement, and dead-on-arrival (DOA) policy at ZS Gaming Store Pakistan.",
};

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Returns Policy</span>
      </nav>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[100px] pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-bold uppercase tracking-wider">
          <RotateCcw className="w-4 h-4 text-red-500" />
          <span>Customer Protection &amp; Returns</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Returns &amp; Replacement Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          How we handle Dead-on-Arrival (DOA) hardware, transit damage claims, and returns across Pakistan.
        </p>
      </div>

      {/* Store Owner Note */}
      <div className="p-4 rounded-xl bg-graphite-900 border border-yellow-400/30 flex items-start gap-3 text-xs text-slate-300">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Customer Satisfaction Guarantee:</strong> We ensure 100% peace of mind with our 48-hour Dead-On-Arrival rapid swap guarantee.
        </div>
      </div>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 hover:border-yellow-400/30 transition-colors shadow-md">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            1. Dead-on-Arrival (DOA) 48-Hour Replacement
          </h2>
          <p>
            If any retail component or prebuilt PC does not power on or exhibits hardware malfunction within 48 hours of delivery confirmation from TCS, notify our WhatsApp support team immediately (+92 300 9742646).
          </p>
          <p>
            Our technicians will troubleshoot the issue via video call. If confirmed defective, we issue an immediate advance replacement or repair through the official local distributor.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 hover:border-red-500/30 transition-colors shadow-md">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            2. Transit Damage Protocol
          </h2>
          <p>
            Please inspect the courier package exterior upon delivery. If the outer shipping box exhibits severe physical crushing or water intrusion, take photos/video of the unboxing before opening the inner seals.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 hover:border-yellow-400/30 transition-colors shadow-md">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            3. Change of Mind Conditions
          </h2>
          <p>
            Unopened retail hardware in its original, sealed factory packaging can be returned or exchanged within 3 days of purchase, subject to a standard restocking fee to verify anti-tamper seals. Custom assembled PC builds (which have custom thermal paste, BIOS configuration, and labor applied) cannot be returned for change of mind once assembly is approved.
          </p>
        </div>
      </div>
    </div>
  );
}