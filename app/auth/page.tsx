import { Login } from './login';
import { Montserrat } from 'next/font/google';
import imgBg from '@/public/back_ground.svg';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function Page() {
  return (
    <div className="flex mx-auto my-auto">
      <Login />
    </div>
  );
}
