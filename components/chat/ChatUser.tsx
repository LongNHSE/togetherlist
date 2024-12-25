import { User } from '@/types/User';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface ChatUserProps {
  name: string;
  members: User[];
}

const ChatUser = ({ members, name }: ChatUserProps) => {
  console.log(members);
  return (
    <div className="grid grid-cols-[1fr_4fr] pb-4 pt-2 hover:bg-slate-200 cursor-pointer">
      <div className="flex -space-x-4">
        {members.map((member, index) => (
          <Avatar
            key={index}
            className="h-10 w-10 border-2 border-zinc-900 ring-2 ring-zinc-800"
          >
            {member.avatar ? (
              <AvatarImage
                src={
                  `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/` + member?.avatar
                }
                alt={member.username}
              />
            ) : (
              <AvatarImage src={member?.avatar} alt={member.username} />
            )}
            <AvatarFallback className="w-10 h-10 bg-orange-300">
              {member?.firstName[0]}
              {member?.lastName[0]}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div>
        <h1 className="text-md font-semibold">{name}</h1>
        {/* <span className="text-slate-500 text-sm">
          {formatChatLength(messageContent)}
        </span> */}
      </div>
    </div>
  );
};

export default ChatUser;
