'use client';
import React, { useEffect, useState } from 'react';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMessage from '@/components/chat/ChatMesssage';
import { useGetMyRoomChat } from '@/hooks/auth/useGetMyRoomChat';
import { RoomChat } from '@/types/RoomChat';

const Chat = () => {
  const {
    data: roomData,
    isLoading: isRoomChatDataLoading,
    isError: isRoomChatDataError,
  } = useGetMyRoomChat({});
  const [currentActiveRoom, setCurrentActiveRoom] = useState<RoomChat>();

  const selectCurrentActiveRoom = (currentActiveRoom: RoomChat) => {
    setCurrentActiveRoom(currentActiveRoom);
  };

  useEffect(() => {
    if (roomData && roomData?.length > 0) {
      selectCurrentActiveRoom(roomData[0]);
    }
  }, roomData);

  return (
    <main className="grid grid-cols-[1fr_2fr] h-screen overflow-hidden ">
      {/* Chat Sidebar */}
      <ChatSidebar
        roomChatData={roomData}
        isRoomChatDataError={isRoomChatDataError}
        isRoomChatDataLoading={isRoomChatDataLoading}
        selectCurrentRoom={selectCurrentActiveRoom}
      />
      {/* Chat Messages */}
      {currentActiveRoom && <ChatMessage roomChat={currentActiveRoom} />}
    </main>
  );
};

export default Chat;
