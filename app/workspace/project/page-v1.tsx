import { Metadata } from 'next';
import SectionOne from '@/components/workspace/SectionOne';
import SectionThree from '@/components/workspace/SectionThree';
import SectionTwo from '@/components/workspaceFolder/SectionTwo';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
export const metadata: Metadata = {
  title: 'Projects | Worksapce',
  description:
    'Welcome to Together List, your collaborative task management app.',
};

export default function ProjectPage() {
  return (
    <section className="flex flex-col gap-5">
      {/* Section One */}
      {/* <SectionOne /> */}
      {/* Section Two:Projects */}
      <Suspense fallback={<span>Loading...</span>}>
        <SectionTwo />
      </Suspense>
      {/* Pagination */}
      <SectionThree />
    </section>
  );
}
