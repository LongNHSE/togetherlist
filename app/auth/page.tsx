import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import Login from '@/components/auth/Login';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sign in | Together List',
  description:
    'Welcome to Together List, your collaborative task management app.',
};

export default function Page() {
  return (
    <div className="flex mx-auto my-auto">
      {/* <Login /> */}
      <Login />
    </div>
  );
}
