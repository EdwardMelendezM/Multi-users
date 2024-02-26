import { client } from "@/lib/client";
import { loginSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

type User = {
  email: string;
}

export async function POST(
  req: NextRequest,
) {
  try {
    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json("Email are required", { status: 400 });
    }

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?'

    const response = await client(query, [email, password]);

    //@ts-ignore
    if (response.length === 0) {
      return NextResponse.json({
        message: "User not found",
        code: "USER_NOT_FOUND"
      }, { status: 404 });
    }

    const user: User = { email };
    await loginSession(user);

    return NextResponse.json({ data: "success" });

  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 500 });
  }
}