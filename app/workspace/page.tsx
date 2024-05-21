import SectionOne from '@/components/workspace/SectionOne';
import SectionThree from '@/components/workspace/SectionThree';
import SectionTwo from '@/components/workspace/SectionTwo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Welcome to Together List, your collaborative task management app.',
};
export default function WorkspacePage() {
  return (
    <section className="flex flex-col gap-5">
      {/* Section One */}
      <SectionOne />
      {/* Section Two:Projects */}
      <SectionTwo />
      {/* Pagination */}
      <SectionThree />
    </section>
  );
}
