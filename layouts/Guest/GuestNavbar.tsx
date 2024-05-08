import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import Link from 'next/link';

export default function GuestNavbar() {
  return (
    <div className="flex items-center mt-3 space-x-20">
      {/* Navbar */}
      <nav>
        <ul className="flex space-x-9 items-center text-[#707070]">
          <li>
            <Link href="/">Product</Link>
          </li>
          <li>
            <Link href="/"> Features</Link>
          </li>
          <li>
            <Link href="/">Soluitions</Link>
          </li>
          <li>
            <Link href="/">Resources</Link>
          </li>
          <li>
            <Link href="/">Enterprise</Link>
          </li>
          <li>
            <Link href="/">Pricing</Link>
          </li>
        </ul>
      </nav>

      {/* Auth */}
      <ul className="flex space-x-9 items-center text-[#707070]">
        <li>
          <Link href="/" className="flex items-center gap-1">
            <Globe />
            EN
          </Link>
        </li>
        <li>
          <Link href="/">Contanct Sales</Link>
        </li>
        <li>
          <Link href="/auth">Login</Link>
        </li>
      </ul>

      <Button className="bg-[#3A1B05] hover:bg-[#704222] text-white rounded-xl">
        Get Started
      </Button>
    </div>
  );
}
