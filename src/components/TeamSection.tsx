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
    <section id="team" className="py-24 relative overflow-hidden bg-[#000000] border-t border-b border-[#00FF66]/30">
      {/* Background Soft Neon Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00FF66]/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00FF66]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-[#00FF66]/30 text-[#00FF66] text-xs font-bold shadow-sm">
            <UserCheck className="w-3.5 h-3.5 text-[#00FF66]" />
            <span>قيادة الرؤية السيبرانية والنمو • CYBERX LEADERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F8FAFC]">
            فريق{" "}
            <span className="bg-gradient-to-r from-[#00FF66] via-emerald-300 to-[#00CC55] bg-clip-text text-transparent">
              CyberX النخبوي
            </span>
          </h2>

          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            قيادة تكنولوجية واستراتيجية تجمع بين أعلى كفاءات الأمن السيبراني والذكاء الاصطناعي وإدارة الأعمال، لبناء منظومات تقنية تحمي شركتك وتضاعف أرباحك.
          </p>
        </div>

        {/* Team Cards Grid: Eng. Ahmed Omar, Karma, CyberX AI Assistant */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamList.map((member) => {
            return (
              <div
                key={member.id}
                className="group relative rounded-3xl bg-[#0A0A0A]/60 backdrop-blur-md border border-[#00FF66]/30 hover:border-[#00FF66]/40 hover:shadow-xl hover:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Glow Line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#00FF66] via-emerald-500 to-sky-400" />

                <div className="p-6 flex-1 flex flex-col">
                  {/* Portrait Image Container */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-[#000000] border border-[#00FF66]/30 group-hover:border-[#00FF66]/30 transition-colors">
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
                        <div className="flex items-center gap-1.5 bg-[#000000]/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/40 text-[11px] font-mono-tech font-bold text-emerald-400 shadow-sm">
                          <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                          <span>AI LIVE 24/7 (0.2s)</span>
                        </div>
                      ) : member.id === "founder" ? (
                        <div className="flex items-center gap-1.5 bg-[#000000]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#00FF66]/40 text-[11px] font-mono-tech font-bold text-[#00FF66] shadow-sm">
                          <ShieldAlert className="w-3 h-3 text-[#00FF66]" />
                          <span>FOUNDER &amp; CEO</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-[#000000]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#00FF66]/40 text-[11px] font-mono-tech font-bold text-[#00FF66] shadow-sm">
                          <Award className="w-3 h-3 text-[#00FF66]" />
                          <span>BUSINESS MANAGER</span>
                        </div>
                      )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-75"></div>
                  </div>

                  {/* Header Titles */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-[#F8FAFC] group-hover:text-[#00FF66] transition-colors">
                        {member.name}
                      </h3>
                      {member.isBot ? (
                        <Bot className="w-6 h-6 text-[#00FF66] animate-pulse" />
                      ) : (
                        <Briefcase className="w-5 h-5 text-[#94A3B8]" />
                      )}
                    </div>

                    <div className="text-xs font-bold text-[#00FF66]">
                      {member.arabicRole}
                    </div>
                    <div className="text-[11px] font-mono-tech text-[#94A3B8]" dir="ltr">
                      {member.role}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Quote */}
                  <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#00FF66]/30 text-xs italic text-[#94A3B8] mb-6 relative">
                    &ldquo;{member.quote}&rdquo;
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-[#00FF66]/30 my-auto text-center">
                    {member.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="font-mono-tech font-bold text-xs sm:text-sm text-[#F8FAFC]">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-[#94A3B8]">
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
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#0A0A0A] text-[#94A3B8] border border-[#00FF66]/30 font-medium"
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
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 active:scale-95 cursor-pointer bg-gradient-to-r from-[#00FF66] to-[#009944] hover:from-[#00FF66] hover:to-[#00CC55] text-white shadow-md shadow-[0_0_15px_rgba(0,255,102,0.2)]"
                  >
                    {member.isBot ? (
                      <MessageSquare className="w-4 h-4 text-white" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-yellow-300" />
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
