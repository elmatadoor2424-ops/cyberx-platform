"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Copy, Check, Clock, Zap, MessageCircle } from "lucide-react";
import { fireCyberConfetti, playCyberSound } from "@/lib/cyberEffects";
import { CYBER_CONTACTS } from "@/lib/cyberData";

interface CountdownBannerProps {
  onApplyCoupon?: (code: string) => void;
}

export default function CountdownBanner({ onApplyCoupon }: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 23, minutes: 59, seconds: 59 });

  const [copied, setCopied] = useState(false);

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

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("CYBER70");
    setCopied(true);
    playCyberSound("success");
    fireCyberConfetti();
    if (onApplyCoupon) onApplyCoupon("CYBER70");

    setTimeout(() => setCopied(false), 2500);
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#0F172A] via-[#1A1A3A] to-[#0F172A] border-b border-cyan-500/25 text-white text-sm py-2 px-3 scanline-effect shadow-[0_4px_20px_rgba(0,240,255,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Urgent Announcement */}
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="bg-gradient-to-r from-cyan-400 via-white to-pink-400 bg-clip-text text-transparent font-extrabold">
            عرض أول 24 ساعة من CyberX:
          </span>
          <span className="text-slate-300 hidden md:inline">
            احصل على خصم فوري بقيمة <strong className="text-pink-400 font-extrabold">70%</strong> بالجنيه المصري (EGP) والدولار (USD)!
          </span>
        </div>

        {/* 24 Hours Countdown Engine */}
        <div className="flex items-center gap-2 bg-slate-950/90 px-3 py-1 rounded-full border border-cyan-500/35">
          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-xs text-slate-400">ينتهي العرض خلال:</span>
          <div className="font-mono-tech font-bold text-xs text-cyan-300 flex items-center gap-1 tracking-wider dir-ltr" dir="ltr">
            <span className="bg-slate-900 px-1.5 py-0.5 rounded text-white border border-cyan-500/30">{pad(timeLeft.hours)}</span>
            <span>:</span>
            <span className="bg-slate-900 px-1.5 py-0.5 rounded text-white border border-cyan-500/30">{pad(timeLeft.minutes)}</span>
            <span>:</span>
            <span className="bg-slate-900 px-1.5 py-0.5 rounded text-pink-400 border border-pink-500/30">{pad(timeLeft.seconds)}</span>
          </div>
        </div>

        {/* Coupon Code Pill & Copy Button & WhatsApp Direct */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900/90 border border-dashed border-pink-500/60 rounded-lg px-2.5 py-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span className="text-xs text-slate-400">الكود:</span>
            <code className="font-mono-tech font-extrabold text-pink-400 tracking-wider">CYBER70</code>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all active:scale-95 cursor-pointer"
            title="نسخ كود الخصم وتطبيقه"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-950 stroke-[3]" />
                <span>تم النسخ والتفعيل!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ وتفعيل 70%</span>
              </>
            )}
          </button>

          <a
            href={CYBER_CONTACTS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-bold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>01094200285</span>
          </a>
        </div>
      </div>
    </div>
  );
}
