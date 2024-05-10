'use client';
import section1 from '@/public/homePage/section1.png';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { motion } from 'framer-motion';

export default function SectionOne() {
  const leftAnimation = {
    hidden: { x: -100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const rightAnimation = {
    hidden: { x: 100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <section className="grid grid-cols-[1fr_1fr] justify-items-center items-center -space-x-60 bg-gray-200">
      <motion.div
        className="flex flex-col space-y-6 items-end  max-w-[30rem] text-start"
        variants={leftAnimation}
        initial="hidden"
        animate="show"
      >
        <h1 className="font-bold text-[48px]">
          Tasker brings all your tasks Teams & tools together
        </h1>
        <span className="text-slate-400 text-[15px]">
          Keep everything in the same place-even if your team isn&apos;t.
        </span>
        <div className="flex items-center gap-5 w-full">
          <Input type="email" placeholder="Email" className="w-full" />
          <Button
            size="lg"
            className="bg-[#3A1B05] hover:bg-[#704222] text-white"
          >
            Sign up for free
          </Button>
        </div>
      </motion.div>

      <motion.div variants={rightAnimation} initial="hidden" animate="show">
        <Image
          alt="section 1"
          src={section1}
          width={700}
          height={700}
          priority={true}
        />
      </motion.div>
    </section>
  );
}
