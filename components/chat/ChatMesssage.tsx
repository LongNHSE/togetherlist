import React from 'react';
import ChatMessageHeader from './ChatMessageHeader';
import ChatMessageBottomBar from './ChatMessageBottomBar';

const ChatMesssage = () => {
  return (
    <section className="grid grid-rows-[1fr_2fr_0.85fr] items-start">
      {/* Header */}
      <ChatMessageHeader />
      {/* Messages */}
      <div>Message</div>
      {/* Input message bar */}
      <ChatMessageBottomBar />
    </section>
  );
};

export default ChatMesssage;
