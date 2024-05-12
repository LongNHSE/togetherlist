import SectionOne from '@/components/home/SectionOne';
import SectionTwo from '@/components/home/SectionTwo';
import SectionThree from '@/components/home/SectionThree';
import SectionFour from '@/components/home/SectionFour';
import SectionFive from '@/components/home/SectionFive';

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-3">
      {/* Section 1 */}
      <SectionOne />
      {/* Section 2 */}
      <SectionTwo />
      {/* Section 3 */}
      <SectionThree />
      {/* Section 4 */}
      <SectionFour />
      {/* Section 5 */}
      <SectionFive />
    </div>
  );
}
