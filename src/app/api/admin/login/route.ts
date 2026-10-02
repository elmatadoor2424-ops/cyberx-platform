import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials, createAdminToken } from "@/lib/server/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "يرجى إدخال اسم المستخدم وكلمة المرور" },
        { status: 400 }
      );
    }

    const isValid = verifyAdminCredentials(username, password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة. تم رفض تسجيل الدخول." },
        { status: 401 }
      );
    }

    const token = createAdminToken(username);
    const user = {
      username,
      name: "Eng. Ahmed Omar",
      role: "Founder & CEO of CyberX",
      avatar: "/ahmed.jpg",
    };

    const response = NextResponse.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح. مرحباً بك مهندس أحمد عمر.",
      token,
      user,
    });

    // Set secure HttpOnly cookie
    response.cookies.set("cyberx_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ أثناء معالجة تسجيل الدخول", error: String(error) },
      { status: 500 }
    );
  }
}
