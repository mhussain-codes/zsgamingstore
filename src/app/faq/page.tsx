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
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Frequently Asked Questions</span>
      </nav>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-cyan text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Store Knowledge &amp; Answers</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Clear, honest answers about custom PC assembly, testing procedures, nationwide TCS shipping, and local distributor warranty claims.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedCategory === cat
                ? "bg-cyan text-graphite-950 font-black shadow-sm"
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
              className="rounded-2xl bg-graphite-900 border border-graphite-800 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-cyan transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-cyan shrink-0 transition-transform duration-200 ${
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
      <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-sm">Have a unique question?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Talk directly to our hardware builders on WhatsApp or visit our stores.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-cyan text-graphite-950 text-xs font-black shrink-0"
        >
          Contact Support Team
        </Link>
      </div>
    </div>
  );
}
