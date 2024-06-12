'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import createWorkspaceImg from '@/public/workspace/createWorkspace.jpg';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Network } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '../ui/textarea';
import workspaceApiRequest from '@/apiRequest/workspace/workspace.api';
import { useAppContext } from '@/context/Provider';

const formSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  banner: z.string(),
  description: z.string({
    required_error: 'Description is required',
  }),
});

const CreateWorkspace = () => {
  const { setCurrentWorkspace, loading, setLoading } = useAppContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      banner: 'https://via.placeholder.com/150',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const valuesWithDefaults = {
      config: {
        visibility: true,
        boardCreationRestrictions: false,
        sharingBoardRestrictions: false,
      },
      ...values,
    };

    try {
      setLoading(true);
      const response = await workspaceApiRequest.create(valuesWithDefaults);
      localStorage.setItem('current_workspace', JSON.stringify(response.data));
      setCurrentWorkspace(response.data);
      window.location.reload();
    } catch (err) {
      console.error('Error creating workspace:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-3 bg-[#3A1B05] rounded-3xl hover:bg-[#a5683c]"
          size="sm"
        >
          <Network absoluteStrokeWidth />
          <span>Create workspace</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70rem] h-[40rem] overflow-auto grid grid-cols-[1fr_0.75fr] text-xl bg-slate-50">
        <div className="max-w-md flex flex-col justify-center items-center text-center pl-9 ">
          {/* Header */}
          <DialogHeader className="flex flex-col items-start">
            <DialogTitle className="font-semibold text-3xl">
              Let&apos;s build a Workspace
            </DialogTitle>
            <DialogDescription>
              Boost your productivity by making it easier for everyone to access
              boards in one location.
            </DialogDescription>
          </DialogHeader>
          {/* Content */}
          <div className="text-start">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 "
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Together List" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name of your company, team or organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl className="h-20">
                        <Textarea
                          className="h-[12rem] resize-none overflow-auto"
                          placeholder="Our team organizes everything here"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Get your members on board with a few words about your
                        Workspace.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size="lg" className="w-full" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src={createWorkspaceImg}
            alt="Create workspace"
            height={500}
            width={500}
            quality={100}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
