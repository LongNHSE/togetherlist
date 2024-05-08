import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import section1 from '@/public/homePage/section1.png';
import section2 from '@/public/homePage/section2.png';
import section4 from '@/public/homePage/section4.png';
import section51st from '@/public/homePage/section5-1.png';
import section52nd from '@/public/homePage/section5-2.png';
import {
  ClipboardCheck,
  Clock,
  MessagesSquare,
  Presentation,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-3">
      {/* Section 1 */}
      <section className="grid grid-cols-[1fr_1fr] justify-items-center items-center -space-x-60 bg-gray-200">
        <div className="flex flex-col space-y-6 items-end  max-w-[30rem] text-start">
          <h1 className="font-bold text-[48px]">
            Tasker brings all your tasks Teams & tools together
          </h1>
          <span className="text-slate-400 text-[15px]">
            Keep everything in the same place-even if your team isn&apos;t.
          </span>
          <div className="flex items-center gap-5 w-full">
            <Input type="email" placeholder="Email" className="w-full" />
            <Button
              size="lg"
              className="bg-[#3A1B05] hover:bg-[#704222] text-white"
            >
              Sign up for free
            </Button>
          </div>
        </div>

        <div>
          <Image
            alt="section 1"
            src={section1}
            width={700}
            height={700}
            priority={true}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex flex-col items-center space-y-4">
        <h1 className="font-bold text-2xl">Trusted Clients</h1>
        <span className="max-w-3xl italic">
          From startups to Fortune 500 companies, teams trust our application to
          deliver high-quality project management and collaboration. Our
          platform helps teams to streamline their workflows, improve
          communication, and deliver projects on time. Join the thousands of
          teams who have improved their productivity with us.
        </span>
        <Image
          alt="trusted clients"
          src={section2}
          priority={true}
          className="max-w-3xl"
        />
      </section>

      {/* Section 3 */}
      <section className="grid grid-cols-2 justify-items-center items-center bg-gray-200 py-3">
        <div className="flex flex-col space-y-4 max-w-lg">
          <h1 className="font-bold text-3xl">Our Top Features</h1>
          <span>
            Manage your projects, track your team&apos;s progress, and
            communicate effectively with our powerful features. Get started
            today and streamline your project management process.
          </span>
          <Button
            size="sm"
            className="bg-[#3A1B05] hover:bg-[#704222] text-white w-[10rem] rounded-xl"
          >
            Get Started
          </Button>
        </div>

        <div className="flex space-x-9">
          <div className="flex flex-col space-y-9">
            <div className="flex flex-col space-y-3 w-[20rem] border border-slate-400 px-4 py-6 rounded-xl bg-white">
              <div className="px-2 py-3 bg-[#FE3D3B] w-fit rounded-xl">
                <ClipboardCheck size={44} color="#e7e7e7" />
              </div>
              <h1 className="font-bold text-xl">Tasks</h1>
              <span className="text-md text-slate-400">
                Create, assign, and track tasks with ease. Our task management
                feature allows you to keep track of your team&apos;s progress
                and ensure everyone is on the same page.
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
                Schedule your tasks and meetings with our time slot feature.
                This feature allows you to allocate specific time slots for
                different tasks and meetings, ensuring efficient time
                management.
              </span>
            </div>

            <div className="flex flex-col space-y-3 w-[20rem] border border-slate-400  px-4 py-6 rounded-xl bg-white">
              <div className="px-2 py-3 bg-[#FFB601] w-fit rounded-xl">
                <MessagesSquare size={44} color="#e7e7e7" />
              </div>
              <h1 className="font-bold text-xl">Communication</h1>
              <span className="text-md text-slate-400">
                Communicate effectively with your team. Our communication
                feature allows you to send messages, share files, and
                collaborate with your team in real-time.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="grid grid-cols-[1fr_1fr] justify-items-center -space-x-80">
        <div>
          <Image
            alt="section 1"
            src={section4}
            width={600}
            height={600}
            priority={true}
          />
        </div>

        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-xl">Perform All Your Tasks</h1>
          <h1 className="font-bold text-xl text-end max-w-xs">At One Place</h1>
          <span className="max-w-sm">
            Our platform provides a unified solution for all your project
            management needs. From task creation to tracking progress, we offer
            a range of features designed to help you and your team work more
            efficiently.
          </span>
          <Button className="bg-[#3A1B05] hover:bg-[#704222] text-white w-[28rem] rounded-xl">
            Get Started
          </Button>
        </div>
      </section>

      {/* Section 5 */}
      <section className="flex flex-col gap-8 bg-gray-200 py-9">
        <h1 className="text-center font-bold text-3xl">
          Check How Our Client Use Our Product
        </h1>
        <div className="flex space-x-5 items-center justify-center">
          <div className="flex flex-col items-center w-[40rem] border border-slate-400 px-4 py-6 rounded-xl bg-white">
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
              management. His attention to detail and ability to coordinate
              tasks efficiently make him a valuable asset to any team.
            </span>
          </div>
          <div className="flex flex-col items-center w-[40rem] border border-slate-400 px-4 py-6 rounded-xl bg-white">
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
          </div>
        </div>
        <div className="flex justify-center space-x-3">
          <span className="h-4 w-4 bg-gray-300 rounded-full"></span>
          <span className="h-4 w-4 bg-blue-500 rounded-full"></span>
          <span className="h-4 w-4 bg-gray-300 rounded-full"></span>
        </div>
      </section>
    </div>
  );
}
