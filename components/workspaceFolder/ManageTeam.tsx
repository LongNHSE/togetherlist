'use client';
import React, { useEffect, useState } from 'react';
import { Infinity } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from '@/components/ui/searchButton';
import { TriangleAlert, X } from 'lucide-react';
import AddMember from '@/components/workspaceFolder/AddMember';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/Provider';
import { UserType } from '@/lib/schema/user.schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import memberApiRequest from '@/apiRequest/member/member.api';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast, useToast } from '../ui/use-toast';
import { m } from 'framer-motion';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
});

export default function ManageTeam() {
  const { members, user, currentWorkspace, setMembers, mySubscriptions } =
    useAppContext();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const isOwnerHandler = () => {
    members.find((el: any) => {
      if (user?._id === el._id && el.role === 'owner') {
        setIsOwner(true);
      }
    });
  };

  const handleAddMember = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitted(true);
      setLoading(true);
      if (currentWorkspace?._id) {
        const result = await memberApiRequest.addMemberByEmail(
          currentWorkspace?._id,
          values.email,
        );
        if (result.statusCode === 200) {
          toast({
            variant: 'success',
            description: result.message,
            duration: 5000,
          });
          form.reset();
          getMember();
        } else if (result.statusCode === 400) {
          toast({
            // eslint-disable-next-line react/jsx-no-undef
            title: <TriangleAlert size={20} />,
            variant: 'destructive',
            description: result.message,
            duration: 5000,
          });
        }
      }
    } catch (err) {
      console.error('Error adding member:', err);
    } finally {
      setIsSubmitted(false);
      setLoading(false);
    }
  };

  const getMember = async () => {
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
        role: mb.role,
        memberWorkspaceId: mb._id,
        workspaceId: mb.workspaceId,
      }));
      setMembers(memberData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      if (currentWorkspace?._id && id) {
        const result = await memberApiRequest.removeMember(
          currentWorkspace._id,
          id,
        );
        if (result.statusCode === 200) {
          toast({
            variant: 'success',
            description: result.message,
            duration: 5000,
          });
          getMember();
        } else {
          toast({
            variant: 'destructive',
            description: result.message,
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isOwnerHandler();
  }, [members]);

  useEffect(() => {
    if (isSubmitted && form.formState.errors.email) {
      toast({
        title: <TriangleAlert size={20} />,
        variant: 'destructive',
        description: form.formState.errors.email.message,
        duration: 5000,
      });
    }
  }, [isSubmitted, form.formState.errors.email]);
  return (
    <div>
      <div className="w-9/12 border-b-2 border-slate-400 flex flex-row justify-between">
        <div>
          <p className="text-xl font-semibold">Workspace Member</p>
          <p className="text-sm mt-3 mb-4">
            Workspace members can view and join all workspaces and create boards
            in the workspaces.
          </p>
        </div>
        <div className="flex my-auto text-xl font-medium text-dark_brown">
          <div className="flex flex-col justify-center text-center ">
            <h1 className="text-2xl border-b-2 border-dark_brown/50 mb-1">
              Team Members
            </h1>
            <div className="flex flex-row mx-auto">
              {members.length} <span className="mx-1">/</span>
              {mySubscriptions?.subscriptionType?.name?.toLowerCase() ===
              'free' ? (
                <span>3</span>
              ) : (
                <div className="flex my-auto">
                  <Infinity />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-9/12 border-b-2 border-slate-400 mt-5">
        <p className="text-xl font-semibold">
          Invite member to join your Workspace
        </p>
        <div className="flex flex-col align-middle my-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddMember)}
              className=" flex flex-row items-center"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-64 items-center flex">
                    <FormControl>
                      <Input placeholder="Member's email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div
                className={`w-28 h-full flex my-auto ml-6 ${
                  members.length >= 3 &&
                  mySubscriptions?.subscriptionType?.name.toLowerCase() ===
                    'free'
                    ? 'hover:cursor-not-allowed'
                    : ''
                }`}
              >
                <Button
                  size="addMemberButton"
                  className={`w-full ${
                    members.length >= 3 &&
                    mySubscriptions?.subscriptionType?.name.toLowerCase() ===
                      'free'
                      ? 'bg-gray-400'
                      : 'bg-dark_brown'
                  }`}
                  disabled={
                    members.length >= 3 &&
                    mySubscriptions?.subscriptionType?.name.toLowerCase() ===
                      'free'
                  }
                  variant={loading ? 'loading' : 'default'}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          {/* <div className="mt-2 mb-1 ml-2 text-red-500 font-semibold h-2">
            {form.formState.errors.email ? (
              <p>{form.formState.errors.email.message}</p>
            ) : (
              <p></p>
            )}
          </div> */}
        </div>
      </div>
      <div className="w-9/12 mt-5 justify-between border-b-2 border-slate-400 flex flex-row mb-3 pb-4">
        <div className="w-52 flex my-auto ">
          <Search placeholder="Filter by name" />
        </div>
      </div>

      <div className="w-9/12">
        {members.map((member: UserType, index: Number) => (
          <div
            key={member._id}
            className="hover:bg-slate-100 text-sm border-b-2 border-slate-400 flex justify-between items-center p-2"
          >
            <div className="flex items-center mb-2">
              <Avatar className="w-10 h-10 mt-1">
                <AvatarImage src={member.avatar} alt={member.avatar} />
                <AvatarFallback className="w-10 h-10 bg-orange-500">
                  {member.firstName[0]}
                  {member.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 mt-1">
                <div className="font-semibold">{member.username}</div>
                <div className="text-gray-500 text-sm">{member.email}</div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              {isOwner && (
                <div>
                  {member.role?.toLowerCase() === 'owner' ? (
                    <></>
                  ) : (
                    <button
                      className="py-1 px-1 rounded text-white bg-rose-500 hover:bg-rose-600 flex items-center"
                      onClick={() => handleDelete(member?._id)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
              <div className="py-1 px-3 rounded text-white bg-stone-500 hover:bg-stone-600">
                {member.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
