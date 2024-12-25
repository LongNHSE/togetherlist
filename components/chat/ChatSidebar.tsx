'use client';
import ChatUser from '@/components/chat/ChatUser';
import ChatSidebarPagination from './ChatSidebarPagination';
import { useGetMyRoomChat } from '@/hooks/auth/useGetMyRoomChat';
import { RoomChat } from '@/types/RoomChat';
import { Skeleton } from '../ui/skeleton';

interface ChatSidebarParams {
  roomChatData: RoomChat[];
  isRoomChatDataLoading: boolean;
  isRoomChatDataError: boolean;
  selectCurrentRoom: (currentActiveRoom: RoomChat) => void;
}

const ChatSidebar = ({
  roomChatData,
  isRoomChatDataLoading,
  isRoomChatDataError,
  selectCurrentRoom,
}: ChatSidebarParams) => {
  if (isRoomChatDataLoading) {
    return (
      <section className="border-r border-slate-200 px-4 flex flex-col h-screen">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </section>
    );
  }

  if (isRoomChatDataError) {
    return <div>Error</div>;
  }

  return (
    <section className="border-r border-slate-200 px-4 flex flex-col h-screen">
      <div className="flex justify-between items-center border-b border-slate-300 py-5">
        <div className="flex gap-2 items-center text-center">
          <h1 className="text-2xl font-semibold max-w-[90px] text-center">
            {/* {currentWorkspace?.name ?? 'Loading...'} */}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xl">
          <h1 className="font-semibold">Members</h1>
          {/* <span className="text-slate-500">{`(${members.length})`}</span> */}
        </div>
      </div>

      <div className="flex flex-col gap-3 h-[65vh] overflow-y-auto">
        {roomChatData.map((roomChat: RoomChat) => (
          <div key={roomChat._id} onClick={() => selectCurrentRoom(roomChat)}>
            <ChatUser members={roomChat.members} name={roomChat.name} />
          </div>
        ))}
      </div>

      {/* <ChatSidebarPagination
        items={[roomChatData]}
        onPageChange={() => {}}
        currentPage={1}
      /> */}
    </section>
  );
};

export default ChatSidebar;
