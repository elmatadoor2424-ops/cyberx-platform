"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  KeyRound,
  User,
  LogOut,
  Sparkles,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertTriangle,
  Users,
  DollarSign,
  TrendingUp,
  CreditCard,
  Smartphone,
  Coins,
  MessageCircle,
  PhoneCall,
  Terminal,
  Upload,
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
  Eye,
  EyeOff,
  Radio,
  ExternalLink,
  Layers,
  Film,
  Camera,
  Bot,
  Package,
  Gift,
  HelpCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { playCyberSound, fireCyberConfetti } from "@/lib/cyberEffects";
import { LeadItem } from "@/lib/server/leadsStore";
import { SiteConfiguration } from "@/lib/server/configStore";

export default function AdminPortal() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminUser, setAdminUser] = useState<{ username: string; name: string; role: string; avatar: string } | null>(null);

  // Login form
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "pricing" | "media" | "payments">("overview");

  // Data states
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [config, setConfig] = useState<SiteConfiguration | null>(null);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Leads filters & search
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("all");
  const [selectedLeadForDetails, setSelectedLeadForDetails] = useState<LeadItem | null>(null);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    service: "الفيديوهات السينمائية الإعلانية (دقيقة كاملة 500 ج.م)",
    budget: "5,000 - 15,000 ج.م",
    projectDetails: "",
    couponCode: "CYBER70",
    status: "new" as LeadItem["status"],
    notes: "",
  });

  // Media upload tracker
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUploadCallbackRef = useRef<((url: string) => void) | null>(null);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/me");
      const data = await res.json();
      if (data.authenticated && data.user) {
        setIsAuthenticated(true);
        setAdminUser(data.user);
        loadDashboardData();
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const [leadsRes, configRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/config"),
      ]);
      const leadsData = await leadsRes.json();
      const configData = await configRes.json();

      if (leadsData.success && leadsData.leads) {
        setLeads(leadsData.leads);
      }
      if (configData.success && configData.config) {
        setConfig(configData.config);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmittingLogin(true);
    playCyberSound("click");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.trim(),
          password: passwordInput.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        playCyberSound("success");
        fireCyberConfetti();
        setIsAuthenticated(true);
        setAdminUser(data.user);
        loadDashboardData();
      } else {
        playCyberSound("alarm");
        setLoginError(data.message || "بيانات الدخول غير صحيحة");
      }
    } catch (err) {
      playCyberSound("alarm");
      setLoginError("تعذر الاتصال بخادم المصادقة");
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  const handleLogout = async () => {
    playCyberSound("click");
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {}
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const handleUpdateLeadStatus = async (leadId: string, status: LeadItem["status"], notes?: string) => {
    playCyberSound("click");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status, notes }),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
        if (selectedLeadForDetails?.id === leadId) {
          setSelectedLeadForDetails(data.lead);
        }
      }
    } catch (err) {
      console.error("Failed to update lead status:", err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العميل نهائياً من قاعدة البيانات؟")) return;
    playCyberSound("click");
    try {
      const res = await fetch(`/api/admin/leads?leadId=${leadId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (selectedLeadForDetails?.id === leadId) {
          setSelectedLeadForDetails(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  const handleAddManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    playCyberSound("click");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadForm),
      });
      const data = await res.json();
      if (data.success && data.lead) {
        playCyberSound("success");
        fireCyberConfetti();
        setLeads((prev) => [data.lead, ...prev]);
        setShowAddLeadModal(false);
        setNewLeadForm({
          fullName: "",
          phone: "",
          email: "",
          company: "",
          service: "الفيديوهات السينمائية الإعلانية (دقيقة كاملة 500 ج.م)",
          budget: "5,000 - 15,000 ج.م",
          projectDetails: "",
          couponCode: "CYBER70",
          status: "new",
          notes: "",
        });
      }
    } catch (err) {
      console.error("Failed to add manual lead:", err);
    }
  };

  const handleSaveConfig = async () => {
    if (!config) return;
    setIsSavingConfig(true);
    playCyberSound("click");
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success && data.config) {
        playCyberSound("success");
        fireCyberConfetti();
        setConfig(data.config);
        setSaveSuccessMessage("تم حفظ كافة التعديلات والأسعار بنجاح وتحديث الموقع المباشر فوراً! ⚡");
        setTimeout(() => setSaveSuccessMessage(null), 4000);
      }
    } catch (err) {
      playCyberSound("alarm");
      console.error("Failed to save config:", err);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const triggerFileUpload = (category: string, callback: (url: string) => void) => {
    currentUploadCallbackRef.current = callback;
    setUploadingTarget(category);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    playCyberSound("beep");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", uploadingTarget || "media");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        playCyberSound("success");
        if (currentUploadCallbackRef.current) {
          currentUploadCallbackRef.current(data.url);
        }
      } else {
        alert(data.message || "فشل رفع الصورة");
      }
    } catch (err) {
      alert("خطأ أثناء رفع الصورة");
    } finally {
      setUploadingTarget(null);
    }
  };

  const exportLeadsToCsv = () => {
    playCyberSound("click");
    const headers = ["معرف العميل", "الاسم", "رقم الهاتف", "البريد", "الشركة", "الخدمة", "الميزانية", "كود الخصم", "الحالة", "تاريخ التسجيل", "ملاحظات"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.company || ""}"`,
      `"${l.service}"`,
      `"${l.budget || ""}"`,
      `"${l.couponCode || ""}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
      `"${l.notes || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cyberx_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch) ||
      (lead.company && lead.company.toLowerCase().includes(leadSearch.toLowerCase())) ||
      lead.service.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.id.toLowerCase().includes(leadSearch.toLowerCase());

    const matchesStatus = leadStatusFilter === "all" || lead.status === leadStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center text-slate-100 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)]">
            <ShieldCheck className="w-8 h-8 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span className="text-xs font-mono-tech text-cyan-300 tracking-widest animate-pulse">
            CYBERX // CHECKING SECURE SESSION...
          </span>
        </div>
      </div>
    );
  }

  // 1. LOGIN GATE VIEW (When NOT Authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070A12] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[170px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-500/10 blur-[170px] rounded-full pointer-events-none"></div>

        {/* Hidden File Input for Image Uploads */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="relative w-full max-w-md bg-[#0F172A] border border-cyan-500/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] scanline-effect">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-950 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.3)] mb-2">
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono-tech font-bold text-cyan-400">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>CYBERX COMMAND CENTER // RESTRICTED ACCESS</span>
            </div>

            <h1 className="text-2xl font-black text-white">
              بوابة الإدارة للمهندس أحمد عمر
            </h1>

            <p className="text-xs text-slate-400 leading-relaxed">
              مسار تحكم سيبراني مغلق ومحمي. يرجى إدخال اسم المستخدم وكلمة المرور لتأكيد الصلاحيات والوصول للوحة التحكم.
            </p>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-500/60 text-red-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>اسم المستخدم (Admin Username)</span>
                <span className="font-mono-tech text-[10px] text-cyan-400">TLS 1.3</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="ahmed_omar"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono-tech dir-ltr text-right"
                  dir="ltr"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>كلمة المرور المشفرة (Password)</span>
                <span className="font-mono-tech text-[10px] text-pink-400">SHA-256 HMAC</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono-tech dir-ltr text-right"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingLogin}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-pink-600 hover:from-cyan-400 hover:to-pink-500 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmittingLogin ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق من التشفير...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>تسجيل الدخول إلى مركز القيادة ⚡</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Security Badge */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ENCRYPTED PORTAL</span>
            </span>
            <span>CYBERX v2.4 // 2026</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED EXECUTIVE DASHBOARD
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Hidden File Input for Image Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Top Cyber Navigation Bar for Admin */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Executive Badge */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <span className="font-mono-tech font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                CX
              </span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-white">
                  CYBER<span className="text-cyan-400">X</span> ADMIN
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono-tech text-cyan-300 font-bold">
                  COMMAND PORTAL
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                لوحة القيادة المركزية • <strong className="text-white">Eng. Ahmed Omar</strong>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* View Live Site Link */}
            <Link
              href="/"
              target="_blank"
              onClick={() => playCyberSound("click")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all"
            >
              <span>معاينة الموقع المباشر</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </Link>

            {/* Save Config CTA button if changes */}
            <button
              onClick={handleSaveConfig}
              disabled={isSavingConfig}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isSavingConfig ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>حفظ التعديلات فوراً ⚡</span>
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/40 transition-colors cursor-pointer"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Save Notification Banner */}
      {saveSuccessMessage && (
        <div className="bg-emerald-950/90 border-b border-emerald-500/50 py-3 px-4 text-center text-xs sm:text-sm font-bold text-emerald-300 flex items-center justify-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0F172A] border border-cyan-500/30">
          {[
            { id: "overview", label: "نظرة عامة وإحصائيات", icon: TrendingUp },
            { id: "leads", label: `العملاء والطلبات الواردة (${leads.length})`, icon: Users },
            { id: "pricing", label: "الخدمات والتسعير المباشر (7)", icon: DollarSign },
            { id: "media", label: "فريق العمل ومعرض السكرينات", icon: Camera },
            { id: "payments", label: "بوابات الدفع والتواصل", icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playCyberSound("click");
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.3)] font-black"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Leads */}
              <div className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-slate-900 text-cyan-300 font-bold border border-cyan-500/30">
                    REALTIME
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-400">إجمالي طلبات العملاء المسجلين</div>
                  <div className="font-mono-tech font-black text-3xl text-white mt-1">
                    {leads.length} <span className="text-xs text-slate-500 font-normal">عميل</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center justify-between">
                  <span>جدد بحاجة لمتابعة:</span>
                  <strong className="font-mono-tech">{leads.filter((l) => l.status === "new").length}</strong>
                </div>
              </div>

              {/* Card 2: Services Count */}
              <div className="rounded-3xl bg-[#0F172A] border border-pink-500/30 p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(255,0,127,0.1)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/30">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-slate-900 text-pink-300 font-bold border border-pink-500/30">
                    7 SERVICES
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-400">الخدمات الأساسية النشطة</div>
                  <div className="font-mono-tech font-black text-3xl text-white mt-1">
                    {config?.services.length || 7} <span className="text-xs text-slate-500 font-normal">خدمة</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-pink-400 flex items-center justify-between">
                  <span>عروض خاصة مفعلة:</span>
                  <strong className="font-mono-tech">7 باقات مجمعة</strong>
                </div>
              </div>

              {/* Card 3: Binance & Payment Status */}
              <div className="rounded-3xl bg-[#0F172A] border border-purple-500/30 p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    <Coins className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-slate-900 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    ONLINE
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-400">بوابات السداد المعتمدة</div>
                  <div className="font-mono-tech font-bold text-lg text-white mt-1">
                    فودافون كاش &bull; أكسيس &bull; USDT
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>محفظة Binance:</span>
                  <span className="text-cyan-400 font-mono-tech text-[10px]">0x4c9e11...071a</span>
                </div>
              </div>

              {/* Card 4: Webhook & AI Bot Status */}
              <div className="rounded-3xl bg-[#0F172A] border border-emerald-500/30 p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Bot className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono-tech px-2.5 py-1 rounded-full bg-slate-900 text-cyan-300 font-bold border border-cyan-500/30">
                    n8n CONNECTED
                  </span>
                </div>
                <div>
                  <div className="text-xs text-slate-400">CyberX AI Bot &amp; Webhook</div>
                  <div className="font-mono-tech font-black text-2xl text-emerald-400 mt-1">
                    99.9% جاهزية
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>زمن استجابة الروبوت:</span>
                  <strong className="text-cyan-300 font-mono-tech">0.2s</strong>
                </div>
              </div>

            </div>

            {/* Quick Actions Strip */}
            <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-base">
                  مرحباً بك مهندس أحمد عمر في مركز التحكم
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  يمكنك مراجعة كافة الطلبات اللحظية، وتعديل أسعار الكتالوج، وإدارة صور الفريق فورياً.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة عميل يدوياً</span>
                </button>

                <button
                  onClick={() => setActiveTab("pricing")}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>تعديل الأسعار</span>
                </button>

                <button
                  onClick={exportLeadsToCsv}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير الطلبات CSV</span>
                </button>
              </div>
            </div>

            {/* Recent 3 Leads preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>أحدث طلبات العملاء المسجلين</span>
                </h3>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>عرض الكل ({leads.length})</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {leads.slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono-tech text-cyan-400 font-bold">{lead.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            lead.status === "closed"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                              : lead.status === "contacting"
                              ? "bg-yellow-950 text-yellow-300 border border-yellow-500/40"
                              : "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                          }`}
                        >
                          {lead.status === "closed"
                            ? "تم التعاقد"
                            : lead.status === "contacting"
                            ? "قيد التواصل"
                            : "طلب جديد"}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-white text-base mb-1">{lead.fullName}</h4>
                      <div className="text-xs text-slate-400 mb-2">{lead.company || "بدون شركة"}</div>
                      <div className="text-xs text-pink-300 font-medium mb-3">{lead.service}</div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <a
                        href={`https://wa.me/2${lead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>محادثة واتساب</span>
                      </a>
                      <span className="text-[10px] font-mono-tech text-slate-500">
                        {new Date(lead.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LEADS & PIPELINE MANAGEMENT */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Controls Bar */}
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم، رقم الهاتف، اسم الشركة، أو الخدمة..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-bold">الحالة:</span>
                {[
                  { id: "all", label: "الكل" },
                  { id: "new", label: "جديد" },
                  { id: "contacting", label: "قيد التواصل" },
                  { id: "closed", label: "تم التعاقد" },
                  { id: "cancelled", label: "ملغي" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setLeadStatusFilter(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      leadStatusFilter === s.id
                        ? "bg-cyan-500 text-slate-950 font-black shadow-sm"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.25)] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة عميل</span>
                </button>

                <button
                  onClick={exportLeadsToCsv}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  title="تصدير لملف Excel/CSV"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير</span>
                </button>
              </div>

            </div>

            {/* Leads Table */}
            <div className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono-tech">
                      <th className="py-4 px-4 text-right">المعرف والتاريخ</th>
                      <th className="py-4 px-4 text-right">بيانات العميل والنشاط</th>
                      <th className="py-4 px-4 text-right">رقم الهاتف والتواصل</th>
                      <th className="py-4 px-4 text-right">الخدمة المطلوبة</th>
                      <th className="py-4 px-4 text-right">الميزانية والكود</th>
                      <th className="py-4 px-4 text-center">حالة الطلب</th>
                      <th className="py-4 px-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredLeads.length > 0 ? (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-900/60 transition-colors">
                          {/* ID & Date */}
                          <td className="py-3.5 px-4 font-mono-tech">
                            <div className="font-extrabold text-cyan-400">{lead.id}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {new Date(lead.createdAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                              {" • "}
                              {new Date(lead.createdAt).toLocaleDateString("ar-EG")}
                            </div>
                          </td>

                          {/* Name & Company */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm">{lead.fullName}</div>
                            {lead.company && (
                              <div className="text-[11px] text-slate-400 mt-0.5">{lead.company}</div>
                            )}
                            {lead.email && (
                              <div className="text-[10px] text-slate-500 font-mono-tech">{lead.email}</div>
                            )}
                          </td>

                          {/* Phone & WhatsApp link */}
                          <td className="py-3.5 px-4 font-mono-tech">
                            <div className="text-white font-bold dir-ltr" dir="ltr">
                              {lead.phone}
                            </div>
                            <a
                              href={`https://wa.me/2${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `مرحباً ${lead.fullName}، معك المهندس أحمد عمر وفريق عمل CyberX بخصوص طلبك للخدمة (${lead.service}). كيف يمكننا خدمتك؟`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-bold mt-1"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>مراسلة واتساب</span>
                            </a>
                          </td>

                          {/* Service */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-pink-300 max-w-xs">{lead.service}</div>
                            {lead.projectDetails && (
                              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                                {lead.projectDetails}
                              </p>
                            )}
                          </td>

                          {/* Budget & Coupon */}
                          <td className="py-3.5 px-4">
                            <div className="text-slate-300">{lead.budget || "مرن"}</div>
                            {lead.couponCode && (
                              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-pink-950/70 border border-pink-500/40 text-pink-300 text-[10px] font-mono-tech font-bold">
                                {lead.couponCode} (-70%)
                              </span>
                            )}
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-4 text-center">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateLeadStatus(lead.id, e.target.value as LeadItem["status"])
                              }
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                                lead.status === "closed"
                                  ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/50"
                                  : lead.status === "contacting"
                                  ? "bg-yellow-950/90 text-yellow-300 border-yellow-500/50"
                                  : lead.status === "cancelled"
                                  ? "bg-red-950/90 text-red-300 border-red-500/50"
                                  : "bg-cyan-950/90 text-cyan-300 border-cyan-500/50"
                              }`}
                            >
                              <option value="new">طلب جديد 🔵</option>
                              <option value="contacting">قيد التواصل 🟡</option>
                              <option value="closed">تم التعاقد 🟢</option>
                              <option value="cancelled">ملغي 🔴</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => setSelectedLeadForDetails(lead)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-cyan-950 text-cyan-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                                title="عرض التفاصيل والملاحظات"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-red-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                                title="حذف العميل"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          لا توجد نتائج مطابقة لخيارات البحث الحالية
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES & PRICING ENGINE */}
        {activeTab === "pricing" && config && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                  <span>إدارة أسعار الخدمات السبع وباقات العروض المجمعة فورياً</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  أي تعديل تدخله هنا يتم حفظه وتطبيقه مباشرة على الواجهة الرئيسية وجدول المقارنة والحاسبة.
                </p>
              </div>

              <button
                onClick={handleSaveConfig}
                disabled={isSavingConfig}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات فوراً ⚡</span>
              </button>
            </div>

            {/* List of 7 Services */}
            <div className="space-y-6">
              {config.services.map((service, idx) => (
                <div
                  key={service.id}
                  className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 p-6 space-y-5 shadow-lg"
                >
                  {/* Service Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/40 flex items-center justify-center font-mono-tech font-bold text-cyan-400 text-sm">
                        0{service.number}
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-white">{service.title}</h4>
                        <div className="text-xs font-mono-tech text-slate-400">{service.englishTitle}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-400 font-bold">الشارة العلوية:</label>
                      <input
                        type="text"
                        value={service.badge}
                        onChange={(e) => {
                          const updated = [...config.services];
                          updated[idx].badge = e.target.value;
                          setConfig({ ...config, services: updated });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* 3-Way Prices Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Market Price */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <label className="block text-xs font-bold text-slate-400">سعر السوق / المنافسين</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-500">بالجنيه EGP:</span>
                          <input
                            type="number"
                            value={service.marketPriceEGP}
                            onChange={(e) => {
                              const updated = [...config.services];
                              updated[idx].marketPriceEGP = Number(e.target.value);
                              setConfig({ ...config, services: updated });
                            }}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-tech text-white"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500">بالدولار USD:</span>
                          <input
                            type="number"
                            value={service.marketPriceUSD}
                            onChange={(e) => {
                              const updated = [...config.services];
                              updated[idx].marketPriceUSD = Number(e.target.value);
                              setConfig({ ...config, services: updated });
                            }}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-tech text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CyberX Regular Price */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <label className="block text-xs font-bold text-cyan-300">سعر CyberX الطبيعي</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-slate-500">بالجنيه EGP:</span>
                          <input
                            type="number"
                            value={service.cyberxPriceEGP}
                            onChange={(e) => {
                              const updated = [...config.services];
                              updated[idx].cyberxPriceEGP = Number(e.target.value);
                              setConfig({ ...config, services: updated });
                            }}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-xs font-mono-tech text-cyan-300 font-bold"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500">بالدولار USD:</span>
                          <input
                            type="number"
                            value={service.cyberxPriceUSD}
                            onChange={(e) => {
                              const updated = [...config.services];
                              updated[idx].cyberxPriceUSD = Number(e.target.value);
                              setConfig({ ...config, services: updated });
                            }}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-xs font-mono-tech text-cyan-300 font-bold"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Flash Sale 70% Price */}
                    <div className="p-4 rounded-2xl bg-pink-950/20 border border-pink-500/40 space-y-2">
                      <label className="block text-xs font-bold text-pink-400">سعر الخصم 70% (كود CYBER70)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-pink-300">بالجنيه EGP:</span>
                          <input
                            type="number"
                            value={service.discountedPriceEGP}
                            onChange={(e) => {
                              const updated = [...config.services];
                              updated[idx].discountedPriceEGP = Number(e.target.value);
                              setConfig({ ...config, services: updated });
                            }}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-pink-500/50 text-xs font-mono-tech text-pink-300 font-black"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-pink-300">بالدولار USD:</span>
                          <input
                            type="number"
                            value={service.discountedPriceUSD}
                            onChange={(e) => {
                              const updated = [...config.services];
                              updated[idx].discountedPriceUSD = Number(e.target.value);
                              setConfig({ ...config, services: updated });
                            }}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-pink-500/50 text-xs font-mono-tech text-pink-300 font-black"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Special Gift / Note (e.g. 1000 contacts for WA) */}
                  <div>
                    <label className="block text-xs font-bold text-emerald-400 mb-1">
                      هدية الاشتراك أو الملاحظة البارزة:
                    </label>
                    <input
                      type="text"
                      value={service.specialGift || ""}
                      onChange={(e) => {
                        const updated = [...config.services];
                        updated[idx].specialGift = e.target.value;
                        setConfig({ ...config, services: updated });
                      }}
                      placeholder="مثال: هدية الاشتراك: 1,000 رقم داتا عملاء مستهدفة مجاناً لتجربة الحملات فوراً!"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-bold"
                    />
                  </div>

                  {/* Bulk Bundle Offer for this Service */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5 text-pink-400">
                        <Package className="w-3.5 h-3.5" />
                        <span>باقة العرض المجمع الخاصة (Bulk Bundle Offer):</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400">عنوان الباقة المجمعة:</span>
                        <input
                          type="text"
                          value={service.bulkOffer.title}
                          onChange={(e) => {
                            const updated = [...config.services];
                            updated[idx].bulkOffer.title = e.target.value;
                            setConfig({ ...config, services: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400">سعر الباقة (EGP):</span>
                        <input
                          type="number"
                          value={service.bulkOffer.priceEGP}
                          onChange={(e) => {
                            const updated = [...config.services];
                            updated[idx].bulkOffer.priceEGP = Number(e.target.value);
                            setConfig({ ...config, services: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-tech text-cyan-300 font-bold"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400">سعر الباقة (USD):</span>
                        <input
                          type="number"
                          value={service.bulkOffer.priceUSD}
                          onChange={(e) => {
                            const updated = [...config.services];
                            updated[idx].bulkOffer.priceUSD = Number(e.target.value);
                            setConfig({ ...config, services: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono-tech text-cyan-300 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom Save bar */}
            <div className="pt-4 flex items-center justify-end">
              <button
                onClick={handleSaveConfig}
                disabled={isSavingConfig}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات وتطبيقها على الموقع ⚡</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: TEAM & MEDIA MANAGEMENT */}
        {activeTab === "media" && config && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <span>إدارة فريق العمل، الصور الشخصية ومعرض سكرينات النتائج</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  ارفع صوراً جديدة مباشرة لم. أحمد عمر وكارما والمساعد الذكي، أو حدّث سكرينات إثبات الحملات.
                </p>
              </div>

              <button
                onClick={handleSaveConfig}
                disabled={isSavingConfig}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>حفظ الوسائط ⚡</span>
              </button>
            </div>

            {/* Section 1: Team Members */}
            <div className="space-y-4">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>أعضاء القيادة والـ Team (3)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {config.team.map((member, mIdx) => (
                  <div
                    key={member.id}
                    className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 p-6 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview & Upload Button */}
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 group">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              triggerFileUpload(`team_${member.id}`, (url) => {
                                const updatedTeam = [...config.team];
                                updatedTeam[mIdx].image = url;
                                setConfig({ ...config, team: updatedTeam });
                              })
                            }
                            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            <Upload className="w-4 h-4" />
                            <span>رفع صورة جديدة</span>
                          </button>
                        </div>
                      </div>

                      {/* Name & Roles */}
                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold">الاسم الرسمي:</label>
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => {
                              const updatedTeam = [...config.team];
                              updatedTeam[mIdx].name = e.target.value;
                              setConfig({ ...config, team: updatedTeam });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sm font-bold text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 font-bold">المسمى الوظيفي (عربي):</label>
                          <input
                            type="text"
                            value={member.arabicRole}
                            onChange={(e) => {
                              const updatedTeam = [...config.team];
                              updatedTeam[mIdx].arabicRole = e.target.value;
                              setConfig({ ...config, team: updatedTeam });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 font-bold">المسمى بالإنجليزية:</label>
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => {
                              const updatedTeam = [...config.team];
                              updatedTeam[mIdx].role = e.target.value;
                              setConfig({ ...config, team: updatedTeam });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono-tech text-slate-300 dir-ltr text-right"
                            dir="ltr"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 font-bold">النبذة التعريفية (Bio):</label>
                          <textarea
                            rows={3}
                            value={member.bio}
                            onChange={(e) => {
                              const updatedTeam = [...config.team];
                              updatedTeam[mIdx].bio = e.target.value;
                              setConfig({ ...config, team: updatedTeam });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300 resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        triggerFileUpload(`team_${member.id}`, (url) => {
                          const updatedTeam = [...config.team];
                          updatedTeam[mIdx].image = url;
                          setConfig({ ...config, team: updatedTeam });
                        })
                      }
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>تغيير صورة {member.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Proof Gallery (معرض إثباتات النتائج المباشرة) */}
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>معرض سكرينات إثبات الحملات والأرقام المباشرة (4)</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.proofCases.map((proof, pIdx) => (
                  <div
                    key={proof.id}
                    className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 p-6 space-y-4"
                  >
                    {/* Screenshot Preview */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
                      <Image
                        src={proof.image}
                        alt={proof.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() =>
                            triggerFileUpload(`proof_${proof.id}`, (url) => {
                              const updatedProofs = [...config.proofCases];
                              updatedProofs[pIdx].image = url;
                              setConfig({ ...config, proofCases: updatedProofs });
                            })
                          }
                          className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-1.5 cursor-pointer"
                        >
                          <Upload className="w-4 h-4" />
                          <span>رفع سكرين شوت جديد</span>
                        </button>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold">عنوان الحالة / الإثبات:</label>
                        <input
                          type="text"
                          value={proof.title}
                          onChange={(e) => {
                            const updatedProofs = [...config.proofCases];
                            updatedProofs[pIdx].title = e.target.value;
                            setConfig({ ...config, proofCases: updatedProofs });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold">التصنيف:</label>
                          <input
                            type="text"
                            value={proof.category}
                            onChange={(e) => {
                              const updatedProofs = [...config.proofCases];
                              updatedProofs[pIdx].category = e.target.value;
                              setConfig({ ...config, proofCases: updatedProofs });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-cyan-300"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold">قطاع العميل:</label>
                          <input
                            type="text"
                            value={proof.clientType}
                            onChange={(e) => {
                              const updatedProofs = [...config.proofCases];
                              updatedProofs[pIdx].clientType = e.target.value;
                              setConfig({ ...config, proofCases: updatedProofs });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-300"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          triggerFileUpload(`proof_${proof.id}`, (url) => {
                            const updatedProofs = [...config.proofCases];
                            updatedProofs[pIdx].image = url;
                            setConfig({ ...config, proofCases: updatedProofs });
                          })
                        }
                        className="w-full mt-2 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>تحديث لقطة الشاشة (Upload Screenshot)</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: PAYMENT GATEWAYS & CONTACTS */}
        {activeTab === "payments" && config && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span>تعديل حسابات الدفع المعتمدة وقنوات التواصل الرسمية</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  تحديث أرقام محافظ فودافون كاش وأكسيس باي، محفظة Binance USDT، وأرقام الدعم والواتساب.
                </p>
              </div>

              <button
                onClick={handleSaveConfig}
                disabled={isSavingConfig}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات ⚡</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Mobile Wallets */}
              <div className="rounded-3xl bg-[#0F172A] border border-cyan-500/30 p-6 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Smartphone className="w-4 h-4" />
                  <span>المحافظ الإلكترونية (فودافون كاش / أكسيس باي)</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold">رقم المحفظة 1:</label>
                    <input
                      type="text"
                      value={config.contacts.paymentWallets[0]?.number || "01554597494"}
                      onChange={(e) => {
                        const updated = { ...config.contacts };
                        updated.paymentWallets[0].number = e.target.value;
                        setConfig({ ...config, contacts: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono-tech text-cyan-300 font-bold dir-ltr text-right"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold">رقم المحفظة 2:</label>
                    <input
                      type="text"
                      value={config.contacts.paymentWallets[1]?.number || "01094200285"}
                      onChange={(e) => {
                        const updated = { ...config.contacts };
                        updated.paymentWallets[1].number = e.target.value;
                        setConfig({ ...config, contacts: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono-tech text-cyan-300 font-bold dir-ltr text-right"
                      dir="ltr"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  * تأكيد: تم حذف خيار انستاباي تماماً من كافة النماذج.
                </p>
              </div>

              {/* Box 2: Binance USDT Wallet */}
              <div className="rounded-3xl bg-[#0F172A] border border-pink-500/30 p-6 space-y-4">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
                  <Coins className="w-4 h-4" />
                  <span>محفظة Binance USDT (الدفع الدولي بالكريبتو)</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold">عنوان المحفظة (Wallet Address):</label>
                    <input
                      type="text"
                      value={config.contacts.usdtBinanceAddress}
                      onChange={(e) => {
                        const updated = { ...config.contacts, usdtBinanceAddress: e.target.value };
                        setConfig({ ...config, contacts: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono-tech text-cyan-300 font-bold dir-ltr text-right"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold">الشبكات المدعومة:</label>
                    <input
                      type="text"
                      value={config.contacts.usdtNetwork}
                      onChange={(e) => {
                        const updated = { ...config.contacts, usdtNetwork: e.target.value };
                        setConfig({ ...config, contacts: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono-tech text-pink-300 font-bold dir-ltr text-right"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Box 3: Official Direct Contacts */}
              <div className="rounded-3xl bg-[#0F172A] border border-emerald-500/30 p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <PhoneCall className="w-4 h-4" />
                  <span>قنوات التواصل المباشر مع العملاء</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 font-bold">رقم الواتساب المباشر للطلبات:</label>
                    <input
                      type="text"
                      value={config.contacts.whatsapp}
                      onChange={(e) => {
                        const updated = {
                          ...config.contacts,
                          whatsapp: e.target.value,
                          whatsappUrl: `https://wa.me/2${e.target.value.replace(/[^0-9]/g, "")}`,
                        };
                        setConfig({ ...config, contacts: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono-tech text-emerald-400 font-bold dir-ltr text-right"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold">رقم الدعم الفني المباشر:</label>
                    <input
                      type="text"
                      value={config.contacts.techSupport}
                      onChange={(e) => {
                        const updated = {
                          ...config.contacts,
                          techSupport: e.target.value,
                          techSupportTel: `tel:${e.target.value}`,
                          techSupportWa: `https://wa.me/2${e.target.value.replace(/[^0-9]/g, "")}`,
                        };
                        setConfig({ ...config, contacts: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono-tech text-cyan-300 font-bold dir-ltr text-right"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Box 4: Copyright Notice Lock */}
              <div className="rounded-3xl bg-[#0F172A] border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between text-white font-bold text-sm">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>حقوق الملكية والفوتر (Copyright Notice)</span>
                  </span>
                  <span className="text-[10px] font-mono-tech text-emerald-400 px-2 py-0.5 rounded-full bg-slate-950 border border-emerald-500/40">
                    PROTECTED
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">النص المعتمد أسفل الموقع:</div>
                  <div className="font-extrabold text-sm text-cyan-300 p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                    جميع الحقوق محفوظة © CyberX | Eng. Ahmed Omar
                  </div>
                  <p className="text-[11px] text-slate-500">
                    * تأكيد الالتزام الصارم بعدم ذكر أي أسماء أخرى في حقوق الملكية.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Save Bar */}
            <div className="pt-4 flex items-center justify-end">
              <button
                onClick={handleSaveConfig}
                disabled={isSavingConfig}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>حفظ بيانات الدفع والتواصل فوراً ⚡</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Modal 1: Lead Details & Notes Modal */}
      {selectedLeadForDetails && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedLeadForDetails(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#0F172A] border border-cyan-500/50 p-6 space-y-4 shadow-[0_0_40px_rgba(0,240,255,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 font-mono-tech text-cyan-400 font-bold text-sm">
                <span>LEAD FILE // {selectedLeadForDetails.id}</span>
              </div>
              <button
                onClick={() => setSelectedLeadForDetails(null)}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block">اسم العميل:</span>
                  <strong className="text-white text-sm">{selectedLeadForDetails.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">الشركة / النشاط:</span>
                  <strong className="text-slate-200">{selectedLeadForDetails.company || "غير محدد"}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block">الهاتف:</span>
                  <span className="font-mono-tech text-cyan-300 font-bold">{selectedLeadForDetails.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">البريد:</span>
                  <span className="font-mono-tech text-slate-300">{selectedLeadForDetails.email || "غير متوفر"}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block">الخدمة المطلوبة:</span>
                <strong className="text-pink-300">{selectedLeadForDetails.service}</strong>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block">الميزانية المقدرة:</span>
                  <strong className="text-slate-200">{selectedLeadForDetails.budget || "مرن"}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">كود الخصم:</span>
                  <strong className="text-pink-400 font-mono-tech">{selectedLeadForDetails.couponCode || "بدون كود"}</strong>
                </div>
              </div>

              {selectedLeadForDetails.projectDetails && (
                <div>
                  <span className="text-slate-400 block mb-1">تفاصيل المشروع من العميل:</span>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                    {selectedLeadForDetails.projectDetails}
                  </div>
                </div>
              )}

              <div>
                <label className="text-slate-400 block mb-1">ملاحظات م. أحمد عمر الداخلية:</label>
                <textarea
                  rows={2}
                  defaultValue={selectedLeadForDetails.notes || ""}
                  onBlur={(e) =>
                    handleUpdateLeadStatus(selectedLeadForDetails.id, selectedLeadForDetails.status, e.target.value)
                  }
                  placeholder="أضف ملاحظاتك لمتابعة هذا العميل..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`https://wa.me/2${selectedLeadForDetails.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>بدء محادثة واتساب فورية</span>
              </a>

              <button
                onClick={() => setSelectedLeadForDetails(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Add Manual Lead */}
      {showAddLeadModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowAddLeadModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-[#0F172A] border border-cyan-500/50 p-6 space-y-4 shadow-[0_0_40px_rgba(0,240,255,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>إضافة عميل جديد يدوياً إلى Pipeline</span>
              </h3>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">اسم العميل *</label>
                <input
                  type="text"
                  required
                  placeholder="محمد علي"
                  value={newLeadForm.fullName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">رقم الهاتف / الواتساب *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01094200285"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono-tech text-white dir-ltr text-right"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">الشركة / النشاط</label>
                  <input
                    type="text"
                    placeholder="مطعم / متجر / عيادة"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">الخدمة المطلوبة *</label>
                <select
                  value={newLeadForm.service}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  {config?.services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  )) || (
                    <option value="فيديوهات سينمائية">الفيديوهات السينمائية الإعلانية</option>
                  )}
                  <option value="باقة 5 فيديوهات سينمائية (2,000 ج.م)">باقة 5 فيديوهات سينمائية (2,000 ج.م)</option>
                  <option value="باقة حملتين ممولتين (2,000 ج.م)">باقة حملتين ممولتين (2,000 ج.م)</option>
                  <option value="اشتراك أتمتة الواتساب (1,500 ج.م)">اشتراك أتمتة الواتساب (1,500 ج.م)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">الميزانية</label>
                  <input
                    type="text"
                    placeholder="مثال: 2,000 ج.م"
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">الحالة المبدئية</label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value as LeadItem["status"] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="new">طلب جديد 🔵</option>
                    <option value="contacting">قيد التواصل 🟡</option>
                    <option value="closed">تم التعاقد 🟢</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">ملاحظات العميل</label>
                <textarea
                  rows={2}
                  placeholder="ملاحظات تفصيلية أو متطلبات خاصة..."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black"
                >
                  إضافة العميل وتثبيته ⚡
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
