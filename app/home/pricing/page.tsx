import { Metadata } from 'next';
import SectionOne from '@/components/home/pricing/SectionOne';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'The pricing we offer for our users.',
};

export default function PricingPage() {
  return (
    <section className="flex flex-col items-center space-y-3 py-5">
      <h1 className="text-[#231D4F] text-3xl italic tracking-wide font-semibold">
        Together List Pricing
      </h1>
      <span className="text-[#848199]">
        Pricing details will be provided upon request.
      </span>

      {/* Section One */}
      <SectionOne />
    </section>
  );
}
