import React, { Suspense } from 'react';
import DashboardSidebar from '@/layouts/Dashboard/DashboardSidebar';
import DashboardHeader from '@/layouts/Dashboard/DashboardHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[auto_2fr] h-screen">
      <DashboardSidebar />
      <section className=" h-screen">
        <DashboardHeader />
        <div className="py-3 px-6 h-screen">{children}</div>
      </section>
    </div>
  );
}
