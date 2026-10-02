import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/server/leadsStore";

export const dynamic = "force-dynamic";

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

    const targetWebhookUrl =
      (forwardWebhookUrl && forwardWebhookUrl.startsWith("http") ? forwardWebhookUrl.trim() : null) ||
      process.env.N8N_WEBHOOK_URL ||
      "https://polite-snake-84.loca.lt/webhook/c59e6ab9-de89-4c7c-a02c-58869a44c0b3";

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
      notes: "طلب مسجل آلياً عبر نموذج الموقع الرسمي وموجه للـ Webhook",
      forwardedWebhook: Boolean(targetWebhookUrl),
    });

    const webhookPayload = {
      // Primary client fields requested
      fullName: fullName || "غير محدد",
      name: fullName || "غير محدد",
      phone: phone || "غير محدد",
      whatsapp: phone || "غير محدد",
      email: email || "غير محدد",
      service: service || "استشارة عامة",
      // Additional metadata & project context
      company: company || "غير محدد",
      budget: budget || "مرن",
      projectDetails: projectDetails || "",
      couponCode: couponCode || "CYBER70",
      leadId,
      timestamp,
      event: "lead.registered",
      customer: {
        fullName: fullName || "غير محدد",
        name: fullName || "غير محدد",
        phone: phone || "غير محدد",
        whatsapp: phone || "غير محدد",
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

    // Send POST request to the designated Webhook URL
    if (targetWebhookUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        let externalRes = await fetch(targetWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CyberX-Signature": `CX-SIG-${Date.now()}`,
            "Bypass-Tunnel-Reminder": "true",
          },
          body: JSON.stringify(webhookPayload),
          signal: controller.signal,
        });

        // Smart n8n fallback: If production webhook returned 404, check if test webhook is waiting in n8n editor
        if (externalRes.status === 404 && targetWebhookUrl.includes("/webhook/")) {
          const testUrl = targetWebhookUrl.replace("/webhook/", "/webhook-test/");
          try {
            const testRes = await fetch(testUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CyberX-Signature": `CX-SIG-${Date.now()}`,
                "Bypass-Tunnel-Reminder": "true",
              },
              body: JSON.stringify(webhookPayload),
              signal: controller.signal,
            });
            if (testRes.ok || testRes.status !== 404) {
              externalRes = testRes;
            }
          } catch {
            // Keep original response
          }
        }

        clearTimeout(timeoutId);

        let resData = null;
        try {
          resData = await externalRes.json();
        } catch {
          resData = await externalRes.text().catch(() => null);
        }

        forwardedResponse = {
          status: externalRes.status,
          statusText: externalRes.statusText,
          ok: externalRes.ok,
          data: resData,
        };
      } catch (err: unknown) {
        forwardError = err instanceof Error ? err.message : "Forwarding timeout or unreachable";
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "تم استقبال بيانات العميل وإرسالها بنجاح عبر طلب POST إلى رابط الـ Webhook",
        leadId,
        timestamp,
        webhookPayload,
        externalForward: {
          attempted: Boolean(targetWebhookUrl),
          url: targetWebhookUrl,
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
