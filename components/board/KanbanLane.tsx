// KanbanLane.tsx
'use client';
import { DndContext, useDroppable } from '@dnd-kit/core';
import DragCard from './KanbanCard';
import { TaskType } from '@/lib/schema/task/task.schema';
import { SquarePlus } from 'lucide-react';
interface KanbanLaneProps {
  title: string;
  tasks: TaskType[];
}

export default function KanbanLane({ title, tasks }: KanbanLaneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });
  console.log(isOver);
  const className = `items-center flex flex-col gap-3 bg-slate-300 min-h-96 min-w-[310px] p-2 rounded-xl  ${
    isOver ? 'bg-green-300' : ''
  }`;
  return (
    <div>
      <div ref={setNodeRef} className={className}>
        <div>{title}</div>
        {tasks.map((task, key) => (
          <DragCard task={task} key={key} index={key} parent={title} />
        ))}
        <div className="flex">
          <SquarePlus className="mr-2" />
          Create issue
        </div>
      </div>
    </div>
  );
}
