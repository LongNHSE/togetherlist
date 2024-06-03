'use client';
import { TaskStatusType } from '@/lib/schema/board/task-status.schema';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TaskType } from '@/lib/schema/task/task.schema';
import { use, useEffect, useState } from 'react';

interface ProgressStatus {
  value: number;
  label: string;
  index: number;
}

interface ProgressTasksProps {
  width: string;
  idLabel: string;
  labelClassName?: string;
  labelValue: string;
  statuses: ProgressStatus[];
  taskStatus: TaskStatusType[];
}

const ProgressTasks = ({
  width,
  idLabel,
  labelClassName,
  labelValue,
  statuses,
  taskStatus,
}: ProgressTasksProps) => {
  const [filteredStatuses, setFilteredStatuses] = useState<ProgressStatus[]>(
    [],
  );
  // statuses = { ...statuses,statuses };
  // console.log(statuses);
  statuses = statuses?.filter(
    (status) => status.label !== null && status.value !== 0,
  );
  function stringToColor(str: string): string | null {
    if (!str) return null;
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  function removeAfterTwoDecimals(num: number) {
    return parseFloat(num.toFixed(0));
  }

  const getBackGroundColor = (status: string) => {
    const result: TaskStatusType | null =
      taskStatus?.find((ts) => ts.name === status) || null;
    return result?.color;
  };

  const sortStatuses = () => {
    statuses = statuses?.map((status) => {
      let updatedStatus = { ...status };
      taskStatus?.forEach((ts) => {
        if (status.label === ts.name) {
          updatedStatus.index = ts.index;
        }
      });
      return updatedStatus;
    });
    statuses = statuses?.sort((a, b) => a.index - b.index);
  };

  useEffect(() => {
    let newStatuses = statuses?.filter(
      (status) => status.label !== null && status.value !== 0,
    );

    newStatuses = newStatuses?.map((status) => {
      let updatedStatus = { ...status };
      taskStatus?.forEach((ts) => {
        if (status.label === ts.name) {
          updatedStatus.index = ts.index;
        }
      });
      return updatedStatus;
    });

    newStatuses = newStatuses?.sort((a, b) => a.index - b.index);
    console.log(newStatuses);
    setFilteredStatuses(newStatuses);
  }, [taskStatus]);

  // Usage
  return (
    <TooltipProvider>
      <div className={`flex flex-col ${width} gap-2`}>
        <Label
          htmlFor={idLabel}
          className={`text-xs font-bold ${labelClassName || ''}`}
        >
          {labelValue}
        </Label>
        <div className="relative w-full h-6 bg-gray-200 rounded">
          {filteredStatuses?.map((status, index) => {
            console.log(status);
            const leftPercentage = filteredStatuses
              .slice(0, index)
              .reduce((acc, curr) => acc + curr.value, 0);
            const isOnlyItem = filteredStatuses.length === 1;
            const isFirstItem = index === 0;
            const isLastItem = index === filteredStatuses.length - 1;

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`h-full absolute p-[12px] ${
                      isOnlyItem ? 'rounded-md' : ''
                    }  ${isFirstItem ? 'rounded-l-md' : ''} ${
                      isLastItem ? 'rounded-r-md' : ''
                    }`}
                    style={{
                      backgroundColor: getBackGroundColor(status.label),
                      width: `${status.value}%`,
                      left: `${leftPercentage}%`,
                    }}
                  >
                    {' '}
                  </div>
                </TooltipTrigger>
                {status.label && (
                  <TooltipContent side="top">
                    {status.label} - {removeAfterTwoDecimals(status.value)}%
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ProgressTasks;
