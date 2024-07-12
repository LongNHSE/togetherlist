import LoadingMini from '@/components/LoadingMini';
import dynamic from 'next/dynamic';
import React from 'react';
// import KanbanBoard from '@/components/board/KanbanBoard';

const KanbanBoard = dynamic(() => import('@/components/board/KanbanBoard'), {
  ssr: false,
  loading: () => <LoadingMini />,
});

const page = () => {
  return <KanbanBoard />;
};

export default page;
