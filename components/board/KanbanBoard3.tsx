'use client';
import { useState } from 'react';
import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import KanbanLane from './KanbanLane3';
import { Check, Plus, UserRoundPlus, X } from 'lucide-react';
import { Search } from '@/components/ui/searchButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  TooltipProvider,
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
    tasks: [
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
        status: 'In progress',
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
  },
  {
    name: 'Bug Fixes',
    board: '3',
    tasks: [
      {
        _id: '423',
        name: 'Task 424',
        schedule: {
          from: '2022-02-01',
          to: '2022-02-28',
        },
        status: 'In Progress',
        userId: {
          _id: '5',
          firstName: 'Bob',
          lastName: 'Smith',
          username: 'bobsmith',
          email: 'bobsmith@example.com',
          avatar: 'https://github.com/bobsmith.png',
          gender: 'male',
        },
        indexCount: 13,
        isPriority: false,
        createdAt: '2022-02-01T00:00:00Z',
        updatedAt: '2022-02-01T00:00:00Z',
      },
      {
        _id: '524',
        name: 'Task 525',
        schedule: {
          from: '2022-03-01',
          to: '2022-03-31',
        },
        status: 'Done',
        userId: {
          _id: '6',
          firstName: 'Charlie',
          lastName: 'Brown',
          username: 'charliebrown',
          email: 'charliebrown@example.com',
          avatar: 'https://github.com/charliebrown.png',
          gender: 'male',
        },
        indexCount: 14,
        isPriority: true,
        createdAt: '2022-03-01T00:00:00Z',
        updatedAt: '2022-03-01T00:00:00Z',
      },
    ],
  },
];

const statuses = ['To Do', 'In Progress', 'Done'];

export default function KanbanBoard() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const [laneName, setLaneName] = useState('');
  const [issues, setIssues] = useState(issueData);
  const [open, setOpen] = useState(false);
  const [lanes, setLanes] = useState(statuses);

  const addNewLane = () => {
    // Your add new lane logic
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const { task, parent } = active.data.current;
    const [targetIssue, targetLane] = over.id.split('-');

    // Find the issue that currently contains the task
    const sourceIssue = issues.find((issue) =>
      issue.tasks.some((t) => t._id === task._id),
    );

    // Remove the task from the source issue
    if (sourceIssue) {
      sourceIssue.tasks = sourceIssue.tasks.filter((t) => t._id !== task._id);
    }

    // Find the target issue
    const targetIssueObj = issues.find((issue) => issue.name === targetIssue);

    // Add the task to the target issue with the new status
    if (targetIssueObj) {
      const updatedTask = { ...task, status: targetLane };
      targetIssueObj.tasks.push(updatedTask);
    }

    // Update the issues state
    setIssues([...issues]);
  };

  const laneToTasksMap = lanes.reduce((map, lane) => {
    map[lane] = issues.flatMap((issue) =>
      issue.tasks.filter(
        (task) => task.status.toLowerCase() === lane.toLowerCase(),
      ),
    );
    return map;
  }, {} as Record<string, any[]>);

  return (
    <div>
      {/* Setting tab */}
      <div className="flex flex-row justify-between mt-5">
        <div className="flex flex-row">
          <Search placeholder="Search" />
          <div className="flex flex-row-reverse ml-2 space-x-reverse -space-x-1.5">
            {members.map((member) => (
              <TooltipProvider delayDuration={100} key={member._id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                      <AvatarImage src={member.avatar} alt={member.username} />
                      <AvatarFallback className="w-10 h-10">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {member.username}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <div className="flex ml-2 bg-slate-300 p-2 rounded-full hover:-translate-y-1 transition duration-30">
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
        </div>
      </div>

      {/* Board */}
      <div className="flex flex-row my-5">
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragEnd={onDragEnd}
        >
          <div className="flex flex-col ">
            {issues.map((issue) => (
              <div key={issue.name} className="flex flex-row">
                <div className="w-28 align-middle text-center flex my-auto">
                  <h2>{issue.name}</h2>
                </div>
                <div className="flex flex-row ">
                  {lanes.map((lane) => {
                    const tasks = issue.tasks.filter(
                      (task) => task.status === lane,
                    );
                    return (
                      <KanbanLane
                        key={`${issue.name}-${lane}`}
                        title={lane}
                        issue={issue.name}
                        tasks={tasks}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </DndContext>
        <div className="bg-dark_brown h-fit p-2 rounded-xl hover:opacity-55 cursor-pointer">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div onClick={(e) => e.stopPropagation()}>
                <Plus color="white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 mt-3">
              <div className="flex flex-col w-full max-w-sm space-x-2 space-y-2">
                <Input
                  type="text"
                  placeholder="New Lane Name"
                  value={laneName}
                  onChange={(e) => setLaneName(e.target.value)}
                />
                <div className="flex flex-row justify-end gap-2">
                  <div
                    className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 hover:bg-slate-200"
                    onClick={addNewLane}
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
    </div>
  );
}
