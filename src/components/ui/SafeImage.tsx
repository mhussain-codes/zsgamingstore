"use client";

import React, { useState } from "react";
import { Cpu, CircuitBoard, Layers, Zap, HardDrive, Fan, Box, BatteryCharging, Monitor, Headphones, Laptop } from "lucide-react";

interface SafeImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "wide";
  priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  category = "processors",
  className = "w-full h-full object-cover",
  aspectRatio = "video",
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "graphics-cards":
        return <CircuitBoard className="w-12 h-12 text-cyan/70" />;
      case "processors":
        return <Cpu className="w-12 h-12 text-cyan/70" />;
      case "motherboards":
        return <Layers className="w-12 h-12 text-cyan/70" />;
      case "memory":
        return <Zap className="w-12 h-12 text-cyan/70" />;
      case "storage":
        return <HardDrive className="w-12 h-12 text-cyan/70" />;
      case "cooling":
        return <Fan className="w-12 h-12 text-cyan/70" />;
      case "cases":
        return <Box className="w-12 h-12 text-cyan/70" />;
      case "power-supplies":
        return <BatteryCharging className="w-12 h-12 text-cyan/70" />;
      case "monitors":
        return <Monitor className="w-12 h-12 text-cyan/70" />;
      case "peripherals":
        return <Headphones className="w-12 h-12 text-cyan/70" />;
      default:
        return <Laptop className="w-12 h-12 text-cyan/70" />;
    }
  };

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-[16/10]",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  if (error || !src) {
    return (
      <div
        className={`w-full ${aspectClass} bg-gradient-to-br from-graphite-850 via-graphite-900 to-graphite-950 flex flex-col items-center justify-center p-4 border border-graphite-750/50 rounded-lg text-center select-none ${className}`}
      >
        <div className="p-3 rounded-full bg-graphite-800/80 border border-graphite-700/60 mb-2">
          {getCategoryIcon(category)}
        </div>
        <span className="text-xs font-semibold text-slate-300 max-w-[85%] truncate">
          {alt}
        </span>
        <span className="text-[10px] text-cyan/70 font-mono uppercase mt-0.5 tracking-wider">
          ZS Verified Hardware
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-graphite-900 ${aspectClass}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-graphite-850 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-cyan/40 border-t-cyan animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};
