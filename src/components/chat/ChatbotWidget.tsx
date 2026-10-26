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
  PhoneCall,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ChatMessage } from "@/types";

export const ChatbotWidget = () => {
  const { products, pcBuilds, faqs, settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-greeting",
      role: "assistant",
      content:
        "Assalam-o-Alaikum! 🇵🇰 I am your **ZS Tech Specialist**. Ask me anything about gaming PC builds, component prices in PKR, AM5/Intel compatibility, or delivery across Pakistan.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestedActions: [
        { label: "Best GPU under 200k PKR?", query: "What is the best GPU under 200k PKR in stock?" },
        { label: "Is Ryzen 7800X3D compatible with DDR4?", query: "Can I use DDR4 RAM with AMD Ryzen 7 7800X3D?" },
        { label: "TCS Shipping times to Karachi?", query: "How long does shipping take to Karachi and how is the PC protected?" },
        { label: "Prebuilt PCs under 350k", query: "What prebuilt gaming PCs do you have under 350,000 PKR?" },
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
          messages: [...messages, userMsg],
          catalog: storeCatalog,
        }),
      });

      if (!res.ok) throw new Error("Chat response failed");

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: "bot-" + Date.now(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: data.suggestedActions,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: "bot-err-" + Date.now(),
        role: "assistant",
        content:
          "My apologies, I had a momentary glitch connecting to our catalog. Please try again or WhatsApp our build tech directly at +92 300 1234567.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
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
          "Assalam-o-Alaikum! 🇵🇰 I am your **ZS Tech Specialist**. Ask me anything about gaming PC builds, component prices in PKR, AM5/Intel compatibility, or delivery across Pakistan.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedActions: [
          { label: "Best GPU under 200k PKR?", query: "What is the best GPU under 200k PKR in stock?" },
          { label: "Is Ryzen 7800X3D compatible with DDR4?", query: "Can I use DDR4 RAM with AMD Ryzen 7 7800X3D?" },
          { label: "TCS Shipping times to Karachi?", query: "How long does shipping take to Karachi and how is the PC protected?" },
          { label: "Prebuilt PCs under 350k", query: "What prebuilt gaming PCs do you have under 350,000 PKR?" },
        ],
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      {/* Floating Buttons: WhatsApp & AI Specialist */}
      <div className="flex items-center gap-2">
        {/* WhatsApp Direct Chat Button */}
        <a
          href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=Hi%20ZS%20Gaming%20Store%2C%20I%20have%20a%20question%20about%20a%20PC%20build.`}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with our technicians on WhatsApp"
          className="p-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-obsidian-950 font-bold shadow-lg transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
        >
          <PhoneCall className="w-5 h-5 text-obsidian-950" />
          <span className="hidden sm:inline text-xs font-black">WhatsApp</span>
        </a>

        {/* AI Tech Chat Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          title="Open AI PC Specialist"
          className="relative p-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-obsidian-950 shadow-cyanHover transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-obsidian-950" />
          ) : (
            <>
              <Bot className="w-5 h-5 text-obsidian-950" />
              <span className="hidden sm:inline text-xs font-black">AI Tech Help</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 live-pulse"></span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[550px] max-h-[80vh] rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden animate-fadeIn backdrop-blur-xl">
          {/* Header */}
          <div className="p-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center shadow">
                <Bot className="w-4 h-4 text-obsidian-950" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>ZS Tech Specialist</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 text-[9px] font-bold border border-cyan-500/30">
                    AI Assistant
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Online &bull; Catalog Grounded</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Notice Pill */}
          {isDemoFallback && (
            <div className="bg-slate-950/80 border-b border-slate-800/80 px-3.5 py-1.5 text-[10px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-amber-400 shrink-0" />
                Store Knowledge Assistant (Offline Fallback)
              </span>
              <Link
                href="/admin"
                className="text-cyan-400 hover:underline font-semibold"
              >
                Config &rarr;
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
                  <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-cyan-400 to-cyan-500 text-obsidian-950 font-bold rounded-br-sm shadow"
                      : "bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-sm"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* Suggested Action Chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, idx) => {
                        if (action.href) {
                          return (
                            <Link
                              key={idx}
                              href={action.href}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-cyan-400 text-[10px] font-semibold transition-colors border border-cyan-500/20"
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
                            className="px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] transition-colors border border-slate-750 text-left font-medium"
                          >
                            {action.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.role === "user" ? "text-obsidian-900" : "text-slate-500"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1">Checking store stock &amp; benchmarks...</span>
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
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about GPUs, PC builds, compatibility..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-40 disabled:hover:from-cyan-400 text-obsidian-950 transition-all shadow-md"
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
