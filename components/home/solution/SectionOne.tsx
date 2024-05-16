'use client';

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StyledCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 19rem;
  height: 20rem;
  background-color: #e0c1ab;
  padding: 1rem 2rem;
  border-bottom-right-radius: 1.875rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.7),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  user-select: none;
  cursor: default;
`;

const SectionOne = () => {
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

  const { ref, inView } = useInView({
    triggerOnce: true, // Change to false if you want to trigger again when element is not in view
  });

  return (
    <section className="flex flex-col justify-start items-center py-5 gap-6   ">
      <h1 className="font-semibold text-4xl tracking-wide uppercase">
        By Team Size
      </h1>
      <span className="text-slate-500">
        Explore our solutions tailored to teams of all sizes.
      </span>
      <div className="flex gap-5">
        <StyledCard
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          whileHover={{ y: -20 }}
        >
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold h-[2rem]  tracking-wider">
              Enterprise Solution
            </h2>
            <span className="text-slate-600">
              Our enterprise solution offers robust project management and team
              collaboration features. It&apos;s designed to handle the needs of
              large organizations.
            </span>
          </div>
        </StyledCard>

        <StyledCard
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          whileHover={{ y: -20 }}
        >
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold tracking-wider">
              Small Business Solution
            </h2>
            <span className="text-slate-600">
              Our small business solution is perfect for teams that need to stay
              agile and move fast. It offers all the essential project
              management features without the complexity.
            </span>
          </div>
        </StyledCard>

        <StyledCard
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          whileHover={{ y: -20 }}
        >
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold  tracking-wider">
              Start-up Solution
            </h2>
            <span className="text-slate-600">
              Our start-up solution is designed for young companies that need a
              simple, yet powerful project management tool. It&apos;s easy to
              use and scales as your business grows.
            </span>
          </div>
        </StyledCard>

        <StyledCard
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          whileHover={{ y: -20 }}
        >
          <div className="flex flex-col gap-5">
            <h2 className="text-lg font-bold tracking-wider">
              Freelancer Solution
            </h2>
            <span className="text-slate-600">
              Our freelancer solution is perfect for individuals or small teams.
              It offers all the essential project management features in a
              simple and intuitive interface.
            </span>
          </div>
        </StyledCard>
      </div>
    </section>
  );
};

export default SectionOne;
