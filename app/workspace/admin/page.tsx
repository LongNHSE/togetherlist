import Barchart from '@/app/workspace/admin/barchart';
import FeedbackChart from "@/app/workspace/admin/feedback";
import { SignUp } from "@/app/workspace/admin/singup";
import { UserType } from '@/app/workspace/admin/usertype';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main | Worksapce',
  description:
    'Welcome to Together List, your collaborative task management app.',
};

export const admin = () => {
  return (
    <div>
      <div className="flex justify-between">
        <Barchart />
        <UserType/>
      </div>
      <div className="flex justify-between">
        <SignUp/>
        <FeedbackChart />
      </div>
    </div>
  );
};

export default admin;
