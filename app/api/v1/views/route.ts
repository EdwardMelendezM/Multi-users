import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";

import { client } from "@/lib/client";
import { getSession } from "@/lib/session";

export async function POST(
  req: NextRequest
) {
  try {
    const session = await getSession()
    const { name, path } = await req.json();

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 404 });
    }

    if (!name) {
      return NextResponse.json("Name is required", { status: 400 });
    }

    if (!path) {
      return NextResponse.json("Path is required", { status: 400 });
    }

    const id = uuid();

    const query = 'INSERT INTO views (id, name, path) VALUES ($,$, $)'
    const response = await client(query, [id, name, path]);

    return NextResponse.json({ data: response });
  } catch (error) {
    console.log("GET_VIEWS", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

