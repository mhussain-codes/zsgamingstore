"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Building,
  Smartphone,
  ArrowRight,
  Package,
  Flame,
  Check,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPKR } from "@/utils/format";
import { Order } from "@/types";

const PAKISTAN_CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Sialkot",
  "Hyderabad",
  "Abbottabad",
  "Bahawalpur",
  "Sargodha",
  "Wah Cantt",
  "Gujrat",
  "Mardan",
];

const PAKISTAN_PROVINCES = [
  "Punjab",
  "Sindh",
  "Islamabad Capital Territory",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Azad Jammu & Kashmir",
  "Gilgit-Baltistan",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, addOrder, showToast } = useStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Lahore");
  const [province, setProvince] = useState("Punjab");
  const [postalCode, setPostalCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const [shippingMethod, setShippingMethod] = useState<"standard_tcs" | "same_day_express">("standard_tcs");
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "cod" | "easypaisa_jazzcash" | "card_demo">("bank_transfer");

  const [demoCardName, setDemoCardName] = useState("");
  const [demoCardNumber, setDemoCardNumber] = useState("");
  const [demoCardExpiry, setDemoCardExpiry] = useState("");
  const [demoCardCvc, setDemoCardCvc] = useState("");

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const shippingCost = shippingMethod === "same_day_express" ? 1500 : 0;
  const finalTotal = cartTotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    if (!fullName || !email || !phone || !address) {
      showToast("Please fill in all mandatory contact & address fields", "error");
      return;
    }

    const orderId = "ZS-" + Math.floor(10000 + Math.random() * 90000);
    const trackingNumber = "TCS-" + Math.floor(10000000 + Math.random() * 90000000) + "-PK";

    const newOrder: Order = {
      orderId,
      date: new Date().toISOString().split("T")[0],
      customer: {
        fullName,
        email,
        phone,
        address,
        city,
        province,
        postalCode: postalCode || "54000",
        orderNotes,
      },
      items: [...cart],
      subtotal: cartTotal,
      shipping: shippingCost,
      total: finalTotal,
      paymentMethod,
      shippingMethod,
      status: "Order Confirmed",
      trackingNumber,
    };

    addOrder(newOrder);
    setConfirmedOrder(newOrder);
    clearCart();
    showToast("Order placed successfully! Check your demo order details.", "success");
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fadeIn">
        <div className="p-8 rounded-3xl bg-obsidian-900 border border-yellow-400 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mx-auto text-white shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-yellow-300" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-obsidian-950 font-black text-xs uppercase tracking-wider">
            Order Confirmed &bull; ZS Gaming Store
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Thank You, {confirmedOrder.customer.fullName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Your gaming hardware order has been received. Our assembly technicians in Lahore will benchmark and WhatsApp you the thermal testing proof.
          </p>

          <div className="p-4 rounded-2xl bg-black border border-white/10 max-w-md mx-auto grid grid-cols-2 gap-4 text-left text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Order ID</span>
              <div className="font-bold text-white text-sm">{confirmedOrder.orderId}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">TCS Tracking #</span>
              <div className="font-bold text-yellow-400 text-sm">{confirmedOrder.trackingNumber}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Destination</span>
              <div className="text-slate-200">{confirmedOrder.customer.city}, Pakistan</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Total Amount</span>
              <div className="text-yellow-400 font-bold">{formatPKR(confirmedOrder.total)}</div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/track?id=${confirmedOrder.orderId}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-yellow-400 text-obsidian-950 font-black text-xs hover:bg-yellow-300 transition-all shadow-yellowHover"
            >
              Track Order Live
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              Back to Store Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-yellow-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-yellow-400 transition-colors">
          Cart
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Checkout</span>
      </nav>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-xs text-slate-300">
          Enter your delivery details in Pakistan. Select your preferred payment method.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Customer & Delivery Address */}
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-400 text-obsidian-950 text-xs font-black flex items-center justify-center">
                1
              </span>
              <span>Delivery Details (Pakistan)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bilal Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="bilal@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                />
                <span className="text-[10px] text-yellow-400">
                  We WhatsApp thermal benchmark video to this number.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  City *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-400 focus:outline-none"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Complete Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House #, Street #, Sector / Phase / Area"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Province
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-yellow-400 focus:outline-none"
                >
                  {PAKISTAN_PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Postal Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="54000"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Order Notes / Custom Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please install Windows 11 demo, specific RGB color theme, or call before dispatch."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-black border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Courier Method */}
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-400 text-obsidian-950 text-xs font-black flex items-center justify-center">
                2
              </span>
              <span>Shipping Method</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  shippingMethod === "standard_tcs"
                    ? "bg-yellow-400/10 border-yellow-400"
                    : "bg-black border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={shippingMethod === "standard_tcs"}
                  onChange={() => setShippingMethod("standard_tcs")}
                  className="mt-1 text-yellow-400"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>TCS Insured Express</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-yellow-400 text-obsidian-950">
                      FREE
                    </span>
                  </div>
                  <div className="text-slate-400 mt-1 leading-relaxed">
                    2 to 4 business days. Foam braced packaging with tracking code.
                  </div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  shippingMethod === "same_day_express"
                    ? "bg-yellow-400/10 border-yellow-400"
                    : "bg-black border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={shippingMethod === "same_day_express"}
                  onChange={() => setShippingMethod("same_day_express")}
                  className="mt-1 text-yellow-400"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>Same-Day Courier (Lahore &amp; KHI)</span>
                    <span className="text-yellow-400 font-mono font-bold">+Rs. 1,500</span>
                  </div>
                  <div className="text-slate-400 mt-1 leading-relaxed">
                    Hand-delivered by store rider within Lahore or Karachi city limits.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-yellow-400 text-obsidian-950 text-xs font-black flex items-center justify-center">
                3
              </span>
              <span>Payment Option</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === "bank_transfer"
                    ? "bg-yellow-400/10 border-yellow-400"
                    : "bg-black border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => setPaymentMethod("bank_transfer")}
                  className="mt-1 text-yellow-400"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Direct Bank Transfer / Raast</span>
                  </div>
                  <div className="text-slate-400 mt-1 leading-relaxed">
                    Meezan / HBL / Standard Chartered bank account details provided upon confirmation.
                  </div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === "cod"
                    ? "bg-yellow-400/10 border-yellow-400"
                    : "bg-black border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 text-yellow-400"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <div className="text-slate-400 mt-1 leading-relaxed">
                    Pay in cash upon doorstep delivery (available for orders up to Rs. 150,000).
                  </div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === "easypaisa_jazzcash"
                    ? "bg-yellow-400/10 border-yellow-400"
                    : "bg-black border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "easypaisa_jazzcash"}
                  onChange={() => setPaymentMethod("easypaisa_jazzcash")}
                  className="mt-1 text-yellow-400"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-red-500" />
                    <span>JazzCash / EasyPaisa</span>
                  </div>
                  <div className="text-slate-400 mt-1 leading-relaxed">
                    Instant mobile wallet payment to official merchant account.
                  </div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === "card_demo"
                    ? "bg-yellow-400/10 border-yellow-400"
                    : "bg-black border-white/10 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "card_demo"}
                  onChange={() => setPaymentMethod("card_demo")}
                  className="mt-1 text-yellow-400"
                />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-white" />
                    <span>Credit / Debit Card (Demo)</span>
                  </div>
                  <div className="text-slate-400 mt-1 leading-relaxed">
                    Simulate card transaction with test numbers (no real card collected).
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-5 sticky top-24">
          <h3 className="font-bold text-white text-base">Order Review</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-white/5 scrollbar-thin">
            {cart.map((item) => {
              const effectivePrice = item.product.salePrice ?? item.product.price;
              return (
                <div key={item.id} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="font-bold text-white truncate">{item.product.name}</div>
                    <div className="text-slate-400 text-[11px]">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-mono font-bold text-yellow-400 shrink-0">
                    {formatPKR(effectivePrice * item.quantity)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-2.5 text-xs border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-slate-300">
              <span>Subtotal</span>
              <span className="font-mono font-bold text-white">{formatPKR(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Delivery Charges</span>
              <span className="font-mono font-bold text-yellow-400">
                {shippingCost === 0 ? "FREE" : formatPKR(shippingCost)}
              </span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex items-baseline justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Grand Total</div>
              <div className="text-2xl font-black text-yellow-400 font-mono">
                {formatPKR(finalTotal)}
              </div>
            </div>
            <span className="text-[10px] text-white/50 font-mono">PKR Net</span>
          </div>

          <button
            type="submit"
            className="btn-shimmer w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-black text-sm shadow-redHover transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm &amp; Place Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
