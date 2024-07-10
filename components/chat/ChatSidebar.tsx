'use client';
import { EllipsisVertical, SquarePen } from 'lucide-react';
import ChatUser from '@/components/chat/ChatUser';
import { useEffect, useState } from 'react';
import ChatSidebarPagination from './ChatSidebarPagination';
import { WorkspaceType } from '@/lib/schema/workspace/workspace.schema';
import { useAppContext } from '@/context/Provider';

const ChatSidebar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { currentWorkspace, setCurrentWorkspace, members, setMembers } =
    useAppContext();
  const workspacesPerPage = 10;

  useEffect(() => {
    if (currentWorkspace) {
      console.log('Current workspace:', currentWorkspace);
      setMembers(currentWorkspace.members);
    }
  }, [currentWorkspace]);

  const handlePageChange = (pageNumber: number) => {
    if (currentWorkspace) {
      const totalPages = Math.ceil(1 / workspacesPerPage);
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    }
  };

  return (
    <section className="border-r border-slate-200 px-4 flex flex-col h-screen">
      <div className="flex justify-between items-center border-b border-slate-300 py-5">
        <div className="flex gap-2 items-center text-center">
          <h1 className="text-2xl font-semibold max-w-[90px] text-center">
            {currentWorkspace?.name ?? 'Loading...'}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xl">
          <h1 className="font-semibold">Members</h1>
          <span className="text-slate-500">{`(${members.length})`}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 h-[65vh] overflow-y-auto">
        {members.map((member: any) => (
          <ChatUser
            key={member._id}
            avatar={member.avatar || 'https://github.com/shadcn.png'}
            name={member.username}
          />
        ))}
      </div>

      <ChatSidebarPagination
        items={[currentWorkspace]}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </section>
  );
};

export default ChatSidebar;
