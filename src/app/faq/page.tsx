"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Phone, MessageSquare, Wrench } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function FAQPage() {
  const { faqs, settings } = useStore();
  const [activeFaq, setActiveFaq] = useState<string | null>(faqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filteredFaqs = faqs.filter(
    (f) => selectedCategory === "All" || f.category === selectedCategory
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Frequently Asked Questions</span>
      </nav>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[100px] pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-red-500" />
          <span>Store Knowledge &amp; Answers</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Clear, honest answers about custom PC assembly, 3-hour FurMark thermal testing, nationwide TCS shipping, and local distributor warranty claims.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-yellow-400 text-graphite-950 font-black shadow-md"
                : "bg-graphite-900 text-slate-300 hover:text-white border border-graphite-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = activeFaq === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl bg-graphite-900 border transition-all overflow-hidden ${
                isOpen ? "border-yellow-400/40 shadow-lg" : "border-graphite-800"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-yellow-400 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-yellow-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-graphite-850">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Help Banner */}
      <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="font-bold text-white text-sm">Have a unique question?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Talk directly to our hardware builders on WhatsApp or visit our stores in Lahore &amp; Karachi.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs shrink-0 shadow-redHover transition-all active:scale-95"
        >
          Contact Support Team
        </Link>
      </div>
    </div>
  );
}