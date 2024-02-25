import { NextRequest } from "next/server";
import { updateSession } from "./lib/session";

export async function middleware(req: NextRequest) {
  return await updateSession(req)
}