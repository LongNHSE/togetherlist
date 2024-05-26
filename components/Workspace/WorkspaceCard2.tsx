'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ProgressTasks from './ProgressTasks';
import { BoardType } from '@/lib/schema/board/board.schema';

const WorkspaceCard = ({ board }: { board: BoardType }) => {
  return (
    <div>
      {/* <Card className="max-w-[25rem] h-auto flex flex-col space-y-5 p-5 bg-white shadow-lg rounded-xl select-none"> */}
      <Card className="max-w-laptop lg:max-w-monitor h-auto flex flex-col space-y-5 p-5 bg-white shadow-lg rounded-xl select-none">
        <CardHeader>
          {/* Breadcumb */}
          <Breadcrumb>
            {/* <BreadcrumbList>
              <BreadcrumbItem>
                <span className="text-sm">Organizations</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-sm">Team</span>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-sm">Product</span>
              </BreadcrumbItem>
            </BreadcrumbList> */}
          </Breadcrumb>
          {/* Title + Progress */}
          <div className="flex justify-between items-center">
            <CardTitle className="text-start font-semibold tracking-wide text-3xl">
              {board?.name}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          {/* Progress */}
          <div className="flex items-center gap-3">
            <ProgressTasks
              width="w-[40%]"
              idLabel="Not Done"
              labelValue="Not Done"
              progressValue={50}
              progressColorClass="bg-red-500"
            />

            <ProgressTasks
              width="w-[40%]"
              idLabel="On Going"
              labelValue="On Going"
              progressValue={50}
              progressColorClass="bg-yellow-500"
            />

            <ProgressTasks
              width="w-[40%]"
              idLabel="Done"
              labelValue="Done"
              progressValue={50}
              progressColorClass="bg-green-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceCard;
