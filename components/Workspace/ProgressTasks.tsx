'use client';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProgressStatus {
  value: number;
  colorClass: string;
  label: string;
}

interface ProgressTasksProps {
  width: string;
  idLabel: string;
  labelClassName?: string;
  labelValue: string;
  statuses: ProgressStatus[];
}

const ProgressTasks = ({
  width,
  idLabel,
  labelClassName,
  labelValue,
  statuses,
}: ProgressTasksProps) => {
  return (
    <TooltipProvider>
      <div className={`flex flex-col ${width} gap-2`}>
        <Label
          htmlFor={idLabel}
          className={`text-xs font-bold ${labelClassName || ''}`}
        >
          {labelValue}
        </Label>
        <div className="relative w-full h-4 bg-gray-200 rounded">
          {statuses.map((status, index) => {
            const leftPercentage = statuses
              .slice(0, index)
              .reduce((acc, curr) => acc + curr.value, 0);
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`${status.colorClass} h-full absolute`}
                    style={{
                      width: `${status.value}%`,
                      left: `${leftPercentage}%`,
                    }}
                  ></div>
                </TooltipTrigger>
                <TooltipContent side="top">{status.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ProgressTasks;
