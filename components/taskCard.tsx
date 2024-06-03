'use client';
import React from 'react';
import { Pencil, Ellipsis, Check, Trash, X } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TaskType } from '@/lib/schema/task/task.schema';
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
import { Checkbox } from '@/components/ui/checkbox';
import { set } from 'date-fns';
import { stat } from 'fs';

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
export default function TaskCard({
  taskInput,
  deleteTask,
  updateTask,
}: {
  taskInput: TaskType;
  deleteTask: (id: string | undefined) => void;
  updateTask: (id: string, body: any) => void;
}) {
  const inputRef = React.useRef(null);

  // React.useEffect(() => {
  //   function handleClickOutside(event: any) {
  //     if (
  //       inputRef.current &&
  //       (inputRef.current as HTMLElement).contains(event.target)
  //     ) {
  //       setEditTask(false);
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState(taskInput);
  const [editTask, setEditTask] = React.useState(false);
  const [taskName, setTaskName] = React.useState(taskInput.name);

  //Update task name
  const updateTaskName = () => {
    console.log(task.name);
    if (task._id) {
      updateTask(task._id, { name: taskName, status: task.status });
    }
    setEditTask(false);
    setTask({ ...task, name: taskName });
  };
  return (
    <div className="w-72 flex-shrink-0">
      <Card className="hover:bg-gray-100 border-l-4 border-r-0 border-x-yellow-700 group">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-row my-auto h-6">
            <Checkbox className="mr-2" />
            {editTask ? (
              <div
                ref={inputRef}
                className="flex flex-col rounded-md border border-input border-dark_brown text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2"
              >
                <input
                  type="text"
                  className="w-36 mr-0.5 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
                  defaultValue={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <div className="flex flex-row justify-end gap-2 mt-2">
                  <div
                    className="flex justify-center items-center border-2 bg-red-500 rounded-md p-[1px]"
                    onClick={() => {
                      setTaskName(taskInput.name);
                      setEditTask(false);
                    }}
                  >
                    <X size={20} className="m-auto" color="white" />
                  </div>
                  <div
                    className="flex justify-center items-center border-2 bg-green-500 rounded-md p-[1px]"
                    onClick={() => updateTaskName()}
                  >
                    <Check size={20} className="m-auto" color="white" />
                  </div>
                </div>
              </div>
            ) : (
              <CardDescription className="w-auto max-w-40 mr-0.5">
                {task?.name}
              </CardDescription>
            )}
            <Pencil
              size={15}
              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={(e) => setEditTask(!editTask)}
            />
          </div>
          <div className="flex flex-row gap-x-2 mb-3 -translate-y-1">
            <div className="bg-blue-400 rounded-md px-1 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Ellipsis size={15} color="white" />
            </div>
            <div
              className="bg-red-400 rounded-md px-1 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => deleteTask(taskInput._id)}
            >
              <Trash size={15} color="white" />
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between flex-row">
          <div>KAN-{task?.index}</div>
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
