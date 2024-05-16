import React from 'react';
import logo from '@/public/logo.png';
import Image from 'next/image';
import {
  BarChart4,
  BriefcaseBusiness,
  CalendarDays,
  Contact,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <BarChart4 className="mr-3" /> Report
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <MessageCircleMore className="mr-3" /> Message
            </div>
            <div className="p-4 mb-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                  <BriefcaseBusiness className="mr-3 " />
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

            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              {' '}
              <Tag className="mr-3" />
              Pricing
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              {' '}
              <CalendarDays className="mr-3" />
              Calendar
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              {' '}
              <ListChecks className="mr-3" /> To-do
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <Contact className="mr-3" /> Contact
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <Users className="mr-3" />
              Team
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <Presentation className="mr-3" />
              Meeting
            </div>
            <div className="border-b border-gray-400"></div>
          </div>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100 ">
        <h1 className="text-2xl font-semibold mb-4">Main Content</h1>
        <div className="bg-white p-6 rounded shadow-md ">{children}</div>
      </main>
    </div>
  );
}
