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

const formSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  }),
  workspace: z.string({
    required_error: 'WorkspaceId is required',
  }),
});

const AddMember = ({ loadMember }: { loadMember: () => void }) => {
  const { currentWorkspace } = useAppContext();
  if (!currentWorkspace) return null;
  const { _id, name } = currentWorkspace as {
    _id: string;
    name: string;
    description: string;
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      workspace: _id,
    },
  });
  const { watch } = form;
  const nameValue = watch('email');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await boardApiRequest.createBoard(values);
      if (result.statusCode === 200) {
        loadMember();
        form.reset();
      }
    } catch (err) {
      console.error('Error creating workspace:', err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
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
              <Button
                size="lg"
                className="w-full"
                type="submit"
                disabled={!nameValue}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMember;
