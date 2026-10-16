"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROOF_CASES } from "@/lib/cyberData";
import {
  ShieldCheck,
  TrendingUp,
  Maximize2,
  X,
  ExternalLink,
  Zap,
} from "lucide-react";
import { playCyberSound } from "@/lib/cyberEffects";

export default function ProofShowcaseSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (imgSrc: string) => {
    playCyberSound("click");
    setSelectedImage(imgSrc);
  };

  const closeLightbox = () => {
    playCyberSound("click");
    setSelectedImage(null);
  };

  return (
    <section id="proof" className="py-24 relative overflow-hidden bg-[#0A0F1D] border-t border-b border-white/10">
      {/* Glow Backdrops - softened */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111827] border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>إثباتات مدققة بالأرقام • VERIFIED RESULTS SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC]">
            معرض إثباتات النتائج{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              والعائد الاستثماري
            </span>
          </h2>

          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            لا نعدك بوعود نظرية؛ هذه لقطات حقيقية من لوحات تحكم عملائنا في الحملات الإعلانية الممولة، أنظمة نقاط البيع، وأتمتة الواتساب التي حققت أرقاماً قياسية.
          </p>
        </div>

        {/* Proof Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PROOF_CASES.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#1E293B]/60 backdrop-blur-md border border-white/10 overflow-hidden shadow-xl flex flex-col group hover:border-cyan-400/40 transition-all duration-300"
            >
              {/* Image Container with Hover Lightbox trigger */}
              <div
                className="relative aspect-video w-full bg-[#111827] overflow-hidden cursor-pointer scanline-effect"
                onClick={() => openLightbox(item.image)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111827]/90 border border-emerald-500/40 text-emerald-400 text-xs font-bold font-mono-tech shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.verifiedBadge}</span>
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#0A0F1D]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111827]/90 border border-white/10 text-cyan-300 text-xs font-bold shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                    <span>تكبير ومعاينة لوحة الأرقام</span>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#94A3B8] mb-2">
                    <span className="text-cyan-400">{item.category}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#111827] border border-white/10">
                      {item.clientType}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#F8FAFC] group-hover:text-cyan-300 transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#111827] border border-white/10">
                  {item.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center sm:text-right">
                      <div className="text-[10px] text-[#94A3B8] mb-1">{m.label}</div>
                      <div
                        className={`font-mono-tech font-black text-lg ${
                          m.highlight
                            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                            : "text-[#F8FAFC]"
                        }`}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-xs text-[#94A3B8] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>جاهزون لتحقيق نتائج مماثلة لمشروعك</span>
                  </div>

                  <a
                    href="#register"
                    className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>احجز خدمتك بخصم 70%</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Security & Tracking Guarantee Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-[#1E293B]/60 backdrop-blur-md border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-cyan-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#F8FAFC]">
                ضمان دقة التتبع وعائد الاستثمار في عقود CyberX
              </h4>
              <p className="text-xs text-[#94A3B8] mt-1">
                نستخدم خوادم تتبع سحابية CAPI مخصصة تمنع فقدان بيانات التحويل وتضمن قياس كل ريال ينفق في الحملات أو الأنظمة.
              </p>
            </div>
          </div>

          <a
            href="#register"
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs transition-all shadow-md shadow-blue-500/20"
          >
            بدء مشروعك المضمون الآن ⚡
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0A0F1D]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 bg-[#0A0F1D]/80 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CYBERX VERIFIED RESULTS REPORT // HIGH RESOLUTION VIEW</span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-1 rounded-lg bg-[#1E293B]/60 text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full">
              <Image
                src={selectedImage}
                alt="Proof Preview"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
