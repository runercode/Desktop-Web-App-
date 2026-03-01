import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_PLANS = ["free", "pro", "max"] as const;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const plan = typeof body.plan === "string" ? body.plan.toLowerCase() : "";
    if (!VALID_PLANS.includes(plan as typeof VALID_PLANS[number])) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { plan },
    });

    return NextResponse.json({ ok: true, plan });
  } catch (e) {
    console.error("Plan update error:", e);
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 });
  }
}
