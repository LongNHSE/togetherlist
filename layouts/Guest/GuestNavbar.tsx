'use client';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Links {
  id: number;
  name: string;
  path: string;
  icon?: ReactNode;
}
export default function GuestNavbar() {
  const pathname = usePathname();
  const isActive = (path: Links['path']) => path === pathname;
  const Links: Links[] = [
    { id: 1, name: 'Product', path: '/home/product' },
    { id: 2, name: 'Features', path: '/home/feature' },
    { id: 3, name: 'Solutions', path: '/' },
    { id: 4, name: 'Resources', path: '/' },
    { id: 5, name: 'Enterprise', path: '/' },
    { id: 6, name: 'Pricing', path: '/' },
    { id: 7, name: 'EN', path: '/', icon: <Globe /> },
    { id: 8, name: 'Contact Sales', path: '/' },
  ];
  const activeLinkStyle = {
    color: '#3A1B05',
    borderBottom: '2px solid #3A1B05',
    transition: 'all 0.3s ease',
  };

  return (
    <div className="flex items-center mt-3 space-x-20">
      {/* Navbar */}
      <nav>
        <ul className="flex space-x-9 items-center text-[#707070] ">
          {Links.map((link: Links) => (
            <li key={link.id}>
              <Link
                href={link.path}
                className={`flex items-center gap-1 hover:text-[#3A1B05]`}
                style={isActive(link.path) ? activeLinkStyle : {}}
              >
                {link.icon && link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
