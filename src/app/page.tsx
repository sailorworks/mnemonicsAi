// "use client"; // <--- REMOVE THIS LINE

import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
//import Snowfall from "./components/Snowfall";
import FAQSection from "./components/FAQSection";
import ExamplesSection from "./components/ExamplesSection";

export default function Page() {
  return (
    <div className="font-sans">
      {/* <Snowfall /> */}
      <Header />
      <HeroSection />
      <ExamplesSection />
      <FeatureCards />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
