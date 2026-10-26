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

    // 2. RAM Type Check (Motherboard vs RAM)
    if (mobo && ram) {
      const moboRam = mobo.compatibility?.ramType;
      const ramType = ram.compatibility?.ramType;
      if (moboRam && ramType && moboRam !== ramType) {
        issues.push({
          type: "error",
          text: `RAM Type Mismatch: Motherboard requires ${moboRam}, but selected RAM is ${ramType}.`,
        });
      } else {
        issues.push({
          type: "success",
          text: `Memory Match: ${ramType || moboRam} RAM is fully compatible.`,
        });
      }
    }

    // 3. AMD AM5 + DDR4 Check
    if (cpu?.compatibility?.socket === "AM5" && ram?.compatibility?.ramType === "DDR4") {
      issues.push({
        type: "error",
        text: "AMD Socket AM5 processors require DDR5 RAM. DDR4 will not fit.",
      });
    }

    // 4. Power Supply Headroom Calculation
    const cpuTdp = cpu?.compatibility?.tdpWatts || 65;
    const gpuTdp = gpu?.compatibility?.tdpWatts || 0;
    const baseSystemWatts = 100;
    const estimatedTotalDraw = cpuTdp + gpuTdp + baseSystemWatts;

    if (psu) {
      const psuWattageMatch = psu.specs["Wattage"]?.match(/\d+/);
      const psuWatts = psuWattageMatch ? parseInt(psuWattageMatch[0], 10) : 650;

      if (psuWatts < estimatedTotalDraw) {
        issues.push({
          type: "error",
          text: `Insufficient PSU: Build draws ~${estimatedTotalDraw}W, but ${psu.name} is only ${psuWatts}W.`,
        });
      } else if (psuWatts < estimatedTotalDraw + 150) {
        issues.push({
          type: "warning",
          text: `Tight Power Headroom: Estimated draw is ~${estimatedTotalDraw}W. An 850W+ PSU is recommended for transient spikes.`,
        });
      } else {
        issues.push({
          type: "success",
          text: `Adequate Power: ${psuWatts}W PSU provides healthy headroom for estimated ~${estimatedTotalDraw}W draw.`,
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
      name: `Custom PC Rig (${customBuild.cpu?.name?.split(" ")[0]} + ${customBuild.gpu?.name?.split("GeForce")[1] || "Custom GPU"})`,
      slug: "custom-pc-build-" + Date.now(),
      brand: "ZS Custom Rig",
      category: "processors",
      price: customBuildTotal,
      shortDescription: `Custom assembled PC with ${customBuild.cpu?.name}, ${customBuild.gpu?.name}, ${customBuild.ram?.name}`,
      description: "Custom PC configured via ZS Gaming Store Builder. Includes 24-hr testing, BIOS setup, and 2-Year warranty.",
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
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Custom PC Builder</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-cyan/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-cyan text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>Interactive Hardware Configurator</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Design Your Custom Gaming PC
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Select compatible parts step-by-step. Our engine validates Socket AM5 vs LGA1700, DDR5 memory, and PSU power requirements in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={clearCustomBuild}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-graphite-800 hover:bg-graphite-700 text-slate-300 text-xs font-bold border border-graphite-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Build</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Component Slots List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>CONFIGURATOR STEPS</span>
            <span className="text-cyan">
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
                      ? "bg-graphite-850 border-cyan shadow-cyanHover"
                      : selectedItem
                      ? "bg-graphite-900 border-graphite-750 hover:border-slate-600"
                      : "bg-graphite-900/60 border-graphite-800/80 hover:border-graphite-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        selectedItem
                          ? "bg-cyan/10 border-cyan/30 text-cyan"
                          : "bg-graphite-800 border-graphite-700 text-slate-400"
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
                        <div className="text-xs font-bold text-cyan font-mono">
                          {formatPKR(selectedItem.salePrice ?? selectedItem.price)}
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCustomBuildPart(slot.key, undefined);
                          }}
                          className="text-[10px] text-coral hover:underline flex items-center gap-0.5 justify-end"
                        >
                          <Trash2 className="w-2.5 h-2.5" /> Remove
                        </button>
                      </div>
                    ) : (
                      <span className="p-1.5 rounded-lg bg-graphite-800 text-slate-400">
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
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan uppercase tracking-wider">
                  Currently Choosing
                </span>
                <h3 className="text-lg font-black text-white">
                  Available {activeSlot.name}
                </h3>
              </div>
              <span className="text-xs text-slate-400">
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
                        ? "bg-cyan/10 border-cyan"
                        : "bg-graphite-850 border-graphite-750 hover:border-graphite-600"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-lg bg-graphite-950 p-1 shrink-0 overflow-hidden border border-graphite-700">
                        <img
                          src={cand.image}
                          alt={cand.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-cyan uppercase">
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
                            <span className="px-1.5 py-0.2 rounded bg-graphite-800 text-slate-300">
                              Socket {cand.compatibility.socket}
                            </span>
                          )}
                          {cand.compatibility?.ramType && (
                            <span className="px-1.5 py-0.2 rounded bg-graphite-800 text-slate-300">
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
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-cyan text-graphite-950 font-black"
                            : "bg-graphite-800 hover:bg-cyan hover:text-graphite-950 text-slate-200 border border-graphite-700"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compatibility Engine Diagnostics */}
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-white">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                Live Compatibility Check
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
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
          <div className="p-6 rounded-2xl bg-gradient-to-r from-graphite-900 to-graphite-850 border border-cyan/40 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-card">
            <div>
              <div className="text-xs text-slate-400 font-medium">Estimated Build Total</div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {formatPKR(customBuildTotal)}
              </div>
              <div className="text-[11px] text-cyan mt-0.5">
                Includes assembly, cable management &amp; 24h stress testing
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddBuildToCart}
              disabled={!isComplete || hasErrors}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-cyan hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan text-graphite-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2"
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
