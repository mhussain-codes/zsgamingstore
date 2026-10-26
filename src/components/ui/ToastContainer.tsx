"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export const ToastContainer = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-2xl border backdrop-blur-md animate-fadeIn text-sm ${
            toast.type === "success"
              ? "bg-graphite-900/95 border-cyan/40 text-white"
              : toast.type === "error"
              ? "bg-graphite-900/95 border-coral/50 text-white"
              : "bg-graphite-900/95 border-graphite-700 text-slate-200"
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-cyan" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-5 h-5 text-coral" />
            )}
            {toast.type === "info" && <Info className="w-5 h-5 text-slate-400" />}
          </div>
          <div className="flex-1 font-medium leading-snug">{toast.message}</div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white shrink-0 ml-1"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
