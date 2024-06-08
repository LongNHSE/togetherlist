'use client';
import React from 'react';
import { TaskType } from '@/lib/schema/task/task.schema';
import { useDraggable } from '@dnd-kit/core';
import TaskCard from '@/components/taskCard';
import Modal from '../modal/Modal';
const DragCard = ({
  task,
  index,
  parent,
  deleteTask,
  updateTask,
}: {
  task: TaskType;
  index: number;
  parent: string;
  deleteTask: (id: string | undefined) => void;
  updateTask: (id: string, body: any) => void;
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [taskEl, setTaskEl] = React.useState(task);
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
    <div>
      <div style={style} ref={setNodeRef} {...listeners} {...attributes}>
        <TaskCard
          taskInput={taskEl}
          deleteTask={deleteTask}
          updateTask={updateTask}
          setOpenModal={setOpenModal}
        ></TaskCard>
      </div>

      {/* The modal component is rendered here to prevent drag and drop from being affected by the modal. */}
      <div>
        <Modal
          open={openModal}
          setOpen={setOpenModal}
          task={taskEl}
          setTask={setTaskEl}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
};

export default DragCard;
