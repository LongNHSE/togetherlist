import Image from 'next/image';
import Link from 'next/link';
import HomePage from './home/page';
import HomeLayout from './home/layout';

export default function Home() {
  return (
    <>
      <HomeLayout>
        <HomePage />
      </HomeLayout>
    </>
  );
}
