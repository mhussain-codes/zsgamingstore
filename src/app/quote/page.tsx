"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Sparkles,
  Send,
  CheckCircle2,
  DollarSign,
  Monitor,
  Flame,
  ArrowRight,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";

export default function QuotePage() {
  const { showToast } = useStore();

  const [budget, setBudget] = useState("250000");
  const [useCase, setUseCase] = useState("Competitive 1080p / 1440p Gaming");
  const [preferredCpu, setPreferredCpu] = useState("AMD Ryzen");
  const [preferredGpu, setPreferredGpu] = useState("NVIDIA GeForce RTX");
  const [aesthetics, setAesthetics] = useState("Clean Stealth Black (Minimal RGB)");
  const [targetResolution, setTargetResolution] = useState("1440p (2K)");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Lahore");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      showToast("Please enter your name and contact phone number", "error");
      return;
    }
    setSubmitted(true);
    showToast("Quote request submitted! (Demo mode)", "success");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Get a Build Quote</span>
      </nav>

      {/* Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-cyan/30 space-y-3">
        <span className="text-xs font-bold text-cyan uppercase tracking-wider inline-flex items-center gap-1.5">
          <Wrench className="w-4 h-4" /> Custom Rig Consultation
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Get a Tailored PC Build Quote in PKR
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Tell us your budget, games, and preferred aesthetic. Our hardware architects will configure a custom component proposal optimized for maximum price-to-performance in Pakistan.
        </p>
      </div>

      {submitted ? (
        <div className="p-12 rounded-3xl bg-graphite-900 border border-cyan/40 text-center space-y-4 shadow-card">
          <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan text-cyan flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white">
            Build Proposal Requested!
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you, <strong>{name}</strong>! We have recorded your preferences for a{" "}
            <strong>{formatPKR(Number(budget))}</strong> rig. In our live store, our technician sends a detailed parts breakdown with official prices via WhatsApp within 2 hours.
          </p>

          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/builds"
              className="px-5 py-2.5 rounded-xl bg-cyan text-graphite-950 text-xs font-bold"
            >
              Browse Ready Prebuilts
            </Link>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 rounded-xl bg-graphite-800 text-white text-xs font-bold border border-graphite-700"
            >
              Modify Quote
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-graphite-900 border border-graphite-800 space-y-8 text-xs">
          {/* Step 1: Target Budget */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan text-graphite-950 font-bold flex items-center justify-center text-[10px]">
                1
              </span>
              Target Build Budget:{" "}
              <span className="text-cyan font-mono text-base font-black">
                {formatPKR(Number(budget))}
              </span>
            </h3>

            <input
              type="range"
              min="120000"
              max="1000000"
              step="10000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full accent-cyan h-2 bg-graphite-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Rs. 120,000 (Entry)</span>
              <span>Rs. 350,000 (Sweet Spot)</span>
              <span>Rs. 700,000+ (Extreme)</span>
            </div>
          </div>

          {/* Step 2: Use Case & Resolution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-graphite-800">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Primary Purpose</label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              >
                <option value="Competitive 1080p / 1440p Gaming">Competitive Esports (CS2, Valorant, Apex, Warzone)</option>
                <option value="AAA Story Gaming (Max Settings)">AAA Ultra Ray Tracing (Cyberpunk, Wukong, GTA VI Ready)</option>
                <option value="Streaming & Content Creation">Streaming, 4K Premiere Video Editing &amp; Gaming</option>
                <option value="AI / Deep Learning / 3D Blender">AI / Machine Learning / 3D Architecture Rendering</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Target Display Resolution</label>
              <select
                value={targetResolution}
                onChange={(e) => setTargetResolution(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              >
                <option value="1080p FHD (144Hz - 240Hz)">1080p FHD (High Refresh Rate)</option>
                <option value="1440p (2K)">1440p QHD 2K (Sweet Spot)</option>
                <option value="4K UHD (3840x2160)">4K UHD (Maximum Fidelity)</option>
              </select>
            </div>
          </div>

          {/* Step 3: Brand & Aesthetic Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-graphite-800">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">CPU Preference</label>
              <select
                value={preferredCpu}
                onChange={(e) => setPreferredCpu(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              >
                <option value="AMD Ryzen (AM5)">AMD Ryzen (AM5 3D V-Cache)</option>
                <option value="Intel Core (14th Gen)">Intel Core (14th Gen Hybrid)</option>
                <option value="Technician Recommendation">No Preference (Best Value)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">GPU Preference</label>
              <select
                value={preferredGpu}
                onChange={(e) => setPreferredGpu(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              >
                <option value="NVIDIA GeForce RTX">NVIDIA RTX (DLSS 3 &amp; Ray Tracing)</option>
                <option value="AMD Radeon RX">AMD Radeon (Pure VRAM Raster)</option>
                <option value="Technician Recommendation">No Preference (Best FPS/PKR)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Aesthetics</label>
              <select
                value={aesthetics}
                onChange={(e) => setAesthetics(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              >
                <option value="Panoramic Glass RGB (Lian Li / NZXT)">Panoramic Glass + ARGB Showcase</option>
                <option value="Clean Stealth Black (Minimal RGB)">Stealth Black (Zero RGB Noise)</option>
                <option value="Whiteout Themed Build">All-White Themed Aesthetics</option>
              </select>
            </div>
          </div>

          {/* Step 4: Contact & Notes */}
          <div className="pt-4 border-t border-graphite-800 space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan text-graphite-950 font-bold flex items-center justify-center text-[10px]">
                2
              </span>
              Where Should We Send Your Proposal?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Raza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">WhatsApp / Mobile *</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Your City</label>
                <input
                  type="text"
                  placeholder="e.g. Lahore / Karachi / Islamabad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-300">Special Requests / Specific Games</label>
              <textarea
                rows={2}
                placeholder="e.g. I already have a 1TB SSD, need 32GB RAM minimum for Cities Skylines 2..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Generate &amp; Request Custom Build Proposal</span>
          </button>
        </form>
      )}
    </div>
  );
}
