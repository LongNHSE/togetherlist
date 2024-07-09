'use client';
import React, { useEffect } from 'react';
import { useAppContext } from '@/context/Provider';
import subcriptionPlanApi from '@/apiRequest/subscription-plan/subscription-plan.api';
import { Button } from '../ui/button';
import Link from 'next/link';
const SubscriptionPlan = () => {
  const { mySubscriptions, setMySubscriptions } = useAppContext();
  const getMySubscriptions = async () => {
    try {
      const res = await subcriptionPlanApi.getMySubscriptionPlan();
      console.log(res.data[0]);
      setMySubscriptions(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMySubscriptions();
  }, []);
  return (
    <div className="flex flex-row my-auto">
      <div className="bg-dark_brown/80 px-6 align-middle text-center rounded-xl w-fit max-w-56 min-w-20 min-h-6 flex items-center justify-center">
        <span className="truncate ">
          {mySubscriptions?.subscriptionType.name}
        </span>
      </div>
      {mySubscriptions?.subscriptionType.name === 'Free' ? (
        <div>
          <Link href="/home/pricing">
            <Button variant="blueLink">Upgrade Now</Button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SubscriptionPlan;
