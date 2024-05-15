'use client';
import NavLink from '@/components/NavLink';
import { Globe } from 'lucide-react';
import { ReactNode } from 'react';

interface Links {
  id: number;
  name: string;
  path: string;
  icon?: ReactNode;
}
const BASE_PATH = '/home';

export default function GuestNavbar() {
  const Links: Links[] = [
    { id: 1, name: 'Home', path: `${BASE_PATH}` },
    { id: 2, name: 'Product', path: `${BASE_PATH}/product` },
    { id: 3, name: 'Features', path: `${BASE_PATH}/feature` },
    { id: 4, name: 'Solutions', path: `${BASE_PATH}/solution` },
    { id: 6, name: 'Enterprise', path: `${BASE_PATH}/enterprise` },
    { id: 7, name: 'Pricing', path: `${BASE_PATH}/pricing` },
    { id: 8, name: 'Contact Sales', path: '/' },
  ];
  const activeLinkStyle =
    'text-[#3A1B05] border-b-2 border-[#3A1B05] transition-all duration-300 ease-in-out';
  return (
    <div className="flex items-center mt-3 space-x-20">
      {/* Navbar */}
      <nav>
        <ul className="flex space-x-9 items-center text-[#707070] font-semibold">
          {Links.map((link: Links) => (
            <li key={link.id} className="hover:text-[#3A1B05]">
              <NavLink
                to={link.path}
                activeClassName={activeLinkStyle}
                icon={link.icon}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
