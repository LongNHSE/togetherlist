'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SectionThree = () => {
  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
  });

  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
  });

  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: true,
  });

  const { ref: ref4, inView: inView4 } = useInView({
    triggerOnce: true,
  });

  const variants1 = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const variants2 = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="bg-[#3A1B05] h-auto flex flex-col justify-center space-y-16 items-center py-16 px-8">
      <div className="text-start flex flex-col space-y-5">
        <h2 className="font-semibold text-3xl uppercase tracking-wide text-white text-start">
          Our Achievements
        </h2>
        <h1 className="font-semibold text-4xl tracking-normal max-w-md text-white">
          We have successfully managed over 700+ projects worldwide
        </h1>
        <span className="text-slate-300 text-lg max-w-lg">
          Our project management tool has been instrumental in delivering
          high-quality projects on time. We&apos;ve streamlined the process of
          task tracking, team collaboration, and project planning.
        </span>
      </div>

      <div className="grid grid-cols-2 gap-10 justify-items-center">
        <motion.div
          className="flex gap-4 items-center"
          ref={ref1}
          variants={variants1}
          initial="hidden"
          animate={inView1 ? 'show' : 'hidden'}
        >
          <div className="flex items-center justify-center bg-yellow-600 rounded-full h-32 w-32 font-bold text-2xl text-white">
            90%
          </div>
          <span className="text-slate-300 max-w-[20rem]">
            90% of our clients reported improved productivity and project
            management efficiency using our tool.
          </span>
        </motion.div>
        <motion.div
          className="flex gap-4 items-center"
          ref={ref1}
          variants={variants1}
          initial="hidden"
          animate={inView1 ? 'show' : 'hidden'}
        >
          <div className="flex items-center justify-center bg-yellow-600 rounded-full h-32 w-32 font-bold text-2xl text-white">
            700+
          </div>
          <span className="text-slate-300 max-w-[20rem]">
            Over 700 projects have been successfully managed and delivered using
            our project management tool.
          </span>
        </motion.div>
        <motion.div
          className="flex gap-4 items-center"
          ref={ref1}
          variants={variants1}
          initial="hidden"
          animate={inView1 ? 'show' : 'hidden'}
        >
          <div className="flex items-center justify-center bg-yellow-600 rounded-full h-32 w-32 font-bold text-2xl text-white">
            100%
          </div>
          <span className="text-slate-300 max-w-[20rem]">
            100% of our users reported improved team collaboration and
            communication with our tool.
          </span>
        </motion.div>
        <motion.div
          className="flex gap-4 items-center"
          ref={ref1}
          variants={variants1}
          initial="hidden"
          animate={inView1 ? 'show' : 'hidden'}
        >
          <div className="flex items-center justify-center bg-yellow-600 rounded-full h-32 w-32 font-bold text-2xl text-white">
            95%
          </div>
          <span className="text-slate-300 max-w-[20rem]">
            95% of the projects managed with our tool were delivered on time.
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionThree;
