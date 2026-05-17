import React from "react";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7f0]">
      <Hero />
      <FeaturedCars />
    </main>
  );
}