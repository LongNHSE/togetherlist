'use client';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProgressTasksProps {
  width: string;
  idLabel: string;
  labelClassName?: string;
  labelValue: string;
  progressValue: number;
  progressColorClass: string;
  progressClassName?: string;
}

const ProgressTasks = ({
  width,
  idLabel,
  labelClassName,
  labelValue,
  progressValue,
  progressColorClass,
  progressClassName,
}: ProgressTasksProps) => {
  return (
    <div className={`flex flex-col ${width} gap-2`}>
      <Label
        htmlFor={idLabel}
        className={`text-xs font-bold ${labelClassName || ''}`}
      >
        {labelValue}
      </Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Progress
              id={idLabel}
              value={progressValue}
              colorClass={progressColorClass}
              className={progressClassName}
            />
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProgressTasks;
