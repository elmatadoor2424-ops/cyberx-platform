import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/server/configStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getSiteConfig();
  return NextResponse.json({
    success: true,
    config,
  });
}
