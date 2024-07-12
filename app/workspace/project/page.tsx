import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import LoadingMini from '@/components/LoadingMini';

export const metadata: Metadata = {
  title: 'Projects | Worksapce',
  description:
    'Welcome to Together List, your collaborative task management app.',
};

const SectionTwo = dynamic(() => import('@/components/Workspace/SectionTwo'), {
  ssr: false,
  loading: () => <LoadingMini />,
});

export default function ProjectPage() {
  return (
    <section className="flex flex-col gap-5">
      {/* Section Two:Projects */}
      <SectionTwo />
    </section>
  );
}
