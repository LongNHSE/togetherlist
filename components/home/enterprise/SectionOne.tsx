'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const SectionOne = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const variants = {
    hidden: { x: -100, opacity: 0 },
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
        A project management tool that fits your needs.
      </h1>
      <span className="text-xl text-slate-500 ">
        Organize, track, and manage your projects efficiently with our
        comprehensive tool.
      </span>
    </motion.section>
  );
};

export default SectionOne;
