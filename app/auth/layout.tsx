'use client';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`bg-[url('../public/back_ground.svg')] bg-cover bg-center flex h-screen ${montserrat.className}`}
    >
      {children}
    </div>
  );
}
