import GuestFooter from '@/layouts/Guest/GuestFooter';
import GuestHeader from '@/layouts/Guest/GuestHeader';
import { Suspense } from 'react';
import Loading from '../loading';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen ">
      <GuestHeader />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <GuestFooter />
    </div>
  );
}
