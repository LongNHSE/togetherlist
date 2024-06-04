'use client';
import { Bell } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

const DropdownNotification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative hover:opacity-50 cursor-pointer">
          <Bell />
          <span className="absolute top-0 right-0 transform translate-x-[60%] translate-y-[-55%] px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            1
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="h-[10rem] overflow-auto">
        <DropdownMenuLabel>Notification</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNotification;
