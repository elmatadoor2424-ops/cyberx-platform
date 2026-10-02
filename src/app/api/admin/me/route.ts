import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/server/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session.valid || !session.user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: session.user,
  });
}
