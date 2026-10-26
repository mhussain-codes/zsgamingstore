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
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Contact Us</span>
      </nav>

      {/* Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2">
        <span className="text-xs font-bold text-cyan uppercase tracking-wider">
          Get in Touch
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Contact ZS Gaming Store
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Need assistance selecting PC components, tracking an ongoing build, or checking stock availability? Our technical team is available by phone, WhatsApp, and in-person.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Send Us a Message
            </h2>
            <span className="text-[11px] text-slate-500">Replies within 2 hours</span>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-graphite-950 border border-cyan/40 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-cyan mx-auto" />
              <h3 className="font-bold text-white text-base">Inquiry Recorded!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. In production this sends directly to our support ticket system. For instant assistance, you can also reach our live WhatsApp team.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="px-4 py-2 rounded-xl bg-graphite-800 hover:bg-graphite-700 text-xs font-bold text-white"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Daniyal Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
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
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
                  >
                    <option value="General Inquiry">General Hardware Inquiry</option>
                    <option value="Custom PC Advice">Custom PC Configuration Advice</option>
                    <option value="Warranty Claim">Warranty Claim Assistance</option>
                    <option value="Stock Availability">Stock &amp; Pricing Availability</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what components, games, or questions you have..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
                />
              </div>

              <div className="p-3 rounded-xl bg-graphite-950 border border-graphite-800 text-[11px] text-slate-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan shrink-0" />
                <span>Demo mode: Form submits into local application state without spamming external servers.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-xs shadow-cyanHover transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Action */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-graphite-900 to-graphite-850 border border-emerald-500/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Instant Support</span>
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
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              Store Locations
            </h3>

            <div className="p-4 rounded-xl bg-graphite-950 border border-graphite-800 space-y-2">
              <div className="font-bold text-cyan flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Lahore Branch (Hafeez Centre)
              </div>
              <p className="text-slate-300">{settings.addressLahore}</p>
              <div className="text-slate-400 flex items-center gap-2 pt-1 border-t border-graphite-850">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Mon - Sat: 11:30 AM &ndash; 9:30 PM (PKT)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-graphite-950 border border-graphite-800 space-y-2">
              <div className="font-bold text-cyan flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Karachi Branch (Techno City)
              </div>
              <p className="text-slate-300">{settings.addressKarachi}</p>
              <div className="text-slate-400 flex items-center gap-2 pt-1 border-t border-graphite-850">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Mon - Sat: 12:00 PM &ndash; 9:00 PM (PKT)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
