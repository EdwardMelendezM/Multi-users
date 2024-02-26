import { MainNav } from "./main-nav";
import { Search } from "./search";
import TeamSwitcher from "./team-switcher";
import { UserNav } from "./user-nav";

import { View } from "@/lib/get-views"
interface NavbarProps {
  views: View[]
}

export default function Navbar({
  views
}: NavbarProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <TeamSwitcher />
        <MainNav views={views} />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  )
}