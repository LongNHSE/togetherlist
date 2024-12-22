import AvatarDropdown from '@/components/user/AvatarDropdown';
import CreateWorkspace from '@/components/workspaceFolder/CreateWorkspace';
import dynamic from 'next/dynamic';
import LoadingSupperMini from '@/components/workspaceFolder/LoadingSupperMini';
import DropdownNotification from '@/components/header/DropdownNotification';
import SubscriptionPlan from '@/components/header/SubscriptionPlan';

const DropdownHeader = dynamic(
  () => import('@/components/header/DropdownHeader'),
  { ssr: false, loading: () => <LoadingSupperMini /> },
);

const ListMember = dynamic(() => import('@/components/ListMember'), {
  ssr: false,
});

const DashboardHeader = () => {
  return (
    <header className="px-6 py-4 bg-gray-50 flex justify-between items-center ">
      {/* List of workspaces */}
      <div className="flex flex-row justify-center align-middle"></div>

      <div className="flex items-center gap-7">
        {/* Account */}
        <AvatarDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
