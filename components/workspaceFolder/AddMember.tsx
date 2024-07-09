'use client';
import { FolderKanbanIcon, UserRoundPlus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAppContext } from '@/context/Provider';
import boardApiRequest from '@/apiRequest/board/board.api';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import memberApiRequest from '@/apiRequest/member/member.api';
import { useState } from 'react';

const formSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
});

const AddMember = ({ loadMember }: { loadMember: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const { currentWorkspace, members, mySubscriptions } = useAppContext();
  const [open, setOpen] = useState(false);
  if (!currentWorkspace) return null;
  const { _id, name } = currentWorkspace as {
    _id: string;
    name: string;
    description: string;
  };

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: '',
  //   },
  // });
  const { watch } = form;
  const nameValue = watch('email');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await memberApiRequest.addMemberByEmail(_id, values.email);
      if (result.statusCode === 200) {
        loadMember();
        form.reset();
        setOpen(false);
      } else if (result.statusCode === 400) {
        form.setError('email', {
          type: 'manual',
          message: result.message,
        });
      }
    } catch (err) {
      console.error('Error creating workspace:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger
        asChild
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className="flex bg-slate-300 p-2 rounded-full hover:-translate-y-1 transition duration-30 mx-9">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <UserRoundPlus />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="mt-3">
                Add member
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new member</DialogTitle>
          <DialogDescription>Please provide information</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invite member to {name}</FormLabel>
                    <FormControl>
                      <Input placeholder="Member's email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
            <div
              className={` ${
                members.length >= 3 &&
                mySubscriptions?.subscriptionType?.name.toLowerCase() === 'free'
                  ? 'hover:cursor-not-allowed'
                  : ''
              }`}
            >
              <Button
                size="lg"
                className={`w-full ${
                  members.length >= 3 &&
                  mySubscriptions?.subscriptionType?.name.toLowerCase() ===
                    'free'
                    ? 'bg-gray-400'
                    : 'bg-dark_brown'
                }`}
                type="submit"
                disabled={!nameValue}
              >
                Submit
              </Button>
            </div>
            <div className="text-red-400 text-sm text-center mt-2">
              <span>
                Free tier accounts cannot invite more than{' '}
                <span className="text-red-600 font-bold">3 </span>
                people.
              </span>
            </div>{' '}
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMember;
