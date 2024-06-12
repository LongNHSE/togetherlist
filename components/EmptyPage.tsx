import Image from 'next/image';
import React from 'react';
import emptyImg from '@/public/empty.png';

const EmptyPage = ({ subject }: { subject: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[30rem]">
      <Image src={emptyImg} alt="Empty placeholder" width={500} height={500} />
      <p className="text-gray-500">No {subject} is available right now</p>
    </div>
  );
};

export default EmptyPage;
