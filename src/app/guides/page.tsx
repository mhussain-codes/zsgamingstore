"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Clock, Calendar, ArrowRight, User } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function GuidesListingPage() {
  const { guides } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Buying Guides &amp; Tech Articles</span>
      </nav>

      {/* Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-graphite-900 via-graphite-850 to-graphite-900 border border-graphite-800 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-cyan text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Knowledge &amp; Tech Insights</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          PC Hardware Buying Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Expert recommendations written by our senior system architects to help Pakistani gamers avoid bottlenecks, balance their budgets in PKR, and select compatible components.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guides/${guide.slug}`}
            className="group rounded-2xl bg-graphite-900 border border-graphite-800 hover:border-cyan/40 hover:bg-graphite-850 transition-all duration-300 hover:shadow-card flex flex-col justify-between overflow-hidden"
          >
            <div className="aspect-video overflow-hidden bg-graphite-950 relative">
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-graphite-950/85 backdrop-blur-md text-[10px] font-bold text-cyan border border-graphite-750">
                {guide.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan" /> {guide.date}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan" /> {guide.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-cyan transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-graphite-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">By {guide.author.split(",")[0]}</span>
                <span className="text-cyan font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Guide &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
