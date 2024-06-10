import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatChatLength } from '@/constants/FormatChatLength';

interface ChatUserProps {
  avatar: string;
  name: string;
  messageContent: string;
}

const ChatUser = ({ avatar, name, messageContent }: ChatUserProps) => {
  return (
    <div className="grid grid-cols-[1fr_4fr] pb-4 pt-2 hover:bg-slate-200 cursor-pointer">
      <div>
        <Avatar className="flex justify-center items-center rounded">
          <AvatarImage
            src={avatar}
            alt="@shadcn"
            width={10}
            height={10}
            className="w-10 h-10 rounded-full "
          />
        </Avatar>{' '}
      </div>
      <div>
        <h1 className="text-md font-semibold">{name}</h1>
        <span className="text-slate-500 text-sm">
          {formatChatLength(messageContent)}
        </span>
      </div>
    </div>
  );
};

export default ChatUser;
