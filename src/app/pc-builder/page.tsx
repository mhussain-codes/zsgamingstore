"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShoppingCart,
  Plus,
  Trash2,
  Cpu,
  Layers,
  Zap,
  CircuitBoard,
  HardDrive,
  Fan,
  BatteryCharging,
  Box,
  Monitor,
  Headphones,
  Info,
  ShieldCheck,
  Share2,
  Sparkles,
  Gauge,
  Check,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Product, ProductCategory } from "@/types";
import { formatPKR } from "@/utils/format";
import { SafeImage } from "@/components/ui/SafeImage";

interface BuilderSlot {
  key: string;
  name: string;
  category: ProductCategory;
  required: boolean;
  icon: any;
}

const BUILDER_SLOTS: BuilderSlot[] = [
  { key: "cpu", name: "Processor (CPU)", category: "processors", required: true, icon: Cpu },
  { key: "motherboard", name: "Motherboard", category: "motherboards", required: true, icon: Layers },
  { key: "ram", name: "Memory (RAM)", category: "memory", required: true, icon: Zap },
  { key: "gpu", name: "Graphics Card (GPU)", category: "graphics-cards", required: true, icon: CircuitBoard },
  { key: "storage", name: "Storage (SSD NVMe)", category: "storage", required: true, icon: HardDrive },
  { key: "cooler", name: "CPU Cooler", category: "cooling", required: true, icon: Fan },
  { key: "psu", name: "Power Supply (PSU)", category: "power-supplies", required: true, icon: BatteryCharging },
  { key: "case", name: "Gaming Case", category: "cases", required: true, icon: Box },
  { key: "monitor", name: "Gaming Monitor (Optional)", category: "monitors", required: false, icon: Monitor },
  { key: "peripherals", name: "Peripherals (Optional)", category: "peripherals", required: false, icon: Headphones },
];

export default function PCBuilderPage() {
  const {
    products,
    customBuild,
    setCustomBuildPart,
    clearCustomBuild,
    customBuildTotal,
    addToCart,
    showToast,
  } = useStore();

  const [activeSlotKey, setActiveSlotKey] = useState<string>("cpu");

  // Determine current active slot configuration
  const activeSlot = BUILDER_SLOTS.find((s) => s.key === activeSlotKey) || BUILDER_SLOTS[0];

  // Filter available products for active slot
  const slotCandidates = useMemo(() => {
    return products.filter((p) => p.category === activeSlot.category);
  }, [products, activeSlot]);

  // Compatibility Analysis
  const compatibilityIssues = useMemo(() => {
    const issues: { type: "error" | "warning" | "success"; text: string }[] = [];
    const cpu = customBuild.cpu;
    const mobo = customBuild.motherboard;
    const ram = customBuild.ram;
    const gpu = customBuild.gpu;
    const psu = customBuild.psu;
    const pcCase = customBuild.case;

    // 1. Socket Check (CPU vs Motherboard)
    if (cpu && mobo) {
      const cpuSocket = cpu.compatibility?.socket;
      const moboSocket = mobo.compatibility?.socket;
      if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
        issues.push({
          type: "error",
          text: `Incompatible Socket: CPU requires ${cpuSocket}, but Motherboard is ${moboSocket}.`,
        });
      } else {
        issues.push({
          type: "success",
          text: `Socket Match: Both CPU and Motherboard support Socket ${cpuSocket || moboSocket}.`,
        });
      }
    }

    // 2. Memory Generation Check (Motherboard vs RAM)
    if (mobo && ram) {
      const moboRam = mobo.compatibility?.ramType;
      const ramType = ram.compatibility?.ramType;
      if (moboRam && ramType && moboRam !== ramType) {
        issues.push({
          type: "error",
          text: `RAM Mismatch: Motherboard takes ${moboRam}, but selected RAM is ${ramType}.`,
        });
      } else {
        issues.push({
          type: "success",
          text: `Memory Match: Both Motherboard and Memory use ${moboRam || ramType} standard.`,
        });
      }
    }

    // 3. Power Supply Wattage Requirement
    const estimatedWattage =
      (cpu?.compatibility?.tdpWatts || 105) +
      (gpu?.compatibility?.tdpWatts || 220) +
      100; // baseline for mobo, ram, fans, drives

    if (psu) {
      const psuWattage = psu.compatibility?.wattage || 750;
      if (psuWattage < estimatedWattage + 100) {
        issues.push({
          type: "warning",
          text: `Low PSU Headroom: Estimated draw is ~${estimatedWattage}W. Recommended PSU is at least ${estimatedWattage + 150}W.`,
        });
      } else {
        issues.push({
          type: "success",
          text: `PSU Headroom Verified: ${psuWattage}W PSU provides healthy headroom over estimated ${estimatedWattage}W peak draw.`,
        });
      }
    }

    // 4. Case Form Factor
    if (pcCase && mobo) {
      const moboForm = mobo.compatibility?.formFactor || "ATX";
      const caseForms = pcCase.compatibility?.supportedFormFactors || ["ATX", "Micro-ATX", "Mini-ITX"];
      if (!caseForms.includes(moboForm)) {
        issues.push({
          type: "error",
          text: `Form Factor Mismatch: Case does not fit ${moboForm} motherboard.`,
        });
      } else {
        issues.push({
          type: "success",
          text: `Form Factor Match: Case supports ${moboForm} motherboard footprint.`,
        });
      }
    }

    // 5. GPU Clearance Check in Case
    if (gpu && pcCase) {
      const gpuLength = gpu.compatibility?.gpuLengthMm || 280;
      const caseMax = pcCase.compatibility?.maxGpuLengthMm || 360;
      if (gpuLength > caseMax) {
        issues.push({
          type: "error",
          text: `GPU Clearance Error: GPU is ${gpuLength}mm long, but case allows up to ${caseMax}mm.`,
        });
      } else {
        issues.push({
          type: "success",
          text: `Case Clearance: GPU length (${gpuLength}mm) fits comfortably in case (max ${caseMax}mm).`,
        });
      }
    }

    return issues;
  }, [customBuild]);

  const hasErrors = compatibilityIssues.some((i) => i.type === "error");

  const requiredSlotsCount = BUILDER_SLOTS.filter((s) => s.required).length;
  const selectedRequiredCount = BUILDER_SLOTS.filter(
    (s) => s.required && customBuild[s.key]
  ).length;
  const isComplete = selectedRequiredCount === requiredSlotsCount;

  // Estimated system power draw
  const estimatedPower = useMemo(() => {
    let power = 80; // Baseline fans, SSD, motherboard
    if (customBuild.cpu?.compatibility?.tdpWatts) power += customBuild.cpu.compatibility.tdpWatts;
    if (customBuild.gpu?.compatibility?.tdpWatts) power += customBuild.gpu.compatibility.tdpWatts;
    return power;
  }, [customBuild]);

  const handleAddBuildToCart = () => {
    if (!isComplete) {
      showToast("Please select all required core components first", "error");
      return;
    }
    if (hasErrors) {
      showToast("Please resolve hardware compatibility errors before adding to cart", "error");
      return;
    }

    // Create a virtual product representation for the custom build
    const customBuildProduct: Product = {
      id: "custom-rig-" + Date.now(),
      name: `Custom Gaming PC (${customBuild.cpu?.name?.split(" ")[0]} + ${customBuild.gpu?.name?.split("GeForce")[1] || "Custom GPU"})`,
      slug: "custom-pc-build-" + Date.now(),
      brand: "ZS Custom Rig",
      category: "processors",
      price: customBuildTotal,
      shortDescription: `Custom assembled PC with ${customBuild.cpu?.name}, ${customBuild.gpu?.name}, ${customBuild.ram?.name}`,
      description: "Custom PC configured via ZS Gaming Store Builder. Includes 3-hour thermal testing, clean cable management, and 2-Year warranty.",
      image: customBuild.case?.image || "https://images.unsplash.com/photo-1587202372574-633385848590?w=800&auto=format&fit=crop&q=80",
      inStock: true,
      stockCount: 1,
      rating: 5.0,
      reviewCount: 1,
      specs: {
        CPU: customBuild.cpu?.name || "",
        Motherboard: customBuild.motherboard?.name || "",
        RAM: customBuild.ram?.name || "",
        GPU: customBuild.gpu?.name || "",
        Storage: customBuild.storage?.name || "",
        Cooler: customBuild.cooler?.name || "",
        PSU: customBuild.psu?.name || "",
        Case: customBuild.case?.name || "",
      },
    };

    addToCart(
      customBuildProduct,
      1,
      "custom_build",
      customBuild as Record<string, Product>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Custom PC Builder</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="ambient-glow-cyan absolute inset-0 pointer-events-none" />

        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            <span>Interactive Hardware Configurator &bull; Pakistan</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Design Your Custom Gaming PC
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Select parts step-by-step. Our engine checks Socket AM5 vs LGA1700, DDR4/DDR5 matching, and PSU wattage headroom in real time with transparent PKR pricing.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> Free Laser Cable Routing
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> 3-Hr Thermal Video Proof
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" /> 2-Year Full Hardware Warranty
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            type="button"
            onClick={clearCustomBuild}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Build</span>
          </button>
        </div>
      </div>

      {/* Progress & Power Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Parts Progress */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Core Components Progress
            </div>
            <div className="text-sm font-black text-white mt-0.5">
              {selectedRequiredCount} of {requiredSlotsCount} Required Parts Selected
            </div>
          </div>
          <div className="w-36 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(selectedRequiredCount / requiredSlotsCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Live Power Consumption Meter */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              Estimated Peak Draw
            </div>
            <div className="text-sm font-black text-white mt-0.5 font-mono">
              ~{estimatedPower} Watts
              <span className="text-xs text-slate-400 font-sans font-normal ml-2">
                (Recommend {estimatedPower + 150}W+ PSU)
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold font-mono">
            {customBuild.psu ? `${customBuild.psu.compatibility?.wattage || 750}W Fitted` : "PSU Pending"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Component Slots List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>CONFIGURATOR STEPS</span>
            <span className="text-cyan-400">
              {selectedRequiredCount} of {requiredSlotsCount} Core Selected
            </span>
          </div>

          <div className="space-y-2">
            {BUILDER_SLOTS.map((slot) => {
              const selectedItem = customBuild[slot.key];
              const isActive = activeSlotKey === slot.key;
              const Icon = slot.icon;

              return (
                <div
                  key={slot.key}
                  onClick={() => setActiveSlotKey(slot.key)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? "bg-slate-850 border-cyan-400 shadow-cyanHover scale-[1.01]"
                      : selectedItem
                      ? "bg-slate-900 border-slate-750 hover:border-slate-600"
                      : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        selectedItem
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                          : "bg-slate-800 border-slate-700 text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-300">
                          {slot.name}
                        </span>
                        {slot.required && (
                          <span className="text-[10px] text-coral font-bold">*</span>
                        )}
                      </div>
                      {selectedItem ? (
                        <div className="text-xs font-bold text-white truncate">
                          {selectedItem.name}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 italic">
                          Click to select {slot.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {selectedItem ? (
                      <div className="text-right">
                        <div className="text-xs font-bold text-cyan-400 font-mono">
                          {formatPKR(selectedItem.salePrice ?? selectedItem.price)}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCustomBuildPart(slot.key, undefined);
                          }}
                          className="text-[10px] text-coral hover:underline flex items-center gap-0.5 justify-end font-semibold"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Remove
                        </button>
                      </div>
                    ) : (
                      <span className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Slot Candidate Picker & Live Compatibility Summary (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Slot Header & Component Selection */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  Currently Choosing
                </span>
                <h3 className="text-lg font-black text-white">
                  Available {activeSlot.name}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                {slotCandidates.length} options in stock
              </span>
            </div>

            {/* Candidate List */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
              {slotCandidates.map((cand) => {
                const isSelected = customBuild[activeSlotKey]?.id === cand.id;

                return (
                  <div
                    key={cand.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-cyan-500/10 border-cyan-400 shadow-md"
                        : "bg-slate-850 border-slate-750 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-lg bg-slate-950 p-1 shrink-0 overflow-hidden border border-slate-700">
                        <img
                          src={cand.image}
                          alt={cand.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-cyan-400 uppercase font-mono">
                          {cand.brand}
                        </div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {cand.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {cand.shortDescription}
                        </p>
                        <div className="flex gap-2 text-[10px] text-slate-400 mt-1">
                          {cand.compatibility?.socket && (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                              Socket {cand.compatibility.socket}
                            </span>
                          )}
                          {cand.compatibility?.ramType && (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                              {cand.compatibility.ramType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0">
                      <div className="text-sm font-black text-white font-mono">
                        {formatPKR(cand.salePrice ?? cand.price)}
                      </div>
                      <button
                        type="button"
                        onClick={() => setCustomBuildPart(activeSlotKey, cand)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-cyan-400 text-obsidian-950 font-black shadow-sm"
                            : "bg-slate-800 hover:bg-cyan-400 hover:text-obsidian-950 text-slate-200 border border-slate-700"
                        }`}
                      >
                        {isSelected ? "Selected ✓" : "Select Part"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compatibility Engine Diagnostics */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-white">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Live Hardware Compatibility Check
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase ${
                  hasErrors
                    ? "bg-coral/20 text-coral border border-coral/40"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                }`}
              >
                {hasErrors ? "Errors Detected" : "100% Compatible"}
              </span>
            </div>

            {compatibilityIssues.length > 0 ? (
              <div className="space-y-2 pt-1">
                {compatibilityIssues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 p-2.5 rounded-xl text-xs leading-snug ${
                      issue.type === "error"
                        ? "bg-coral/10 border border-coral/30 text-coral"
                        : issue.type === "warning"
                        ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
                        : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    }`}
                  >
                    {issue.type === "error" ? (
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <span>{issue.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Choose components to begin automatic hardware verification.
              </p>
            )}
          </div>

          {/* Running Total & Order Action Bar */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-card">
            <div>
              <div className="text-xs text-slate-400 font-medium">Estimated Build Total</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {formatPKR(customBuildTotal)}
              </div>
              <div className="text-[11px] text-cyan-400 mt-0.5 font-medium">
                Includes assembly, laser cable management &amp; 3h stress test
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddBuildToCart}
              disabled={!isComplete || hasErrors}
              className="btn-shimmer w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-40 disabled:hover:from-cyan-400 text-obsidian-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add Custom Build to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
