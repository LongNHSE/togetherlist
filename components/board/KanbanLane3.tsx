'use client';
import { useDroppable } from '@dnd-kit/core';
import DragCard from './KanbanCard';
import { TaskType } from '@/lib/schema/task/task.schema';
import { SquarePlus } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PopoverClose } from '@radix-ui/react-popover';

interface KanbanLaneProps {
  title: string;
  tasks: TaskType[];
  issue: any;

  addNewTask: (name: string, section: string, title: string) => void;
  deleteTask: (id: string) => void;
}

export default function KanbanLane({
  title,
  tasks,
  issue,
  addNewTask,
  deleteTask,
}: KanbanLaneProps) {
  const [newTaskName, setNewTaskName] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { isOver, setNodeRef } = useDroppable({
    id: `${issue.name}-${title}-${issue._id}`,
  });

  const className = `items-center flex flex-col gap-3 bg-gray-100 border-2 border-white min-h-96 min-w-[310px] p-2 ${
    isOver ? 'bg-green-200' : ''
  }`;
  console.log(!isOver);
  return (
    <div ref={setNodeRef} className={className}>
      {tasks.map((task, key) => (
        <DragCard
          task={task}
          key={task._id}
          index={key}
          parent={title}
          deleteTask={deleteTask}
        />
      ))}

      <div className="flex flex-col mt-auto mb-9 justify-center">
        <Popover onOpenChange={() => setNewTaskName('')}>
          <PopoverTrigger
            asChild
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <SquarePlus className="mr-2" />
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="flex flex-row gap-4 justify-center mx-auto">
              <Input
                placeholder="Name"
                onChange={(event) => setNewTaskName(event.target.value)}
              />
              <PopoverClose>
                <Button
                  variant="default"
                  onClick={() => {
                    addNewTask(newTaskName, issue._id, title);
                    setIsPopoverOpen(false);
                  }}
                >
                  Create
                </Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
