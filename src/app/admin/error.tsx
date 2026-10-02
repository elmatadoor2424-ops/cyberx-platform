"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin portal error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center p-4 text-slate-100 font-sans">
      <div className="max-w-md w-full rounded-3xl bg-[#0F172A] border border-red-500/50 p-8 text-center space-y-4 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/60 text-red-400 mb-2">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h2 className="text-xl font-black text-white">
          حدث خطأ أثناء تحميل لوحة الإدارة
        </h2>

        <p className="text-xs text-slate-400 leading-relaxed font-mono-tech">
          {error?.message || "يرجى التحقق من الاتصال بالخادم وإعادة المحاولة."}
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة ⚡</span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
