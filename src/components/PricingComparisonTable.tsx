"use client";

import React, { useState } from "react";
import { CYBER_SERVICES, ServiceItem } from "@/lib/cyberData";
import { useCyberConfig } from "@/context/CyberConfigContext";
import {
  Percent,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Package,
  Layers,
  ArrowRightLeft,
  Flame,
  BadgeAlert,
  Gift,
} from "lucide-react";
import { playCyberSound, fireCyberConfetti } from "@/lib/cyberEffects";

interface PricingComparisonTableProps {
  onSelectService: (serviceTitle: string) => void;
}

export default function PricingComparisonTable({
  onSelectService,
}: PricingComparisonTableProps) {
  const { services: dynamicServices } = useCyberConfig();
  const servicesList = dynamicServices && dynamicServices.length > 0 ? dynamicServices : CYBER_SERVICES;
  const [currency, setCurrency] = useState<"EGP" | "USD">("EGP");
  const [activeTab, setActiveTab] = useState<"table" | "bulk">("table");

  const handleOrder = (service: ServiceItem) => {
    playCyberSound("success");
    fireCyberConfetti();
    onSelectService(service.title);
    const regElem = document.getElementById("register");
    if (regElem) {
      regElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOrderBulk = (service: ServiceItem) => {
    playCyberSound("success");
    fireCyberConfetti();
    onSelectService(`${service.title} - ${service.bulkOffer.title}`);
    const regElem = document.getElementById("register");
    if (regElem) {
      regElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing-comparison" className="py-24 relative overflow-hidden bg-[#0A0E1A] border-t border-slate-800/90">
      {/* Background Soft Neon Ambience */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[350px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/3 w-[600px] h-[350px] bg-pink-500/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>جدول مقارنة الأسعار المباشرة • TRANSPARENT PRICING &amp; SPECIAL BUNDLES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            مقارنة{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent">
              أسعار السوق vs أسعار CyberX
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            شفافية كاملة توضح الفرق بين أسعار السوق والمنافسين وسعر CyberX القياسي، مع أقوى عروض <strong className="text-pink-400">الفيديوهات (500 ج.م)</strong>، <strong className="text-pink-400">الحملات الممولة (1,200 ج.م)</strong>، و<strong className="text-cyan-400">اشتراك أتمتة الواتساب (1,500 ج.م + 1,000 داتا مجانية)</strong>!
          </p>

          {/* Currency Switcher & View Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            
            {/* Currency Toggle */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  playCyberSound("click");
                  setCurrency("EGP");
                }}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  currency === "EGP"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.35)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>الجنيه المصري (EGP)</span>
                <span className="text-[10px] opacity-80">ج.م</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCyberSound("click");
                  setCurrency("USD");
                }}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(255,0,127,0.35)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>الدولار الأمريكي (USD)</span>
                <span className="text-[10px] opacity-80">$</span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-700/80">
              <button
                type="button"
                onClick={() => {
                  playCyberSound("click");
                  setActiveTab("table");
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "table"
                    ? "bg-slate-800 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>جدول المقارنة الثلاثي</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCyberSound("click");
                  setActiveTab("bulk");
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "bulk"
                    ? "bg-slate-800 text-pink-300 border border-pink-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>باقات العروض الخاصة (Bulk Offers)</span>
              </button>
            </div>

          </div>
        </div>

        {/* Tab 1: Comparison Table */}
        {activeTab === "table" && (
          <div className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.12)]">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-950/90 border-b border-slate-800 text-xs font-bold text-slate-300 font-mono-tech">
                    <th className="py-5 px-6 text-right">الخدمة ومواصفاتها (Service)</th>
                    <th className="py-5 px-4 text-center">سعر السوق / المنافسين</th>
                    <th className="py-5 px-4 text-center">سعر CyberX الطبيعي</th>
                    <th className="py-5 px-6 text-center text-pink-400 bg-pink-950/20 border-x border-pink-500/30">
                      <div className="flex items-center justify-center gap-1.5">
                        <Flame className="w-4 h-4 text-pink-400 animate-pulse" />
                        <span>عرض أول 24 ساعة (كود CYBER70)</span>
                      </div>
                    </th>
                    <th className="py-5 px-4 text-center text-emerald-400">وفر معنا</th>
                    <th className="py-5 px-6 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-sm">
                  {servicesList.map((s) => {
                    const marketPrice = currency === "EGP" ? s.marketPriceEGP : s.marketPriceUSD;
                    const cyberxPrice = currency === "EGP" ? s.cyberxPriceEGP : s.cyberxPriceUSD;
                    const flashPrice = currency === "EGP" ? s.discountedPriceEGP : s.discountedPriceUSD;
                    const currSymbol = currency === "EGP" ? "ج.م" : "$";
                    const savedAmount = marketPrice - flashPrice;

                    return (
                      <tr
                        key={s.id}
                        className="hover:bg-slate-900/60 transition-colors group"
                      >
                        {/* Service Title */}
                        <td className="py-4 px-6">
                          <div className="font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                            {s.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono-tech mt-0.5" dir="ltr">
                            {s.englishTitle}
                          </div>
                          {s.specialGift && (
                            <div className="text-[11px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                              <Gift className="w-3 h-3" />
                              <span>{s.specialGift}</span>
                            </div>
                          )}
                        </td>

                        {/* Competitor / Market Price */}
                        <td className="py-4 px-4 text-center">
                          <span className="line-through text-slate-500 font-mono-tech text-sm">
                            {marketPrice.toLocaleString()} {currSymbol}
                          </span>
                          <div className="text-[10px] text-red-400/80 mt-0.5">أسعار السوق التقليدية</div>
                        </td>

                        {/* CyberX Regular Price */}
                        <td className="py-4 px-4 text-center">
                          <span className="font-bold text-slate-300 font-mono-tech text-sm">
                            {cyberxPrice.toLocaleString()} {currSymbol}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-0.5">بدون كود الخصم</div>
                        </td>

                        {/* 24-hr 70% Flash Sale */}
                        <td className="py-4 px-6 text-center bg-pink-950/20 border-x border-pink-500/30">
                          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-slate-950 border border-pink-500/50 shadow-[0_0_15px_rgba(255,0,127,0.25)]">
                            <span className="font-mono-tech font-black text-base text-pink-400 drop-shadow-[0_0_10px_rgba(255,0,127,0.5)]">
                              {flashPrice.toLocaleString()} {currSymbol}
                            </span>
                          </div>
                          <div className="text-[10px] text-cyan-300 font-bold mt-1 font-mono-tech">
                            {s.id === "cinematic-videos"
                              ? "دقيقة كاملة بـ 500 ج.م فقط"
                              : s.id === "paid-ads"
                              ? "حملة بـ 1,200 ج.م فقط"
                              : s.id === "whatsapp-automation"
                              ? "1,500 ج.م + 1,000 داتا مجانية"
                              : "كود: CYBER70 (-70%)"}
                          </div>
                        </td>

                        {/* Savings */}
                        <td className="py-4 px-4 text-center">
                          <span className="font-mono-tech font-bold text-emerald-400 text-sm">
                            +{savedAmount.toLocaleString()} {currSymbol}
                          </span>
                          <div className="text-[10px] text-emerald-400/80 mt-0.5">توفير مباشر لك</div>
                        </td>

                        {/* Action CTA */}
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleOrder(s)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1 mx-auto"
                          >
                            <span>حجز العرض</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Note banner under table */}
            <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <BadgeAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  * اشتراك أتمتة الواتساب يشمل 1,000 رقم داتا مستهدفة مجاناً. الدفع متاح عبر فودافون كاش، أكسيس باي، ومحفظة Binance USDT.
                </span>
              </div>
              <div className="font-mono-tech text-[11px] text-pink-400">
                CYBERX OFFICIAL GUARANTEE // 24H FLASH OFFERS
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Special Bulk Offers (الباقات المجمعة) */}
        {activeTab === "bulk" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((s) => {
              const bulk = s.bulkOffer;
              const original = currency === "EGP" ? bulk.originalEGP : bulk.originalUSD;
              const bundlePrice = currency === "EGP" ? bulk.priceEGP : bulk.priceUSD;
              const currSymbol = currency === "EGP" ? "ج.م" : "$";
              const saved = original - bundlePrice;

              return (
                <div
                  key={s.id}
                  className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 hover:border-pink-500/50 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(255,0,127,0.2)] transition-all duration-300 group"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/50 text-pink-300 font-mono-tech">
                        {bulk.badge}
                      </span>
                      <span className="text-xs font-mono-tech text-slate-400">
                        {s.title}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {bulk.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {bulk.description}
                    </p>

                    {/* Included Items */}
                    <div className="space-y-1.5 mb-6">
                      <div className="text-[11px] font-bold text-slate-400">ما تتضمنه الباقة المجمعة:</div>
                      {bulk.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Special Gift notice if any */}
                    {bulk.gift && (
                      <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 mb-4">
                        <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{bulk.gift}</span>
                      </div>
                    )}
                  </div>

                  {/* Price Box */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-500 line-through mb-1">
                      <span>السعر الفردي الإجمالي:</span>
                      <span className="font-mono-tech">{original.toLocaleString()} {currSymbol}</span>
                    </div>

                    <div className="flex items-baseline justify-between mb-4">
                      <div className="text-xs text-pink-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>سعر الباقة المجمعة:</span>
                      </div>
                      <div className="font-mono-tech font-black text-2xl text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                        {bundlePrice.toLocaleString()} {currSymbol}
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-400 font-bold mb-4 text-center bg-emerald-950/40 border border-emerald-500/30 rounded-lg py-1">
                      {bulk.savings} (توفير {saved.toLocaleString()} {currSymbol})
                    </div>

                    <button
                      onClick={() => handleOrderBulk(s)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(255,0,127,0.35)] transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>حجز هذه الباقة المجمعة الآن</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
