import React from "react";
import Link from "next/link";
import { ShieldCheck, AlertCircle, Wrench, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Warranty Policy | ZS Gaming Store Pakistan",
  description: "Official local distributor warranty coverage and testing guarantee on all custom PC builds and gaming components.",
};

export default function WarrantyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Warranty Policy</span>
      </nav>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-cyan text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Local Distributor Assurance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Hardware Warranty &amp; Protection
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Transparent warranty coverage for custom PC builds and individual components. We handle local distributor claims directly so you never have to deal with manufacturer runarounds.
        </p>
      </div>

      {/* Store Owner Note */}
      <div className="p-4 rounded-xl bg-graphite-900 border border-amber-500/30 flex items-start gap-3 text-xs text-slate-300">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Store Owner Note:</strong> Warranty timeframes vary by component manufacturer (e.g., Corsair PSUs have 7-10 years, Samsung SSDs have 5 years, graphics cards have 1-3 years). Editable starter terms for your store policy.
        </div>
      </div>

      {/* Coverage Tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3">
          <div className="font-black text-white text-base">Custom &amp; Prebuilt PCs</div>
          <div className="text-cyan font-bold">1 to 3 Years ZS System Warranty</div>
          <p className="text-slate-400 leading-relaxed">
            Covers complete system diagnostic checks, labor, cable re-routing, BIOS re-flashing, and free parts replacement under valid distributor warranty terms.
          </p>
          <div className="space-y-1.5 text-slate-300 pt-2 border-t border-graphite-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan" /> Free diagnosis in Lahore &amp; Karachi branches
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan" /> 24-hr initial DOA replacement window
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3">
          <div className="font-black text-white text-base">Boxed Retail Components</div>
          <div className="text-cyan font-bold">Official Manufacturer Warranty</div>
          <p className="text-slate-400 leading-relaxed">
            Every boxed component includes official distributor warranty sticker. If a component develops a defect, bring it to our store and our team will handle the RMA process with the distributor.
          </p>
          <div className="space-y-1.5 text-slate-300 pt-2 border-t border-graphite-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan" /> Up to 10-Year Corsair PSU coverage
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan" /> 5-Year Samsung NVMe SSD warranty
            </div>
          </div>
        </div>
      </div>

      {/* What Voids Warranty */}
      <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 text-xs text-slate-300">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider">
          What Is Not Covered Under Warranty
        </h3>
        <ul className="list-disc list-inside space-y-1.5 text-slate-400">
          <li>Physical damage, burnt components caused by electrical surges without surge protectors or ungrounded home wiring.</li>
          <li>Liquid spillage or deliberate tampering with GPU thermal heatsink warranty stickers.</li>
          <li>Corrosion or dust clogging from improper long-term storage in damp environments.</li>
        </ul>
      </div>
    </div>
  );
}
