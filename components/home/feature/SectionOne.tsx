'use client';
import sectionOne1 from '@/public/featurePage/sectionOne1.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionOne = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes into view
  });
  return (
    <motion.section
      ref={ref}
      initial={{ x: -1000, opacity: 0 }}
      animate={{ x: inView ? 0 : -1000, opacity: inView ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20, duration: 0.7 }}
    >
      <div className="flex space-x-9 items-center justify-center">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl tracking-wider">
            Simplify your intake process
          </h1>
          <span className="max-w-lg text-slate-500">
            Combine your process intake to create better efficiency and
            visibility. When you customize and prioritize your team’s processes,
            your new streamlined workflow becomes more productive than ever
            before.
          </span>
        </div>

        <div>
          <Image
            className="rounded-xl shadow-xl"
            src={sectionOne1}
            alt="Fast launch"
            height={550}
            width={550}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default SectionOne;
