"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center text-slate-100 font-sans">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#00FF66]/30 flex items-center justify-center shadow-lg">
          <ShieldCheck className="w-8 h-8 text-[#00FF66] animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <span className="text-xs font-mono-tech text-[#00FF66] tracking-widest animate-pulse">
          CYBERX // LOADING COMMAND PORTAL...
        </span>
      </div>
    </div>
  );
}
