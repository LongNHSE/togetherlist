import Image from 'next/image';
import logo from '@/public/logo.png';
import Link from 'next/link';
export default function Logo() {
  return (
    <Link href="/home">
      <Image src={logo} alt="hiu" height={200} width={200} priority={true} />
    </Link>
  );
}
