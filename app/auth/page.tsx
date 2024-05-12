import { Login } from './login';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function Page() {
  return (
    <div className="flex mx-auto my-auto">
      <Login />
    </div>
  );
}
