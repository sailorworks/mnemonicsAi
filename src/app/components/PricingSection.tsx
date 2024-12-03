"use client";

import React from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const PricingSection = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleButtonClick = (planName: string) => {
    if (planName === "Free") {
      handleGoogleLogin();
    } else {
      router.push("/trial");
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual learners",
      features: [
        "Unlimited mnemonic generation",
        "Basic word lists",
        "Standard templates",
        "Email support",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      name: "Community",
      price: "$3",
      period: "per month",
      description: "Access to community features",
      features: [
        "All Free features",
        "Community mnemonics access",
        "Save favorite mnemonics",
        "Share with community",
        "Priority support",
      ],
      buttonText: "Start Trial",
      highlighted: true,
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Simple Pricing</h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that fits your needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-white shadow-xl border-2 border-indigo-600"
                  : "bg-white shadow-lg"
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="mt-4 text-gray-600">{plan.description}</p>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-indigo-600 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleButtonClick(plan.name)}
                className={`mt-8 w-full py-3 px-6 rounded-lg font-medium ${
                  plan.highlighted
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
