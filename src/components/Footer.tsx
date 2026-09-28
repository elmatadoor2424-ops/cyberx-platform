"use client";

import React from "react";
import { ShieldCheck, MessageCircle, Mail, MapPin, Sparkles, Terminal, PhoneCall, CreditCard, Coins, Smartphone } from "lucide-react";
import { CYBER_SERVICES, CYBER_CONTACTS } from "@/lib/cyberData";
import { useCyberConfig } from "@/context/CyberConfigContext";
import { playCyberSound } from "@/lib/cyberEffects";

export default function Footer() {
  const { contacts: dynamicContacts } = useCyberConfig();
  const contacts = dynamicContacts || CYBER_CONTACTS;
  return (
    <footer className="bg-[#070A12] border-t border-slate-800/80 text-slate-400 text-sm relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                <span className="font-mono-tech font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                  CX
                </span>
              </div>
              <span className="font-black text-2xl tracking-wider text-white">
                CYBER<span className="text-cyan-400">X</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              شركة التقنية والحلول الرقمية الرائدة. بإدارة تكنولوجية متقدمة في أمن المعلومات وتطوير الأنظمة السحابية الفائقة، الفيديوهات السينمائية الإعلانية، الحملات الممولة المدققة بأعلى ROAS، وأتمتة الواتساب عبر خوادم n8n.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>حماية سيبرانية مشفرة</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-pink-500/30 text-pink-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>كود الخصم CYBER70 (-70%)</span>
              </span>
            </div>
          </div>

          {/* Quick Links: Services (1 col) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">الخدمات السبع</h4>
            <ul className="space-y-2 text-xs">
              {CYBER_SERVICES.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    onClick={() => playCyberSound("click")}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#pricing-comparison"
                  onClick={() => playCyberSound("click")}
                  className="hover:text-cyan-400 transition-colors text-cyan-300 font-bold"
                >
                  جدول مقارنة الأسعار
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={() => playCyberSound("click")}
                  className="hover:text-yellow-400 transition-colors text-yellow-300 font-bold"
                >
                  آراء وتقييمات العملاء
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links: Payment & Systems (1 col) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">طرق الدفع والأنظمة</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>المحافظ: 01554597494</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>المحافظ: 01094200285</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Coins className="w-3.5 h-3.5 text-pink-400" />
                <span>Binance USDT: BEP20/TRC20</span>
              </li>
              <li>
                <a
                  href="#payment-methods"
                  onClick={() => playCyberSound("click")}
                  className="hover:text-pink-400 transition-colors text-pink-300 font-bold"
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

          {/* Contact & Support (1 col) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">قنوات التواصل المباشر</h4>
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
                  className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" />
                  <span className="font-mono-tech dir-ltr">الدعم الفني: {contacts.techSupport}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>contact@cyberx.agency</span>
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
                <span>خوادم n8n Webhook متصلة</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: STRICT COPYRIGHT ONLY TO Eng. Ahmed Omar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="font-semibold text-slate-200">
            {contacts.copyrightNotice}
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono-tech text-slate-500">
            <span className="text-cyan-400">PAYMENTS: VODAFONE CASH &bull; ACCESS PAY &bull; BINANCE USDT</span>
            <span>&bull;</span>
            <span className="text-pink-400">PROMO: CYBER70 (-70%)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
