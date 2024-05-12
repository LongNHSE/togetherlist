import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import {
  BarChart4,
  Bolt,
  BriefcaseBusiness,
  CalendarDays,
  CirclePlus,
  Contact,
  DollarSign,
  FolderOpen,
  ListChecks,
  LogOut,
  Mail,
  MessageCircleMore,
  Presentation,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SideBar() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white border-r border-gray-300">
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
              <FolderOpen className="mr-3" /> Projects
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <BarChart4 className="mr-3" /> Report
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <MessageCircleMore className="mr-3" /> Message
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
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

            <div className="mb-4 mt-8 font-semibold">Pages</div>

            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              {" "}
              <DollarSign className="mr-3" />
              Pricing
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              {" "}
              <CalendarDays className="mr-3" />
              Calendar
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              {" "}
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
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <Mail className="mr-3" />
              E-mail
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300 mt-8">
              <Bolt className="mr-3" />
              Settings
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <LogOut className="mr-3" />
              Logout
            </div>
            <div className="p-4 flex items-cente hover:bg-gray-300 cursor-pointer transition duration-300">
              <CirclePlus className="mr-3" />
              Add new task
            </div>
          </div>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Main Content</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <p>This is the main content area.</p>
        </div>
      </main>
    </div>
  );
}
