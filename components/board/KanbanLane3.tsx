'use client';
import { useDroppable } from '@dnd-kit/core';
import DragCard from './KanbanCard';
import { TaskType } from '@/lib/schema/task.schema';

interface KanbanLaneProps {
  title: string;
  tasks: TaskType[];
  issue: string;
}

export default function KanbanLane({ title, tasks, issue }: KanbanLaneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `${issue}-${title}`,
  });

  const className = `items-center flex flex-col gap-3 border-2 bg-slate-300 min-h-96 min-w-[310px] p-2 ${
    isOver ? 'bg-green-200' : ''
  }`;

  return (
    <div ref={setNodeRef} className={className}>
      {tasks.map((task, key) => (
        <DragCard task={task} key={task._id} index={key} parent={title} />
      ))}
    </div>
  );
}
