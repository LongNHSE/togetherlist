import SectionOne from '@/components/home/product/SectionOne';
import SectionTwo from '@/components/home/product/SectionTwo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product',
  description:
    'Welcome to Together List, your collaborative task management app.',
};
export default function ProductPage() {
  return (
    <div className="flex flex-col space-y-4 py-3 ">
      <SectionOne />
      <SectionTwo />
    </div>
  );
}
