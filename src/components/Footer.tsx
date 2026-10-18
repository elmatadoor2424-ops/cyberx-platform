"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, MessageCircle, Mail, MapPin, Sparkles, Terminal, PhoneCall, CreditCard, Coins, Smartphone, Lock, KeyRound } from "lucide-react";
import { CYBER_SERVICES, CYBER_CONTACTS } from "@/lib/cyberData";
import { useCyberConfig } from "@/context/CyberConfigContext";
import { playCyberSound } from "@/lib/cyberEffects";

export default function Footer() {
  const { contacts: dynamicContacts } = useCyberConfig();
  const contacts = dynamicContacts || CYBER_CONTACTS;
  return (
    <footer className="bg-[#000000] border-t border-[#00FF66]/30 text-[#94A3B8] text-sm relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-[#00FF66]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-[#0A0A0A] border border-[#00FF66]/30 shadow-sm shadow-[0_0_15px_rgba(0,255,102,0.2)]">
                <span className="font-mono-tech font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-emerald-400">
                  CX
                </span>
              </div>
              <span className="font-black text-2xl tracking-wider text-[#F8FAFC]">
                CYBER<span className="text-[#00FF66]">X</span>
              </span>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm">
              شركة التقنية والحلول الرقمية الرائدة. بإدارة تكنولوجية متقدمة في أمن المعلومات وتطوير الأنظمة السحابية الفائقة، الفيديوهات السينمائية الإعلانية، الحملات الممولة المدققة بأعلى ROAS، وأتمتة الواتساب عبر خوادم n8n.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A] border border-[#00FF66]/30 text-[#00FF66]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>حماية سيبرانية مشفرة</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A] border border-[#00FF66]/30 text-[#00FF66]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>كود الخصم CYBER70 (-70%)</span>
              </span>
            </div>
          </div>

          {/* Quick Links: Services (1 col) */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#F8FAFC] text-sm">الخدمات السبع</h4>
            <ul className="space-y-2 text-xs">
              {CYBER_SERVICES.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={() => playCyberSound("click")}
                    className="hover:text-[#00FF66] transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#pricing-comparison"
                  onClick={() => playCyberSound("click")}
                  className="hover:text-[#00FF66] transition-colors text-[#00FF66] font-bold"
                >
                  جدول مقارنة الأسعار
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={() => playCyberSound("click")}
                  className="hover:text-[#00FF66] transition-colors text-[#00FF66] font-bold"
                >
                  آراء وتقييمات العملاء
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Payment & Systems (1 col) */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#F8FAFC] text-sm">طرق الدفع والأنظمة</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-[#94A3B8]">
                <Smartphone className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>المحافظ: 01554597494</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#94A3B8]">
                <Smartphone className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>المحافظ: 01094200285</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#94A3B8]">
                <Coins className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>Binance USDT: BEP20/TRC20</span>
              </li>
              <li>
                <a
                  href="#payment-methods"
                  onClick={() => playCyberSound("click")}
                  className="hover:text-[#00FF66] transition-colors text-[#00FF66] font-bold"
                >
                  تفاصيل بوابات السداد
                </a>
              </li>
              <li>
                <a
                  href="#proof-gallery"
                  onClick={() => playCyberSound("click")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  معرض إثباتات النتائج
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support & Admin Access (1 col) */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#F8FAFC] text-sm">قنوات التواصل المباشر</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={contacts.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="font-mono-tech dir-ltr">الواتساب: {contacts.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={contacts.techSupportWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#00FF66] hover:text-[#00FF66] transition-colors"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" />
                  <span className="font-mono-tech dir-ltr">الدعم الفني: {contacts.techSupport}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#94A3B8] shrink-0" />
                <span>contact@cyberx.agency</span>
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>خوادم n8n Webhook متصلة</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  onClick={() => playCyberSound("click")}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0A0A] border border-[#00FF66]/30 hover:border-[#00FF66]/40 text-[#00FF66] hover:text-white font-bold transition-all text-xs shadow-sm group"
                >
                  <Lock className="w-3.5 h-3.5 text-[#00FF66] group-hover:rotate-12 transition-transform" />
                  <span>إدارة المنصة (Admin Login)</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: STRICT COPYRIGHT ONLY TO Eng. Ahmed Omar & Admin Button */}
        <div className="pt-8 border-t border-[#00FF66]/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="font-semibold text-[#F8FAFC]">
            {contacts.copyrightNotice}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono-tech text-[#94A3B8]">
            <span className="text-[#00FF66]">PAYMENTS: VODAFONE CASH &bull; ACCESS PAY &bull; BINANCE USDT</span>
            <span>&bull;</span>
            <span className="text-[#00FF66]">PROMO: CYBER70 (-70%)</span>
          </div>

          {/* Prominent Dedicated Admin Login Button */}
          <div>
            <Link
              href="/admin"
              onClick={() => playCyberSound("click")}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0A0A0A] border border-[#00FF66]/30 hover:border-[#00FF66]/40 text-[#00FF66] hover:text-white text-xs font-bold transition-all shadow-sm group"
              title="دخول المشرف وإدارة الطلبات والعملاء"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#00FF66] group-hover:scale-110 transition-transform" />
              <span>إدارة المنصة | Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
