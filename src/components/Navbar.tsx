"use client";

import React, { useState } from "react";
import { Bot, Menu, X, MessageCircle, Percent, ShieldCheck, PhoneCall, CreditCard, ArrowRightLeft } from "lucide-react";
import { CYBER_CONTACTS } from "@/lib/cyberData";
import { playCyberSound } from "@/lib/cyberEffects";

interface NavbarProps {
  onOpenAiBot: () => void;
}

export default function Navbar({ onOpenAiBot }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "الخدمات السبع", href: "#services" },
    { label: "مقارنة الأسعار", href: "#pricing-comparison" },
    { label: "فريق العمل", href: "#team" },
    { label: "آراء العملاء", href: "#testimonials" },
    { label: "معرض الإثباتات", href: "#proof-gallery" },
    { label: "طرق الدفع", href: "#payment-methods" },
    { label: "حاسبة الخصم", href: "#calculator" },
    { label: "تسجيل الطلب", href: "#register" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0B0F19]/90 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onClick={() => playCyberSound("click")}
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_22px_rgba(0,240,255,0.45)] transition-all">
            <span className="font-mono-tech font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              CX
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          </div>

          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-wider text-white">
              CYBER<span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">X</span>
            </span>
            <span className="text-[10px] font-mono-tech tracking-widest text-slate-400 -mt-1 flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 text-cyan-400" />
              DIGITAL &amp; CYBER SUPREMACY
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => playCyberSound("click")}
              className="text-slate-300 hover:text-cyan-300 transition-colors relative py-1 hover:drop-shadow-[0_0_6px_rgba(0,240,255,0.4)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* AI Bot Trigger Button */}
          <button
            onClick={() => {
              playCyberSound("beep");
              onOpenAiBot();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white hover:bg-cyan-950/40 text-xs font-bold transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)] active:scale-95 cursor-pointer"
            title="تحدث مع مساعد الذكاء الاصطناعي"
          >
            <Bot className="w-4 h-4 text-cyan-400 animate-bounce" style={{ animationDuration: "2.5s" }} />
            <span>CyberX AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          {/* WhatsApp Direct Chat (01094200285) */}
          <a
            href={CYBER_CONTACTS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberSound("click")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)] text-xs font-bold cursor-pointer"
            title="واتساب مباشر: 01094200285"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-mono-tech dir-ltr">01094200285</span>
          </a>

          {/* Primary CTA */}
          <a
            href="#register"
            onClick={() => playCyberSound("click")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-xs tracking-wide shadow-[0_0_18px_rgba(255,0,127,0.35)] hover:shadow-[0_0_25px_rgba(255,0,127,0.6)] transition-all active:scale-95 cursor-pointer"
          >
            <Percent className="w-3.5 h-3.5" />
            <span>تفعيل خصم 70% ⚡</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="xl:hidden flex items-center gap-2">
          <a
            href={CYBER_CONTACTS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400"
            title="واتساب"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              playCyberSound("beep");
              onOpenAiBot();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-400"
            title="المساعد الذكي"
          >
            <Bot className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F172A] border-b border-cyan-500/30 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3 font-bold text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  playCyberSound("click");
                }}
                className="text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-800/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={CYBER_CONTACTS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 font-bold text-xs font-mono-tech"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب الطلبات: 01094200285</span>
            </a>

            <a
              href={CYBER_CONTACTS.techSupportWa}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-bold text-xs font-mono-tech"
            >
              <PhoneCall className="w-4 h-4" />
              <span>الدعم الفني: 01032398441</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiBot();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-cyan-500/50 text-cyan-300 font-bold text-xs"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>تحدث مع مساعد CyberX AI الذكي</span>
            </button>

            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(255,0,127,0.35)]"
            >
              تفعيل خصم 70% بكود CYBER70 ⚡
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
