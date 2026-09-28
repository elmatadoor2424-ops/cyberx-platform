"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Bot,
  X,
  Send,
  Sparkles,
  Percent,
  Radio,
  User,
  ExternalLink,
  CreditCard,
  PhoneCall,
} from "lucide-react";
import { QUICK_QUESTIONS, CYBER_CONTACTS } from "@/lib/cyberData";
import { playCyberSound } from "@/lib/cyberEffects";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  action?: {
    label: string;
    targetId: string;
  };
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (serviceTitle: string) => void;
}

export default function AIChatModal({
  isOpen,
  onClose,
}: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-0",
      sender: "bot",
      text: "أهلاً بك! أنا روبوت الذكاء الاصطناعي المساعد لشركة CyberX 🤖 تحت إشراف المهندس أحمد عمر (خبير الأمن السيبراني وباحث الدكتوراه في الـ AI) والأستاذة كارما (مديرة الأعمال). كيف يمكنني خدمتك اليوم بخصوص الأسعار بالجنيه والدولار، تفعيل خصم 70%، أو طرق الدفع؟",
      time: "الآن",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    playCyberSound("click");

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    // AI intelligent answer generation logic
    setTimeout(() => {
      let botResponse = "";
      let actionObj: Message["action"] | undefined = undefined;

      const lower = text.toLowerCase();

      if (lower.includes("دفع") || lower.includes("تحويل") || lower.includes("فودافون") || lower.includes("أكسيس") || lower.includes("محفظة") || lower.includes("usdt") || lower.includes("binance")) {
        botResponse =
          `طرق الدفع المعتمدة في CyberX:\n1. المحافظ الإلكترونية (فودافون كاش، أكسيس باي) على الرقمين المعتمدين:\n   • 01554597494\n   • 01094200285\n2. العملات المشفرة USDT عبر محفظة Binance الرسمية:\n   Wallet Address: ${CYBER_CONTACTS.usdtBinanceAddress}\n(الشبكات: BEP20 / TRC20 / ERC20).\nجميع الحسابات مؤكدة وتصدر لك إيصالاً وسنداً رسمياً فور الإيداع.`;
        actionObj = { label: "استعراض قسم طرق الدفع", targetId: "payment-methods" };
      } else if (lower.includes("أحمد عمر") || lower.includes("المؤسس") || lower.includes("احمد عمر") || lower.includes("دكتوراه") || lower.includes("امن")) {
        botResponse =
          "يقود CyberX المهندس أحمد عمر (Eng. Ahmed Omar - Founder & CEO)، وهو خبير أمن معلومات وأنظمة سيبرانية متقدمة وباحث دكتوراه في الذكاء الاصطناعي، يركز على بناء حلول برمجية مؤتمتة ومقاومة للاختراق وفق أحدث المعايير الدولية.";
        actionObj = { label: "التعرف على فريق CyberX", targetId: "team" };
      } else if (lower.includes("كارما") || lower.includes("karma") || lower.includes("مديرة") || lower.includes("اعمال")) {
        botResponse =
          "الأستاذة كارما (Karma) هي مديرة الأعمال وتطوير الشراكات في CyberX، تتولى التخطيط التجاري وعقود المشاريع وضمان تحقيق أعلى عائد استثماري لشركائنا في الحملات والبرمجيات.";
        actionObj = { label: "التعرف على كارما وفريق العمل", targetId: "team" };
      } else if (lower.includes("واتساب") || lower.includes("تواصل") || lower.includes("رقم") || lower.includes("دعم")) {
        botResponse =
          `يمكنك التواصل معنا مباشرة:\n- الواتساب المباشر للطلبات: ${CYBER_CONTACTS.whatsapp}\n- الدعم الفني المباشر: ${CYBER_CONTACTS.techSupport}\nفريقنا متواجد على مدار الساعة للرد على استفسارك.`;
        actionObj = { label: "بدء محادثة واتساب الآن", targetId: "payment-methods" };
      } else if (lower.includes("خصم") || lower.includes("70") || lower.includes("cyber70") || lower.includes("كود") || lower.includes("سعر")) {
        botResponse =
          "كود الخصم الحصري هو CYBER70! يمنحك خصماً مباشراً بنسبة 70% على جميع الخدمات السبع والباقات المجمعة في أول 24 ساعة من زيارتك. يمكنك استعراض جدول المقارنة الثلاثي لرؤية الفرق بين سعر السوق وسعرنا بالجنيه المصري والدولار.";
        actionObj = { label: "عرض جدول مقارنة الأسعار", targetId: "pricing-comparison" };
      } else if (lower.includes("باقة") || lower.includes("باقات") || lower.includes("bulk") || lower.includes("مجمع")) {
        botResponse =
          "نوفر باقات عروض خاصة مجمعة (Bulk Offers) لكل خدمة توفر لك حتى 80% مقارنة بشراء كل بند منفرداً، مثل باقة المنصة الشاملة، باقة الإنتاج السينمائي الضخم، وباقة أتمتة الواتساب الفائقة.";
        actionObj = { label: "مشاهدة باقات العروض الخاصة", targetId: "pricing-comparison" };
      } else {
        botResponse = `بخصوص "${text}"؛ فريق المهندس أحمد عمر وكارما يقدم لك حلاً تقنياً وتسويقياً فائق التطور مع تطبيق كود خصم 70% CYBER70 فوراً بالجنيه المصري أو الدولار. هل تود تثبيت الخصم وحجز الخدمة الآن؟`;
        actionObj = { label: "تسجيل الطلب الآن", targetId: "register" };
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        action: actionObj,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playCyberSound("beep");
    }, 600);
  };

  const handleActionClick = (targetId: string) => {
    onClose();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-[650px] max-h-[90vh] rounded-3xl bg-[#0F172A] border border-cyan-500/40 flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden scanline-effect">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/95 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-cyan-400 bg-slate-900 shrink-0">
              <Image
                src="/bot.png"
                alt="CyberX AI Bot"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-base">CyberX AI Bot</h3>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  REALTIME 0.2s
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono-tech">
                <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                <span>متصل الآن • أسعار EGP/USD وكود CYBER70</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberSound("click");
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => {
            const isBot = m.sender === "bot";
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isBot ? "items-start" : "items-start flex-row-reverse"}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                    isBot
                      ? "bg-cyan-500/10 border border-cyan-500/40 text-cyan-400"
                      : "bg-pink-500/10 border border-pink-500/40 text-pink-400"
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? "bg-slate-900/90 border border-slate-800 text-slate-100 shadow-md"
                      : "bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-[0_0_15px_rgba(255,0,127,0.25)]"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Attached Action Button */}
                  {m.action && (
                    <button
                      onClick={() => handleActionClick(m.action!.targetId)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_12px_rgba(0,240,255,0.3)] hover:bg-cyan-300 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{m.action.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}

                  <div
                    className={`text-[10px] mt-1.5 font-mono-tech ${
                      isBot ? "text-slate-500 text-left" : "text-pink-200 text-left"
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono-tech">
              <Bot className="w-4 h-4 animate-bounce" />
              <span>CyberX AI Assistant يقوم بصياغة الرد...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Questions Chips */}
        <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[11px] text-slate-400 font-bold shrink-0">استفسارات سريعة:</span>
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="اسأل الروبوت (عن الأسعار، الباقات المجمعة، طرق الدفع فودافون كاش وUSDT...)"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
