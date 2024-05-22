import { Bell, CircleChevronDown } from 'lucide-react';

import CreateWorkspace from '@/components/workspace/CreateWorkspace';
import AvatarDropdown from '@/components/user/AvatarDropdown';
import DropdownHeader from '@/components/header/DropdownHeader';

const DashboardHeader = () => {
  return (
    <header className="px-6 py-4 bg-gray-50 flex justify-between items-center cursor-pointer">
      {/* List of workspaces */}
      <DropdownHeader></DropdownHeader>

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
