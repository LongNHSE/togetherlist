import Layout from '@/components/sidebar/layout';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ConfirmDelete } from '@/components/modal/ConfirmDelete';
import { Metadata } from 'next';
import { TaskType } from '@/lib/schema/task/task.schema';
import { Check, X } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { addDays } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export const metadata: Metadata = {
  title: 'Modal',
  description: 'Modal Page',
};

interface TaskModalPropType {
  open: boolean;
  setOpen: any;
  task: TaskType;
  setTask: any;

  updateTask: (id: string, body: any) => void;
}

export default function Modal({
  open,
  setOpen,
  task,
  updateTask,
  setTask,
}: TaskModalPropType) {
  const [description, setDescription] = React.useState(task.description);
  // const initiallySelectedDates = [new Date(), addDays(new Date(), 1)];

  const initialRange: DateRange = {
    from: new Date(),
    to: addDays(new Date(), 4),
  };

  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [isChange, setIsChange] = React.useState(false);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const updateTaskDescription = (description: string | undefined) => {
    if (task._id) {
      updateTask(task._id, { description });
    }
    setTask({ ...task, description });
  };

  React.useEffect(() => {
    if (open) {
      setIsChange(false);
      setDescription(task?.description || '');
    }
  }, [open, task.description]);

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <DialogContent className="max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <DialogDescription className="text-sm font-bold">
                KAN-{task?.index} - {task?.name}
              </DialogDescription>
            </div>
            {/* <div>
              <select className="bg-white border border-gray-300 h-9 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="inprogress">In Progress</option>
                <option value="completed">Done</option>
                <option value="pending">Test</option>
              </select>
            </div> */}
          </div>
          {/* <div className="border-b pb-4 mb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-red-600">
                Task: Important
              </DialogTitle>
            </DialogHeader>
          </div> */}
          <div className="mb-4">
            <DialogDescription className="font-bold mb-2">
              Description
            </DialogDescription>
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description here..."
              value={description}
              onResize={(e) => {}}
              onChange={(e) => {
                setDescription(e.target.value);
                setIsChange(true);
              }}
            />
            {isChange ? (
              <div className="flex flex-row justify-end gap-2">
                <div
                  className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 bg-green-400"
                  onClick={() => updateTaskDescription(description)}
                >
                  <Check size={25} color="white" />
                </div>
                <div
                  className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 bg-red-400"
                  onClick={() => {
                    setIsChange(false);
                    setDescription(task?.description || '');
                  }}
                >
                  <X size={25} color="white" />
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-end gap-2 mb-9"></div>
            )}
          </div>
          <div className="space-y-2 mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="default">Select Date</Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="range"
                  captionLayout="dropdown-buttons"
                  fromYear={1960}
                  toYear={new Date().getFullYear() + 10}
                  selected={range}
                  onSelect={(range) => {
                    setRange(range);
                  }}
                  initialFocus
                />
                <div onClick={() => setRange(undefined)}>
                  <X />
                </div>
              </PopoverContent>
            </Popover>

            <DialogDescription>
              <span className="font-semibold">From: </span>{' '}
              {task?.schedule?.from}
            </DialogDescription>
            <DialogDescription>
              <span className="font-semibold">To: </span> {task?.schedule?.to}
            </DialogDescription>
            <DialogDescription>
              <span className="font-semibold">Assignee:</span>{' '}
              {task?.assignee?.username}
            </DialogDescription>
            <DialogDescription>
              <span className="font-semibold">Priority:</span>{' '}
              {task?.isPriority}
            </DialogDescription>
          </div>
          <div className="flex justify-between ">
            <DialogDescription>
              <span className="font-semibold">Created at:</span>{' '}
              {formatDate(task?.createdAt)}
            </DialogDescription>
            <DialogDescription>
              <span className="font-semibold">Updated at:</span>{' '}
              {formatDate(task?.updatedAt)}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
