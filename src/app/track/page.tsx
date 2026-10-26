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
  { key: "benchmark", title: "24h Stress & Thermal Test", desc: "Cinebench R23, FurMark & MemTest86 logs verified" },
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
        return 1;
      case "Cable Management & Assembly":
        return 2;
      case "Stress Tested & Benchmarked":
        return 3;
      case "Dispatched via TCS":
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
      <form onSubmit={handleSearch} className="p-4 sm:p-6 rounded-2xl bg-graphite-900 border border-graphite-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ZS-78921) or TCS Tracking Number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-graphite-950 border border-graphite-750 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-xs shadow-cyanHover transition-all shrink-0"
        >
          Track Order
        </button>
      </form>

      {/* Sample Quick Hint */}
      {!searched && (
        <div className="text-xs text-slate-400 bg-graphite-900/60 p-4 rounded-xl border border-graphite-800 flex items-center justify-between">
          <span>Demo Hint: Try searching sample order <strong className="text-cyan font-mono cursor-pointer" onClick={() => { setQuery("ZS-78921"); setMatchedOrder(findOrder("ZS-78921") || null); setSearched(true); }}>ZS-78921</strong></span>
          <span className="text-[11px] text-slate-500">Live test data</span>
        </div>
      )}

      {/* Order Tracking Display */}
      {searched && matchedOrder && (
        <div className="p-6 sm:p-8 rounded-3xl bg-graphite-900 border border-graphite-800 space-y-8 animate-fadeIn">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-graphite-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Order ID:</span>
                <span className="text-lg font-black text-white font-mono">{matchedOrder.orderId}</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-[10px] font-black uppercase">
                  {matchedOrder.status}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Placed on {matchedOrder.date} &bull; Destination: {matchedOrder.customer.city}, Pakistan
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400">TCS Courier Number</div>
              <div className="text-xs font-mono font-bold text-white mt-0.5">
                {matchedOrder.trackingNumber}
              </div>
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="space-y-6">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              Assembly &amp; Shipping Pipeline
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-graphite-800">
              {TRACKING_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={step.key} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 sm:-left-8 w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                        isCurrent
                          ? "bg-cyan border-cyan text-graphite-950 shadow-cyanHover animate-pulse"
                          : isPassed
                          ? "bg-graphite-800 border-cyan text-cyan"
                          : "bg-graphite-950 border-graphite-800 text-slate-600"
                      }`}
                    >
                      {isPassed && !isCurrent ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <div
                        className={`text-xs sm:text-sm font-bold ${
                          isCurrent
                            ? "text-cyan"
                            : isPassed
                            ? "text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-400">{step.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Included Items List */}
          <div className="pt-6 border-t border-graphite-800 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Order Items Summary
            </h4>
            <div className="divide-y divide-graphite-800 text-xs">
              {matchedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-8 h-8 rounded object-cover bg-graphite-950 border border-graphite-750"
                    />
                    <div>
                      <div className="font-bold text-white">{item.product.name}</div>
                      <div className="text-[11px] text-slate-500">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-white">
                    {formatPKR((item.product.salePrice ?? item.product.price) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Not Found State */}
      {searched && !matchedOrder && (
        <div className="p-12 text-center rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3 animate-fadeIn">
          <AlertCircle className="w-10 h-10 text-coral mx-auto" />
          <h3 className="font-bold text-white text-base">Order Not Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We could not locate an order matching &quot;{query}&quot;. Please verify your Order ID or contact support on WhatsApp (+92 300 9742646).
          </p>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Order Tracking</span>
      </nav>

      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-cyan text-xs font-bold uppercase tracking-wider">
          <Package className="w-4 h-4" />
          <span>Live Build &amp; Transit Tracker</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Track Your Gaming PC Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Monitor your system through every step: component serialization, clean cable management, 24-hour thermal stress testing, and insured TCS Express dispatch.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-slate-400 animate-pulse">Loading tracking system...</div>}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
