import Layout from '@/components/layout';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ImageUp } from 'lucide-react';

export default function AccountSettings() {
  return (
    <Layout>
      <main className="flex-1 p-4 bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-red-600">
            Account settings
          </h1>

          <div className="grid w-full max-w-sm mt-8 items-center gap-1.5">
            <Label className="text-lg" htmlFor="picture">Your profile picture</Label>
            <div className="relative w-40 h-40 border-2 border-gray-400   border-dashed rounded-md">
              <Input
                id="picture"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center">
                <ImageUp className="w-12 h-12 mb-3 text-gray-500"/>
                <span className="text-gray-500 text-sm ml-1">
                Upload your photo
                </span>
                
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-10">
            {/* First Name */}
            <div className="col-span-3">
              <Label className="text-lg" htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className="bg-slate-200"
              />
            </div>

            {/* Last Name */}
            <div className="col-span-3">
              <Label className="text-lg" htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className="bg-slate-200"
              />
            </div>

            {/* Username */}
            <div className="col-span-6">
              <Label className="text-lg" htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your user name"
                className="bg-slate-200 w-full md:w-11/12 "
              />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mt-5">
            <div className="col-span-6">
              <Label className="text-lg" htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="bg-slate-200 w-full"
              />
            </div>

            <div className="col-span-6">
              <Label className="text-lg" htmlFor="phoneNumber">Phone number</Label>
              <Input
                type="number"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="bg-slate-200 w-full md:w-11/12"
              />
            </div>
          </div>

          <div className="mt-14">
            <Label className="text-lg" htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              placeholder="Enter bio here"
              className="w-full  h-36 px-4 py-2 border rounded-md bg-slate-200 "
            />{' '}
          </div>

          <Button className="mt-10 bg-red-600">Update Profile</Button>
          <Button className="ml-3 bg-blue-400">Reset</Button>
        </div>
      </main>
    </Layout>
  );
}
