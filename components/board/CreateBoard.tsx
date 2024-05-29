'use client';
import { FolderKanbanIcon } from 'lucide-react';
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

const formSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  workspace: z.string({
    required_error: 'Description is required',
  }),
});

const CreateBoard = ({ loadBoard }: { loadBoard: () => void }) => {
  const { currentWorkspace } = useAppContext();
  const { _id, name, description } = currentWorkspace as {
    _id: string;
    name: string;
    description: string;
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      workspace: _id,
    },
  });
  const { watch } = form;
  const nameValue = watch('name');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await boardApiRequest.createBoard(values);
      if (result.statusCode === 200) {
        loadBoard();
        form.reset();
      }
    } catch (err) {
      console.error('Error creating workspace:', err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3 bg-[#3A1B05] rounded-xl hover:bg-[#a5683c]"
          size="sm"
        >
          <FolderKanbanIcon absoluteStrokeWidth />
          <span>Create board</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new board</DialogTitle>
          <DialogDescription>Please provide your board name</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board Name for {name}</FormLabel>
                    <FormControl>
                      <Input placeholder="Board Name" {...field} />
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

export default CreateBoard;
