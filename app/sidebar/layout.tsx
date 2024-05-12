import React from 'react'

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
    <div>
        <div className="text-red-700"></div>
        {children}
    </div>
    );
  }
  
