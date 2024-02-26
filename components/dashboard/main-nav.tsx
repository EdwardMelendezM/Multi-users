import Link from "next/link"

import { cn } from "@/lib/utils"
import { View } from "@/lib/get-views"

interface MainNavProp {
  views: View[]
}

export function MainNav({
  views
}: MainNavProp) {
  return (
    <nav
      className={cn("mx-6 flex items-center space-x-4 lg:space-x-6")}>
      {views.map((view) => (
        <Link
          key={view.id}
          href={view.path}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {view.name[0].toUpperCase() + view.name.slice(1)}
        </Link>
      ))}
    </nav>
  )
}