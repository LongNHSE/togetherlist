'use client';
import { EllipsisVertical, SquarePen } from 'lucide-react';
import ChatUser from '@/components/chat/ChatUser';
import users from '@/data/chat-user';
import ChatSidebarPagination from './ChatSidebarPagination';
import { useState } from 'react';

const ChatSidebar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const handlePageChange = (pageNumber: number) => {
    const totalPages = Math.ceil(users.length / usersPerPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <section className="border-r border-slate-200 px-4 flex flex-col h-screen">
      <div className="flex justify-between items-center border-b border-slate-300 py-5">
        <div className="flex items-center gap-2 text-2xl">
          <h1 className="font-semibold">Chats</h1>
          <span className="text-slate-500">{`(${users.length})`}</span>
        </div>

        <div className="flex gap-2 items-center">
          <EllipsisVertical size={26} />
          <SquarePen size={26} />
        </div>
      </div>

      <div className="flex flex-col gap-3 h-[65vh] overflow-y-auto">
        {currentUsers.map((user) => {
          return (
            <ChatUser
              key={user.name}
              avatar={user.avatar}
              name={user.name}
              messageContent={user.messageContent}
            />
          );
        })}
      </div>

      {/* Pagination */}
      <ChatSidebarPagination
        users={users}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </section>
  );
};

export default ChatSidebar;
