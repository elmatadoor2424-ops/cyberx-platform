import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/server/adminAuth";
import {
  getLeads,
  addLead,
  updateLeadStatus,
  deleteLead,
} from "@/lib/server/leadsStore";

export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session.valid) {
    return NextResponse.json({ success: false, message: "غير مصرح لك بالوصول" }, { status: 401 });
  }

  const leads = getLeads();
  return NextResponse.json({ success: true, leads });
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session.valid) {
    return NextResponse.json({ success: false, message: "غير مصرح لك بالوصول" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { leadId, status, notes } = body;

    if (!leadId || !status) {
      return NextResponse.json(
        { success: false, message: "معرف العميل والحالة مطلوبان" },
        { status: 400 }
      );
    }

    const updated = updateLeadStatus(leadId, status, notes);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "تعذر العثور على العميل" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث حالة العميل بنجاح",
      lead: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ أثناء تحديث بيانات العميل", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session.valid) {
    return NextResponse.json({ success: false, message: "غير مصرح لك بالوصول" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fullName, phone, email, company, service, budget, projectDetails, couponCode, status, notes } = body;

    if (!fullName || !phone || !service) {
      return NextResponse.json(
        { success: false, message: "الاسم ورقم الهاتف والخدمة حقول إلزامية" },
        { status: 400 }
      );
    }

    const newLead = addLead({
      fullName,
      phone,
      email,
      company,
      service,
      budget,
      projectDetails,
      couponCode: couponCode || "CYBER70",
      status: status || "new",
      notes: notes || "تمت الإضافة يدوياً بواسطة م. أحمد عمر من لوحة التحكم",
      forwardedWebhook: false,
    });

    return NextResponse.json({
      success: true,
      message: "تمت إضافة العميل بنجاح",
      lead: newLead,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ أثناء إضافة العميل", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session.valid) {
    return NextResponse.json({ success: false, message: "غير مصرح لك بالوصول" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const leadId = searchParams.get("leadId");

    if (!leadId) {
      return NextResponse.json(
        { success: false, message: "معرف العميل مطلوب للحذف" },
        { status: 400 }
      );
    }

    const deleted = deleteLead(leadId);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "العميل غير موجود أو تم حذفه مسبقاً" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم حذف العميل بنجاح",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ أثناء حذف العميل", error: String(error) },
      { status: 500 }
    );
  }
}
