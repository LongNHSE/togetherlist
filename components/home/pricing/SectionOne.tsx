'use client';
import { payosApi } from '@/apiRequest/payos/payos.api';
import subcriptionPlanApi from '@/apiRequest/subscription-plan/subscription-plan.api';
import { subscriptionTypeApiRequest } from '@/apiRequest/subscription-type/subscription-type.api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SubscriptionType } from '@/lib/schema/subscription/subscriptionType.schema';
import { sub } from 'date-fns';
import { motion } from 'framer-motion';
import { Building, Castle, Check, Home, Warehouse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const StyledCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  background-color: rgb(226 232 240);
  padding: 1rem 2rem;
  border-radius: 1rem;
  width: 22rem;
  height: 30rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  user-select: none;
  cursor: default;
`;
const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3a1b05;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: #ffffff;
`;
const StyledIconText = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const SectionOne = () => {
  const [plans, setPlans] = useState<SubscriptionType[]>([]);

  const getPlans = async () => {
    try {
      const res = await subscriptionTypeApiRequest.getSubscriptionTypeList();
      setPlans(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (id: string | undefined) => {
    console.log(id);
    try {
      const res = await payosApi.createPayment({ subscriptionTypeId: id });
      window.location.href = res.data.checkoutUrl;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };
  return (
    <section className="flex items-center gap-9">
      <StyledCard
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        whileHover={{ y: -20 }}
      >
        <div className="flex flex-col">
          <Home size={55} className="mb-3" />
          <h1 className="text-xl font-bold ">Free</h1>
        </div>
        <div className="flex flex-col gap-4">
          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              General To-Do List Creation
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              List Sharing Capabilities
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500  text-sm">
              Task Assignment Feature
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">Progress Tracking</span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">Reminders and Alerts</span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">Basic Data Analysis</span>
          </StyledIconText>
        </div>
        <div className="h-96"></div>
        {/* <Button className="bg-[#3a1b05] text-white w-full hover:bg-[#995b2f] ">
          Choose plan
        </Button> */}
      </StyledCard>
      <StyledCard
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        whileHover={{ y: -20 }}
      >
        <div className="flex flex-col gap-1">
          <Building size={55} className="mb-3" />
          <div className="flex gap-2">
            <h1 className="text-xl font-bold ">Premium</h1>
            <Badge className="bg-blue-500">Popular</Badge>
          </div>
          <h1 className="text-3xl font-bold ">19.000 VNĐ</h1>
        </div>
        <div className="flex flex-col gap-4">
          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              Extended Storage Capacity (10GB)
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              Private List Creation
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500  text-sm">
              Advanced Reporting Tools
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              Access Rights Management
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              Unlimited User Access
            </span>
          </StyledIconText>
        </div>
        <Button
          className="bg-[#3a1b05] text-white w-full hover:bg-[#995b2f]"
          onClick={() => {
            const id = plans?.find(
              (plan) => plan.name.toLowerCase() === 'premium',
            )?._id;
            handleClick(id);
          }}
        >
          Choose plan
        </Button>
      </StyledCard>

      {/* <StyledCard
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        whileHover={{ y: -20 }}
      >
        <div className="flex flex-col gap-1">
          <Castle size={55} className="mb-3" />
          <h1 className="text-xl font-bold ">Business</h1>
          <h1 className="text-3xl font-bold ">$6</h1>
        </div>
        <div className="flex flex-col gap-4">
          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              All Pro Features Included
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              Priority Customer Support
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500  text-sm">
              Advanced Data Analysis Tools
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              Comprehensive Project Reports
            </span>
          </StyledIconText>

          <StyledIconText>
            <StyledIcon>
              <Check size={40} color="#FFFFFF" />
            </StyledIcon>
            <span className="text-slate-500 text-sm">
              Unlimited Project Access
            </span>
          </StyledIconText>
        </div>
        <Button className="bg-[#3a1b05] text-white w-full hover:bg-[#995b2f]">
          Choose plan
        </Button>
      </StyledCard> */}
    </section>
  );
};

export default SectionOne;
