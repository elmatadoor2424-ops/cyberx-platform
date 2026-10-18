"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowLeft,
  Bot,
  Zap,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Shield,
  Layers,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { fireCyberConfetti, playCyberSound } from "@/lib/cyberEffects";
import { CYBER_CONTACTS } from "@/lib/cyberData";

interface HeroSectionProps {
  onOpenAiBot: () => void;
  onSelectDiscount: () => void;
}

export default function HeroSection({ onOpenAiBot, onSelectDiscount }: HeroSectionProps) {
  const handleDiscountClick = () => {
    playCyberSound("success");
    fireCyberConfetti();
    onSelectDiscount();
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 cyber-grid-bg">
      {/* Background Soft Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#00FF66]/10 via-emerald-500/10 to-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#00FF66]/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#00FF66]/10 blur-[110px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column: Hero Content (RTL) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right space-y-6">
            
            {/* Cyber Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-[#00FF66]/30 shadow-sm text-xs font-bold text-[#00FF66]">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF66]"></span>
              </span>
              <span>تحت إشراف م. أحمد عمر • خبير الأمن السيبراني وباحث دكتوراه الذكاء الاصطناعي</span>
              <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F8FAFC] leading-[1.25]">
              حوّل شركتك إلى{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#00FF66] via-emerald-300 to-[#00CC55] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0, 255, 102, 0.3)]">
                  قوة رقمية كاسحة
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-[#00FF66] to-[#009944] rounded-full blur-[1px]"></span>
              </span>{" "}
              محصنة أمنياً ومضاعفة للأرباح
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-2xl">
              منظومة <strong className="text-[#00FF66] font-bold">CyberX</strong> الشاملة: تطوير مواقع وتطبيقات مقاومة للاختراق، إنتاج فيديوهات سينمائية هوليوودية، حملات ممولة بمتوسط عائد <span className="text-[#00FF66] font-bold underline decoration-cyan-500/40">ROAS 7.8X</span>، أنظمة إدارة مخصصة للمطاعم والعيادات، وأتمتة واتساب فورية بالذكاء الاصطناعي.
            </p>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-2 gap-3 pt-2 w-full max-w-lg text-xs sm:text-sm text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>حماية سيبرانية وتشفير بنكي</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>أتمتة واتساب وربط n8n</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>تسعير بالجنيه المصري والدولار</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>خصم 70% بكود CYBER70</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3 w-full">
              {/* Primary 70% Discount Activation Button */}
              <button
                onClick={handleDiscountClick}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00FF66] to-[#009944] hover:from-[#00FF66] hover:to-[#00CC55] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-[0_0_15px_rgba(0,255,102,0.2)] hover:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-yellow-300 animate-bounce" />
                <span>تفعيل خصم 70% فوراً (CYBER70)</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
              </button>

              {/* Compare Prices Button */}
              <a
                href="#pricing-comparison"
                onClick={() => playCyberSound("click")}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#0A0A0A] hover:bg-[#0A0A0A] text-[#00FF66] hover:text-[#F8FAFC] border border-[#00FF66]/30 hover:border-[#00FF66]/40 font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#00FF66]" />
                <span>جدول مقارنة الأسعار ✦</span>
              </a>

              {/* Direct WhatsApp Callout */}
              <a
                href={CYBER_CONTACTS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberSound("click")}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold transition-all cursor-pointer font-mono-tech dir-ltr"
              >
                <MessageCircle className="w-4 h-4" />
                <span>01094200285</span>
              </a>
            </div>

            {/* Live Trust Metrics Bar */}
            <div className="pt-6 border-t border-[#00FF66]/30 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-right">
              <div>
                <div className="font-mono-tech font-black text-2xl sm:text-3xl text-[#00FF66] drop-shadow-[0_0_8px_rgba(0, 255, 102, 0.3)]">
                  +250
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">مشروع رقمي مؤمن</div>
              </div>

              <div>
                <div className="font-mono-tech font-black text-2xl sm:text-3xl text-[#00FF66] drop-shadow-[0_0_8px_rgba(0, 255, 102, 0.3)]">
                  7.8X
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">متوسط ROAS الإعلاني</div>
              </div>

              <div>
                <div className="font-mono-tech font-black text-2xl sm:text-3xl text-[#00FF66]">
                  99.4%
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">نسبة رضا العملاء</div>
              </div>

              <div>
                <div className="font-mono-tech font-black text-2xl sm:text-3xl text-emerald-400">
                  24/7
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">دعم ومحافظ دفع فورية</div>
              </div>
            </div>

          </div>

          {/* Left Column: Visual 3D Showcase (RTL) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Soft Tech Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00FF66]/20 via-emerald-500/20 to-indigo-600/20 opacity-40 blur-xl animate-pulse-glow"></div>
              
              {/* Card Container */}
              <div className="relative rounded-3xl bg-[#0A0A0A] border border-[#00FF66]/30 overflow-hidden shadow-2xl scanline-effect">
                
                {/* Cyber Card Header / Browser Mockup Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#000000]/90 border-b border-[#00FF66]/30">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66]/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66]/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono-tech text-[#00FF66]/90 bg-[#0A0A0A] px-3 py-0.5 rounded-md border border-[#00FF66]/30">
                    <Cpu className="w-3 h-3 animate-spin text-[#00FF66]" style={{ animationDuration: "8s" }} />
                    <span>CYBERX.SEC // PH.D_AI_CORE</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono-tech">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>ACTIVE</span>
                  </div>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#000000] group">
                  <Image
                    src="/images/hero_showcase.jpg"
                    alt="CyberX Digital Ecosystem Showcase"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Floating Micro Cyber Widgets */}
                <div className="p-4 grid grid-cols-2 gap-3 bg-[#000000]/80 border-t border-[#00FF66]/30">
                  <div className="p-2.5 rounded-2xl bg-[#0A0A0A]/60 backdrop-blur-md border border-[#00FF66]/30 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#00FF66]/10 text-[#00FF66] shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#94A3B8]">حملات موثقة بالأرقام</div>
                      <div className="font-mono-tech font-bold text-xs sm:text-sm text-[#00FF66]">ROAS 7.8X</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-[#0A0A0A]/60 backdrop-blur-md border border-[#00FF66]/30 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#00FF66]/10 text-[#00FF66] shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#94A3B8]">كود الخصم الحصري</div>
                      <div className="font-mono-tech font-bold text-xs sm:text-sm text-[#00FF66]">CYBER70 (-70%)</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
