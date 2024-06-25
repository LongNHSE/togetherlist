import EmptyPage from '@/components/EmptyPage';
import CreateWorkspace from '@/components/workspaceFolder/CreateWorkspace';
import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <EmptyPage subject="workspace" />
      <CreateWorkspace />
    </div>
  );
};

export default page;
