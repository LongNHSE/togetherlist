'use client';
import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import KanbanLane from './KanbanLane';
import { Check, Plus, TriangleAlert, UserRoundPlus, X } from 'lucide-react';

import { TaskType } from '@/lib/schema/task/task.schema';
import { useState } from 'react';
import { Search } from '@/components/ui/searchButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

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

const issueData = [
  {
    name: 'User Feature',
    board: '2',
    tasks: [],
  },
];
export default function KanbanBoard() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const [laneName, setLaneName] = useState<string>('');
  const [issues, setIssues] = useState(issueData);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [lanes, setLanes] = useState<{ [key: string]: Array<TaskType> }>({
    'To Do': [
      {
        _id: '1',
        name: 'Task 1',
        schedule: {
          from: '2022-01-01',
          to: '2022-01-31',
        },
        status: 'In Progress',
        userId: {
          _id: '4',
          firstName: 'Alice',
          lastName: 'Johnson',
          username: 'alicejohnson',
          email: 'alicejohnson@example.com',
          avatar: 'https://github.com/alicejohnson.png',
          gender: 'female',
        },
        indexCount: 0,
        isPriority: true,
        createdAt: '2022-01-01T00:00:00Z',
        updatedAt: '2022-01-01T00:00:00Z',
      },
      {
        _id: '44',
        name: 'Task 1',
        schedule: {
          from: '2022-01-01',
          to: '2022-01-31',
        },
        status: 'In Progress',
        userId: {
          _id: '4',
          firstName: 'Alice',
          lastName: 'Johnson',
          username: 'alicejohnson',
          email: 'alicejohnson@example.com',
          avatar: 'https://github.com/alicejohnson.png',
          gender: 'female',
        },
        indexCount: 0,
        isPriority: true,
        createdAt: '2022-01-01T00:00:00Z',
        updatedAt: '2022-01-01T00:00:00Z',
      },
    ],
    Done: [
      {
        _id: '21',
        name: 'Task 221',
        schedule: {
          from: '2022-01-01',
          to: '2022-01-31',
        },
        status: 'In Progress',
        userId: {
          _id: '4',
          firstName: 'Alice',
          lastName: 'Johnson',
          username: 'alicejohnson',
          email: 'alicejohnson@example.com',
          avatar: 'https://github.com/alicejohnson.png',
          gender: 'female',
        },
        indexCount: 12,
        isPriority: true,
        createdAt: '2022-01-01T00:00:00Z',
        updatedAt: '2022-01-01T00:00:00Z',
      },
      {
        _id: '322',
        name: 'Task 22331',
        schedule: {
          from: '2022-01-01',
          to: '2022-01-31',
        },
        status: 'In Progress',
        userId: {
          _id: '4',
          firstName: 'Alice',
          lastName: 'Johnson',
          username: 'alicejohnson',
          email: 'alicejohnson@example.com',
          avatar: 'https://github.com/alicejohnson.png',
          gender: 'female',
        },
        indexCount: 22,
        isPriority: true,
        createdAt: '2022-01-01T00:00:00Z',
        updatedAt: '2022-01-01T00:00:00Z',
      },
    ],
    Unassigned: [],
  });

  const addNewLane = () => {
    if (!lanes[laneName]) {
      setLanes((prevLanes) => ({
        ...prevLanes,
        [laneName]: [],
      }));
    } else if (laneName === '') {
      toast({
        title: <TriangleAlert size={20} />,
        variant: 'warning',
        description: 'Lane name cannot be empty! Please enter a name.',
      });
      return;
    } else {
      toast({
        title: <TriangleAlert size={20} />,
        variant: 'warning',
        description: 'Lane already exists! Please choose another name.',
      });
      return;
    }
    setOpen(false);
    setLaneName('');
  };

  const onDragEnd = (e: any) => {
    console.log(e.over);
    setLoading(false);
    // The lane where the task was dropped
    const lane = e.over?.id;

    // The task that was dropped
    const task = e.active.data.current?.task;

    // The lane where the task was dragged from
    const parent = e.active.data.current?.parent;

    // If the task was dropped outside of a lane
    if (lane === undefined) return;

    // If the task was dropped in a different lane
    if (lane !== parent) {
      // Remove the task from the original lane
      setLanes((prevLanes) => {
        const newLanes = { ...prevLanes };
        newLanes[parent] = newLanes[parent].filter((t) => t._id !== task._id);

        // The index of the task in the lane
        const index = newLanes[lane].length;

        // Add the task to the new lane at the correct index
        newLanes[lane] = [
          ...newLanes[lane].slice(0, index),
          task,
          ...newLanes[lane].slice(index),
        ];

        return newLanes;
      });
      setLoading(true);
    }
  };

  return (
    <div>
      {/* Setting tab */}
      <div className="flex flex-row justify-between mt-5">
        <div className="flex flex-row">
          <Search placeholder="Search" />
          <div className="flex flex-row-reverse ml-2 space-x-reverse -space-x-1.5">
            {members.map((member) => {
              return (
                <TooltipProvider delayDuration={100} key={member._id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar
                        className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30"
                        key={member._id}
                      >
                        <AvatarImage src={member.avatar} alt="@shadcn" />
                        <AvatarFallback className="w-10 h-10">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {/* Current user's infomation who was assigned to this task */}
                      {member.username}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
          <div className="flex ml-2 bg-slate-300 p-2 rounded-full hover:-translate-y-1 transition duration-30">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <UserRoundPlus />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="mt-3">
                  {/* Current user's infomation who was assigned to this task */}
                  Add member
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className=""></div>
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragEnd={onDragEnd}
      >
        <div className="flex flex-row my-10 gap-6">
          {/* {issues &&
            issues.map((issue) => (
              <KanbanLane
                key={issue.name}
                title={issue.name}
                tasks={issue.tasks}
              />
            ))} */}
          {lanes &&
            Object.keys(lanes).map((lane) => (
              <KanbanLane
                // The key prop is a string that includes the lane and the IDs of all its tasks
                // This ensures that each KanbanLane has a unique key even when tasks are moved around
                key={lane + lanes[lane].map((task) => task._id).join(',')}
                title={lane}
                tasks={lanes[lane]}
              />
            ))}
          <div className="bg-dark_brown h-fit p-2 rounded-xl hover:opacity-55 cursor-pointer">
            <Popover open={open} onOpenChange={setOpen}>
              {/* Delay default is 700ms */}
              <PopoverTrigger asChild>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('asd');
                  }}
                >
                  <Plus color="white" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 mt-3">
                {' '}
                <div className="flex flex-col w-full max-w-sm space-x-2 space-y-2">
                  <Input
                    type="Text"
                    placeholder=""
                    value={laneName}
                    onChange={(e) => setLaneName(e.target.value)}
                  />
                  <div className="flex flex-row justify-end gap-2">
                    <div
                      className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 hover:bg-slate-200"
                      onClick={() => addNewLane()}
                    >
                      <Check size={25} />
                    </div>
                    <div
                      className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 hover:bg-slate-200"
                      onClick={() => {
                        setOpen(false);
                        setLaneName('');
                      }}
                    >
                      <X size={25} />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
