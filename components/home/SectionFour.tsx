'use client';
import Image from 'next/image';
import section4 from '@/public/homePage/section4.png';
import { Button } from '../ui/button';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
export default function SectionFour() {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    show: {
      filter: 'blur(0px)',
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (inView) {
    controls.start('show');
  }
  return (
    <motion.section
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className="grid grid-cols-[1fr_1fr] justify-items-center -space-x-80"
    >
      <div>
        <Image
          alt="section 1"
          src={section4}
          width={600}
          height={600}
          priority={true}
        />
      </div>

      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-xl">Perform All Your Tasks</h1>
        <h1 className="font-bold text-xl text-end max-w-xs">At One Place</h1>
        <span className="max-w-sm">
          Our platform provides a unified solution for all your project
          management needs. From task creation to tracking progress, we offer a
          range of features designed to help you and your team work more
          efficiently.
        </span>
        <Button className="bg-[#3A1B05] hover:bg-[#704222] text-white w-[28rem] rounded-xl">
          Get Started
        </Button>
      </div>
    </motion.section>
  );
}
