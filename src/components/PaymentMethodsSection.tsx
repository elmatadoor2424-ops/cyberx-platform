"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Coins,
  Copy,
  Check,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { CYBER_CONTACTS } from "@/lib/cyberData";
import { useCyberConfig } from "@/context/CyberConfigContext";
import { playCyberSound } from "@/lib/cyberEffects";

export default function PaymentMethodsSection() {
  const { contacts: dynamicContacts } = useCyberConfig();
  const contacts = dynamicContacts || CYBER_CONTACTS;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playCyberSound("success");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section id="payment-methods" className="py-20 relative overflow-hidden bg-[#0B0F19] border-t border-slate-800">
      {/* Background Soft Neon Gradients */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-pink-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <CreditCard className="w-3.5 h-3.5" />
            <span>بوابات الدفع وقنوات التواصل الرسمية • OFFICIAL PAYMENT &amp; CHANNELS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white">
            طرق الدفع المعتمدة{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
              وقنوات التواصل المباشر
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            نوفر لعملائنا في مصر والدول العربية أسهل وأأمن طرق السداد الرقمي عبر المحافظ الإلكترونية وعملة USDT المشفرة عبر منصة Binance، مع تأكيد فوري وسند رسمي.
          </p>
        </div>

        {/* 3 Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Electronic Wallets (فودافون كاش، أكسيس باي) */}
          <div className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(0,240,255,0.1)] group hover:border-cyan-400 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold">
                  MOBILE WALLETS
                </span>
              </div>

              <h3 className="text-lg font-black text-white mb-2">
                المحافظ الإلكترونية الذكية
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                سداد فوري وسهل عبر <strong className="text-cyan-300">فودافون كاش</strong> و<strong className="text-cyan-300">أكسيس باي</strong> على الرقمين الرسميين لشركة CyberX:
              </p>

              {/* Wallet Numbers */}
              <div className="space-y-3 mb-6">
                {contacts.paymentWallets.map((wallet, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between group-hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="text-[10px] text-slate-400">{wallet.name}</div>
                      <div className="font-mono-tech font-extrabold text-base text-cyan-300 tracking-wider dir-ltr" dir="ltr">
                        {wallet.number}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(wallet.number, `wallet-${idx}`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 text-xs font-bold transition-all border border-slate-700 hover:border-transparent flex items-center gap-1.5 cursor-pointer"
                      title="نسخ الرقم"
                    >
                      {copiedKey === `wallet-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[11px]">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">نسخ</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>تأكيد الإيداع وإصدار السند فورياً بعد التحويل</span>
            </div>
          </div>

          {/* Card 2: Cryptocurrency (USDT via Binance Wallet) */}
          <div className="rounded-3xl bg-[#0F172A] border border-pink-500/30 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(255,0,127,0.1)] group hover:border-pink-400 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-pink-500/10 border border-pink-500/40 text-pink-400">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-slate-900 border border-pink-500/30 text-pink-300 font-bold">
                  BINANCE USDT
                </span>
              </div>

              <h3 className="text-lg font-black text-white mb-2">
                العملات الرقمية المشفرة (USDT)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                سداد دولي آمن وسريع عبر محفظة <strong className="text-pink-300">Binance</strong> الرسمية بعملة USDT المستقرة:
              </p>

              {/* USDT Details */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">المنصة والشبكات:</span>
                  <span className="font-mono-tech font-bold text-pink-400">Binance (BEP20 / TRC20 / ERC20)</span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold">
                    Wallet Address (USDT):
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 font-mono-tech text-[11px] text-cyan-300 break-all select-all dir-ltr" dir="ltr">
                    {contacts.usdtBinanceAddress}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(contacts.usdtBinanceAddress, "usdt")}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-pink-600 text-pink-300 hover:text-white border border-pink-500/40 hover:border-transparent text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(255,0,127,0.2)]"
                >
                  {copiedKey === "usdt" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>تم نسخ عنوان محفظة Binance بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ عنوان محفظة Binance (USDT)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
              <span>تحويل مباشر عبر منصة Binance بدون تأخير</span>
            </div>
          </div>

          {/* Card 3: Direct Contacts & Tech Support */}
          <div className="rounded-3xl bg-[#0F172A] border border-emerald-500/30 p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(16,185,129,0.1)] group hover:border-emerald-400 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 font-bold">
                  24/7 SUPPORT
                </span>
              </div>

              <h3 className="text-lg font-black text-white mb-2">
                قنوات التواصل والدعم الفني
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                تواصل مباشر وفوري مع مهندسي CyberX وإدارة الأعمال لطلب الاستشارات وتأكيد الحجوزات:
              </p>

              {/* Contacts buttons */}
              <div className="space-y-3 mb-6">
                {/* WhatsApp */}
                <a
                  href={contacts.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-950/90 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between transition-all group/wa"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">الواتساب المباشر للطلبات</div>
                      <div className="font-mono-tech font-extrabold text-sm text-white group-hover/wa:text-emerald-400 transition-colors dir-ltr" dir="ltr">
                        {contacts.whatsapp}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">محادثة ⚡</span>
                </a>

                {/* Tech Support */}
                <a
                  href={contacts.techSupportWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-950/90 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between transition-all group/tech"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">الدعم الفني المباشر</div>
                      <div className="font-mono-tech font-extrabold text-sm text-white group-hover/tech:text-cyan-400 transition-colors dir-ltr" dir="ltr">
                        {contacts.techSupport}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-400 font-bold">تواصل 🔧</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>فريق المهندس أحمد عمر وكارما متاح 24/7 للرد الفوري</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
