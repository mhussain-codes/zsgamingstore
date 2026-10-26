"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartTotal } = useStore();

  const shippingCost = cartTotal > 0 ? 0 : 0; // Flat free promo
  const orderTotal = cartTotal + shippingCost;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Shopping Cart</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Your Shopping Cart
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review your selected gaming hardware and PC builds before demo checkout.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-coral hover:underline flex items-center gap-1 font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Empty Cart</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
          <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Your cart is currently empty</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Ready to upgrade your gaming battle station? Check out our ready-to-ship prebuilts or configure your dream PC.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/builds"
              className="px-5 py-2.5 rounded-xl bg-cyan text-graphite-950 text-xs font-bold shadow-cyanHover"
            >
              Explore Prebuilt PCs
            </Link>
            <Link
              href="/pc-builder"
              className="px-5 py-2.5 rounded-xl bg-graphite-800 text-white text-xs font-bold border border-graphite-700"
            >
              Launch PC Builder
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-3.5">
            {cart.map((item) => {
              const effectivePrice = item.product.salePrice ?? item.product.price;
              const itemTotal = effectivePrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-graphite-900 border border-graphite-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-graphite-950 p-1.5 shrink-0 overflow-hidden border border-graphite-750">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-cyan px-1.5 py-0.5 rounded bg-cyan/10">
                          {item.itemType === "custom_build"
                            ? "Custom Build"
                            : item.itemType === "prebuilt"
                            ? "Prebuilt System"
                            : "Component"}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-sm sm:text-base truncate mt-1">
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {formatPKR(effectivePrice)} each
                      </div>

                      {/* If custom build, render miniature parts pill */}
                      {item.customBuildParts && (
                        <div className="mt-2 text-[10px] text-slate-400 bg-graphite-950 p-2 rounded-lg border border-graphite-800 space-y-0.5 max-h-20 overflow-y-auto">
                          {Object.entries(item.customBuildParts).map(([slot, part]) => (
                            <div key={slot} className="truncate">
                              <span className="font-bold text-cyan uppercase">{slot}:</span>{" "}
                              {part?.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Line Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-graphite-800">
                    <div className="flex items-center border border-graphite-700 bg-graphite-950 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-slate-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-xs text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-slate-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <div className="text-base font-black text-white font-mono">
                        {formatPKR(itemTotal)}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-coral hover:underline inline-flex items-center gap-0.5 mt-0.5"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-5 sticky top-24">
            <h3 className="font-bold text-white text-base">Order Summary</h3>

            <div className="space-y-3 text-xs border-b border-graphite-800 pb-4">
              <div className="flex items-center justify-between text-slate-300">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-mono font-bold text-white">
                  {formatPKR(cartTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Pakistan Insured Shipping</span>
                <span className="font-bold text-emerald-400">FREE PROMO</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Instapak GPU Foam Bracing</span>
                <span className="font-bold text-cyan">INCLUDED</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs text-slate-400 font-medium">Total Amount</div>
                <div className="text-2xl font-black text-white font-mono">
                  {formatPKR(orderTotal)}
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">PKR (Inclusive)</span>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="space-y-2 text-[11px] text-slate-400 pt-2 border-t border-graphite-800">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-cyan shrink-0" />
                <span>TCS Express delivery to all cities across Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan shrink-0" />
                <span>Official local distributor warranty included</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
