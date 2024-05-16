import SectionFour from '@/components/home/feature/SectionFour';
import SectionOne from '@/components/home/feature/SectionOne';
import SectionThree from '@/components/home/feature/SectionThree';
import SectionTwo from '@/components/home/feature/SectionTwo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feature',
  description: 'Check out our features',
};

export default function FeaturePage() {
  return (
    <div className="flex flex-col gap-9 py-6">
      {/* Section 1 */}
      <SectionOne />
      {/* Section 2 */}
      <SectionTwo />
      {/* Section 3 */}
      <SectionThree />
      {/* Section 4 */}
      <SectionFour />
    </div>
  );
}
