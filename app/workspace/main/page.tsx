import LoadingMini from '@/components/LoadingMini';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Main | Worksapce',
  description:
    'Welcome to Together List, your collaborative task management app.',
};

const Report = dynamic(() => import('@/components/report/Report'), {
  ssr: false,
  loading: () => <LoadingMini />,
});

export default function MainPage() {
  return <Report />;
}
