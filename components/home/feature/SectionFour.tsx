'use client';
import sectionFour from '@/public/featurePage/SectionFour.jpg';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionFour = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <section className="flex items-center justify-center flex-col gap-4">
      <h1 className="font-bold text-2xl tracking-wide">
        Manage your workspace
      </h1>
      <span className="text-slate-500">
        Streamline secure adminstration and permissions
      </span>
      <motion.div
        ref={ref}
        animate={inView ? 'show' : 'hidden'}
        variants={variants}
      >
        <Image src={sectionFour} alt="Fast launch" height={550} width={550} />
      </motion.div>
      <div className="flex gap-3 items-center">
        <motion.div
          className="bg-slate-200 w-[20rem] py-3 px-4 rounded-xl shadow-lg select-none"
          variants={variants}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
          <h1 className="uppercase font-bold text-xl">Task Tracking</h1>
          <span className="text-slate-500">
            Manage and track your tasks in a centralized location. Monitor
            progress, status, and deadlines all in one place.
          </span>
        </motion.div>

        <motion.div
          className="bg-slate-200 w-[20rem] py-3 px-4 rounded-xl shadow-lg select-none"
          variants={variants}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
          <h1 className="uppercase font-bold text-xl">Collaboration</h1>
          <span className="text-slate-500">
            Collaborate with your team effectively. Assign tasks, share files,
            and communicate directly within the platform.
          </span>
        </motion.div>

        <motion.div
          className="bg-slate-200 w-[20rem] py-3 px-4 rounded-xl shadow-lg select-none"
          variants={variants}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
          <h1 className="uppercase font-bold text-xl">Reporting & Analytics</h1>
          <span className="text-slate-500">
            Generate detailed reports on task progress, team performance, and
            project timelines. Use data to make informed decisions.
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionFour;
