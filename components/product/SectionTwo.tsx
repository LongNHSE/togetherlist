'use client';
import { BarChart3, Earth, Lightbulb, Settings } from 'lucide-react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionTwo = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
  });

  const [ref3, inView3] = useInView({
    triggerOnce: true,
  });
  const StyledCard = styled.div`
    background-color: #d3cda2;
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem 0.75rem;
    height: 20rem;
    border-radius: 1rem;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  `;
  return (
    <section>
      <div className="flex flex-col justify-center items-center mt-10 space-y-9">
        <span className="bg-[#ffdd00] rounded-xl py-1 px-8 uppercase text-l text-white tracking-widest">
          Growing with our workspace
        </span>
        <motion.h1
          className="text-4xl font-bold tracking-wide"
          ref={ref1}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: inView1 ? 0 : -100, opacity: inView1 ? 1 : 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Our core values & principles
        </motion.h1>
        <motion.span
          className="max-w-md text-lg font-semilight text-gray-700"
          ref={ref2}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: inView2 ? 0 : 100, opacity: inView2 ? 1 : 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          At <strong>Together List</strong>, we believe in the power of
          collaboration and efficiency. Our core values revolve around providing
          a workspace that fosters creativity, productivity, and seamless
          teamwork. We are committed to delivering a platform that not only
          meets your task management needs but also contributes to your overall
          growth and success. Join us and experience a workspace that evolves
          with you.
        </motion.span>
      </div>

      <motion.div
        ref={ref3}
        initial={{ opacity: 0, filter: 'blur(5px)' }}
        animate={{
          opacity: inView3 ? 1 : 0,
          filter: inView3 ? 'blur(0px)' : 'blur(5px)',
        }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex items-center gap-5 justify-center py-3 "
      >
        <StyledCard>
          <Lightbulb size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Creative Idea</h1>
          <span className="text-[#595566] ">
            Unleash your creativity with our innovative platform. We provide the
            tools you need to bring your ideas to life.
          </span>
        </StyledCard>

        <StyledCard>
          <BarChart3 size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Customer stories</h1>
          <span className="text-[#595566] ">
            Hear from our satisfied customers. Discover how our platform has
            helped businesses grow and succeed.
          </span>
        </StyledCard>

        <StyledCard>
          <Earth size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Connections</h1>
          <span className="text-[#595566] ">
            Connect with professionals across the globe. Our platform fosters
            collaboration and networking.
          </span>
        </StyledCard>

        <StyledCard>
          <Settings size={75} color="#000000" strokeWidth={1.75} />
          <h1 className="font-bold text-2xl">Careers</h1>
          <span className="text-[#595566] ">
            Join our team and build your career with us. We offer a dynamic and
            inclusive work environment.
          </span>
        </StyledCard>
      </motion.div>
    </section>
  );
};

export default SectionTwo;
