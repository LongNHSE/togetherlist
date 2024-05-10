'use client';

import {
  ClipboardCheck,
  Clock,
  MessagesSquare,
  Presentation,
} from 'lucide-react';
import { Button } from '../ui/button';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SectionThree() {
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
    <section className="grid grid-cols-2 justify-items-center items-center bg-gray-200 py-3">
      <motion.div
        className="flex flex-col space-y-4 max-w-lg"
        ref={refLeft}
        animate={controlsLeft}
        initial="hidden"
        variants={leftAnimation}
      >
        <h1 className="font-bold text-3xl">Our Top Features</h1>
        <span>
          Manage your projects, track your team&apos;s progress, and communicate
          effectively with our powerful features. Get started today and
          streamline your project management process.
        </span>
        <Button
          size="sm"
          className="bg-[#3A1B05] hover:bg-[#704222] text-white w-[10rem] rounded-xl"
        >
          Get Started
        </Button>
      </motion.div>

      <motion.div
        ref={refRight}
        animate={controlsRight}
        initial="hidden"
        variants={rightAnimation}
        className="flex space-x-9"
      >
        <div className="flex flex-col space-y-9">
          <div className="flex flex-col space-y-3 w-[20rem] border border-slate-400 px-4 py-6 rounded-xl bg-white">
            <div className="px-2 py-3 bg-[#FE3D3B] w-fit rounded-xl">
              <ClipboardCheck size={44} color="#e7e7e7" />
            </div>
            <h1 className="font-bold text-xl">Tasks</h1>
            <span className="text-md text-slate-400">
              Create, assign, and track tasks with ease. Our task management
              feature allows you to keep track of your team&apos;s progress and
              ensure everyone is on the same page.
            </span>
          </div>

          <div className="flex flex-col space-y-3 w-[20rem] border border-slate-400  px-4 py-6 rounded-xl bg-white">
            <div className="px-2 py-3 bg-[#15D088] w-fit rounded-xl">
              <Presentation size={44} color="#e7e7e7" />
            </div>
            <h1 className="font-bold text-xl">Onboarding</h1>
            <span className="text-md text-slate-400">
              Onboard new team members quickly and efficiently. Our onboarding
              feature provides new members with the resources they need to get
              up to speed quickly.
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-9 mt-5">
          <div className="flex flex-col space-y-3 w-[20rem] border border-slate-400 px-4 py-6 rounded-xl bg-white">
            <div className="px-2 py-3 bg-[#0086D5] w-fit rounded-xl">
              <Clock size={44} color="#e7e7e7" />
            </div>
            <h1 className="font-bold text-xl">Time Slots</h1>
            <span className="text-md text-slate-400">
              Schedule your tasks and meetings with our time slot feature. This
              feature allows you to allocate specific time slots for different
              tasks and meetings, ensuring efficient time management.
            </span>
          </div>

          <div className="flex flex-col space-y-3 w-[20rem] border border-slate-400  px-4 py-6 rounded-xl bg-white">
            <div className="px-2 py-3 bg-[#FFB601] w-fit rounded-xl">
              <MessagesSquare size={44} color="#e7e7e7" />
            </div>
            <h1 className="font-bold text-xl">Communication</h1>
            <span className="text-md text-slate-400">
              Communicate effectively with your team. Our communication feature
              allows you to send messages, share files, and collaborate with
              your team in real-time.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
