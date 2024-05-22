'use client';
import Logo from '@/components/Logo';
import GuestNavbar from './GuestNavbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckLogin } from '@/utils/checklogin';
import AvatarDropdown from '@/components/user/AvatarDropdown';
import { useEffect, useState } from 'react';

export default function GuestHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(CheckLogin());
  }, []);

  return (
    <header>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-x-[4rem] px-9 py-2 text-[18px] border-b-4 items-center">
        {/* Logo */}
        <Logo />
        {/* Navbar + Auth */}
        <GuestNavbar />

        {isLoggedIn ? (
          <div className="flex items-center">
            <AvatarDropdown />
          </div>
        ) : (
          <Link href="/auth" className="mt-3">
            <Button
              size="lg"
              className="bg-[#3A1B05] hover:bg-[#704222] text-white rounded-xl "
            >
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
