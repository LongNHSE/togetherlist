'use client';

import workspaceApiRequest from '@/apiRequest/workspace/workspace.api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
const DropdownHeader = () => {
  const [workspace, setWorkspace] = useState();
  workspaceApiRequest.getMyWorkspaces();
  useEffect(() => {}, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1  focus:outline-none hover:opacity-50 text-[#3A1B05] font-bold">
        <span>Workspaces</span>
        <CircleChevronDown className="tex-[#3A1B05] font-semibold" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Current workspace</DropdownMenuLabel>
        <DropdownMenuItem>Together List</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Kohe Niko</DropdownMenuItem>
        <DropdownMenuItem>Gym center</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownHeader;
