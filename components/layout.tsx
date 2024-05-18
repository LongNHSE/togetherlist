'use client'
import React, {ReactNode}  from 'react';
import logo from '@/public/logo.png';
import Image from 'next/image';
import {
  BarChart4,
  BriefcaseBusiness,
  CalendarDays,
  Contact,
  FolderOpen,
  ListChecks,
  MessageCircleMore,
  Presentation,
  Tag,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
type LayoutProps = {
    children: ReactNode; // ReactNode type can hold any JSX elements
  };
  
function Layout({ children }: LayoutProps) {
  const router = useRouter();
  
  const handleAccountSettingsClick = () => {
    router.push('/account-settings');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white">
        <nav className="h-full flex flex-col bg-white ">
          <div className="p-4 pb-2 flex justify-between items-center ">
            <Image
              src={logo}
              alt="logo"
              height={160}
              width={160}
              priority={true}
            />
          </div>

          <div className="p-4 mt-2">
            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                <Image
              src={logo}
              alt="logo"
              height={80}
              width={80}
              priority={true}
            />
                Q
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAccountSettingsClick}>
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <BarChart4 className="mr-3" /> Report
            </div>
            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <MessageCircleMore className="mr-3" /> Message
            </div>
            <div className="p-4 mb-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <FolderOpen className="mr-3" />
                  Work space
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="border-b border-gray-400"></div>

            <div className="p-4 ml-1 mt-4 font-semibold text-lg text-slate-400">
              Pages
            </div>

            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <Tag className="mr-3" /> Pricing
            </div>
            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <CalendarDays className="mr-3" /> Calendar
            </div>
            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <ListChecks className="mr-3" /> To-do
            </div>
            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <Contact className="mr-3" /> Contact
            </div>
            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <Users className="mr-3" /> Team
            </div>
            <div className="p-4 flex items-center hover:bg-gray-300 cursor-pointer transition duration-300">
              <Presentation className="mr-3" /> Meeting
            </div>

            <div className="border-b border-gray-400"></div>
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-4 bg-gray-100">
        {children}
      </main>
    </div>
  );
}

export default Layout;
