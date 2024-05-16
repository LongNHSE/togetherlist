'use client';
import { Filter, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SectionOne = () => {
  return (
    <div className="flex justify-between items-center">
      {/* Filter */}
      <div className="flex gap-3 items-center">
        <Filter />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inProgress">In Progress</SelectItem>
              <SelectItem value="finished">Finished</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Input className="rounded-lg" placeholder="Search..." type="search" />
        <Button className="rounded-lg" type="submit">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SectionOne;
