'use client';
import {
  BookA,
  BookOpenCheck,
  BookOpenText,
  Bot,
  CalendarDays,
  FolderKanban,
} from 'lucide-react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StyledCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: #e0c1ab;
  gap: 1rem;
  width: 20rem;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  user-select: none;
  cursor: default;
`;

const SectionOne = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center mt-10 space-y-9">
        <span className="bg-[#883e0a] rounded-xl py-1 px-8 uppercase text-l text-white tracking-widest">
          Service
        </span>
        <motion.h1
          className="text-4xl font-bold tracking-wide"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          Get Control Over Your Tasks
        </motion.h1>
        <motion.span
          className="max-w-xl text-lg font-semilight text-gray-700"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        >
          <strong>Together List</strong> is your ultimate task management
          platform. Designed with efficiency in mind,{' '}
          <strong>Together List</strong> allows you to manage your tasks
          effectively, ensuring you never miss a deadline. Whether you&apos;re
          juggling multiple projects or tracking personal goals,{' '}
          <strong>Together List</strong> provides the tools you need to stay
          organized and on top of your work. Experience the freedom that comes
          with having your tasks under control with{' '}
          <strong>Together List</strong>.
        </motion.span>
      </div>

      <motion.div
        ref={ref1}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: inView1 ? 0 : -100, opacity: inView1 ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="flex justify-center items-center space-x-9 mt-4"
      >
        <StyledCard whileHover={{ y: -10, transition: { duration: 0.3 } }}>
          <Bot size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">AI</h1>
          <span className="text-[#595566] ">
            Harness the power of AI to streamline your tasks
          </span>
        </StyledCard>

        <StyledCard whileHover={{ y: -10, transition: { duration: 0.3 } }}>
          <BookOpenText size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Docs</h1>
          <span className="text-[#595566] ">
            Access and manage your documents efficiently
          </span>
        </StyledCard>

        <StyledCard whileHover={{ y: -10, transition: { duration: 0.3 } }}>
          <BookOpenCheck size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Wikis</h1>
          <span className="text-[#595566] ">
            Collaborate and share knowledge with Wikis
          </span>
        </StyledCard>
      </motion.div>

      <motion.div
        ref={ref2}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: inView2 ? 0 : 100, opacity: inView2 ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
        className="flex justify-center items-center space-x-9 mt-4"
      >
        <StyledCard whileHover={{ y: -10, transition: { duration: 0.3 } }}>
          <FolderKanban size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Projects</h1>
          <span className="text-[#595566] ">
            Manage your projects effectively and meet deadlines
          </span>
        </StyledCard>

        <StyledCard whileHover={{ y: -10, transition: { duration: 0.3 } }}>
          <CalendarDays size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Calendar</h1>
          <span className="text-[#595566] ">
            Keep track of your schedule with our integrated calendar
          </span>
        </StyledCard>

        <StyledCard whileHover={{ y: -10, transition: { duration: 0.3 } }}>
          <BookA size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Translates</h1>
          <span className="text-[#595566] ">
            Communicate globally with our translation features
          </span>
        </StyledCard>
      </motion.div>
    </section>
  );
};

export default SectionOne;
