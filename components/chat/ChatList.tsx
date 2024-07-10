'use client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import ChatMessageBottomBar from './ChatMessageBottomBar';
import { Message } from '@/lib/schema/message';

interface ChatListProps {
  initialMessages?: Message[];
  sendMessage: (newMessage: Message) => void;
}

const ChatList = ({ initialMessages = [], sendMessage }: ChatListProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-[72vh] justify-between flex flex-col pt-3 ">
      <div className="px-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 ${
              msg.name === 'Test' ? 'flex-row-reverse ml-3 mt-5' : ''
            }`}
          >
            <div>
              <Avatar className="rounded">
                <AvatarImage
                  src={msg.avatar}
                  alt={msg.name}
                  width={10}
                  height={10}
                  className={`w-10 h-10 rounded-full ${
                    msg.name === 'Test' ? 'border-2 border-blue-500' : ''
                  }`}
                />
              </Avatar>
            </div>
            <div className="border px-3 py-3 rounded-full border-slate-400">
              <span className="text-black text-sm">{msg.message}</span>
            </div>
          </div>
        ))}
      </div>

      <ChatMessageBottomBar sendMessage={sendMessage} />
    </div>
  );
};

export default ChatList;
