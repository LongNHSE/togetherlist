import { Bell, CircleChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CreateWorkspace from '@/components/workspace/CreateWorkspace';
import AvatarDropdown from '@/components/user/AvatarDropdown';

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
        {/* Creat Workpsace Button */}
        <CreateWorkspace />
        {/* Notification */}
        <div className="relative hover:opacity-50 cursor-pointer">
          <Bell />
          <span className="absolute top-0 right-0 transform translate-x-[60%] translate-y-[-55%] px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            1
          </span>
        </div>
        {/* Account */}
        <AvatarDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
