import AvatarDropdown from '@/components/user/AvatarDropdown';
import CreateWorkspace from '@/components/Workspace/CreateWorkspace';
import dynamic from 'next/dynamic';
import LoadingSupperMini from '@/components/Workspace/LoadingSupperMini';
import DropdownNotification from '@/components/header/DropdownNotification';

const DropdownHeader = dynamic(
  () => import('@/components/header/DropdownHeader'),
  { ssr: false, loading: () => <LoadingSupperMini /> },
);

const ListMember = dynamic(() => import('@/components/ListMember'), {
  ssr: false,
  loading: () => <LoadingSupperMini />,
});

const DashboardHeader = () => {
  return (
    <header className="px-6 py-4 bg-gray-50 flex justify-between items-center cursor-pointer">
      {/* List of workspaces */}
      <div className="flex flex-row justify-center align-middle">
        <div className="my-auto">
          <DropdownHeader />
        </div>
        <div>
          <ListMember />
        </div>
      </div>

      <div className="flex items-center gap-7">
        {/* Creat Workpsace Button */}
        <CreateWorkspace />
        {/* Notification */}
        <DropdownNotification />
        {/* Account */}
        <AvatarDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
