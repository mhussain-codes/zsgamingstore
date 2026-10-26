"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Info,
  Flame,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ContactPage() {
  const { settings, showToast } = useStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast("Please fill in required fields", "error");
      return;
    }

    setSubmitted(true);
    showToast("Your message has been recorded (Demo inquiry)", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 blur-[100px] pointer-events-none" />
        <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-red-500" />
          Direct Technical Support
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Contact ZS Gaming Store
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Need assistance selecting PC components, tracking an ongoing build, or checking stock availability? Our technical team is available by phone, WhatsApp, and in-person at our Lahore and Karachi hubs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
              Send Us a Message
            </h2>
            <span className="text-[11px] text-yellow-400 font-medium">Average reply: &lt; 30 mins</span>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-graphite-950 border border-yellow-400/40 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-yellow-400 mx-auto" />
              <h3 className="font-bold text-white text-base">Inquiry Recorded!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. In production this submits directly to our hardware team. For instant quotes or thermal test video requests, contact WhatsApp directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="px-4 py-2 rounded-xl bg-graphite-800 hover:bg-graphite-700 text-xs font-bold text-white transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daniyal Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="daniyal@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-yellow-400 outline-none transition-all"
                  >
                    <option value="General Inquiry">General Hardware Inquiry</option>
                    <option value="Custom PC Advice">Custom PC Configuration &amp; Compatibility</option>
                    <option value="Thermal Video Proof">Request 3-Hour Thermal Stress Test Video</option>
                    <option value="Warranty Claim">Warranty Claim / Local RMA Support</option>
                    <option value="Stock Availability">Stock &amp; Pricing Availability in PKR</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Detailed Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what resolution you game at (1080p, 1440p, 4K), your target budget in PKR, or components you wish to upgrade..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-xs shadow-redHover transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4 text-yellow-400" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Action */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-graphite-900 to-graphite-850 border border-emerald-500/40 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Instant WhatsApp Desk</span>
            </div>
            <h3 className="font-black text-white text-lg">
              Chat With Our Techs on WhatsApp
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prefer instant messaging? Send us your budget in PKR or component list on WhatsApp for live price quotes and stock checks.
            </p>
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-graphite-950 font-bold text-xs transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open WhatsApp ({settings.whatsapp})</span>
            </a>
          </div>

          {/* Locations */}
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4 text-xs shadow-lg">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Store Locations
            </h3>

            <div className="p-4 rounded-xl bg-graphite-950 border border-graphite-800 space-y-2 hover:border-yellow-400/30 transition-colors">
              <div className="font-bold text-yellow-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Lahore Branch (Hafeez Centre)
              </div>
              <p className="text-slate-300">{settings.addressLahore}</p>
              <div className="text-slate-400 flex items-center gap-2 pt-1 border-t border-graphite-850">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                <span>Mon - Sat: 11:30 AM &ndash; 9:30 PM (PKT)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-graphite-950 border border-graphite-800 space-y-2 hover:border-red-500/30 transition-colors">
              <div className="font-bold text-red-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Karachi Branch (Techno City)
              </div>
              <p className="text-slate-300">{settings.addressKarachi}</p>
              <div className="text-slate-400 flex items-center gap-2 pt-1 border-t border-graphite-850">
                <Clock className="w-3.5 h-3.5 text-yellow-400" />
                <span>Mon - Sat: 12:00 PM &ndash; 9:00 PM (PKT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}