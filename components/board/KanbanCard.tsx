'use client';
import React from 'react';
import { TaskType } from '@/lib/schema/task.schema';
import { useDraggable } from '@dnd-kit/core';
import TaskCard from '@/components/taskCard';
const DragCard = ({
  task,
  index,
  parent,
}: {
  task: TaskType;
  index: number;
  parent: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task?._id ?? '',
    data: {
      task,
      index,
      parent,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
      <TaskCard taskInput={task}></TaskCard>
    </div>
  );
};

export default DragCard;