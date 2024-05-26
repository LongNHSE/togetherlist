// KanbanLane.tsx
'use client';
import { DndContext, useDroppable } from '@dnd-kit/core';
import DragCard from './KanbanCard';
import { TaskType } from '@/lib/schema/task.schema';

interface KanbanLaneProps {
  title: string;
  tasks: TaskType[];
}

export default function KanbanLane({ title, tasks }: KanbanLaneProps) {
  console.log(tasks);
  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });
  const className = `items-center flex flex-col gap-3 bg-slate-300 min-h-96 min-w-[310px] p-2 rounded-xl  ${
    isOver ? 'bg-green-200' : ''
  }`;
  return (
    <div>
      <div ref={setNodeRef} className={className}>
        <div>{title}</div>
        {tasks.map((task, key) => (
          <DragCard task={task} key={key} index={key} parent={title} />
        ))}
      </div>
    </div>
  );
}
