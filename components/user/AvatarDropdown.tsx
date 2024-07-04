'use client';
import authApiRequest from '@/apiRequest/auth/auth.api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserType } from '@/lib/schema/user.schema';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

const AvatarDropdown = () => {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserType>();
  // const userLocal = localStorage.getItem('user');

  async function logout() {
    try {
      const result = await authApiRequest.logout();
    } catch (error) {
      console.log(error);
    } finally {
      deleteCookie('clientSessionToken');
      deleteCookie('refreshToken');
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      if (path.startsWith('/home')) {
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } else {
        router.push('/home');
      }
    }
  }

  const getUserFromLocalStorage = async () => {
    const userLocal = localStorage.getItem('user');
    if (userLocal !== null) {
      setUser(JSON.parse(userLocal));
    }
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  return (
    <div className="py-1 px-2 flex items-center gap-2 hover:opacity-50 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1 border-2 rounded-full bg-dark_brown ">
            <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30 rounded-full border-2 border-dark_brown">
              {user?.avatar ? (
                <AvatarImage
                  src={
                    `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/` + user?.avatar
                  }
                  alt={user.username}
                />
              ) : (
                <AvatarImage src={user?.avatar} alt={user?.username} />
              )}

              <AvatarFallback className="w-10 h-10 bg-orange-300">
                {user?.firstName[0]}
                {user?.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.username}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/${path.startsWith('/home') ? 'workspace' : 'home'}`}>
              <DropdownMenuItem>
                {path.startsWith('/home') ? 'Workspace' : 'Home'}
              </DropdownMenuItem>
            </Link>
            <Link href={`/account-settings`}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarDropdown;
