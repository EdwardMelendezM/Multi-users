import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

import Navbar from "@/components/dashboard/navbar";
import { getViews } from "@/lib/get-views";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const views = await getViews(session.user.email)
  return (
    <div className="flex-col flex">
      <Navbar views={views} />
      {children}
    </div>
  );
}
