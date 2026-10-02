import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/server/adminAuth";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session.valid) {
    return NextResponse.json({ success: false, message: "غير مصرح لك برفع الملفات" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const category = (formData.get("category") as string) || "general";

    if (!file) {
      return NextResponse.json({ success: false, message: "لم يتم تحديد أي ملف للرفع" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let publicUrl = "";

    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Clean file name
      const ext = path.extname(file.name) || ".jpg";
      const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueFileName = `${category}_${baseName}_${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, uniqueFileName);

      fs.writeFileSync(filePath, buffer);
      publicUrl = `/uploads/${uniqueFileName}`;
    } catch {
      // In serverless / read-only Vercel environment, fallback to base64 data URL
      const mime = file.type || "image/jpeg";
      publicUrl = `data:${mime};base64,${buffer.toString("base64")}`;
    }

    return NextResponse.json({
      success: true,
      message: "تم رفع الصورة بنجاح",
      url: publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ أثناء معالجة رفع الملف", error: String(error) },
      { status: 500 }
    );
  }
}
