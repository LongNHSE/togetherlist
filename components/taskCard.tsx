'use client';
import React from 'react';
import { Pencil, Ellipsis, Check } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TaskType } from '@/lib/schema/task.schema';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

const members = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe1',
    email: 'johndoe1@example.com',
    avatar: 'https://github.com/johndoe1.png',
    gender: 'male',
  },
  {
    _id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    email: 'janedoe@example.com',
    avatar: 'https://github.com/janedoe.png',
    gender: 'female',
  },
  {
    _id: '3',
    firstName: 'Bob',
    lastName: 'Smith',
    username: 'bobsmith',
    email: 'bobsmith@example.com',
    avatar: 'https://github.com/bobsmith.png',
    gender: 'male',
  },
  {
    _id: '4',
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicejohnson',
    email: 'alicejohnson@example.com',
    avatar: 'https://github.com/alicejohnson.png',
    gender: 'female',
  },
  {
    _id: '5',
    firstName: 'Charlie',
    lastName: 'Brown',
    username: 'charliebrown',
    email: 'charliebrownasdasdasdasdasd@example.com',
    avatar: 'https://github.com/charliebrown.png',
    gender: 'male',
  },
];
export default function TaskCard({ taskInput }: { taskInput: TaskType }) {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState(taskInput);
  return (
    <div className="w-72 flex-shrink-0">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-row mt-1">
            <CardDescription className="w-auto max-w-40 mr-4">
              {task?.name}
            </CardDescription>
            <Pencil size={15} onClick={(e) => console.log('Click')} />
          </div>
          <div className="bg-slate-100 rounded-md px-1 ">
            <Ellipsis size={20} />
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between flex-row">
          <div>KAN-{task?.indexCount}</div>
          <div className="w-8 h-8">
            <Popover open={open} onOpenChange={setOpen}>
              {/* Delay default is 700ms */}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    {/* Trigger Popover when press */}
                    <PopoverTrigger asChild>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('asd');
                        }}
                      >
                        <Avatar>
                          <AvatarImage
                            src={task?.userId?.avatar}
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {/* Current user's infomation who was assigned to this task */}
                    {task?.userId
                      ? members.find(
                          (member) => member._id === task.userId?._id,
                        )?.username
                      : 'Unassigned'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <PopoverContent className="w-80">
                <Command>
                  <CommandInput placeholder="Search member..." />
                  <CommandEmpty>No member found.</CommandEmpty>
                  <CommandGroup>
                    {members.map((member) => (
                      <CommandItem
                        key={member._id}
                        value={member._id}
                        className="flex items-center flex-row"
                        onSelect={(currentValue) => {
                          const foundMember = members.find(
                            (member) => member._id === currentValue,
                          );
                          if (foundMember) {
                            setTask({
                              ...task,
                              userId: foundMember,
                            });
                          }
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            task?.userId?._id === member._id
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} alt="@shadcn" />
                          <AvatarFallback className="w-8 h-8">
                            CN
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center ml-2 w-56 truncate">
                          {member.email}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
