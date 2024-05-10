'use client';
import section51st from '@/public/homePage/section5-1.png';
import section52nd from '@/public/homePage/section5-2.png';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionFive() {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();
  const { ref: refLeft, inView: inViewLeft } = useInView();
  const { ref: refRight, inView: inViewRight } = useInView();
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

  if (inViewLeft) {
    controlsLeft.start('show');
  }

  if (inViewRight) {
    controlsRight.start('show');
  }
  return (
    <section className="flex flex-col gap-8 bg-gray-200 py-9">
      <h1 className="text-center font-bold text-3xl">
        Check How Our Client Use Our Product
      </h1>
      <div className="flex space-x-5 items-center justify-center">
        <motion.div
          ref={refLeft}
          animate={controlsLeft}
          initial="hidden"
          variants={leftAnimation}
          className="flex flex-col items-center w-[40rem] border border-slate-400 px-4 py-6 rounded-xl bg-white"
        >
          <Image
            src={section51st}
            alt="Avatar 1"
            className="rounded-full"
            width={90}
            height={90}
          />
          <h2 className="font-bold">John Doe</h2>
          <span className="text-gray-500 font-light">
            John is a dedicated team member with a passion for project
            management. His attention to detail and ability to coordinate tasks
            efficiently make him a valuable asset to any team.
          </span>
        </motion.div>
        <motion.div
          ref={refRight}
          animate={controlsRight}
          initial="hidden"
          variants={rightAnimation}
          className="flex flex-col items-center w-[40rem] border border-slate-400 px-4 py-6 rounded-xl bg-white"
        >
          <Image
            src={section52nd}
            alt="Avatar 2"
            className="rounded-full"
            width={90}
            height={90}
          />
          <h2 className="font-bold">Jane Doe</h2>
          <span className="text-gray-500 font-light">
            Jane is a skilled project manager with a knack for communication.
            Her ability to manage multiple tasks and teams simultaneously
            ensures projects are completed on time and within budget.
          </span>
        </motion.div>
      </div>
      <div className="flex justify-center space-x-3">
        <span className="h-4 w-4 bg-gray-300 rounded-full"></span>
        <span className="h-4 w-4 bg-blue-500 rounded-full"></span>
        <span className="h-4 w-4 bg-gray-300 rounded-full"></span>
      </div>
    </section>
  );
}
