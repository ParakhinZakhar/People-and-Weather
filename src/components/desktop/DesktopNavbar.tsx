"use client";

import {
  UserRoundPlus,
  UsersRound
} from "lucide-react";
import { Button } from "@/components/ui/button";

function DesktopNavbar() {

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="ghost" className="flex items-center gap-2">
        <UserRoundPlus className="w-4 h-4" />
          <span className="hidden lg:inline">New User</span>
      </Button>
      <Button variant="ghost" className="flex items-center gap-2">
        <UsersRound className="w-4 h-4" />
          <span className="hidden lg:inline">Saved Users</span>
      </Button>
    </div>
  );
}

export default DesktopNavbar;