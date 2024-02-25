import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"

import Login from "@/components/login/login"

export const metadata: Metadata = {
  title: "Login",
  description: "Login de usuario para acceder al sistema",
}

export default async function AuthenticationPage() {
  const session = await getSession()

  if (session) redirect("/dashboard")

  return (
    <>
      <Login />
    </>
  )
}