"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Sparkles,
  Percent,
  Copy,
  Check,
  Calculator,
  ArrowLeft,
  Flame,
} from "lucide-react";
import { CYBER_SERVICES } from "@/lib/cyberData";
import { playCyberSound, fireCyberConfetti } from "@/lib/cyberEffects";

interface DiscountEngineProps {
  onSelectServiceAndDiscount: (serviceTitle: string) => void;
}

export default function DiscountEngineSection({
  onSelectServiceAndDiscount,
}: DiscountEngineProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    ms: number;
  }>({ hours: 23, minutes: 59, seconds: 59, ms: 99 });

  const [copied, setCopied] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(CYBER_SERVICES[0].id);
  const [currency, setCurrency] = useState<"EGP" | "USD">("EGP");
  const [tierMultiplier, setTierMultiplier] = useState<number>(1); // 1: Starter, 1.5: Pro, 2.2: Enterprise

  useEffect(() => {
    const STORAGE_KEY = "cyberx_countdown_deadline_v1";
    let deadlineStr = localStorage.getItem(STORAGE_KEY);
    let deadline: number;

    if (!deadlineStr) {
      deadline = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, deadline.toString());
    } else {
      deadline = parseInt(deadlineStr, 10);
      if (isNaN(deadline) || deadline <= Date.now()) {
        deadline = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, deadline.toString());
      }
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, deadline - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const ms = Math.floor((diff % 1000) / 10);

      setTimeLeft({ hours, minutes, seconds, ms });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 65);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("CYBER70");
    setCopied(true);
    playCyberSound("success");
    fireCyberConfetti();
    setTimeout(() => setCopied(false), 2500);
  };

  const currentService =
    CYBER_SERVICES.find((s) => s.id === selectedServiceId) || CYBER_SERVICES[0];

  const rawBase = currency === "EGP" ? currentService.cyberxPriceEGP : currentService.cyberxPriceUSD;
  const basePrice = Math.round(rawBase * tierMultiplier);
  const finalPrice = Math.round(basePrice * 0.3); // 70% off
  const savings = basePrice - finalPrice;
  const currSymbol = currency === "EGP" ? "ج.م" : "$";

  const handleLockInDiscount = () => {
    playCyberSound("success");
    fireCyberConfetti();
    onSelectServiceAndDiscount(currentService.title);
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-[#000000] border-t border-[#00FF66]/30">
      {/* Background Gradients - softened & eye-friendly */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#00FF66]/10 via-emerald-500/10 to-indigo-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-[#00FF66]/30 text-[#00FF66] text-xs font-bold shadow-sm shadow-[0_0_15px_rgba(0,255,102,0.2)]">
            <Flame className="w-3.5 h-3.5 text-[#00FF66] animate-pulse" />
            <span>محرك الخصم التنازلي • 24 HOURS CYBER DEAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC]">
            عداد الـ 24 ساعة وحاسبة{" "}
            <span className="bg-gradient-to-r from-[#00FF66] via-emerald-300 to-[#00CC55] bg-clip-text text-transparent">
              خصم الـ 70% (CYBER70)
            </span>
          </h2>

          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            العداد بدأ فور دخولك للنظام. احسب تكلفة باقتك المخصصة بعد الخصم بالجنيه المصري أو الدولار، وثبّت كود <span className="font-mono-tech text-[#00FF66] font-bold">CYBER70</span> قبل فوات الوقت.
          </p>
        </div>

        {/* Big Countdown Clock Display */}
        <div className="max-w-4xl mx-auto mb-16 p-8 rounded-3xl bg-[#0A0A0A]/60 backdrop-blur-md border border-[#00FF66]/30 shadow-xl shadow-[0_0_15px_rgba(0,255,102,0.15)] text-center relative scanline-effect">
          
          <div className="flex items-center justify-center gap-2 text-xs font-mono-tech text-[#00FF66] mb-6">
            <Clock className="w-4 h-4 text-[#00FF66] animate-spin" style={{ animationDuration: "10s" }} />
            <span>COUNTDOWN ENGINE // 24-HOUR EXPIRATION WINDOW</span>
          </div>

          {/* Clock Digits */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto mb-8 dir-ltr" dir="ltr">
            {[
              { val: pad(timeLeft.hours), label: "ساعات" },
              { val: pad(timeLeft.minutes), label: "دقائق" },
              { val: pad(timeLeft.seconds), label: "ثواني", highlight: true },
              { val: pad(timeLeft.ms), label: "أجزاء ثانية", isMs: true },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#0A0A0A] border border-[#00FF66]/30 shadow-inner group hover:border-[#00FF66]/40 transition-colors"
              >
                <div
                  className={`font-mono-tech font-black text-3xl sm:text-5xl lg:text-6xl ${
                    unit.highlight
                      ? "text-[#00FF66] drop-shadow-[0_0_12px_rgba(0, 255, 102, 0.4)]"
                      : unit.isMs
                      ? "text-[#00FF66]/80"
                      : "text-[#F8FAFC]"
                  }`}
                >
                  {unit.val}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-[#94A3B8] mt-2">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Code Banner inside Clock */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#00FF66]/30">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A0A0A] border border-dashed border-[#00FF66]/50">
              <Sparkles className="w-4 h-4 text-[#00FF66] animate-spin" style={{ animationDuration: "6s" }} />
              <span className="text-xs text-[#94A3B8]">كود الخصم الفوري:</span>
              <code className="font-mono-tech font-black text-lg text-[#00FF66] tracking-widest">
                CYBER70
              </code>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#009944] hover:from-[#00FF66] hover:to-[#00CC55] text-white font-extrabold text-xs shadow-md shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>تم تفعيل ونسخ الكود!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ الكود وتثبيت 70%</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Pricing & ROI Calculator */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0A0A0A]/60 backdrop-blur-md border border-[#00FF66]/30 p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#00FF66]/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#F8FAFC]">
                  حاسبة تكلفة الخدمات وتطبيق خصم CYBER70 التلقائي
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  اختر الخدمة ونطاق المشروع وشاهد مقدار التوفير المالي فوراً
                </p>
              </div>
            </div>

            {/* Currency selector inside calculator */}
            <div className="flex items-center p-1 rounded-xl bg-[#0A0A0A] border border-[#00FF66]/30">
              <button
                type="button"
                onClick={() => setCurrency("EGP")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === "EGP" ? "bg-gradient-to-r from-[#00FF66] to-[#009944] text-white font-black" : "text-[#94A3B8]"
                }`}
              >
                EGP (ج.م)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === "USD" ? "bg-gradient-to-r from-[#00FF66] to-[#009944] text-white font-black" : "text-[#94A3B8]"
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Options */}
            <div className="space-y-6">
              {/* Service Select */}
              <div>
                <label className="block text-xs font-bold text-[#F8FAFC] mb-2">
                  1. اختر إحدى الخدمات السبع:
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => {
                    playCyberSound("click");
                    setSelectedServiceId(e.target.value);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#00FF66]/30 text-[#F8FAFC] text-sm font-semibold focus:outline-none focus:border-[#00FF66]/30 transition-colors"
                >
                  {CYBER_SERVICES.map((s) => (
                    <option key={s.id} value={s.id} className="bg-[#0A0A0A] text-[#F8FAFC]">
                      0{s.number}. {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Scope/Tier Select */}
              <div>
                <label className="block text-xs font-bold text-[#F8FAFC] mb-2">
                  2. حدد نطاق وحجم المشروع:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 1, label: "أساسي (Starter)" },
                    { id: 1.5, label: "متقدم (Pro Growth)" },
                    { id: 2.2, label: "مؤسسي (Enterprise)" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        playCyberSound("click");
                        setTierMultiplier(t.id);
                      }}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        tierMultiplier === t.id
                          ? "bg-[#00FF66]/25 border-[#00FF66]/30 text-[#00FF66] shadow-sm shadow-[0_0_15px_rgba(0,255,102,0.2)]"
                          : "bg-[#0A0A0A] border-[#00FF66]/30 text-[#94A3B8] hover:text-[#F8FAFC]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Quick Highlight */}
              <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#00FF66]/30 text-xs text-[#94A3B8] space-y-1">
                <div className="font-bold text-[#00FF66]">{currentService.tagline}</div>
                <div className="text-[#94A3B8]">{currentService.description}</div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-[#00FF66]/30 shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>السعر الطبيعي قبل الخصم:</span>
                  <span className="line-through font-mono-tech text-slate-500 text-sm">
                    {basePrice.toLocaleString()} {currSymbol}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#00FF66] font-bold">
                  <div className="flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5" />
                    <span>مقدار التوفير (70%):</span>
                  </div>
                  <span className="font-mono-tech text-base">
                    - {savings.toLocaleString()} {currSymbol}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#00FF66]/30 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#F8FAFC]">السعر النهائي بكود CYBER70:</span>
                  <span className="font-mono-tech font-black text-3xl text-[#00FF66] drop-shadow-[0_0_10px_rgba(0, 255, 102, 0.3)]">
                    {finalPrice.toLocaleString()} {currSymbol}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLockInDiscount}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#009944] hover:from-[#00FF66] hover:to-[#00CC55] text-white font-extrabold text-sm shadow-md shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all active:scale-95 cursor-pointer"
              >
                <span>تثبيت هذا السعر وحجز المقعد الآن ⚡</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
