import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import AdminLogin from '@/components/auth/AdminLogin';

export const metadata: Metadata = {
  title: 'Sign in | Together List',
  description:
    'Welcome to Together List, your collaborative task management app.',
};

export default function Page() {
  return (
    <div className="flex mx-auto my-auto">
      {/* <Login /> */}
      <AdminLogin />
    </div>
  );
}
