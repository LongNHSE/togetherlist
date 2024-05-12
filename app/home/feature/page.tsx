import SectionOne from '@/components/home/feature/SectionOne';
import SectionThree from '@/components/home/feature/SectionThree';
import SectionTwo from '@/components/home/feature/SectionTwo';

export default function FeaturePage() {
  return (
    <div className="flex flex-col gap-3 py-6">
      {/* Section 1 */}
      <SectionOne />
      {/* Section 2 */}
      <SectionTwo />
      {/* Section 3 */}
      <SectionThree />
    </div>
  );
}
