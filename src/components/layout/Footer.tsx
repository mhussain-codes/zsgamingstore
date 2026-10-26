"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  Wrench,
  Clock,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Sparkles,
  Award,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useStore } from "@/context/StoreContext";

export const Footer = () => {
  const { settings, categories } = useStore();

  return (
    <footer className="bg-obsidian-950 border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Trust Highlights Section */}
      <div className="border-b border-slate-800/60 bg-slate-900/50 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 border border-cyan-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">100% Genuine Boxed Parts</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Official local distributor warranty on every graphics card, processor, motherboard, and power supply.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/30">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">3-Hour Thermal Benchmarks</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                FurMark &amp; Cinebench stress-tested in Pakistani room temps. Thermal video sent via WhatsApp.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 border border-amber-500/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Insured Nationwide Delivery</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Instapak foam GPU support &amp; dual-box packaging via TCS Express to Lahore, Karachi, Islamabad &amp; beyond.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-coral/10 text-coral shrink-0 border border-coral/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Dedicated Gamer Support</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Real technicians on WhatsApp ready to help you with upgrades, BIOS updates, and FPS tuning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Store Info */}
        <div className="lg:col-span-2 space-y-4">
          <Logo size="lg" />
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            {settings.tagline}. Dedicated to delivering high-framerate, aesthetically immaculate gaming systems, workstations, and enthusiast hardware across Pakistan.
          </p>

          <div className="space-y-2.5 text-xs pt-1">
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Lahore Hub:</strong> {settings.addressLahore}</span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Karachi Hub:</strong> {settings.addressKarachi}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{settings.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{settings.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{settings.businessHours}</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat with a PC Tech on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-white text-xs mb-4 uppercase tracking-wider">
            Hardware &amp; Parts
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/category/graphics-cards"
                className="text-cyan-400 font-semibold hover:underline"
              >
                View All Categories &rarr;
              </Link>
            </li>
          </ul>
        </div>

        {/* Systems & Builders */}
        <div>
          <h4 className="font-bold text-white text-xs mb-4 uppercase tracking-wider">
            Custom Gaming
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/builds" className="hover:text-cyan-400 transition-colors">
                Prebuilt Gaming PCs
              </Link>
            </li>
            <li>
              <Link href="/pc-builder" className="hover:text-cyan-400 transition-colors font-semibold text-cyan-400">
                Custom PC Builder
              </Link>
            </li>
            <li>
              <Link href="/quote" className="hover:text-cyan-400 transition-colors">
                Request a Custom Quote
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-cyan-400 transition-colors">
                PC Buying Guides
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-cyan-400 transition-colors">
                Compare Components
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-cyan-400 transition-colors">
                Track Order Status
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care & Policies */}
        <div>
          <h4 className="font-bold text-white text-xs mb-4 uppercase tracking-wider">
            Support &amp; Policies
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/faq" className="hover:text-cyan-400 transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:text-cyan-400 transition-colors">
                Warranty Claims &amp; Coverage
              </Link>
            </li>
            <li>
              <Link href="/delivery" className="hover:text-cyan-400 transition-colors">
                Pakistan Delivery &amp; TCS Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-cyan-400 transition-colors">
                Returns &amp; Replacement Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                Contact &amp; Store Locations
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-slate-500 hover:text-cyan-400 transition-colors">
                Admin Control Panel
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar & Demo Disclaimer */}
      <div className="border-t border-slate-800/80 py-6 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} <strong>{settings.storeName}</strong>. Handcrafted for Pakistani Gamers.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 font-mono">
              Prices in PKR (Rs.)
            </span>
            <span>Insured Courier Nationwide via TCS &amp; Leopard.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
