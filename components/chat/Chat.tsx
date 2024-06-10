'use client';
import React from 'react';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMessage from '@/components/chat/ChatMesssage';

const Chat = () => {
  return (
    <main className="grid grid-cols-[1fr_2fr] h-screen overflow-hidden ">
      {/* Chat Sidebar */}
      <ChatSidebar />
      {/* Chat Messages */}
      <ChatMessage />
    </main>
  );
};

export default Chat;
