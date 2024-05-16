'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Progress } from '@/components/ui/progress';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

const WorkspaceCard = () => {
  const [progress, setProgress] = useState(60);
  return (
    <div>
      <Card className="max-w-[25rem] h-auto flex flex-col space-y-5 p-5 bg-white shadow-lg rounded-xl select-none">
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
            <CardDescription>
              <Badge className="w-fit flex items-center justify-end gap-2">
                <Ellipsis size={13} />
                <span>In Progress</span>
              </Badge>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Progress */}
          <Progress
            value={progress}
            className="w-full h-2 rounded-full bg-gray-200"
          />
          <span className="font-medium text-sm">{progress}% completed</span>
          <CardDescription className="flex flex-col space-y-5 mt-5">
            {/* User */}
            <h3 className="text-lg font-semibold text-gray-700">Member:</h3>
            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="flex gap-2 items-center">
                <span className="font-medium text-sm">Username</span>
                <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                  Role
                </Badge>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-medium text-sm">Username</span>
                <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                  Role
                </Badge>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-medium text-sm">Username</span>
                <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                  Role
                </Badge>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-medium text-sm">Username</span>
                <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                  Role
                </Badge>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-medium text-sm">Username</span>
                <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                  Role
                </Badge>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-medium text-sm">Username</span>
                <Badge className="bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                  Role
                </Badge>
              </div>

              <div className="col-span-2 text-center text-sm font-medium text-gray-500 bg-gray-200 p-2 rounded">
                +12 other members
              </div>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkspaceCard;
