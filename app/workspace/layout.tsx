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
      <section className="grid grid-rows-[auto_1fr] h-screen overflow-hidden">
        <DashboardHeader />
        <div className="py-3 px-6 h-screen overflow-auto">{children}</div>
      </section>
    </div>
  );
}
