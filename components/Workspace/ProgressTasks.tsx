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
  label: string;
}

interface ProgressTasksProps {
  width: string;
  idLabel: string;
  labelClassName?: string;
  labelValue: string;
  statuses: ProgressStatus[] | undefined;
}

const ProgressTasks = ({
  width,
  idLabel,
  labelClassName,
  labelValue,
  statuses,
}: ProgressTasksProps) => {
  function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

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
        <div className="relative w-full h-4 bg-gray-200 rounded">
          {statuses.map((status, index) => {
            const leftPercentage = statuses
              .slice(0, index)
              .reduce((acc, curr) => acc + curr.value, 0);
            const isOnlyItem = statuses.length === 1;
            const isFirstItem = index === 0;
            const isLastItem = index === statuses.length - 1;

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`h-full absolute ${
                      isOnlyItem ? 'rounded-md' : ''
                    }  ${isFirstItem ? 'rounded-l-md' : ''} ${
                      isLastItem ? 'rounded-r-md' : 'rounded-r-none'
                    }`}
                    style={{
                      backgroundColor: stringToColor(status.label),
                      width: `${status.value}%`,
                      left: `${leftPercentage}%`,
                    }}
                  ></div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {status.label} - {status.value}%
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ProgressTasks;
