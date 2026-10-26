"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  AlertCircle,
  Wrench,
  Flame,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";
import { Order } from "@/types";

const TRACKING_STEPS = [
  { key: "confirmed", title: "Order Confirmed", desc: "Parts reserved and verified with local distributor" },
  { key: "testing_parts", title: "Component Testing", desc: "RAM timings and motherboard BIOS updated" },
  { key: "assembly", title: "Assembly & Cable Management", desc: "Precision assembly in dust-controlled bench" },
  { key: "benchmark", title: "3h Stress & Thermal Test", desc: "FurMark & Cinebench thermal video recorded for WhatsApp" },
  { key: "dispatched", title: "Dispatched via TCS Express", desc: "Instapak foam bracing inserted & shipped with tracking" },
  { key: "delivered", title: "Delivered to Customer", desc: "Safely received and operational" },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const { findOrder } = useStore();
  const [query, setQuery] = useState(initialId);
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      const found = findOrder(initialId);
      if (found) {
        setMatchedOrder(found);
        setSearched(true);
      }
    }
  }, [initialId, findOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const found = findOrder(query);
    setMatchedOrder(found || null);
    setSearched(true);
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case "Order Confirmed":
        return 0;
      case "Component Testing":
      case "Received":
        return 1;
      case "Cable Management & Assembly":
      case "Assembling":
        return 2;
      case "Stress Tested & Benchmarked":
      case "Stress-Testing":
        return 3;
      case "Dispatched via TCS":
      case "Dispatched":
        return 4;
      case "Delivered":
        return 5;
      default:
        return 2;
    }
  };

  const currentStep = matchedOrder ? getStepIndex(matchedOrder.status) : 0;

  return (
    <div className="space-y-8">
      {/* Tracking Search Input */}
      <form onSubmit={handleSearch} className="p-4 sm:p-6 rounded-2xl bg-obsidian-900 border border-white/10 flex flex-col sm:flex-row gap-3 shadow-xl">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ZS-78921) or TCS Tracking Number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-black border border-white/15 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-obsidian-950 font-black text-xs shadow-yellowHover transition-all shrink-0"
        >
          Track Order
        </button>
      </form>

      {/* Sample Quick Hint */}
      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 px-1">
        <span>Try demo order:</span>
        <button
          type="button"
          onClick={() => {
            setQuery("ZS-78921");
            const found = findOrder("ZS-78921");
            setMatchedOrder(found || null);
            setSearched(true);
          }}
          className="text-yellow-400 font-mono font-bold hover:underline"
        >
          ZS-78921
        </button>
        <span>or</span>
        <button
          type="button"
          onClick={() => {
            setQuery("ZS-41092");
            const found = findOrder("ZS-41092");
            setMatchedOrder(found || null);
            setSearched(true);
          }}
          className="text-yellow-400 font-mono font-bold hover:underline"
        >
          ZS-41092
        </button>
      </div>

      {/* Matched Order Result */}
      {matchedOrder ? (
        <div className="space-y-6 animate-fadeIn">
          {/* Order Header Card */}
          <div className="p-6 rounded-3xl bg-obsidian-900 border border-yellow-500/30 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Order ID</div>
              <div className="text-base font-black text-white font-mono">{matchedOrder.orderId}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">TCS Tracking #</div>
              <div className="text-base font-black text-yellow-400 font-mono">{matchedOrder.trackingNumber}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Current Milestone</div>
              <div className="text-xs font-bold text-white bg-red-600 px-2 py-0.5 rounded-md inline-block mt-0.5">
                {matchedOrder.status}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Total Amount</div>
              <div className="text-base font-black text-yellow-400 font-mono">{formatPKR(matchedOrder.total)}</div>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-900 border border-white/10 space-y-6">
            <h3 className="font-bold text-white text-base">Assembly &amp; Dispatch Timeline</h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {TRACKING_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={step.key} className="flex items-start gap-4 relative">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold z-10 ${
                        isCurrent
                          ? "bg-red-600 text-white ring-4 ring-red-500/30 animate-pulse"
                          : isPassed
                          ? "bg-yellow-400 text-obsidian-950 shadow-md"
                          : "bg-black border border-white/20 text-slate-500"
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isPassed ? "text-white" : "text-slate-500"}`}>
                          {step.title}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-red-600 text-white">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="p-12 text-center rounded-2xl bg-obsidian-900 border border-white/10 space-y-3">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Order Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn&apos;t find an order matching &quot;{query}&quot;. Please verify your Order ID or contact our WhatsApp support at +92 300 1234567.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Track Order</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-yellow-500/30 relative overflow-hidden shadow-xl">
        <div className="ambient-glow-yellow absolute inset-0 pointer-events-none" />

        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-wider">
            <Truck className="w-4 h-4 text-yellow-300" />
            <span>TCS Express &bull; Real-Time Rig Progress</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Track Your Custom PC Assembly &amp; Delivery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enter your ZS Order ID or TCS tracking code to follow your hardware through component testing, laser cable management, 3-hour FurMark thermal stress testing, and courier dispatch.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 animate-pulse">Loading tracking system...</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
