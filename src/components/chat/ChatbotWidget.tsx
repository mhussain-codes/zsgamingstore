"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  Info,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ChatMessage } from "@/types";

export const ChatbotWidget = () => {
  const { products, pcBuilds, faqs, guides, settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-greeting",
      role: "assistant",
      content:
        "Salaam! I am your **ZS Tech Specialist**. Ask me anything about gaming PC builds, component prices in PKR, AM5/Intel compatibility, or delivery across Pakistan.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestedActions: [
        { label: "Best GPU under 200k PKR?", query: "What is the best GPU under 200k PKR in stock?" },
        { label: "Is Ryzen 7800X3D compatible with DDR4?", query: "Can I use DDR4 RAM with AMD Ryzen 7 7800X3D?" },
        { label: "TCS Shipping times to Karachi?", query: "How long does shipping take to Karachi and how is the PC protected?" },
        { label: "Prebuilt PCs under 400k", query: "What prebuilt gaming PCs do you have under 400,000 PKR?" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoFallback, setIsDemoFallback] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Check backend configuration on mount
  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => {
        setIsDemoFallback(!data.configured);
      })
      .catch(() => {
        setIsDemoFallback(true);
      });
  }, []);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Catalog snapshot for grounded context
      const storeCatalog = {
        featuredBuilds: pcBuilds.map((b) => ({
          name: b.name,
          slug: b.slug,
          tier: b.tier,
          pricePKR: b.salePrice ?? b.price,
          specs: b.specs,
          warranty: `${b.warrantyYears} Years`,
        })),
        sampleProducts: products.map((p) => ({
          name: p.name,
          brand: p.brand,
          category: p.category,
          pricePKR: p.salePrice ?? p.price,
          inStock: p.inStock,
          socket: p.compatibility?.socket,
          ramType: p.compatibility?.ramType,
        })),
        faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          storeCatalog,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      setIsDemoFallback(Boolean(data.isDemoFallback));

      const assistantMsg: ChatMessage = {
        id: "assistant-" + Date.now(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: data.suggestedLinks?.map((l: any) => ({
          label: l.label,
          href: l.href,
        })),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content:
            "I encountered a temporary connection issue. Please feel free to check our catalog directly or message us on WhatsApp (+92 300 9742646) for immediate assistance.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "initial-greeting",
        role: "assistant",
        content:
          "Conversation cleared. How can I help you with your PC build or hardware purchase today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-teal-accent text-graphite-950 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-cyan"
          aria-label="Open ZS Gaming Store Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-graphite-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-graphite-950 border border-cyan" />
          </div>
          <span className="text-xs font-black tracking-wide pr-1">
            Ask ZS Specialist
          </span>
          <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded bg-graphite-950 text-cyan uppercase font-bold">
            AI Help
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-graphite-950 border border-graphite-750 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-3.5 bg-graphite-900 border-b border-graphite-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-accent flex items-center justify-center text-graphite-950 font-black shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-xs">
                    ZS Hardware Specialist
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span>Grounded in Store Catalog</span>
                  <span>&bull;</span>
                  <span className="text-cyan">
                    {isDemoFallback ? "Knowledge Mode" : "Gemini 2.5 Live"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-graphite-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-graphite-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Notice Pill */}
          {isDemoFallback && (
            <div className="bg-graphite-900/90 border-b border-graphite-800/80 px-3 py-1.5 text-[10px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-amber-400 shrink-0" />
                Store Knowledge Assistant (Offline Fallback)
              </span>
              <Link
                href="/admin"
                className="text-cyan hover:underline font-semibold"
              >
                Configure Key &rarr;
              </Link>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-graphite-800 border border-graphite-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-cyan" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan text-graphite-950 font-medium rounded-br-sm shadow"
                      : "bg-graphite-900 border border-graphite-800 text-slate-200 rounded-bl-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* Suggested Action Chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-graphite-800 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, idx) => {
                        if (action.href) {
                          return (
                            <Link
                              key={idx}
                              href={action.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-graphite-800 hover:bg-graphite-700 text-cyan text-[10px] font-semibold transition-colors border border-cyan/20"
                            >
                              <span>{action.label}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          );
                        }
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSend(action.query || action.label)}
                            className="px-2 py-1 rounded bg-graphite-800 hover:bg-graphite-750 text-slate-300 hover:text-white text-[10px] transition-colors border border-graphite-700 text-left"
                          >
                            {action.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.role === "user" ? "text-graphite-800" : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-cyan/20 border border-cyan/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-cyan" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-6 h-6 rounded-lg bg-graphite-800 border border-graphite-700 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-cyan" />
                </div>
                <div className="bg-graphite-900 border border-graphite-800 rounded-2xl px-3 py-2 text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1">Consulting store catalog...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-graphite-900 border-t border-graphite-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about GPUs, PC builds, compatibility..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-graphite-950 border border-graphite-750 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-xl bg-cyan hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan text-graphite-950 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
