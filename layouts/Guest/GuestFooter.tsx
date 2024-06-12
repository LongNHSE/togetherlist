'use client';
import logo from '@/public/logo.png';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function GuestFooter() {
  return (
    <footer>
      <div className=" grid grid-cols-[0.75fr_1fr] justify-items-center px-[1rem] py-5 border-t-4">
        <div className="max-w-[19rem]">
          <Image
            src={logo}
            alt="logo"
            height={220}
            width={220}
            priority={true}
          />
          <span className="text-[0.7rem]">
            Welcome to our platform, a project management tool designed to help
            teams collaborate and manage work efficiently. From planning to
            tracking progress, we provide all the tools you need to deliver your
            projects successfully.
          </span>
          <div className="flex gap-[2.5rem] mt-6 items-center justify-center">
            <Link href="/">
              <Facebook
                size={40}
                color="#3A1B05"
                strokeWidth={2.5}
                absoluteStrokeWidth
              />
            </Link>
            <Link href="/">
              <Linkedin
                size={40}
                color="#3A1B05"
                strokeWidth={2.5}
                absoluteStrokeWidth
              />
            </Link>
            <Link href="/">
              <Instagram
                size={40}
                color="#3A1B05"
                strokeWidth={2.5}
                absoluteStrokeWidth
              />
            </Link>
          </div>
        </div>

        <div className="flex gap-[2.5rem] items-start">
          <div className="flex flex-col gap-4 text-[0.7rem]">
            <h1 className="font-bold text-[0.9rem]">Together List</h1>
            <Link href="/">Home</Link>
            <Link href="/">What&apos;s new </Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Trust & Security</Link>
          </div>

          <div className="flex flex-col gap-4 text-[0.7rem]">
            <h1 className="font-bold text-[0.9rem]">Solutions</h1>
            <Link href="/">Small business</Link>
            <Link href="/">Personal Use</Link>
            <Link href="/">Education</Link>
          </div>

          <div className="flex flex-col gap-4 text-[0.7rem]">
            <h1 className="font-bold text-[0.9rem]">Build</h1>
            <Link href="/">Integrations</Link>
            <Link href="/">Templates</Link>
            <Link href="/">Become an affiliate</Link>
          </div>

          <div className="flex flex-col gap-4 text-[0.7rem]">
            <h1 className="font-bold text-[0.9rem]">Resources</h1>
            <Link href="/">About us</Link>
            <Link href="/">Careers</Link>
            <Link href="/">Media Kit</Link>
          </div>
        </div>
      </div>

      <div className="bg-slate-200 py-3">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Together List. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
