import SectionTwo from '@/components/home/solution/SectionTwo';
import SectionOne from '@/components/home/solution/SectionOne';
import SectionThree from '@/components/home/solution/SectionThree';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solution',
  description:
    'Welcome to Together List, your collaborative task management app.',
};
export default function SolutionPage() {
  return (
    <>
      {/* Section 1 */}
      <SectionOne />
      {/* Section 2 */}
      <SectionTwo />
      {/* Section 3 */}
      <SectionThree />
    </>
  );
}
