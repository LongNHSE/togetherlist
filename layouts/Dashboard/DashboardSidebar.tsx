import NavLink from '@/components/NavLink';
import logo from '@/public/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BarChart4,
  BriefcaseBusiness,
  CalendarDays,
  Contact,
  ListChecks,
  LogOut,
  MessageCircleMore,
  Presentation,
  Tag,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import LogoutButton from '@/components/LogoutButton';

const DashboardSidebar = () => {
  console.log(typeof window);

  return (
    <aside className="w-[11rem] bg-white">
      <nav className="h-full flex flex-col bg-white ">
        {typeof window !== 'undefined' && <div>Window is defined</div>}

        <div className="p-4 pb-2 flex justify-between items-center ">
          <Image
            src={logo}
            alt="logo"
            height={160}
            width={160}
            priority={true}
          />
        </div>

        <div className=" mt-2">
          <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
            <BarChart4 className="mr-3" /> Report
          </div>
          <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
            <MessageCircleMore className="mr-3" /> Message
          </div>

          <NavLink
            to="/sidebar/workspace"
            className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300"
            activeClassName="bg-gray-300"
            icon={<MessageCircleMore className="mr-3" />}
          >
            Test
          </NavLink>

          <div className="p-4 mb-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <BriefcaseBusiness className="mr-3 " />
                Workspace
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
          <LogoutButton />
          <div className="border-b border-gray-400"></div>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
