import Chat from '@/components/chat/Chat';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: 'Team | Worksapce',
  description:
    'Welcome to Together List, your collaborative task management app.',
};
export default function TeamPage() {
  return <Chat />;
}
