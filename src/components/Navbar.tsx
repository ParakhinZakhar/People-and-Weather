"use client";

import Link from 'next/link'
import { useUIFlow } from '@/providers/UIFlowProvider'
import DesktopNavbar from '@/components/desktop/DesktopNavbar'
import MobileNavbar from '@/components/mobile/MobileNavbar'
import ModeToggler from '@/components/ModeToggler'

function Navbar() {
  const { goToBanner } = useUIFlow();

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <MobileNavbar />
            
            <Link 
              href="/" 
              onClick={goToBanner}
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              People & Weather
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <DesktopNavbar /> 
          </div>

          <div className="flex items-center gap-2">
            <ModeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;