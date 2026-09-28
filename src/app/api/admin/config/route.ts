import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/server/adminAuth";
import {
  getSiteConfig,
  updateSiteConfig,
  resetSiteConfigToDefaults,
} from "@/lib/server/configStore";

export async function GET(req: NextRequest) {
  // Allow public or admin read (or admin authenticated)
  const config = getSiteConfig();
  return NextResponse.json({ success: true, config });
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session.valid) {
    return NextResponse.json({ success: false, message: "غير مصرح لك بتعديل بيانات الموقع" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = updateSiteConfig(body);

    return NextResponse.json({
      success: true,
      message: "تم حفظ وتحديث إعدادات الموقع والأسعار بنجاح",
      config: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ أثناء حفظ التعديلات", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session.valid) {
    return NextResponse.json({ success: false, message: "غير مصرح لك بإجراء هذه العملية" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (body.action === "reset") {
      const resetConfig = resetSiteConfigToDefaults();
      return NextResponse.json({
        success: true,
        message: "تمت استعادة الأسعار والبيانات الافتراضية بنجاح",
        config: resetConfig,
      });
    }

    return NextResponse.json({ success: false, message: "إجراء غير معروف" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ أثناء استعادة الإعدادات", error: String(error) },
      { status: 500 }
    );
  }
}
