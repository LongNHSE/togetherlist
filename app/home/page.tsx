import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import section1 from '@/public/homePage/section1.png';
import section2 from '@/public/homePage/section2.png';
import section4 from '@/public/homePage/section4.png';
import section51st from '@/public/homePage/section5-1.png';
import section52nd from '@/public/homePage/section5-2.png';
import {
  ClipboardCheck,
  Clock,
  MessagesSquare,
  Presentation,
} from 'lucide-react';
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
