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
import { TaskStatusType } from '@/lib/schema/board/task-status.schema';

interface KanbanLaneProps {
  title: string;
  tasks: TaskType[];
  issue: any;
  status: TaskStatusType;

  addNewTask: (name: string, section: string, title: string) => void;
  deleteTask: (id: string | undefined) => void;
  updateTask: (id: string, body: any) => void;
}

export default function KanbanLane({
  title,
  tasks,
  issue,
  status,
  addNewTask,
  deleteTask,
  updateTask,
}: KanbanLaneProps) {
  const [newTaskName, setNewTaskName] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { isOver, setNodeRef } = useDroppable({
    id: `${issue.name}-${status._id}-${issue._id}`,
  });

  const className = `items-center flex flex-col gap-3 bg-gray-100 border-2 border-white min-h-96 h-full min-w-[310px] p-2 ${
    isOver ? 'bg-green-200' : ''
  }`;
  return (
    <div ref={setNodeRef} className={className}>
      {tasks.map((task, key) => (
        <DragCard
          task={task}
          key={task._id}
          index={key}
          parent={title}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}

      <div className="flex flex-col mt-auto mb-9 justify-center">
        <Popover onOpenChange={() => setNewTaskName('')}>
          <PopoverTrigger
            asChild
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <button><SquarePlus className="mr-2" /></button>
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
                    addNewTask(newTaskName, issue._id, status._id);
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
