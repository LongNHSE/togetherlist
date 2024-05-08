import Image from 'next/image';
import logo from '@/public/logo.png';
export default function Logo() {
  return (
    <div>
      <Image src={logo} alt="hiu" height={200} width={200} priority={true} />
    </div>
  );
}
