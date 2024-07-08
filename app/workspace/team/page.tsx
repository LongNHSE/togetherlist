import { Metadata } from 'next';
import React from 'react';
import ManageTeam from '@/components/workspaceFolder/ManageTeam';
export const metadata: Metadata = {
  title: 'Team | Worksapce',
  description:
    'Welcome to Together List, your collaborative task management app.',
};

export default function namePage() {
  return <ManageTeam />;
}
