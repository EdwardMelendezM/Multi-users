import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Layout() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }
  return (
    <div>
      Hola
    </div>
  );
}
