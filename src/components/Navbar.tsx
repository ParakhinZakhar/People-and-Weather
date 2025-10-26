import Link from "next/link";
import DesktopNavbar from "@/components/desktop/DesktopNavbar";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import ModeToggler from "@/components/ModeToggler";

function Navbar() {
  return <nav className="sticky top-0 w-full border-b 
          bg-background/95 backdrop-blur z-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <MobileNavbar />
                
                <div className="flex items-center">
                  <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">
                  People & Weather
                  </Link>
                </div>

               <DesktopNavbar /> 
               <ModeToggler />
              </div>
            </div>
        </nav>;
}

export default Navbar;