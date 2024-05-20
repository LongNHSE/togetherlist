'use client';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
const page = () => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex flex-col w-[30%] gap-2">
        <Label htmlFor="progress" className="text-[#3A1B05] font-bold">
          Progress label
        </Label>
        <Progress value={60} colorClass="bg-red-500" className="bg-gray-300" />
      </div>

      <div className="flex flex-col w-[30%] gap-2">
        <Label htmlFor="progress" className="text-[#3A1B05] font-bold">
          Progress label
        </Label>
        <Progress value={60} colorClass="bg-blue-300" className="bg-gray-300" />
      </div>

      <div className="flex flex-col w-[30%] gap-2">
        <Label htmlFor="progress" className="text-[#3A1B05] font-bold">
          Progress label
        </Label>
        <Progress
          value={60}
          colorClass="bg-green-500"
          className="bg-gray-300"
        />
      </div>
    </div>
  );
};

export default page;
