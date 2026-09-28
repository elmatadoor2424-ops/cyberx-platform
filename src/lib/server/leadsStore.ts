import fs from "fs";
import path from "path";

export interface LeadItem {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  company?: string;
  service: string;
  budget?: string;
  projectDetails?: string;
  couponCode?: string;
  status: "new" | "contacting" | "closed" | "cancelled";
  createdAt: string;
  notes?: string;
  forwardedWebhook?: boolean;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

const SEED_LEADS: LeadItem[] = [
  {
    id: "CX-892104",
    fullName: "د. طارق الرشيدي",
    phone: "01012345678",
    email: "tarek.rashidi@dental-clinic.eg",
    company: "مركز الرشيدي لجراحة الأسنان",
    service: "أتمتة المحادثات وخدمة العملاء (WhatsApp AI Bot)",
    budget: "5,000 - 15,000 ج.م (~$100 - $300)",
    projectDetails: "تفعيل اشتراك أتمتة الواتساب بـ 1,500 ج.م شهرياً مع استلام هدية الـ 1,000 رقم داتا مستهدفة لمرضى الأسنان وإطلاق الحملة الأولى.",
    couponCode: "CYBER70",
    status: "closed",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    notes: "تم استلام الدفعة عبر فودافون كاش وتفعيل الحساب وتمرير الداتا له.",
    forwardedWebhook: true,
  },
  {
    id: "CX-773419",
    fullName: "م. كريم الشناوي",
    phone: "01198765432",
    email: "kareem@urbanstyle.store",
    company: "براند ملابس Urban Style",
    service: "الفيديوهات السينمائية الإعلانية (باقة 5 فيديوهات)",
    budget: "5,000 - 15,000 ج.م (~$100 - $300)",
    projectDetails: "طلب باقة الـ 5 فيديوهات سينمائية بـ 2,000 ج.م + إدارة حملتين ممولتين بـ 2,000 ج.م لموسم الشتاء.",
    couponCode: "CYBER70",
    status: "closed",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    notes: "تم تحويل 4,000 ج.م عبر المحفظة والبدء في تصوير السكريبتات.",
    forwardedWebhook: true,
  },
  {
    id: "CX-618492",
    fullName: "أ/ سارة عبد الحميد",
    phone: "01234567890",
    email: "sara@gusto-egypt.com",
    company: "سلسلة مطاعم Gusto",
    service: "البرمجيات والأنظمة المخصصة (POS & Cloud ERP)",
    budget: "15,000 - 35,000 ج.م (~$300 - $700)",
    projectDetails: "ربط نقاط بيع المطاعم مع روبوت الواتساب وطلب تقرير المبيعات اللحظي وتخصيص صلاحيات الكاشير.",
    couponCode: "CYBER70",
    status: "contacting",
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    notes: "تم عقد اجتماع Zoom مبدئي مع كارما، جاري إعداد العقد.",
    forwardedWebhook: true,
  },
  {
    id: "CX-902341",
    fullName: "أحمد الفهد",
    phone: "+966501234567",
    email: "alfahad.perfumes@gmail.com",
    company: "الفهد للعطور الفاخرة",
    service: "تطوير المواقع والمتاجر الإلكترونية الفائقة",
    budget: "+35,000 ج.م (~+$700)",
    projectDetails: "تطوير متجر عطور بالرياض والدفع بالدولار عبر USDT إلى محفظة Binance التابعة لـ CyberX.",
    couponCode: "CYBER70",
    status: "closed",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    notes: "تم التحويل بـ USDT بنجاح وجاري الانتهاء من المتجر وتسليمه.",
    forwardedWebhook: true,
  },
  {
    id: "CX-445812",
    fullName: "محمود زكريا",
    phone: "01098877665",
    company: "وكالة عقارات نيو كايرو",
    service: "إدارة الحملات الإعلانية الممولة (Paid Ads)",
    budget: "5,000 - 15,000 ج.م (~$100 - $300)",
    projectDetails: "طلب باقة الحملتين الممولتين بـ 2,000 ج.م مع الاستهداف الدقيق لتسويق شقق ومكاتب التجمع الخامس.",
    couponCode: "CYBER70",
    status: "new",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    notes: "طلب مسجل جديد - بحاجة لتواصل فوري على الواتساب.",
    forwardedWebhook: true,
  },
];

function ensureDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getLeads(): LeadItem[] {
  try {
    ensureDirExists();
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(SEED_LEADS, null, 2), "utf-8");
      return SEED_LEADS;
    }
    const content = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading leads file:", error);
    return SEED_LEADS;
  }
}

export function saveLeads(leads: LeadItem[]): boolean {
  try {
    ensureDirExists();
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving leads file:", error);
    return false;
  }
}

export function addLead(newLead: Omit<LeadItem, "id" | "createdAt" | "status"> & { id?: string; status?: LeadItem["status"] }): LeadItem {
  const leads = getLeads();
  const lead: LeadItem = {
    ...newLead,
    id: newLead.id || `CX-${Math.floor(100000 + Math.random() * 900000)}`,
    status: newLead.status || "new",
    createdAt: new Date().toISOString(),
  };
  leads.unshift(lead);
  saveLeads(leads);
  return lead;
}

export function updateLeadStatus(leadId: string, status: LeadItem["status"], notes?: string): LeadItem | null {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === leadId);
  if (index === -1) return null;
  leads[index].status = status;
  if (notes !== undefined) {
    leads[index].notes = notes;
  }
  saveLeads(leads);
  return leads[index];
}

export function deleteLead(leadId: string): boolean {
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== leadId);
  if (filtered.length === leads.length) return false;
  return saveLeads(filtered);
}
