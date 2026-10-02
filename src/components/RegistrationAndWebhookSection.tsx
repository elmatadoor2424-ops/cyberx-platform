"use client";

import React, { useState } from "react";
import {
  Send,
  Sparkles,
  Percent,
  CheckCircle2,
  Terminal,
  Settings,
  MessageCircle,
  Clock,
  Radio,
  CreditCard,
} from "lucide-react";
import { CYBER_SERVICES, CYBER_CONTACTS } from "@/lib/cyberData";
import { playCyberSound, fireCyberConfetti } from "@/lib/cyberEffects";

interface RegistrationProps {
  selectedServiceTitle?: string;
  appliedDiscountCode?: string;
}

export default function RegistrationAndWebhookSection({
  selectedServiceTitle = "",
  appliedDiscountCode = "CYBER70",
}: RegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    service: selectedServiceTitle || CYBER_SERVICES[0].title,
    budget: "5,000 - 15,000 ج.م (~$100 - $300)",
    projectDetails: "",
    couponCode: appliedDiscountCode || "CYBER70",
  });

  const [customWebhookUrl, setCustomWebhookUrl] = useState("https://polite-snake-84.loca.lt/webhook/c59e6ab9-de89-4c7c-a02c-58869a44c0b3");
  const [showWebhookSettings, setShowWebhookSettings] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    leadId?: string;
    timestamp?: string;
    payload?: unknown;
    latencyMs?: number;
    message?: string;
  } | null>(null);

  // Sync if prop changes
  React.useEffect(() => {
    if (selectedServiceTitle) {
      setFormData((prev) => ({ ...prev, service: selectedServiceTitle }));
    }
  }, [selectedServiceTitle]);

  React.useEffect(() => {
    if (appliedDiscountCode) {
      setFormData((prev) => ({ ...prev, couponCode: appliedDiscountCode }));
    }
  }, [appliedDiscountCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playCyberSound("click");

    const startTime = performance.now();

    try {
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          forwardWebhookUrl: customWebhookUrl.trim() || undefined,
        }),
      });

      const latencyMs = Math.round(performance.now() - startTime);
      const data = await response.json();

      if (data.success) {
        playCyberSound("success");
        fireCyberConfetti();
        setSubmissionResult({
          success: true,
          leadId: data.leadId,
          timestamp: data.timestamp,
          payload: data.webhookPayload,
          latencyMs,
          message: data.message,
        });
      } else {
        playCyberSound("alarm");
        setSubmissionResult({
          success: false,
          message: data.message || "فشل إرسال البيانات إلى الـ Webhook",
          latencyMs,
        });
      }
    } catch (err: unknown) {
      playCyberSound("alarm");
      const latencyMs = Math.round(performance.now() - startTime);
      setSubmissionResult({
        success: false,
        message: err instanceof Error ? err.message : "تعذر الاتصال بالخادم",
        latencyMs,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCouponValid = formData.couponCode.trim().toUpperCase() === "CYBER70";

  return (
    <section id="register" className="py-24 relative overflow-hidden bg-[#0A0E1A] border-t border-slate-800">
      {/* Background Soft Neon Ambience */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-pink-500/10 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>نظام التسجيل الذكي وربط الـ Webhook • REALTIME LEAD PIPELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            سجّل مشروعك الآن وفعّل{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-white to-pink-500 bg-clip-text text-transparent">
              خصم الـ 70% الحصري
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            النموذج متصل بمحرك الـ Webhook الفوري لـ <span className="text-cyan-300 font-bold">n8n وأتمتة الواتساب</span>. سيتلقى فريق المهندس أحمد عمر وكارما إشعاراً في أجزاء من الثانية لتأكيد حجزك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 p-8 shadow-[0_0_30px_rgba(0,240,255,0.12)] relative scanline-effect">
              
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></span>
                  <span className="font-mono-tech text-xs text-slate-300 font-bold">
                    CYBERX // REGISTRATION FORM
                  </span>
                </div>

                {/* Webhook Config Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    playCyberSound("click");
                    setShowWebhookSettings(!showWebhookSettings);
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono-tech text-cyan-300 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Webhook n8n متصل</span>
                  </span>
                </button>
              </div>

              {/* Webhook Destination Settings */}
              {showWebhookSettings && (
                <div className="mb-6 p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-cyan-300">
                      رابط الـ Webhook المستهدف لإرسال البيانات (POST Target URL):
                    </label>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                      n8n Active (5678)
                    </span>
                  </div>
                  <input
                    type="url"
                    placeholder="https://polite-snake-84.loca.lt/webhook/c59e6ab9-de89-4c7c-a02c-58869a44c0b3"
                    value={customWebhookUrl}
                    onChange={(e) => setCustomWebhookUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-tech text-cyan-300 focus:outline-none focus:border-cyan-400 dir-ltr"
                    dir="ltr"
                  />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    * يتم إرسال طلب POST فوري يحمل كافة بيانات العميل (الاسم، رقم الواتساب، البريد الإلكتروني، الخدمة المطلوبة، الميزانية، وتفاصيل المشروع) إلى مسار الـ Webhook أعلاه وحفظه فورياً في لوحة الإدارة.
                  </p>
                </div>
              )}

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: محمد علي"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      رقم الواتساب مع مفتاح الدولة *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+20 10 9420 0285"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors dir-ltr text-right"
                    />
                  </div>
                </div>

                {/* Email & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      اسم الشركة أو النشاط التجاري
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: مطعم، عيادة، متجر، علامة تجارية..."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection from 7 Services or Bulk */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الخدمة المطلوبة من كتالوج الخدمات السبع *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {CYBER_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        0{s.number}. {s.title}
                      </option>
                    ))}
                    <optgroup label="باقات العروض الخاصة (Bulk Bundles)">
                      {CYBER_SERVICES.map((s) => (
                        <option key={`bulk-${s.id}`} value={`${s.title} - ${s.bulkOffer.title}`}>
                          ★ {s.bulkOffer.title}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Budget Selection (EGP / USD) */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الميزانية الاستثمارية التقريبية للمشروع
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="أقل من 5,000 ج.م (~$100)">أقل من 5,000 ج.م (~$100)</option>
                    <option value="5,000 - 15,000 ج.م (~$100 - $300)">5,000 - 15,000 ج.م (~$100 - $300) [موصى بها]</option>
                    <option value="15,000 - 35,000 ج.م (~$300 - $700)">15,000 - 35,000 ج.م (~$300 - $700) [شركات متوسطة]</option>
                    <option value="+35,000 ج.م (~+$700)">+35,000 ج.م (~+$700) [مؤسسات كبرى]</option>
                  </select>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    تفاصيل المشروع أو متطلباتك الخاصة
                  </label>
                  <textarea
                    rows={3}
                    placeholder="اكتب أهداف مشروعك، التحديات التي تواجهها، أو الميزات المحددة التي ترغب بإضافتها..."
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                {/* Discount Code Input Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-pink-500/40">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5" />
                      <span>كود الخصم الحصري (CYBER70):</span>
                    </label>
                    {isCouponValid && (
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>مفعّل بنجاح (-70%)</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.couponCode}
                      onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                      placeholder="CYBER70"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono-tech font-extrabold text-sm text-pink-400 uppercase tracking-widest focus:outline-none focus:border-pink-500 dir-ltr text-right"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, couponCode: "CYBER70" });
                        playCyberSound("success");
                        fireCyberConfetti();
                      }}
                      className="shrink-0 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300"
                    >
                      تطبيق كود 70%
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-pink-600 hover:from-cyan-400 hover:to-pink-500 text-slate-950 font-black text-base shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      <span>جاري إرسال البيانات للـ Webhook و n8n...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>إرسال الطلب فوراً وتفعيل خصم 70% ⚡</span>
                    </>
                  )}
                </button>

                {/* Payment Notice */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>طرق السداد المعتمدة: المحافظ الإلكترونية (فودافون كاش، أكسيس باي) على: 01554597494 - 01094200285 ومحفظة Binance USDT.</span>
                </div>
              </form>

            </div>
          </div>

          {/* Webhook & Lead Inspector Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Terminal Live Inspector Box */}
            <div className="rounded-3xl bg-[#0B0F19] border border-cyan-500/30 p-6 shadow-2xl scanline-effect font-mono-tech">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-bold">
                    CYBERX WEBHOOK INSPECTOR
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[10px] text-emerald-400">STATUS: READY</span>
                </div>
              </div>

              {/* Status Display */}
              {submissionResult ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div
                    className={`p-3 rounded-xl border text-xs ${
                      submissionResult.success
                        ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300"
                        : "bg-red-950/40 border-red-500/60 text-red-300"
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{submissionResult.success ? "HTTP 200 OK - SENT TO N8N" : "ERROR"}</span>
                      <span>{submissionResult.latencyMs}ms</span>
                    </div>
                    <p className="text-[11px] mt-1">{submissionResult.message}</p>
                  </div>

                  {submissionResult.leadId && (
                    <div className="space-y-1 text-xs">
                      <div className="text-slate-400">معرف العميل (Lead ID):</div>
                      <div className="text-pink-400 font-bold text-sm">
                        {submissionResult.leadId}
                      </div>
                    </div>
                  )}

                  {/* Formatted JSON Payload Preview */}
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-400">Webhook JSON Payload:</div>
                    <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 overflow-x-auto max-h-56 leading-relaxed dir-ltr text-left">
                      {JSON.stringify(submissionResult.payload, null, 2)}
                    </pre>
                  </div>

                  {/* WhatsApp Followup Button to 01094200285 */}
                  <a
                    href={`https://wa.me/201094200285?text=${encodeURIComponent(
                      `مرحباً CyberX، لقد قمت بتقديم طلب عبر الموقع برقم (${submissionResult.leadId}) للخدمة (${formData.service}) مع كود الخصم CYBER70.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>متابعة فورية عبر الواتساب (01094200285)</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-4 py-8 text-center text-slate-500">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    <Terminal className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    املأ نموذج التسجيل واضغط على &ldquo;إرسال الطلب&rdquo; لمشاهدة الـ Webhook Payload واستجابة خادم n8n في الوقت الفعلي هنا.
                  </div>
                  <div className="text-[11px] text-slate-600 font-mono-tech">
                    Endpoint: /api/webhook &bull; Protocol: JSON/REST
                  </div>
                </div>
              )}

            </div>

            {/* Direct Contacts Card */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>قنوات التواصل المباشر مع إدارة CyberX</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span>الواتساب المباشر للطلبات:</span>
                  <a href={CYBER_CONTACTS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-mono-tech text-cyan-400 font-bold dir-ltr">
                    {CYBER_CONTACTS.whatsapp}
                  </a>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span>الدعم الفني والأنظمة:</span>
                  <a href={CYBER_CONTACTS.techSupportWa} target="_blank" rel="noopener noreferrer" className="font-mono-tech text-emerald-400 font-bold dir-ltr">
                    {CYBER_CONTACTS.techSupport}
                  </a>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span>المحافظ (فودافون كاش / أكسيس باي):</span>
                  <span className="font-mono-tech text-pink-400 font-bold dir-ltr">
                    01554597494 - 01094200285
                  </span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span>محفظة Binance USDT:</span>
                  <span className="font-mono-tech text-cyan-300 font-bold text-[10px] dir-ltr">
                    0x4c9e11...071a
                  </span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
