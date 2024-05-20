import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, CircleChevronDown, Network } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DashboardHeader = () => {
  return (
    <header className="px-6 py-4 bg-gray-50 flex justify-between items-center cursor-pointer">
      {/* List of workspaces */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1  focus:outline-none hover:opacity-50 text-[#3A1B05] font-bold">
          <span>Workspaces</span>
          <CircleChevronDown className="tex-[#3A1B05] font-semibold" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Current workspace</DropdownMenuLabel>
          <DropdownMenuItem>Together List</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Kohe Niko</DropdownMenuItem>
          <DropdownMenuItem>Gym center</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-7">
        {/* Share Button */}
        <Button
          className="flex items-center gap-3 bg-[#3A1B05] rounded-3xl hover:bg-[#a5683c]"
          size="sm"
        >
          <Network absoluteStrokeWidth />
          <span>Create workspace</span>
        </Button>
        {/* Notification */}
        <div className="relative hover:opacity-50 cursor-pointer">
          <Bell />
          <span className="absolute top-0 right-0 transform translate-x-[60%] translate-y-[-55%] px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            1
          </span>
        </div>
        {/* Account */}
        <div className=" py-1 px-2 flex items-center gap-2 hover:opacity-50 cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src="https://github.com/alicejohnson.png"
              alt="@shadcn"
            />
            <AvatarFallback className="w-10 h-10">CN</AvatarFallback>
          </Avatar>
          <span className="text-sm font-bold">Username</span>
          <CircleChevronDown className="tex-[#3A1B05] font-semibold" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
