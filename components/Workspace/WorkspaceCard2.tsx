'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProgressTasks from './ProgressTasks';
import { BoardType } from '@/lib/schema/board/board.schema';
import Image from 'next/image';
import banner from '@/public/testBanner.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Delete, Trash2 } from 'lucide-react';

const WorkspaceCard = ({
  board,
  deleteBoard,
}: {
  board: BoardType;
  deleteBoard: () => void;
}) => {
  return (
    <div>
      <Card className="w-[19.3rem] 2xl:w-[25rem] h-auto flex flex-col space-y-1 p-1 bg-white shadow-lg rounded-xl select-none group">
        <CardHeader className="flex flex-col gap-3">
          {/* Banner */}
          <div className="relative w-full h-48 overflow-hidden rounded-md">
            <Image
              alt="banner"
              src={banner}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          {/* Title + Progress */}
          <div className="flex gap-1 flex-col">
            <div className="flex flex-row justify-between">
              <CardTitle className="text-start font-semibold tracking-wide text-xl">
                {board?.name}
              </CardTitle>
              <div>
                <div
                  className="bg-red-500 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition"
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    deleteBoard();
                  }}
                >
                  <Trash2 color="white" />
                </div>
              </div>
            </div>
            {/* <span className="text-slate-500">UI/UX Design</span> */}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          {/* Progress */}
          <div className="flex items-center gap-3">
            <ProgressTasks
              width="w-full"
              idLabel="example-progress"
              labelValue="Progress"
              statuses={board?.statuses}
            />
          </div>
        </CardContent>

        <CardFooter className="flex -space-x-2 items-center justify-end">
          {/* Member */}
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkspaceCard;
