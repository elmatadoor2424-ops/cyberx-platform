"use client";

import React from "react";
import Image from "next/image";
import { CYBER_TEAM } from "@/lib/cyberData";
import { useCyberConfig } from "@/context/CyberConfigContext";
import { Bot, UserCheck, Briefcase, Sparkles, MessageSquare, ArrowLeft, Radio, ShieldAlert, Award } from "lucide-react";
import { playCyberSound } from "@/lib/cyberEffects";

interface TeamSectionProps {
  onOpenAiBot: () => void;
  onSelectTeamMember: (memberName: string) => void;
}

export default function TeamSection({ onOpenAiBot, onSelectTeamMember }: TeamSectionProps) {
  const { team: dynamicTeam } = useCyberConfig();
  const teamList = dynamicTeam && dynamicTeam.length > 0 ? dynamicTeam : CYBER_TEAM;

  const handleAction = (member: (typeof CYBER_TEAM)[0]) => {
    playCyberSound("click");
    if (member.isBot) {
      onOpenAiBot();
    } else {
      onSelectTeamMember(member.name);
      const regSection = document.getElementById("register");
      if (regSection) {
        regSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#0A0E1A] border-t border-b border-slate-800/80">
      {/* Background Soft Neon Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>قيادة الرؤية السيبرانية والنمو • CYBERX LEADERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            فريق{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent">
              CyberX النخبوي
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            قيادة تكنولوجية واستراتيجية تجمع بين أعلى كفاءات الأمن السيبراني والذكاء الاصطناعي وإدارة الأعمال، لبناء منظومات تقنية تحمي شركتك وتضاعف أرباحك.
          </p>
        </div>

        {/* Team Cards Grid: Eng. Ahmed Omar, Karma, CyberX AI Assistant */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamList.map((member) => {
            const isCyan = member.accent === "cyan";
            const isMagenta = member.accent === "magenta";
            const isDual = member.accent === "dual";

            return (
              <div
                key={member.id}
                className={`group relative rounded-3xl bg-[#0F172A] border transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                  isCyan
                    ? "border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]"
                    : isMagenta
                    ? "border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_30px_rgba(255,0,127,0.25)]"
                    : "border-purple-500/40 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(0,240,255,0.3)]"
                }`}
              >
                {/* Top Subtle Glow Line */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${
                    isCyan
                      ? "from-cyan-500 to-blue-600"
                      : isMagenta
                      ? "from-pink-500 to-purple-600"
                      : "from-cyan-400 via-purple-500 to-pink-500"
                  }`}
                />

                <div className="p-6 flex-1 flex flex-col">
                  {/* Portrait Image Container */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Status Pill Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      {member.isBot ? (
                        <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)] text-[11px] font-mono-tech font-bold text-emerald-400">
                          <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                          <span>AI LIVE 24/7 (0.2s)</span>
                        </div>
                      ) : member.id === "founder" ? (
                        <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/50 text-[11px] font-mono-tech font-bold text-cyan-300">
                          <ShieldAlert className="w-3 h-3 text-cyan-400" />
                          <span>FOUNDER &amp; CEO</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-pink-500/50 text-[11px] font-mono-tech font-bold text-pink-300">
                          <Award className="w-3 h-3 text-pink-400" />
                          <span>BUSINESS MANAGER</span>
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-75"></div>
                  </div>

                  {/* Header Titles */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                        {member.name}
                      </h3>
                      {member.isBot ? (
                        <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-slate-400" />
                      )}
                    </div>

                    <div className="text-xs font-bold text-cyan-400">
                      {member.arabicRole}
                    </div>
                    <div className="text-[11px] font-mono-tech text-slate-500" dir="ltr">
                      {member.role}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Quote */}
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs italic text-slate-400 mb-6 relative">
                    &ldquo;{member.quote}&rdquo;
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-800/80 my-auto text-center">
                    {member.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="font-mono-tech font-bold text-xs sm:text-sm text-white">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleAction(member)}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 active:scale-95 cursor-pointer ${
                      member.isBot
                        ? "bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-slate-950 font-black shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                        : isCyan
                        ? "bg-slate-900 hover:bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                        : "bg-slate-900 hover:bg-pink-950/60 text-pink-300 border border-pink-500/40 hover:border-pink-400 shadow-[0_0_12px_rgba(255,0,127,0.15)]"
                    }`}
                  >
                    {member.isBot ? (
                      <MessageSquare className="w-4 h-4 text-slate-950" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{member.actionText}</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
