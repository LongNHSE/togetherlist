'use client';
import logo from '@/public/logo.png';
import { Chrome, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const GuestMenuFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 0.7rem;
`;

const GuestMenuHeader = styled.h1`
  font-weight: bold;
  font-size: 0.9rem;
`;

export default function GuestFooter() {
  return (
    <>
      <div className="grid grid-cols-[0.75fr_1fr] justify-items-center px-[1rem] py-5 border-t-4">
        <div className="max-w-[19rem]">
          <Image
            src={logo}
            alt="logo"
            height={220}
            width={220}
            priority={true}
          />
          <span className="text-[0.7rem] ">
            Welcome to our platform, a project management tool designed to help
            teams collaborate and manage work efficiently. From planning to
            tracking progress, we provide all the tools you need to deliver your
            projects successfully.
          </span>
          <div className="flex gap-[2.5rem] mt-6 items-center justify-center">
            <Link href="/">
              {/* <Facebook /> */}
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
          <GuestMenuFooter>
            <GuestMenuHeader>Together List</GuestMenuHeader>
            <Link href="/">Home</Link>
            <Link href="/">What&apos;s new </Link>
            <Link href="/">Pricing</Link>
            <Link href="/">Trust & Security</Link>
          </GuestMenuFooter>

          <GuestMenuFooter>
            <GuestMenuHeader>Solutions</GuestMenuHeader>
            <Link href="/">Small business</Link>
            <Link href="/">Personal Use</Link>
            <Link href="/">Education</Link>
          </GuestMenuFooter>

          <GuestMenuFooter>
            <GuestMenuHeader>Build</GuestMenuHeader>
            <Link href="/">Integrations</Link>
            <Link href="/">Templates</Link>
            <Link href="/">Becomne an affiliate</Link>
          </GuestMenuFooter>

          <GuestMenuFooter>
            <GuestMenuHeader>Resources</GuestMenuHeader>
            <Link href="/">About us</Link>
            <Link href="/">Careers</Link>
            <Link href="/">Media Kit</Link>
          </GuestMenuFooter>
        </div>
      </div>

      <div className="bg-slate-200 py-3">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Together List. All rights reserved.
        </p>
      </div>
    </>
  );
}
