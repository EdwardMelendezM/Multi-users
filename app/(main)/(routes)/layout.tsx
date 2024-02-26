import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

import Navbar from "@/components/dashboard/navbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }
  return (
    <div className="flex-col flex">
      <Navbar />
      {children}
    </div>
  );
}
