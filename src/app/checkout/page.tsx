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
    clearCart();
    setConfirmedOrder(newOrder);
    showToast(`Order ${orderId} placed successfully in Demo Mode!`, "success");
  };

  // If order was just placed, display rich Order Confirmation screen
  if (confirmedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8 animate-fadeIn">
        <div className="p-8 sm:p-12 rounded-3xl bg-graphite-900 border border-cyan/40 text-center space-y-4 shadow-card">
          <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan text-cyan flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-graphite-800 border border-graphite-700 text-xs text-slate-300 font-mono">
            Demo Order Placed Successfully
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Thank You, {confirmedOrder.customer.fullName}!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Your demo order reference is <strong className="text-cyan font-mono">{confirmedOrder.orderId}</strong>. A confirmation has been registered in the system.
          </p>

          <div className="p-4 rounded-2xl bg-graphite-950 border border-graphite-800 text-xs text-slate-300 max-w-md mx-auto space-y-1 text-left">
            <div>
              <span className="text-slate-500">Tracking Number:</span>{" "}
              <strong className="text-white font-mono">{confirmedOrder.trackingNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500">Destination:</span>{" "}
              <strong className="text-white">{confirmedOrder.customer.city}, {confirmedOrder.customer.province}</strong>
            </div>
            <div>
              <span className="text-slate-500">Payment:</span>{" "}
              <strong className="text-white capitalize">{confirmedOrder.paymentMethod.replace("_", " ")}</strong>
            </div>
            <div>
              <span className="text-slate-500">Total:</span>{" "}
              <strong className="text-cyan font-mono">{formatPKR(confirmedOrder.total)}</strong>
            </div>
          </div>

          {/* Assembly & Dispatch Roadmap */}
          <div className="pt-6 border-t border-graphite-800 max-w-xl mx-auto text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-center">
              What Happens Next (ZS Assembly &amp; Dispatch Protocol)
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-cyan text-graphite-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-white">Component Verification:</strong> Serial numbers and seals verified against official local distributor records.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-graphite-800 text-slate-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-white">Professional Build &amp; Cable Management:</strong> Clean routing and thermal paste application in our dust-controlled workbench.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-graphite-800 text-slate-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-white">24h Stress Testing:</strong> Cinebench R23, FurMark, and MemTest86 logs generated with thermal imaging.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-graphite-800 text-slate-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-white">Insured TCS Dispatch:</strong> Instapak foam bracing inserted into PC chassis, double-boxed, and handed to courier.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/track?id=${confirmedOrder.orderId}`}
              className="px-6 py-3 rounded-xl bg-cyan hover:bg-cyan-400 text-graphite-950 font-black text-xs shadow-cyanHover transition-all"
            >
              Track Order Progress
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-graphite-800 hover:bg-graphite-700 text-white font-bold text-xs border border-graphite-700 transition-colors"
            >
              Return to Store
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
        <Link href="/" className="hover:text-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/cart" className="hover:text-cyan transition-colors">
          Cart
        </Link>
        <span>/</span>
        <span className="text-white font-medium">Checkout</span>
      </nav>

      {/* Honest Demo Notice */}
      <div className="p-4 rounded-2xl bg-cyan/10 border border-cyan/30 flex items-start gap-3 text-xs text-slate-200">
        <ShieldAlert className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Demo Checkout Mode:</strong> This checkout flow simulates an authentic Pakistani e-commerce ordering experience. No live financial payment gateway is billed, and no real credit card numbers should be entered. Your order will be stored locally so you can inspect tracking and view it in the Admin Panel.
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact, Shipping, Payment Options (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact Information */}
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan text-graphite-950 text-xs font-black flex items-center justify-center">
                1
              </span>
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-300">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bilal Ahmed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="bilal@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Mobile Phone (+92) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Address in Pakistan */}
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan text-graphite-950 text-xs font-black flex items-center justify-center">
                2
              </span>
              Shipping Destination (Pakistan)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-300">Street Address / House # *</label>
                <input
                  type="text"
                  required
                  placeholder="House #, Street name, Sector/Block"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">City *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-300">Province *</label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white focus:border-cyan"
                >
                  {PAKISTAN_PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-300">Order Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Special instructions for PC assembly or delivery timing"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-graphite-950 border border-graphite-750 rounded-xl p-3 text-white placeholder-slate-500 focus:border-cyan"
                />
              </div>
            </div>
          </div>

          {/* 3. Delivery Method */}
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan text-graphite-950 text-xs font-black flex items-center justify-center">
                3
              </span>
              Delivery Option
            </h2>

            <div className="space-y-3">
              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === "standard_tcs"
                    ? "bg-cyan/10 border-cyan text-white"
                    : "bg-graphite-950 border-graphite-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "standard_tcs"}
                    onChange={() => setShippingMethod("standard_tcs")}
                    className="text-cyan focus:ring-cyan"
                  />
                  <div>
                    <div className="font-bold text-xs text-white">
                      Insured TCS Express (1-3 Days Nationwide)
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Double-boxed with internal expanding Instapak foam
                    </div>
                  </div>
                </div>
                <span className="font-black font-mono text-emerald-400 text-xs">FREE</span>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === "same_day_express"
                    ? "bg-cyan/10 border-cyan text-white"
                    : "bg-graphite-950 border-graphite-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "same_day_express"}
                    onChange={() => setShippingMethod("same_day_express")}
                    className="text-cyan focus:ring-cyan"
                  />
                  <div>
                    <div className="font-bold text-xs text-white">
                      Same-Day Lahore / Karachi Express Rider
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Hand-delivered within 4 hours by store technician
                    </div>
                  </div>
                </div>
                <span className="font-black font-mono text-cyan text-xs">Rs. 1,500</span>
              </label>
            </div>
          </div>

          {/* 4. Payment Method */}
          <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-4">
            <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan text-graphite-950 text-xs font-black flex items-center justify-center">
                4
              </span>
              Payment Method
            </h2>

            <div className="space-y-3">
              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "bank_transfer"
                    ? "bg-cyan/10 border-cyan text-white"
                    : "bg-graphite-950 border-graphite-800 text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => setPaymentMethod("bank_transfer")}
                  className="text-cyan focus:ring-cyan"
                />
                <Building className="w-4 h-4 text-cyan" />
                <div>
                  <div className="font-bold text-xs text-white">Direct Bank Transfer (IBFT)</div>
                  <div className="text-[11px] text-slate-400">
                    Meezan Bank, HBL, Bank Alfalah, or Raast instant payment
                  </div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "bg-cyan/10 border-cyan text-white"
                    : "bg-graphite-950 border-graphite-800 text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="text-cyan focus:ring-cyan"
                />
                <Truck className="w-4 h-4 text-cyan" />
                <div>
                  <div className="font-bold text-xs text-white">Cash on Delivery (COD)</div>
                  <div className="text-[11px] text-slate-400">
                    Available with a small confirmation advance for prebuilts
                  </div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "easypaisa_jazzcash"
                    ? "bg-cyan/10 border-cyan text-white"
                    : "bg-graphite-950 border-graphite-800 text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "easypaisa_jazzcash"}
                  onChange={() => setPaymentMethod("easypaisa_jazzcash")}
                  className="text-cyan focus:ring-cyan"
                />
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-xs text-white">Easypaisa / JazzCash</div>
                  <div className="text-[11px] text-slate-400">
                    Mobile account transfer with receipt upload
                  </div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "card_demo"
                    ? "bg-cyan/10 border-cyan text-white"
                    : "bg-graphite-950 border-graphite-800 text-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card_demo"}
                  onChange={() => setPaymentMethod("card_demo")}
                  className="text-cyan focus:ring-cyan"
                />
                <CreditCard className="w-4 h-4 text-cyan" />
                <div>
                  <div className="font-bold text-xs text-white">
                    Simulated Demo Card (Safe Demo Form)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Test the checkout experience without submitting real payment information
                  </div>
                </div>
              </label>
            </div>

            {/* If Demo Card selected, display harmless simulated input */}
            {paymentMethod === "card_demo" && (
              <div className="mt-3 p-4 rounded-xl bg-graphite-950 border border-graphite-750 space-y-3 text-xs">
                <div className="text-amber-400 text-[11px] font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Demo only: Never enter real banking credentials here.</span>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">Cardholder Name (Demo)</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={demoCardName}
                    onChange={(e) => setDemoCardName(e.target.value)}
                    className="w-full bg-graphite-900 border border-graphite-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-slate-400">Demo Card # (Fake)</label>
                    <input
                      type="text"
                      placeholder="4000 0000 0000 0000"
                      value={demoCardNumber}
                      onChange={(e) => setDemoCardNumber(e.target.value)}
                      className="w-full bg-graphite-900 border border-graphite-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Expiry / CVC</label>
                    <input
                      type="text"
                      placeholder="12/28 - 123"
                      value={demoCardExpiry}
                      onChange={(e) => setDemoCardExpiry(e.target.value)}
                      className="w-full bg-graphite-900 border border-graphite-700 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Review & Complete Button (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-graphite-900 border border-graphite-800 space-y-5 sticky top-24">
          <h3 className="font-bold text-white text-base">Your Order Summary</h3>

          {/* Item Thumbnails List */}
          <div className="max-h-64 overflow-y-auto space-y-2.5 divide-y divide-graphite-800 pr-1 scrollbar-thin">
            {cart.map((c) => (
              <div key={c.id} className="pt-2.5 flex items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <img
                    src={c.product.image}
                    alt={c.product.name}
                    className="w-10 h-10 object-cover rounded bg-graphite-950 border border-graphite-750 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{c.product.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Qty: {c.quantity} &times; {formatPKR(c.product.salePrice ?? c.product.price)}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-white font-mono shrink-0">
                  {formatPKR((c.product.salePrice ?? c.product.price) * c.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-graphite-800 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal</span>
              <span className="font-mono font-bold text-white">{formatPKR(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Shipping Fee</span>
              <span className="font-mono font-bold text-emerald-400">
                {shippingCost === 0 ? "FREE" : formatPKR(shippingCost)}
              </span>
            </div>
          </div>

          <div className="border-t border-graphite-800 pt-4 flex items-baseline justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Grand Total (PKR)</div>
              <div className="text-2xl font-black text-cyan font-mono">
                {formatPKR(finalTotal)}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Includes All Taxes</span>
          </div>

          <button
            type="submit"
            disabled={cart.length === 0}
            className="w-full py-3.5 rounded-xl bg-cyan hover:bg-cyan-400 disabled:opacity-40 text-graphite-950 font-black text-sm shadow-cyanHover transition-all flex items-center justify-center gap-2"
          >
            <span>Place Demo Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-500 text-center leading-relaxed">
            By clicking place order, you are creating a local demo order record for testing the ZS order tracking and admin dispatch workflow.
          </p>
        </div>
      </form>
    </div>
  );
}
