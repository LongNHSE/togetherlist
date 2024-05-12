import SectionOne from '@/components/home/product/SectionOne';
import SectionTwo from '@/components/home/product/SectionTwo';

export default function ProductPage() {
  return (
    <div className="flex flex-col space-y-4 py-3 ">
      <SectionOne />
      <SectionTwo />
    </div>
  );
}
