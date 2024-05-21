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
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const AvatarDropdown = () => {
  const path = usePathname();
  const router = useRouter();

  async function logout() {
    try {
      const result = await authApiRequest.logout();
    } catch (error) {
      console.log(error);
    } finally {
      deleteCookie('clientSessionToken');
      deleteCookie('refreshToken');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
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

  return (
    <div className="py-1 px-2 flex items-center gap-2 hover:opacity-50 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://github.com/alicejohnson.png"
                alt="@shadcn"
              />
              <AvatarFallback className="w-10 h-10">CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">HuyLong123</p>
              <p className="text-xs leading-none text-muted-foreground">
                huylong123@example.com
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
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
