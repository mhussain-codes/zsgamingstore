import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ZS Gaming Store Pakistan",
  description: "Learn how ZS Gaming Store handles customer contact information and protects order confidentiality.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Privacy Policy</span>
      </nav>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-cyan text-xs font-bold uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>Data Confidentiality</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          How ZS Gaming Store collects, processes, and protects customer shipping details and transaction records.
        </p>
      </div>

      {/* Store Owner Note */}
      <div className="p-4 rounded-xl bg-graphite-900 border border-amber-500/30 flex items-start gap-3 text-xs text-slate-300">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Store Owner Note:</strong> Starter privacy policy template. The store owner can update company registration, legal counsel details, and cookies policy in the Admin Panel.
        </div>
      </div>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-2">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider">
            1. Information We Collect
          </h2>
          <p>
            When you place an order or request a custom PC quote, we collect your name, mobile phone number, delivery address in Pakistan, and email address solely for courier dispatch and warranty verification.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-2">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider">
            2. Payment Information Security
          </h2>
          <p>
            ZS Gaming Store does not store payment card numbers, bank passwords, or debit PINs on our servers. In this demo storefront, simulated orders do not collect or transmit real financial card credentials.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-2">
          <h2 className="font-bold text-white text-sm uppercase tracking-wider">
            3. AI Assistant &amp; Conversation Data
          </h2>
          <p>
            Questions asked to the ZS Hardware Specialist assistant are temporarily processed to consult the store catalog and provide compatibility answers. We do not sell or monetize personal chat records.
          </p>
        </div>
      </div>
    </div>
  );
}
