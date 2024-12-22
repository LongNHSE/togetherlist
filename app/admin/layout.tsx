import React, { Suspense } from 'react';
import DashboardSidebar from '@/layouts/AdminDashboard/DashboardSidebar';
import DashboardHeader from '@/layouts/AdminDashboard/DashboardHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex-grow-0 flex-shrink-0 flex h-screen">
        <DashboardSidebar />
      </div>
      <div className="flex flex-col flex-grow h-screen overflow-hidden">
        <DashboardHeader />
        <div className="flex-grow overflow-auto px-6">{children}</div>
      </div>
    </div>
  );
}
