'use client';
import { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import ChatMessageBottomBar from './ChatMessageBottomBar';
import { Message } from '@/types/Message';
import { RoomChat } from '@/types/RoomChat';
import { useAppContext } from '@/context/Provider';

interface ChatListProps {
  initialMessages?: Message[];
  roomChat: RoomChat;
  // sendMessage: (newMessage: Message) => void;
}

const ChatList = ({ initialMessages = [], roomChat }: ChatListProps) => {
  const { user } = useAppContext();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const sendMessage = (newMessage: string) => {
    if (user) {
      const newMessageModel: Message = {
        sender: user,
        content: newMessage,
        roomChat: roomChat,
      };
      setMessages([...messages, newMessageModel]);
    }
  };
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-[72vh] justify-between flex flex-col pt-3 ">
      <div className="px-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-center gap-3`}>
            <div>
              <Avatar className="rounded">
                <AvatarImage
                  src={typeof msg.sender === 'string' ? '' : msg.sender.avatar}
                  alt={typeof msg.sender === 'string' ? '' : msg.sender.username}
                  width={10}
                  height={10}
                  className={`w-10 h-10 rounded-full `}
                />
              </Avatar>
            </div>
            <div className="border px-3 py-3 rounded-full border-slate-400">
              <span className="text-black text-sm">{msg.content}</span>
            </div>
          </div>
        ))}
      </div>

      <ChatMessageBottomBar sendMessage={sendMessage} />
    </div>
  );
};

export default ChatList;
