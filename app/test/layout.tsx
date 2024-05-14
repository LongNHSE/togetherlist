'use client';
import React from 'react';
import { DndContext } from '@dnd-kit/core';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DndContext>
      <div>{children}</div>
    </DndContext>
  );
}
