import DashboardHeader from '@/layouts/Dashboard/DashboardHeader';
import DashboardSidebar from '@/layouts/Dashboard/DashboardSidebar';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-[auto_2fr] h-screen">
      <DashboardSidebar />
      <section className="grid grid-rows-[auto_1fr] h-screen">
        <DashboardHeader />
        <div className="py-3 px-6">{children}</div>
      </section>
    </div>
  );
}
