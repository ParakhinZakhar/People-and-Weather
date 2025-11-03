"use client";

import {
  UserRoundPlus,
  UsersRound
} from 'lucide-react'
import { useUIFlow } from '@/providers/UIFlowProvider'
import { Button } from '@/components/ui/button'

function DesktopNavbar() {
  const { goToForm, goToUsers} = useUIFlow();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button className="flex items-center gap-2"
        variant={"outline"}
        onClick={goToForm}>
        <UserRoundPlus className="w-4 h-4" />
          <span className="hidden lg:inline">New User</span>
      </Button>
      <Button className="flex items-center gap-2"
        variant={"outline"}
        onClick={goToUsers}>
        <UsersRound className="w-4 h-4" />
          <span className="hidden lg:inline">Saved Users</span>
      </Button>
    </div>
  );
}

export default DesktopNavbar;