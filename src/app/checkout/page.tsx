"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import type { OrderData, PaymentMethod } from "../types/order";

// Extend window for Razorpay global
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const PLAN_AMOUNT = 3; // $3 Community plan — change to your pricing

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");
  const [orderId, setOrderId] = useState<string>("");

  // Form state
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      form.customerName.trim() !== "" &&
      form.email.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.address.trim() !== ""
    );
  };

  // Load Razorpay checkout script
  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  // Handle online payment via Razorpay
  const handleOnlinePayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load payment gateway");
      return;
    }

    // Step 1: Create Razorpay order on backend
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: PLAN_AMOUNT }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to create order");
    }

    const orderDetails = await res.json();

    // Step 2: Open Razorpay checkout modal
    return new Promise<void>((resolve, reject) => {
      const options = {
        key: orderDetails.key,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: "MnemonicsAI",
        description: "Community Plan Subscription",
        order_id: orderDetails.razorpayOrderId,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // Step 3: Verify payment on backend
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  ...form,
                  amount: PLAN_AMOUNT,
                  paymentMethod: "online" as PaymentMethod,
                },
              }),
            });

            if (!verifyRes.ok) {
              const err = await verifyRes.json().catch(() => ({}));
              throw new Error(err.error || "Payment verification failed");
            }

            const result = await verifyRes.json();
            setOrderId(result.order?.id || response.razorpay_payment_id);
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment cancelled by user"));
          },
        },
        prefill: {
          name: form.customerName,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on(
        "payment.failed",
        (response: { error: { description: string } }) => {
          reject(new Error(response.error.description));
        }
      );
      rzp.open();
    });
  };

  // Handle COD order
  const handleCODOrder = async () => {
    const res = await fetch("/api/create-cod-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderData: {
          ...form,
          amount: PLAN_AMOUNT,
          paymentMethod: "COD" as PaymentMethod,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to place COD order");
    }

    const result = await res.json();
    setOrderId(result.order?.id || "COD-" + Date.now());
  };

  // Main submit handler
  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);
    setOrderStatus("idle");

    try {
      if (paymentMethod === "online") {
        await handleOnlinePayment();
      } else {
        await handleCODOrder();
      }
      setOrderStatus("success");
      toast.success("Order placed successfully!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      // Don't show failure state if user simply dismissed the modal
      if (message === "Payment cancelled by user") {
        toast.info("Payment was cancelled");
        setIsProcessing(false);
        return;
      }

      setOrderStatus("failed");
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // ───── Success / Failure screens ─────
  if (orderStatus === "success") {
    return (
      <div className="flex flex-col min-h-screen font-sans">
        <Header />
        <main className="relative flex-grow pt-24 pb-12">
          <Background />
          <div className="max-w-lg mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mb-2">
              {paymentMethod === "online"
                ? "Your payment was successful."
                : "Your Cash on Delivery order has been placed."}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order ID:{" "}
              <span className="font-mono text-foreground">{orderId}</span>
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderStatus === "failed") {
    return (
      <div className="flex flex-col min-h-screen font-sans">
        <Header />
        <main className="relative flex-grow pt-24 pb-12">
          <Background />
          <div className="max-w-lg mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <XCircle className="w-20 h-20 text-destructive mx-auto mb-6" />
            </motion.div>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              Payment Failed
            </h1>
            <p className="text-muted-foreground mb-8">
              Something went wrong. Please try again.
            </p>
            <button
              onClick={() => setOrderStatus("idle")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ───── Main checkout form ─────
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="relative flex-grow pt-24 pb-12">
        <Background />

        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Page heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-1">
              Checkout
            </h1>
            <p className="mt-3 text-muted-foreground">
              Complete your purchase for the Community Plan
            </p>
          </motion.div>

          {/* ── Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl p-6 md:p-8 dark:bg-card/30">
              {/* ── Customer info ── */}
              <div className="space-y-4 mb-8">
                <h2 className="text-lg font-semibold text-foreground">
                  Your Details
                </h2>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.customerName}
                  onChange={(e) => updateField("customerName", e.target.value)}
                  className="w-full p-3 border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground placeholder:text-muted-foreground transition-all duration-200"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full p-3 border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground placeholder:text-muted-foreground transition-all duration-200"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (10 digits)"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full p-3 border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground placeholder:text-muted-foreground transition-all duration-200"
                />
                <textarea
                  placeholder="Full Address"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-input rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background/50 text-foreground placeholder:text-muted-foreground resize-none transition-all duration-200"
                />
              </div>

              {/* ── Divider ── */}
              <div className="border-t border-border/50 my-6" />

              {/* ── Payment method selector ── */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Payment Method
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {/* Pay Online */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      paymentMethod === "online"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40 bg-background/50"
                    }`}
                  >
                    <CreditCard
                      className={`w-6 h-6 ${
                        paymentMethod === "online"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        paymentMethod === "online"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      Pay Online
                    </span>
                    {paymentMethod === "online" && (
                      <motion.div
                        layoutId="payment-indicator"
                        className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                      >
                        <ShieldCheck className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>

                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      paymentMethod === "COD"
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40 bg-background/50"
                    }`}
                  >
                    <Truck
                      className={`w-6 h-6 ${
                        paymentMethod === "COD"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        paymentMethod === "COD"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      Cash on Delivery
                    </span>
                    {paymentMethod === "COD" && (
                      <motion.div
                        layoutId="payment-indicator"
                        className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                      >
                        <ShieldCheck className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>
                </div>

                {/* Info banner */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={paymentMethod}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-xs text-muted-foreground mt-3 text-center"
                  >
                    {paymentMethod === "online"
                      ? "Secure payment via Razorpay — UPI, Cards, Net Banking"
                      : "Pay when the service is activated"}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* ── Order summary ── */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Community Plan (monthly)
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    ${PLAN_AMOUNT}
                  </span>
                </div>
              </div>

              {/* ── Place Order ── */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isProcessing || !isFormValid()}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing…</span>
                  </>
                ) : (
                  <>
                    {paymentMethod === "online" ? (
                      <CreditCard className="w-5 h-5" />
                    ) : (
                      <Truck className="w-5 h-5" />
                    )}
                    <span>
                      {paymentMethod === "online"
                        ? `Pay $${PLAN_AMOUNT} Now`
                        : "Place COD Order"}
                    </span>
                  </>
                )}
              </motion.button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
                <span>Secured with 256-bit encryption</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ───── Animated background (matches HeroSection) ─────
function Background() {
  return (
    <div className="absolute inset-0 -z-10 bg-background fixed">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
    </div>
  );
}
