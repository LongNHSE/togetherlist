import React from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Phone, Video } from 'lucide-react';

const ChatMessageHeader = () => {
  return (
    <div className="py-2 px-5 flex items-center justify-between h-20 border-b border-slate-300">
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
  );
};

export default ChatMessageHeader;
