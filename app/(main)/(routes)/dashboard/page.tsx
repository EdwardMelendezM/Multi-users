import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    return redirect("/login")
  }
  return (
    <>
      <h1>Dashboard</h1>
    </>

  )
}