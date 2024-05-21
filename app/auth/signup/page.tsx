import { Metadata } from 'next';
import Signup from '@/components/auth/Signup';

export const metadata: Metadata = {
  title: 'Register | Together List',
  description:
    'Welcome to Together List, your collaborative task management app.',
};

export default function Page() {
  return (
    <div className="flex mx-auto my-auto">
      <Signup />
    </div>
  );
}
