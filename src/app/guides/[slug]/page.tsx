"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Clock, Calendar, User, ArrowLeft, ArrowRight, Wrench, Share2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";

interface GuideDetailProps {
  params: Promise<{ slug: string }>;
}

export default function GuideDetailPage({ params }: GuideDetailProps) {
  const { slug } = use(params);
  const { guides, showToast } = useStore();

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) {
    notFound();
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Guide link copied to clipboard!", "success");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-cyan transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-cyan transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-white font-medium truncate max-w-xs">{guide.title}</span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-graphite-900 border border-graphite-800 text-slate-300 hover:text-white text-xs font-semibold"
        >
          <Share2 className="w-3.5 h-3.5 text-cyan" />
          <span>Share</span>
        </button>
      </nav>

      {/* Guide Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan font-bold">
            {guide.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan" /> {guide.date}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan" /> {guide.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {guide.title}
        </h1>

        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <User className="w-4 h-4 text-cyan" />
          <span className="text-white font-bold">{guide.author}</span>
        </div>
      </div>

      {/* Featured Banner Image */}
      <div className="rounded-2xl overflow-hidden bg-graphite-900 border border-graphite-800 aspect-video">
        <img
          src={guide.image}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Guide Content */}
      <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6 text-sm">
        <div className="p-4 rounded-xl bg-graphite-900 border-l-4 border-cyan text-xs text-slate-300 italic">
          {guide.excerpt}
        </div>

        <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed">
          {guide.content}
        </div>
      </article>

      {/* Tags */}
      {guide.tags && guide.tags.length > 0 && (
        <div className="pt-6 border-t border-graphite-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Tags:</span>
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-graphite-900 border border-graphite-800 text-[11px] text-cyan font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Configurator CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-graphite-900 to-graphite-850 border border-cyan/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">
            Ready to apply these recommendations?
          </h3>
          <p className="text-xs text-slate-400">
            Configure your custom PC parts list with real-time socket and wattage checking.
          </p>
        </div>
        <Link
          href="/pc-builder"
          className="px-5 py-3 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-xs shadow-cyanHover transition-all shrink-0 flex items-center gap-1.5"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Open PC Builder</span>
        </Link>
      </div>
    </div>
  );
}
