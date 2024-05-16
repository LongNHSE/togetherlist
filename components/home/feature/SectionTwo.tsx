'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import sectionOne2 from '@/public/featurePage/SectionOne2.jpg';
import Image from 'next/image';
const SectionTwo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes into view
  });
  return (
    <motion.section
      ref={ref}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: inView ? 0 : 1000, opacity: inView ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20, duration: 0.7 }}
    >
      <div className="flex space-x-9 items-center justify-center">
        <div>
          <Image
            className="rounded-xl shadow-xl"
            src={sectionOne2}
            alt="Fast launch"
            height={550}
            width={550}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl tracking-wider">
            Set up your work your way
          </h1>
          <span className="max-w-lg text-slate-500">
            Structure work in a way that makes sense for your team. Assign work
            based on performance and capacity. Automate assignments, measure
            effort and budget, and track how much work is done and when. Align
            work with other dependencies and important milestones.
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default SectionTwo;
