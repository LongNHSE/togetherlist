'use client';
import React from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Phone, Video } from 'lucide-react';

const ChatMesssage = () => {
  return (
    <section className="">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <Avatar>
              <AvatarImage
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="@shadcn"
                width={10}
                height={10}
                className="w-10 h-10 rounded-full "
              />
            </Avatar>
          </div>

          <div>
            <h1 className="text-lg font-semibold ">John Doe</h1>
            <span className="text-slate-500 text-sm">Active 2 mins ago</span>
          </div>
        </div>

        <div className="flex items-center gap-5 ">
          <Phone
            size={26}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200"
          />
          <Video
            size={26}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200"
          />
        </div>
      </div>
      {/* Messages */}
      {/* Input message bar */}
    </section>
  );
};

export default ChatMesssage;
