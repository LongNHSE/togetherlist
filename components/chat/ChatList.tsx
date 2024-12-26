'use client';
import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ChatMessageBottomBar from './ChatMessageBottomBar';
import { Message } from '@/types/Message';
import { RoomChat } from '@/types/RoomChat';
import { useAppContext } from '@/context/Provider';
import { useSendMessage } from '@/hooks/auth/useGetMessage';

interface ChatListProps {
  initialMessages?: Message[];
  roomChat: RoomChat;
  // sendMessage: (newMessage: Message) => void;
}

const ChatList = ({ initialMessages = [], roomChat }: ChatListProps) => {
  const { user } = useAppContext();
  const { mutateAsync } = useSendMessage();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (newMessage: string) => {
    await mutateAsync({
      roomChatId: roomChat._id,
      message: newMessage,
    });
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);
  
  return (
    <div className="flex flex-col h-[70vh]">
      <div
        ref={chatContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden justify-between flex flex-col pt-3"
      >
        <div className="px-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 mb-3 ${
                typeof msg.sender === 'object' &&
                msg.sender !== null &&
                msg.sender._id === user?._id
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div>
                {typeof msg.sender === 'object' &&
                msg.sender !== null &&
                msg.sender._id !== user?._id ? (
                  <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30 rounded-full border-2 border-dark_brown">
                    {typeof msg.sender === 'string' ? (
                      ''
                    ) : msg.sender.avatar ? (
                      <AvatarImage
                        src={
                          typeof msg.sender === 'string'
                            ? ''
                            : `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/` +
                              msg.sender.avatar
                        }
                        alt={
                          typeof msg.sender === 'string'
                            ? ''
                            : msg.sender.username
                        }
                      />
                    ) : (
                      <AvatarImage
                        src={msg.sender?.avatar}
                        alt={msg.sender.username}
                      />
                    )}
                    <AvatarFallback className="w-10 h-10 bg-orange-300">
                      {
                        (msg.sender as { firstName: string; lastName: string })
                          ?.firstName[0]
                      }
                      {
                        (msg.sender as { firstName: string; lastName: string })
                          ?.lastName[0]
                      }
                    </AvatarFallback>
                  </Avatar>
                ) : null}
              </div>
              <div className="border px-3 py-3 rounded-full border-slate-400">
                <span className="text-black text-sm">{msg.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatMessageBottomBar sendMessage={sendMessage} />
    </div>
  );
};

export default ChatList;
