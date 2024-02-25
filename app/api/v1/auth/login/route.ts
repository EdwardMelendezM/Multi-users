import { loginSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

type User = {
  email: string;
}

export async function POST(
  req: NextRequest,
) {
  const { email } = await req.json();
  const user: User = { email };
  const response = await loginSession(user);
  if (!email) {
    return NextResponse.json("Email are required", { status: 400 });
  }
  return NextResponse.json({ data: "success" });
}