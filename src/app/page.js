import React from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import AvailableCarsSection from "@/components/AvailableCars";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7f0]">
      <Hero />
      <AvailableCarsSection />
      <WhyChooseUs />
      <HowItWorks />
    </main>
  );
}