import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from '@/components/ui/searchButton';
import { X } from 'lucide-react';
import AddMember from '@/components/workspaceFolder/AddMember';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const teamMembers = [
  {
    avatar: '',
    name: 'QKL',
    email: 'qkl@gmail.com',
    role: 'Leader',
    status: 'View boards(2)',
    action: 'Leave',
  },
  {
    avatar: '',
    name: 'Kecodethue',
    email: 'kecodethue@gmail.com',
    role: 'Developer',
    status: 'View boards(1)',
    action: 'Remove',
  },
  // Add more team members as needed
];

export default function ManageTeam() {
  return (
    <div>
      <div className="w-9/12 border-b-2 border-slate-400">
        <p className="text-xl font-semibold">Workspace Member (2)</p>
        <p className="text-sm mt-3 mb-4">
          Workspace member can view and join all Workspace and create board in
          the Workspaces.
        </p>
      </div>
      <div className="w-9/12 border-b-2 border-slate-400 mt-5">
        <p className="text-xl font-semibold ">
          Invite member to join your Workspace
        </p>
        <div className="flex align-middle">
          <Input
            className="w-72 h-10 mt-3 mb-5 border border-dark_brown"
            placeholder="Enter member email"
          />
          <Button className="w-20 h-10 mt-3 mb-5 ml-2 bg-sky-500 hover:bg-sky-600">
            Invite
          </Button>
        </div>
      </div>
      <div className="w-9/12 mt-5 mb-3 border-b-2 border-slate-400">
        <div className="w-52 mb-5">
          <Search placeholder="Filter by name" />
        </div>
      </div>

      <div className="w-9/12">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="hover:bg-slate-100 text-sm border-b-2 border-slate-400 flex justify-between items-center p-2"
          >
            <div className="flex items-center mb-2">
              <Avatar className="w-10 h-10 mt-1">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 mt-1">
                <div className="font-semibold">{member.name}</div>
                <div className="text-gray-500 text-sm">{member.email}</div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <div>
                <button className="py-1 px-3 rounded text-white bg-emerald-500 hover:bg-emerald-600">
                  {member.status}
                </button>
              </div>
              <div className="py-1 px-3 rounded text-white bg-stone-500  hover:bg-stone-600">
                {member.role}
              </div>
              <div>
                <button className="py-1 px-3 rounded text-white bg-rose-500 hover:bg-rose-600 flex items-center">
                  <span>{member.action}</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
