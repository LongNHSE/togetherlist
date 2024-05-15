'use client';
import { motion } from 'framer-motion';
import enterpriseImage from '@/public/enterpriseImage.png';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
const SectionThree = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0 },
    show: {
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
        Experience advanced features
      </h1>
      <Image
        alt="trusted clients"
        src={enterpriseImage}
        priority={true}
        className="max-w-3xl"
      />
    </motion.section>
  );
};

export default SectionThree;
