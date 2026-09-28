import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/server/leadsStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      company,
      service,
      budget,
      projectDetails,
      couponCode,
      forwardWebhookUrl,
    } = body;

    const leadId = `CX-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toISOString();

    // Persist lead immediately to admin database
    addLead({
      id: leadId,
      fullName: fullName || "غير محدد",
      phone: phone || "غير محدد",
      email: email || undefined,
      company: company || undefined,
      service: service || "استشارة عامة",
      budget: budget || "مرن",
      projectDetails: projectDetails || "",
      couponCode: couponCode || "CYBER70",
      status: "new",
      notes: "طلب مسجل آلياً عبر نموذج الموقع الرسمي",
      forwardedWebhook: Boolean(forwardWebhookUrl),
    });

    const webhookPayload = {
      event: "lead.registered",
      leadId,
      timestamp,
      customer: {
        fullName: fullName || "غير محدد",
        phone: phone || "غير محدد",
        email: email || "غير محدد",
        company: company || "غير محدد",
      },
      requirements: {
        service: service || "استشارة عامة",
        budget: budget || "مرن",
        projectDetails: projectDetails || "",
      },
      promotion: {
        couponCode: couponCode || "CYBER70",
        discountPercent: couponCode === "CYBER70" ? 70 : 0,
        status: "ACTIVE",
      },
      source: {
        platform: "CyberX Official Web Portal",
        userAgent: req.headers.get("user-agent") || "Web Browser",
        referer: req.headers.get("referer") || "Direct",
      },
    };

    let forwardedResponse = null;
    let forwardError = null;

    // If an external n8n or custom webhook URL was provided, attempt to forward
    if (forwardWebhookUrl && forwardWebhookUrl.startsWith("http")) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const externalRes = await fetch(forwardWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CyberX-Signature": `CX-SIG-${Date.now()}`,
          },
          body: JSON.stringify(webhookPayload),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        forwardedResponse = {
          status: externalRes.status,
          statusText: externalRes.statusText,
        };
      } catch (err: unknown) {
        forwardError = err instanceof Error ? err.message : "Forwarding timeout or unreachable";
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "تم استقبال بيانات العميل وتسجيل الطلب بنجاح عبر CyberX Webhook Hub",
        leadId,
        timestamp,
        webhookPayload,
        externalForward: {
          attempted: Boolean(forwardWebhookUrl),
          url: forwardWebhookUrl || null,
          response: forwardedResponse,
          error: forwardError,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: "حدث خطأ أثناء معالجة بيانات الـ Webhook",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
