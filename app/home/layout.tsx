import GuestFooter from '@/layouts/Guest/GuestFooter';
import GuestHeader from '@/layouts/Guest/GuestHeader';
import { Suspense, useState } from 'react';
import Loading from '../loading';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to Together List, your collaborative task management app.',
};
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
