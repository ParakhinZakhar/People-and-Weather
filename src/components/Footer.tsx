import Link from 'next/link';
import { 
  SquareCode,
  Mail,
  Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="sticky bottom-0 w-full border-t bg-background/95 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-16">
        <div
          className="
            flex flex-col items-center justify-center gap-4 py-4
            md:flex-row md:justify-between md:h-16
          "
        >
          
          <div className="flex items-center gap-2 text-primary font-mono text-sm sm:text-base">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>zoltanriwij@gmail.com</span>
          </div>

          <Link
            href="https://github.com/ParakhinZakhar/People-and-Weather"
            className="flex items-center gap-2 text-primary font-mono text-sm sm:text-base"
          >
            <SquareCode className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Source code</span>
          </Link>

          <Link
            href="https://www.linkedin.com/in/zakhar-h-parakhin"
            className="flex items-center gap-2 text-primary font-mono text-sm sm:text-base"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Author</span>
          </Link>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
