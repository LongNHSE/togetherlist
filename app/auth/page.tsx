import { Login } from './login';
import { Montserrat } from 'next/font/google';
import imgBg from '@/public/back_ground.svg';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function Page() {
  return (
    <div
      className={`bg-[url('../public/back_ground.svg')] bg-cover bg-center flex h-screen ${montserrat.className}`}
    >
      <div className="flex mx-auto my-auto">
        <Login />
      </div>
    </div>
  );
}
