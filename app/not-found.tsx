'use client';
import { Button } from '@/components/ui/button';
import NotFoundImg from '@/public/404.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function NotFoundSkeleton() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl tracking-wide  font-semibold italic max-w-xl">
          Oops! Something went wrong...
        </h1>
        <h2 className="text-3xl text-slate-500">Please try again later !</h2>
        <Button
          size="lg"
          className="bg-[#3A1B05] hover:bg-[#cf8d5d]"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
      <Image src={NotFoundImg} alt="Not Found" height={600} width={600} />
    </div>
  );
}
