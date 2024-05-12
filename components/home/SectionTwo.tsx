'use client';
import Image from 'next/image';
import section2 from '@/public/homePage/section2.png';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

export default function SectionTwo() {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    show: {
      filter: 'blur(0px)',
      opacity: 1,
      transition: {
        duration: 0.7,
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
      className="flex flex-col items-center space-y-4"
    >
      <h1 className="font-bold text-2xl">Trusted Clients</h1>
      <span className="max-w-3xl italic">
        From startups to Fortune 500 companies, teams trust our application to
        deliver high-quality project management and collaboration. Our platform
        helps teams to streamline their workflows, improve communication, and
        deliver projects on time. Join the thousands of teams who have improved
        their productivity with us.
      </span>
      <Image
        alt="trusted clients"
        src={section2}
        priority={true}
        className="max-w-3xl"
      />
    </motion.section>
  );
}
