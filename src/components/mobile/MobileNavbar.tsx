"use client";

import { MenuIcon, UserRoundPlus, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import { useUIFlow } from '@/providers/UIFlowProvider';

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { goToForm, goToUsers, step } = useUIFlow();

  return (
    <div className="md:hidden">
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col space-y-4 mt-6 px-2">
            <Button
              variant={step === "form" ? "default" : "ghost"}
              onClick={() => {
                goToForm();
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-3 justify-start w-full"
            >
              <UserRoundPlus className="w-5 h-5" />
              New User
            </Button>

            <Button
              variant={step === "users" ? "default" : "ghost"}
              onClick={() => {
                goToUsers();
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-3 justify-start w-full"
            >
              <UsersRound className="w-5 h-5" />
              Saved Users
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;