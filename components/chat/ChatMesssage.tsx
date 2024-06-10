import React from 'react';
import ChatMessageHeader from './ChatMessageHeader';

import ChatList from './ChatList';

const ChatMesssage = () => {
  return (
    <section className="grid grid-rows-[0.8fr_2fr_0.8fr] items-start h-screen w-auto overflow-auto">
      {/* Header */}
      <ChatMessageHeader />
      {/* Messages */}
      <ChatList />
    </section>
  );
};

export default ChatMesssage;
