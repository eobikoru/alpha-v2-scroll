import React from "react";
import Link from "next/link"
const HeroSection = () => {
  return (
    <div
      className="mt-[4rem]  h-[43rem]  text-white relative p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/images/Frame.png')" }} // Replace with actual image path
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content */}
      <main className="relative flex flex-col h-full items-center justify-center max-w-4xl mx-auto text-center gap-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Monetize Your Web3 Expertise
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
          Share tools, offer consultations, and build your personal brand with ease
        </p>
        <Link 
        href="#learn" passHref
        >
        <button  className="mt-8 px-11 py-4 text-lg bg-[#d4ff8e] hover:bg-[#c1eb7b] text-black rounded-full transition-colors">
          Learn More
        </button>
        </Link>
      </main>
    </div>
  );
};

export default HeroSection;

