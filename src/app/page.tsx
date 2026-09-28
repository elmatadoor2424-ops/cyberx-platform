"use client";

import React, { useState } from "react";
import CountdownBanner from "@/components/CountdownBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesCatalog from "@/components/ServicesCatalog";
import PricingComparisonTable from "@/components/PricingComparisonTable";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProofGallerySection from "@/components/ProofGallerySection";
import PaymentMethodsSection from "@/components/PaymentMethodsSection";
import DiscountEngineSection from "@/components/DiscountEngineSection";
import RegistrationAndWebhookSection from "@/components/RegistrationAndWebhookSection";
import AIChatModal from "@/components/AIChatModal";
import Footer from "@/components/Footer";
import { Bot, MessageCircle } from "lucide-react";
import { playCyberSound } from "@/lib/cyberEffects";
import { CYBER_CONTACTS } from "@/lib/cyberData";

export default function Home() {
  const [isAiBotOpen, setIsAiBotOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("CYBER70");

  const handleOpenAiBot = () => {
    setIsAiBotOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setAppliedCoupon("CYBER70");
  };

  const handleOpenProofModal = () => {
    const proofElem = document.getElementById("proof-gallery");
    if (proofElem) {
      proofElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      
      {/* 24-Hour Dynamic Countdown Urgency Banner */}
      <CountdownBanner
        onApplyCoupon={(code) => {
          setAppliedCoupon(code);
        }}
      />

      {/* Futuristic Cyber Navigation Bar */}
      <Navbar onOpenAiBot={handleOpenAiBot} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenAiBot={handleOpenAiBot}
          onSelectDiscount={() => {
            setAppliedCoupon("CYBER70");
          }}
        />

        {/* The 7 Core Services Catalog */}
        <ServicesCatalog
          onSelectService={handleSelectService}
          onOpenProofModal={handleOpenProofModal}
        />

        {/* 3-Way Pricing Comparison Table (Market vs CyberX vs 24h 70% Flash Sale) & Bulk Offers */}
        <PricingComparisonTable
          onSelectService={handleSelectService}
        />

        {/* CyberX Elite Team Section (Eng. Ahmed Omar, Karma, CyberX AI Assistant) */}
        <TeamSection
          onOpenAiBot={handleOpenAiBot}
          onSelectTeamMember={(memberName) => {
            console.log("Selected member for consultation:", memberName);
          }}
        />

        {/* 5-Star Client Reviews & Testimonials Section */}
        <TestimonialsSection />

        {/* Neon Proof Gallery of Live Campaigns & Numbers */}
        <ProofGallerySection />

        {/* Official Payment Methods & Direct Communication Channels */}
        <PaymentMethodsSection />

        {/* 24 Hours Countdown Engine & Cost Calculator */}
        <DiscountEngineSection
          onSelectServiceAndDiscount={(serviceTitle) => {
            handleSelectService(serviceTitle);
          }}
        />

        {/* Smart Registration Form & Webhook n8n Pipeline */}
        <RegistrationAndWebhookSection
          selectedServiceTitle={selectedService}
          appliedDiscountCode={appliedCoupon}
        />
      </main>

      {/* Dark Cyber Footer */}
      <Footer />

      {/* Interactive AI Assistant Modal (CyberX AI) */}
      <AIChatModal
        isOpen={isAiBotOpen}
        onClose={() => setIsAiBotOpen(false)}
        onSelectService={handleSelectService}
      />

      {/* Floating Action Quick Access Orbs */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
        {/* AI Bot Floating Button */}
        <button
          onClick={() => {
            playCyberSound("beep");
            setIsAiBotOpen(true);
          }}
          className="relative group p-3.5 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-950 border border-cyan-400 text-cyan-400 shadow-[0_0_18px_rgba(0,240,255,0.35)] hover:shadow-[0_0_28px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          title="تحدث مع مساعد الذكاء الاصطناعي CyberX AI"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400"></span>

          {/* Hover Tooltip */}
          <span className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs font-bold text-cyan-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            مساعد CyberX الذكي 🤖
          </span>
        </button>

        {/* Direct WhatsApp Floating Button (01094200285) */}
        <a
          href={CYBER_CONTACTS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playCyberSound("click")}
          className="relative group p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-[0_0_18px_rgba(16,185,129,0.35)] hover:shadow-[0_0_28px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          title="محادثة واتساب مباشرة: 01094200285"
        >
          <MessageCircle className="w-6 h-6" />

          {/* Hover Tooltip */}
          <span className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs font-bold text-emerald-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            واتساب 24/7 (01094200285) 💬
          </span>
        </a>
      </div>

    </div>
  );
}
