"use client";

import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
export default function Page() {
  return (
    <div className="font-sans">
      <Header />
      <HeroSection />
      <FeatureCards />
      <PricingSection />
      <Footer />
      <Toaster />
    </div>
  );
}
