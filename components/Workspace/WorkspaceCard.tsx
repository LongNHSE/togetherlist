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

const WorkspaceCard = () => {
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
        <CardHeader>
          {/* Breadcumb */}
          <Breadcrumb>
            <BreadcrumbList>
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
            </BreadcrumbList>
          </Breadcrumb>
          {/* Title + Progress */}
          <div className="flex justify-between items-center">
            <CardTitle className="text-start font-semibold tracking-wide text-3xl">
              Project Title
            </CardTitle>
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
          {/* User */}
          <h3 className="text-lg font-semibold text-gray-700">Member:</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center flex-wrap -space-x-2 ">
              <div className="flex gap-2 items-center">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                        <AvatarImage
                          src="https://github.com/alicejohnson.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="w-10 h-10">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent
                      className="flex items-center gap-2"
                      side="bottom"
                    >
                      <span>Username</span>
                      <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                        Role
                      </Badge>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex gap-2 items-center">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                        <AvatarImage
                          src="https://github.com/alicejohnson.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="w-10 h-10">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent
                      className="flex items-center gap-2"
                      side="bottom"
                    >
                      <span>Username</span>
                      <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                        Role
                      </Badge>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex gap-2 items-center">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                        <AvatarImage
                          src="https://github.com/alicejohnson.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="w-10 h-10">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent
                      className="flex items-center gap-2"
                      side="bottom"
                    >
                      <span>Username</span>
                      <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                        Role
                      </Badge>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex gap-2 items-center">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                        <AvatarImage
                          src="https://github.com/alicejohnson.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="w-10 h-10">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent
                      className="flex items-center gap-2"
                      side="bottom"
                    >
                      <span>Username</span>
                      <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                        Role
                      </Badge>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex gap-2 items-center">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                        <AvatarImage
                          src="https://github.com/alicejohnson.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="w-10 h-10">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent
                      className="flex items-center gap-2"
                      side="bottom"
                    >
                      <span>Username</span>
                      <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                        Role
                      </Badge>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex gap-2 items-center">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                        <AvatarImage
                          src="https://github.com/alicejohnson.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="w-10 h-10">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent
                      className="flex items-center gap-2"
                      side="bottom"
                    >
                      <span>Username</span>
                      <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                        Role
                      </Badge>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex gap-2 items-center">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                        <AvatarImage
                          src="https://github.com/alicejohnson.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback className="w-10 h-10">
                          CN
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent
                      className="flex items-center gap-2"
                      side="bottom"
                    >
                      <span>Username</span>
                      <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                        Role
                      </Badge>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  className="text-lg font-bold text-slate-400 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <span>+9</span>
                </TooltipTrigger>
                <TooltipContent>9 others member</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceCard;
