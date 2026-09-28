"use client";

import React from "react";
import { TESTIMONIALS } from "@/lib/cyberData";
import { Star, ShieldCheck, Quote, Sparkles, MessageCircle } from "lucide-react";
import { playCyberSound } from "@/lib/cyberEffects";
import { CYBER_CONTACTS } from "@/lib/cyberData";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#0A0E1A] border-t border-slate-800/80">
      {/* Background Soft Neon Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-yellow-500/40 text-yellow-300 text-xs font-bold shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span>آراء وتجارب شركاء النجاح • 5-STAR VERIFIED CLIENT REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            ماذا يقول عملاؤنا عن{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
              CyberX ونتائج مشاريعهم؟
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            شهادات حقيقية من أصحاب شركات، عيادات، مطاعم ومتاجر إلكترونية اختاروا حلول المهندس أحمد عمر وفريق CyberX لمضاعفة أرباحهم وأتمتة أعمالهم.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 hover:border-cyan-400 p-8 shadow-[0_0_25px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top ambient highlight */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 opacity-60"></div>

              <div>
                {/* Header: Avatar, Name & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        {t.name}
                      </h4>
                      <div className="text-xs text-slate-400">
                        {t.role}
                      </div>
                    </div>
                  </div>

                  {t.verified && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-400 text-[11px] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>عميل موثق</span>
                    </div>
                  )}
                </div>

                {/* Stars Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                    />
                  ))}
                  <span className="text-xs font-mono-tech text-yellow-300 font-bold mr-2">
                    5.0 / 5.0
                  </span>
                </div>

                {/* Service Tag */}
                <div className="inline-block px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono-tech text-pink-300 font-bold mb-4">
                  الخدمة: {t.service}
                </div>

                {/* Quote Text */}
                <div className="relative text-sm text-slate-300 leading-relaxed italic mb-6">
                  <Quote className="w-6 h-6 text-cyan-500/30 mb-2 rotate-180" />
                  &ldquo;{t.quote}&rdquo;
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>نتائج مدققة وموثقة</span>
                </span>
                <span className="font-mono-tech text-slate-500">CYBERX VERIFIED REVIEW</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="mt-14 p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-right">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                انضم إلى أكثر من 250 شريك نجاح حققوا أرقاماً قياسية مع CyberX
              </h4>
              <p className="text-xs text-slate-400">
                استفد من خصم 70% الحصري بكود CYBER70 وتحدث مع المهندس أحمد عمر وفريق العمل مباشرة.
              </p>
            </div>
          </div>

          <a
            href={CYBER_CONTACTS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberSound("click")}
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>ابدأ مشروعك الناجح الآن (01094200285)</span>
          </a>
        </div>

      </div>
    </section>
  );
}
