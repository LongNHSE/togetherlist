// KanbanLane.tsx
'use client';
import { useDroppable } from '@dnd-kit/core';
import DragCard from './KanbanCard';
import { TaskType } from '@/lib/schema/task.schema';

interface KanbanLaneProps {
  title: string;
  tasks: TaskType[];
}

export default function KanbanLane({ title, tasks }: KanbanLaneProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <div>
      <div
        ref={setNodeRef}
        className=" items-center flex flex-col gap-3 bg-slate-400 min-h-96 min-w-[310px] p-2  rounded-xl"
      >
        <div>{title}</div>
        {tasks.map((task, key) => (
          <DragCard task={task} key={key} index={key} parent={title} />
        ))}
      </div>
    </div>
  );
}
