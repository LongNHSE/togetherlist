import SectionOne from '@/components/home/contact/SectionOne';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Sales',
  description: 'Check out our features',
};

export default function ContactPage() {
  return (
    <section className="flex items-center justify-center space-y-5 flex-col py-5">
      <h1 className="font-semibold text-[#231D4F] text-3xl italic">
        Contact us to get the most preferential price
      </h1>
      <span className="text-sm text-slate-500">
        Please provide us your company information
      </span>
      {/* Form Information */}
      <SectionOne />
    </section>
  );
}
