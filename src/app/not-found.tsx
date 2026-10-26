import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Wrench, Package } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan/10 border border-cyan/30 text-cyan flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-cyan font-mono uppercase tracking-widest">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Hardware Not Located
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
          The product, build, or page you are looking for has been moved or is currently out of stock.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan text-graphite-950 font-bold text-xs shadow-cyanHover transition-all"
        >
          Return to Storefront
        </Link>
        <Link
          href="/builds"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-graphite-900 text-white font-bold text-xs border border-graphite-800 hover:border-graphite-700 transition-all flex items-center justify-center gap-1.5"
        >
          <Package className="w-3.5 h-3.5 text-cyan" />
          <span>Prebuilt Systems</span>
        </Link>
        <Link
          href="/pc-builder"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-graphite-900 text-white font-bold text-xs border border-graphite-800 hover:border-graphite-700 transition-all flex items-center justify-center gap-1.5"
        >
          <Wrench className="w-3.5 h-3.5 text-cyan" />
          <span>PC Builder</span>
        </Link>
      </div>
    </div>
  );
}
