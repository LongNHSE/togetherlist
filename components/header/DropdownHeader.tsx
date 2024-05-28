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
import { useAppContext } from '@/context/Provider';
import { CircleChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { WorkspaceType } from '@/lib/schema/workspace/workspace.schema';
import { SharedWorkspaceType } from '@/lib/schema/workspace/shardWorkspace.schema';
const DropdownHeader = () => {
  const { currentWorkspace, setCurrentWorkspace } = useAppContext();
  //My workspaces
  const [workspaces, setWorkspace] = useState<WorkspaceType[]>([]);
  //Shared workspaces
  const [sharedWorkSpaces, setSharedWorkSpaces] = useState<
    SharedWorkspaceType[]
  >([]);
  const allWorkspacesEmpty =
    workspaces.length === 0 || sharedWorkSpaces.length === 0;
  const [loading, setLoading] = useState(false);
  //Get my workspaces
  const getMyWorkSpaces = async () => {
    let currentWorkspaceId = '';
    const myWorkSpaces = await workspaceApiRequest.getMyWorkspaces();
    if (!localStorage.getItem('current_workspace')) {
      localStorage.setItem(
        'current_workspace',
        JSON.stringify(myWorkSpaces.data[0]),
      );
      // Set the current workspace to the first workspace in myWorkSpaces.data
      setCurrentWorkspace(myWorkSpaces.data[0]);
    }
    const filterWorkspace = myWorkSpaces?.data.filter(
      (el: any) => el._id !== currentWorkspace?._id,
    );
    console.log(filterWorkspace);
    setWorkspace(filterWorkspace);
  };

  //Get shared workspaces
  const getSharedWorkspaces = async () => {
    try {
      const sharedWorkspacesResult =
        await workspaceApiRequest.getMySharedWorkspaces();
      setSharedWorkSpaces(sharedWorkspacesResult.data);
    } catch (error) {}
  };

  const handleChooseWorkspace = async (workspace: WorkspaceType) => {
    localStorage.setItem('current_workspace', JSON.stringify(workspace));
    setCurrentWorkspace(workspace);
  };
  useEffect(() => {
    getMyWorkSpaces();
    getSharedWorkspaces();
  }, [currentWorkspace]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none hover:opacity-50 text-[#3A1B05] font-bold">
          <span>{currentWorkspace?.name}</span>
          <CircleChevronDown className="text-[#3A1B05] font-semibold" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-[10rem] overflow-auto">
          <DropdownMenuLabel>Current workspace</DropdownMenuLabel>
          <DropdownMenuItem>{currentWorkspace?.name}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Your workspaces</DropdownMenuLabel>
          {workspaces &&
            workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace._id}
                onClick={() => handleChooseWorkspace(workspace)}
              >
                {workspace.name}
              </DropdownMenuItem>
            ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Shared workspaces</DropdownMenuLabel>
          {sharedWorkSpaces &&
            sharedWorkSpaces.map((el) => (
              <DropdownMenuItem key={el.workspace._id}>
                {el.workspace.name}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownHeader;
