"use client";

import React, { useState } from "react";
import {
  CYBER_SERVICES,
  ServiceItem,
} from "@/lib/cyberData";
import { useCyberConfig } from "@/context/CyberConfigContext";
import {
  Code2,
  Film,
  Palette,
  TrendingUp,
  Target,
  Database,
  MessageSquareCode,
  Check,
  Zap,
  ArrowLeft,
  Percent,
  Layers,
  Sparkles,
  Package,
} from "lucide-react";
import { playCyberSound, fireCyberConfetti } from "@/lib/cyberEffects";

interface ServicesCatalogProps {
  onSelectService: (serviceTitle: string) => void;
  onOpenProofModal?: () => void;
}

export default function ServicesCatalog({
  onSelectService,
  onOpenProofModal,
}: ServicesCatalogProps) {
  const { services: dynamicServices } = useCyberConfig();
  const servicesList = dynamicServices && dynamicServices.length > 0 ? dynamicServices : CYBER_SERVICES;
  const [filter, setFilter] = useState<"all" | "tech" | "media" | "growth">("all");
  const [currency, setCurrency] = useState<"EGP" | "USD">("EGP");

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6" />,
    Film: <Film className="w-6 h-6" />,
    Palette: <Palette className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    Target: <Target className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
    MessageSquareCode: <MessageSquareCode className="w-6 h-6" />,
  };

  const filteredServices = servicesList.filter((s) => {
    if (filter === "all") return true;
    if (filter === "tech") return s.id === "web-app-dev" || s.id === "custom-systems" || s.id === "whatsapp-automation";
    if (filter === "media") return s.id === "cinematic-videos" || s.id === "branding-posters";
    if (filter === "growth") return s.id === "social-growth" || s.id === "paid-ads";
    return true;
  });

  const handleOrder = (service: ServiceItem) => {
    playCyberSound("success");
    fireCyberConfetti();
    onSelectService(service.title);
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOrderBulk = (service: ServiceItem) => {
    playCyberSound("success");
    fireCyberConfetti();
    onSelectService(`${service.title} - ${service.bulkOffer.title}`);
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currSymbol = currency === "EGP" ? "ج.م" : "$";

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#0B0F19]">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-dots-bg opacity-25 pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>الحلول المتكاملة • THE 7 CORE CYBERX SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            كتالوج{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent">
              الخدمات السبع
            </span>{" "}
            للريادة الرقمية
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            منظومة متكاملة تغطي كافة احتياجات شركتك من البرمجيات المخصصة، الفيديوهات السينمائية، الحملات الممولة عالية العائد، وأتمتة الواتساب. جميع الخدمات مشمولة بخصم <span className="text-pink-400 font-bold">70%</span> بكود <span className="font-mono-tech text-cyan-300 font-bold">CYBER70</span> بالجنيه المصري والدولار.
          </p>

          {/* Currency Toggle */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-700">
              <button
                type="button"
                onClick={() => {
                  playCyberSound("click");
                  setCurrency("EGP");
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  currency === "EGP"
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                الجنيه المصري (EGP)
              </button>
              <button
                type="button"
                onClick={() => {
                  playCyberSound("click");
                  setCurrency("USD");
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-pink-500 text-white shadow-[0_0_12px_rgba(255,0,127,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                الدولار الأمريكي (USD)
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {[
            { id: "all", label: "جميع الخدمات السبع (7)" },
            { id: "tech", label: "البرمجيات والأنظمة وأتمتة الواتساب" },
            { id: "media", label: "الفيديوهات السينمائية والهوية البصرية" },
            { id: "growth", label: "الحملات الممولة ونمو السوشيال" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playCyberSound("click");
                setFilter(tab.id as typeof filter);
              }}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const isCyan = service.accent === "cyan";
            const isMagenta = service.accent === "magenta";
            const isDual = service.accent === "dual";

            const standardPrice = currency === "EGP" ? service.cyberxPriceEGP : service.cyberxPriceUSD;
            const flashPrice = currency === "EGP" ? service.discountedPriceEGP : service.discountedPriceUSD;
            const bulkPrice = currency === "EGP" ? service.bulkOffer.priceEGP : service.bulkOffer.priceUSD;

            return (
              <div
                key={service.id}
                className={`group relative rounded-3xl bg-[#0F172A] border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isCyan
                    ? "border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
                    : isMagenta
                    ? "border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(255,0,127,0.2)]"
                    : "border-purple-500/40 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]"
                }`}
              >
                {/* Service Card Top Ribbon */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    {/* Service Icon */}
                    <div
                      className={`p-3 rounded-2xl border ${
                        isCyan
                          ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                          : isMagenta
                          ? "bg-pink-500/10 border-pink-500/40 text-pink-400"
                          : "bg-purple-500/10 border-purple-500/40 text-purple-400"
                      }`}
                    >
                      {iconMap[service.iconName] || <Zap className="w-6 h-6" />}
                    </div>

                    {/* Number & Badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                        {service.badge}
                      </span>
                      <span className="font-mono-tech font-extrabold text-sm text-slate-500">
                        0{service.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {service.title}
                  </h3>
                  <div className="text-[11px] font-mono-tech text-slate-400 mb-3" dir="ltr">
                    {service.englishTitle}
                  </div>

                  <p className="text-sm font-medium text-cyan-400/90 leading-snug mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-bold text-slate-200">ما تتضمنه الخدمة:</div>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* If service #5 (Paid Ads), add button to see proof showcase! */}
                  {service.id === "paid-ads" && onOpenProofModal && (
                    <button
                      onClick={() => {
                        playCyberSound("beep");
                        onOpenProofModal();
                      }}
                      className="mb-6 w-full py-2.5 px-3 rounded-xl bg-pink-950/40 hover:bg-pink-900/40 border border-pink-500/50 text-pink-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(255,0,127,0.15)]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>عرض تقارير ومعرض إثباتات النتائج (ROAS 7.8X)</span>
                    </button>
                  )}

                  {/* Pricing Box with 70% Discount */}
                  <div className="mt-auto p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-4">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>السعر الطبيعي:</span>
                      <span className="line-through font-mono-tech text-slate-500">
                        {standardPrice.toLocaleString()} {currSymbol}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-1.5 text-pink-400 font-bold text-xs">
                        <Percent className="w-3.5 h-3.5" />
                        <span>عرض 24 ساعة (-70%):</span>
                      </div>
                      <div className="font-mono-tech font-black text-xl text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                        {flashPrice.toLocaleString()} {currSymbol}
                      </div>
                    </div>
                  </div>

                  {/* Mini Bulk Offer Chip */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-dashed border-pink-500/40 mb-6 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-pink-300 font-bold flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>{service.bulkOffer.badge}</span>
                      </div>
                      <div className="text-[11px] text-white font-medium line-clamp-1">
                        {service.bulkOffer.title}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOrderBulk(service)}
                      className="px-2.5 py-1 rounded-lg bg-pink-950 text-pink-300 hover:text-white border border-pink-500/50 text-[10px] font-bold shrink-0 cursor-pointer"
                    >
                      {bulkPrice.toLocaleString()} {currSymbol}
                    </button>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOrder(service)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-slate-950 text-cyan-300 border border-cyan-500/40 hover:border-transparent font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] active:scale-95 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>طلب الخدمة مع كود CYBER70</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
