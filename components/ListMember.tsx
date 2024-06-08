'use client';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAppContext } from '@/context/Provider';
import memberApiRequest from '@/apiRequest/member/member.api';
dingSupperMini from './Workspace/LoadingSupperMini';
import { Check, Plus, UserRoundPlus, X } from 'lucide-react';
import AddMember from './workspace/AddMember';


const ListMember = () => {
  const { members, setMembers, currentWorkspace, loading, setLoading } =
    useAppContext();

  const getMember = async () => {
    setLoading(true);
    try {
      if (!currentWorkspace) return;
      const res = await memberApiRequest.getMemberList(currentWorkspace._id);
      const memberData = res.data.map((mb: any) => ({
        username: mb.member.username,
        avatar: mb.member.avatar,
        firstName: mb.member.firstName,
        lastName: mb.member.lastName,
        email: mb.member.email,
        _id: mb.member._id,
      }));
      setMembers(memberData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getOwner = async () => {
    setLoading(true);
    try {
      if (!currentWorkspace) return;
      const res = await memberApiRequest.getOwner(currentWorkspace._id);
      setMembers((prev: any) => [...prev, res?.data?.owner]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMember();
    getOwner();
  }, [currentWorkspace]);
  return (
    <div className="flex flex-row">
      <div className="flex flex-row w-auto h-auto ml-9 space-x-1">
        {loading ? (
          <LoadingSupperMini />
        ) : members.length > 0 ? (
          members.map((member: any) => (
            <TooltipProvider delayDuration={100} key={member._id}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30 rounded-full">
                    <AvatarImage src={member?.avatar} alt={member?.username} />
                    <AvatarFallback className="w-10 h-10 bg-orange-500">
                      {member?.firstName[0]}
                      {member?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="bottom">{member.username}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        ) : (
          <div>No members found</div>
        )}
      </div>
      <div>
        <AddMember loadMember={() => getMember()} />
      </div>
    </div>
  );
};

export default ListMember;
