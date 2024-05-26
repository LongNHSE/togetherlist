import NavLink from '@/components/NavLink';
import {
  ClipboardList,
  Home,
  LayoutDashboard,
  Network,
  UsersRound,
} from 'lucide-react';
import Logo from '@/components/Logo';

const DashboardSidebar = () => {
  return (
    <aside className="w-[10rem] bg-white">
      <nav className="h-fit flex flex-col bg-white ">
        <div className="p-4 pb-2 flex justify-between items-center ">
          <Logo />
        </div>

        <div className=" mt-2">
          <NavLink
            to="/workspace/main"
            className="p-4 flex items-cente hover:opacity-70 cursor-pointer transition duration-300"
            activeClassName="bg-[#3A1B05] text-white"
            icon={<Home className="mr-3" />}
          >
            Main
          </NavLink>

          <NavLink
            to="/workspace/project"
            className="p-4 flex items-cente hover:opacity-70 cursor-pointer transition duration-300"
            activeClassName="bg-[#3A1B05] text-white"
            icon={<Network className="mr-3" />}
          >
            Workpace
          </NavLink>

          <NavLink
            to="/workspace/board"
            className="p-4 flex items-cente hover:opacity-70 cursor-pointer transition duration-300"
            activeClassName="bg-[#3A1B05] text-white"
            icon={<ClipboardList className="mr-3" />}
          >
            Boards
          </NavLink>

          <NavLink
            to="/workspace/dashboard"
            className="p-4 flex items-cente hover:opacity-70 cursor-pointer transition duration-300"
            activeClassName="bg-[#3A1B05] text-white"
            icon={<LayoutDashboard className="mr-3" />}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/workspace/team"
            className="p-4 flex items-cente hover:opacity-70 cursor-pointer transition duration-300"
            activeClassName="bg-[#3A1B05] text-white"
            icon={<UsersRound className="mr-3" />}
          >
            Teams
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
