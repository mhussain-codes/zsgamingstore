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
          className="relative p-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-graphite-950 shadow-yellowHover transition-all hover:scale-110 active:scale-95 flex items-center gap-2"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-graphite-950 font-black" />
          ) : (
            <>
              <Bot className="w-5 h-5 text-graphite-950" />
              <span className="hidden sm:inline text-xs font-black">AI Tech Help</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 live-pulse"></span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[550px] max-h-[80vh] rounded-3xl bg-graphite-900 border border-graphite-750 shadow-2xl flex flex-col overflow-hidden animate-fadeIn backdrop-blur-xl">
          {/* Header */}
          <div className="p-3.5 bg-graphite-950 border-b border-graphite-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center shadow">
                <Bot className="w-4 h-4 text-graphite-950" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <span>ZS Tech Specialist</span>
                  <span className="px-1.5 py-0.2 rounded bg-yellow-400/10 text-yellow-400 text-[9px] font-bold border border-yellow-400/30">
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
            <div className="bg-graphite-950/80 border-b border-graphite-800 px-3.5 py-1.5 text-[10px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-yellow-400 shrink-0" />
                Store Knowledge Assistant (Offline Fallback)
              </span>
              <Link
                href="/admin"
                className="text-yellow-400 hover:underline font-semibold"
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
                  <div className="w-6 h-6 rounded-lg bg-graphite-800 border border-graphite-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-yellow-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-br-sm shadow"
                      : "bg-graphite-950 border border-graphite-800 text-slate-200 rounded-bl-sm"
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
                              className="px-2.5 py-1 rounded-lg bg-graphite-900 hover:bg-yellow-400 hover:text-graphite-950 text-slate-300 border border-graphite-750 text-[10px] font-semibold transition-all flex items-center gap-1"
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
                            onClick={() => handleSend(action.query)}
                            className="px-2.5 py-1 rounded-lg bg-graphite-900 hover:bg-yellow-400 hover:text-graphite-950 text-yellow-400 border border-yellow-400/20 text-[10px] font-semibold transition-all text-left"
                          >
                            {action.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-red-600/20 border border-red-600/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-red-500" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-6 h-6 rounded-lg bg-graphite-800 border border-graphite-700 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-yellow-400" />
                </div>
                <div className="bg-graphite-950 border border-graphite-800 rounded-2xl px-3 py-2 text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce [animation-delay:0.4s]" />
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
            className="p-3 bg-graphite-950 border-t border-graphite-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about GPUs, PC builds, compatibility in PKR..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-graphite-900 border border-graphite-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:opacity-40 text-white transition-all shadow-md active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-yellow-400" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
