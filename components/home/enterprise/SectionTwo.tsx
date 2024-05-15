'use client';
import sectionEnterprise from '@/public/homePage/section2.png';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const SectionTwo = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const variants = {
    hidden: { x: 100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="flex flex-col items-center gap-3"
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={variants}
    >
      <h1 className="text-3xl italic text-[#231D4F] font-semibold">
        Used by trusted clients
      </h1>
      <Image
        alt="trusted clients"
        src={sectionEnterprise}
        priority={true}
        className="max-w-3xl"
      />
    </motion.section>
  );
};

export default SectionTwo;
