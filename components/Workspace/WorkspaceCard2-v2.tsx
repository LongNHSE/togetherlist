'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import ProgressTasks from './ProgressTasks';
import { BoardType } from '@/lib/schema/board/board.schema';
import Image from 'next/image';
import banner from '@/public/testBanner.jpg';

const WorkspaceCard = ({ board }: { board: BoardType }) => {
  const statuses = [
    { value: 20, colorClass: 'bg-red-500', label: 'Status 1' },
    { value: 30, colorClass: 'bg-blue-500', label: 'Status 2' },
    { value: 20, colorClass: 'bg-gray-500', label: 'Status 2' },
    { value: 20, colorClass: 'bg-green-500', label: 'Status 3' },
    { value: 10, colorClass: 'bg-pink-500', label: 'Status 4' },
  ];
  return (
    <div>
      {/* <Card className="max-w-[25rem] h-auto flex flex-col space-y-5 p-5 bg-white shadow-lg rounded-xl select-none"> */}
      <Card className="max-w-laptop lg:max-w-monitor h-auto flex flex-col space-y-5 p-5 bg-white shadow-lg rounded-xl select-none">
        <CardHeader className="flex flex-col gap-3">
          {/* Banner */}
          {/* <Image alt="banner" src={banner} width={1250} height={640} /> */}
          <div className="relative w-full h-48 overflow-hidden rounded-md">
            <Image
              alt="banner"
              src={banner}
              layout="fill"
              objectFit="cover" // This will make the image cover the container, maintaining its aspect ratio
              className="rounded-md"
            />
          </div>
          {/* Title + Progress */}
          <div className="flex gap-1 flex-col">
            <CardTitle className="text-start font-semibold tracking-wide text-xl">
              {board?.name}
            </CardTitle>
            <span className="text-slate-500">UI/UX Design</span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          {/* Progress */}
          <div className="flex items-center gap-3">
            {/* <ProgressTasks
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
            /> */}
            <ProgressTasks
              width="w-full"
              idLabel="example-progress"
              labelValue="Progress"
              statuses={statuses}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceCard;

