'use client';
import React, { useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import ChatMessageBottomBar from './ChatMessageBottomBar';

const ChatList = () => {
  const [currentUser, setCurrentUser] = useState('Guest');
  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-[72vh] justify-between flex flex-col">
      <div>
        <div className="flex items-center gap-3">
          <div>
            <Avatar className="rounded">
              <AvatarImage
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="@shadcn"
                width={10}
                height={10}
                className="w-10 h-10 rounded-full "
              />
            </Avatar>
          </div>
          <div className="border px-3 py-3 rounded-full border-slate-400">
            <span className="text-black text-sm">
              Good afternoon! I hope you're all enjoying your day.
            </span>
          </div>
        </div>

        <div className="flex items-center flex-row-reverse gap-3 ml-8 mt-5">
          <div>
            <Avatar className="rounded">
              <AvatarImage
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="@guest"
                width={10}
                height={10}
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
            </Avatar>
          </div>
          <div className="border  py-3 px-3 rounded-full border-slate-400  text-black text-sm ">
            Good afternoon! I hope you&apos;re all enjoying your day. It&apos;s
            a beautiful day outside, isn&apos;t it? Remember to take breaks and
            hydrate. Happy coding!
          </div>
        </div>
      </div>

      <ChatMessageBottomBar />
    </div>
  );
};

export default ChatList;
