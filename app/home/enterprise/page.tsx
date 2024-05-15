import SectionOne from '@/components/home/enterprise/SectionOne';
import SectionTwo from '@/components/home/enterprise/SectionTwo';
import SectionThree from '@/components/home/enterprise/SectionThree';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise',
  description:
    'Welcome to Together List, your collaborative task management app.',
};
export default function EnterprisePage() {
  return (
    <section className="flex justify-items-center items-center flex-col space-y-10 py-9">
      {/* Section one */}
      <SectionOne />
      {/* Section two */}
      <SectionTwo />
      {/* Section three */}
      <SectionThree />
    </section>
  );
}
