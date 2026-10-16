"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROOF_CASES } from "@/lib/cyberData";
import { useCyberConfig } from "@/context/CyberConfigContext";
import {
  ShieldCheck,
  TrendingUp,
  Maximize2,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { playCyberSound } from "@/lib/cyberEffects";

export default function ProofGallerySection() {
  const { proofCases: dynamicProofs } = useCyberConfig();
  const proofList = dynamicProofs && dynamicProofs.length > 0 ? dynamicProofs : PROOF_CASES;

  const [selectedProof, setSelectedProof] = useState<(typeof PROOF_CASES)[0] | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredProofs = proofList.filter((item) => {
    if (filter === "all") return true;
    if (filter === "ads") return item.id === "case-1" || item.id === "case-2";
    if (filter === "wa") return item.id === "case-3";
    if (filter === "sys") return item.id === "case-4";
    return true;
  });

  const openLightbox = (item: (typeof PROOF_CASES)[0]) => {
    playCyberSound("click");
    setSelectedProof(item);
  };

  const closeLightbox = () => {
    playCyberSound("click");
    setSelectedProof(null);
  };

  return (
    <section id="proof-gallery" className="py-24 relative overflow-hidden bg-[#0A0F1D] border-t border-white/10">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111827] border border-white/10 text-emerald-400 text-xs font-bold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>معرض الصور النيون للإثباتات • VERIFIED LIVE PROOF GALLERY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC]">
            معرض سكرينات إثبات نتائج الحملات{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-300 bg-clip-text text-transparent">
              والأرقام المباشرة
            </span>
          </h2>

          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            لقطات شاشة موثقة ومباشرة من داخل لوحات تحكم عملائنا في Meta Ads و TikTok Ads، أتمتة الواتساب لـ 1,000 عميل، ومبيعات المتاجر الإلكترونية بالجنيه المصري والدولار.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "all", label: "جميع الإثباتات الموثقة (4)" },
              { id: "ads", label: "الحملات الممولة ومبيعات المتاجر (ROAS & Sales)" },
              { id: "wa", label: "أتمتة الواتساب وحملات الـ 1,000 رقم" },
              { id: "sys", label: "الأنظمة المخصصة ونقاط البيع POS" },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => {
                  playCyberSound("click");
                  setFilter(btn.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === btn.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black shadow-sm shadow-blue-500/20"
                    : "bg-[#111827] text-[#94A3B8] hover:text-[#F8FAFC] border border-white/10"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (4 Proof Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProofs.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-[#1E293B]/60 backdrop-blur-md border border-white/10 hover:border-cyan-400/40 overflow-hidden shadow-xl flex flex-col group transition-all duration-300"
            >
              {/* Image Container with Hover Lightbox trigger */}
              <div
                className="relative aspect-video w-full bg-[#0A0F1D] overflow-hidden cursor-pointer scanline-effect"
                onClick={() => openLightbox(item)}
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
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/60 text-emerald-400 text-xs font-bold font-mono-tech shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.verifiedBadge}</span>
                  </div>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111827]/90 border border-white/10 text-cyan-300 text-xs font-bold shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                    <span>انقر لتكبير الشاشة وفحص الأرقام</span>
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

                  <h3 className="text-lg font-black text-[#F8FAFC] group-hover:text-cyan-300 transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-[#111827] border border-white/10">
                  {item.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center sm:text-right">
                      <div className="text-[10px] text-[#94A3B8] mb-1">{m.label}</div>
                      <div
                        className={`font-mono-tech font-black text-base ${
                          m.highlight
                            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.35)]"
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
                    <span>تحت إشراف م. أحمد عمر وكارما</span>
                  </div>

                  <a
                    href="#register"
                    className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>طلب نتائج مماثلة (-70%)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedProof && (
        <div
          className="fixed inset-0 z-50 bg-[#0A0F1D]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-[#111827] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 bg-[#0A0F1D] border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-cyan-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CYBERX VERIFIED RESULTS DASHBOARD // HIGH RESOLUTION LIVE VIEW</span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-1 rounded-lg bg-[#1E293B] border border-white/10 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full">
              <Image
                src={selectedProof.image}
                alt={selectedProof.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-4 bg-[#0A0F1D]/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-[#F8FAFC]">{selectedProof.title}</span>
                <span className="text-[#94A3B8] mr-2">({selectedProof.category})</span>
              </div>
              <a
                href="#register"
                onClick={closeLightbox}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold transition-all shadow-sm"
              >
                تفعيل خصم 70% لهذا النوع من الحملات
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
