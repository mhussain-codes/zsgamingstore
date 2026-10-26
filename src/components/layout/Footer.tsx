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
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useStore } from "@/context/StoreContext";

export const Footer = () => {
  const { settings, categories } = useStore();

  return (
    <footer className="bg-graphite-950 border-t border-graphite-800 text-slate-400 text-sm">
      {/* Trust Highlights Section */}
      <div className="border-b border-graphite-850 bg-graphite-900/60 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-graphite-850/50 border border-graphite-750/60">
            <div className="p-2.5 rounded-lg bg-cyan/10 text-cyan shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">100% Genuine Boxed Parts</h3>
              <p className="text-xs text-slate-400 mt-1">
                Official local distributor warranty on every graphics card, processor, and power supply.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-graphite-850/50 border border-graphite-750/60">
            <div className="p-2.5 rounded-lg bg-cyan/10 text-cyan shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">24-Hour Stress Testing</h3>
              <p className="text-xs text-slate-400 mt-1">
                Every custom rig is benchmarked with FurMark and Cinebench R23 with thermal reports.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-graphite-850/50 border border-graphite-750/60">
            <div className="p-2.5 rounded-lg bg-cyan/10 text-cyan shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Insured Pakistan Shipping</h3>
              <p className="text-xs text-slate-400 mt-1">
                Instapak foam GPU bracing &amp; dual-box packaging via TCS Express to all major cities.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-graphite-850/50 border border-graphite-750/60">
            <div className="p-2.5 rounded-lg bg-cyan/10 text-cyan shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Expert Tech Support</h3>
              <p className="text-xs text-slate-400 mt-1">
                Dedicated WhatsApp &amp; in-person support in Lahore &amp; Karachi from experienced builders.
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

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
              <span><strong>Lahore:</strong> {settings.addressLahore}</span>
            </div>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
              <span><strong>Karachi:</strong> {settings.addressKarachi}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-cyan shrink-0" />
              <span>{settings.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-cyan shrink-0" />
              <span>{settings.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Clock className="w-4 h-4 text-cyan shrink-0" />
              <span>{settings.businessHours}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
            Hardware &amp; Parts
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hover:text-cyan transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/category/graphics-cards"
                className="text-cyan font-semibold hover:underline"
              >
                View All Categories &rarr;
              </Link>
            </li>
          </ul>
        </div>

        {/* Systems & Builders */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
            Custom Gaming
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/builds" className="hover:text-cyan transition-colors">
                Prebuilt Gaming PCs
              </Link>
            </li>
            <li>
              <Link href="/pc-builder" className="hover:text-cyan transition-colors">
                Custom PC Builder
              </Link>
            </li>
            <li>
              <Link href="/quote" className="hover:text-cyan transition-colors">
                Request a Custom Quote
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-cyan transition-colors">
                PC Buying Guides
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-cyan transition-colors">
                Compare Components
              </Link>
            </li>
            <li>
              <Link href="/track" className="hover:text-cyan transition-colors">
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care & Policies */}
        <div>
          <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
            Support &amp; Policies
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/faq" className="hover:text-cyan transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:text-cyan transition-colors">
                Warranty Claims &amp; Coverage
              </Link>
            </li>
            <li>
              <Link href="/delivery" className="hover:text-cyan transition-colors">
                Pakistan Delivery &amp; TCS Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-cyan transition-colors">
                Returns &amp; Replacement Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-cyan transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-cyan transition-colors">
                Contact &amp; Store Locations
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-slate-500 hover:text-cyan transition-colors">
                Admin Control Panel
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar & Demo Disclaimer */}
      <div className="border-t border-graphite-850 py-6 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} <strong>{settings.storeName}</strong>. All rights reserved. Handcrafted for Pakistani Gamers.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-graphite-850 border border-graphite-750 text-cyan">
              Interactive Store &amp; PC Builder Demo
            </span>
            <span>Prices listed in PKR (Pakistani Rupees).</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
