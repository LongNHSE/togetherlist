'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ImageUp } from 'lucide-react';
import { UserType } from '@/lib/schema/user.schema';
import { getImage } from '@/lib/utils';
import Image from 'next/image';
import userApiRequest from '@/apiRequest/user/user.api';

export default function AccountSettings() {
  const [user, setUser] = useState<UserType>();

  const getUserFromLocalStorage = async () => {
    const userLocal = localStorage.getItem('user');
    if (userLocal !== null) {
      setUser(JSON.parse(userLocal));
    }
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);
  const [avatar, setAvatar] = useState<any>();

  const changeProfilePicture = async () => {
    try {
      const formData = new FormData();

      formData.append('file', avatar);
      // const result = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/users/avatar`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem(
      //         'clientSessionToken',
      //       )}`,
      //     },
      //     body: formData,
      //   },
      // );
      const result = await userApiRequest.updateAvatar(formData);

      if (result.statusCode === 200) {
        console.log(result.data);
        localStorage.setItem('user', JSON.stringify(result.data));
        setUser(result.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    changeProfilePicture();
  }, [avatar]);

  return (
    <main className="flex-1 p-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-red-600 ">
          Account settings
        </h1>

        <div className="grid grid-cols-[1fr_5fr] w-full max-w-full mt-8 items-center">
          <div className="">
            <Label className="text-lg truncate" htmlFor="picture">
              Your profile picture
            </Label>
            <div className="relative w-40 h-40 border-2 border-gray-400  border-dashed rounded-md">
              <input
                id="picture"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAvatar(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className=" w-full h-full bg-slate-200 flex flex-col items-center justify-center">
                {user?.avatar ? (
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_IMAGE_API_URL}/` + user.avatar
                    }
                    height={600}
                    width={600}
                    alt={user.avatar}
                  />
                ) : (
                  <ImageUp className="w-12 h-12" />
                )}
              </div>
            </div>
          </div>
          <div className="">
            <Label className="text-lg" htmlFor="bio">
              Bio
            </Label>
            <textarea
              id="bio"
              placeholder="Enter bio here"
              value={user?.bio}
              className="w-full h-36 border rounded-md bg-slate-200 "
            />{' '}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-10">
          {/* First Name */}
          <div className="col-span-3">
            <Label className="text-lg" htmlFor="firstName">
              First Name
            </Label>
            <Input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              value={user?.firstName}
              className="bg-slate-200"
            />
          </div>

          {/* Last Name */}
          <div className="col-span-3">
            <Label className="text-lg" htmlFor="lastName">
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              value={user?.lastName}
              className="bg-slate-200"
            />
          </div>

          {/* Username */}
          <div className="col-span-6">
            <Label className="text-lg" htmlFor="username">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your user name"
              value={user?.username}
              className="bg-slate-200 w-full md:w-11/12 "
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-5">
          <div className="col-span-6">
            <Label className="text-lg" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={user?.email}
              className="bg-slate-200 w-full"
            />
          </div>

          <div className="col-span-6">
            <Label className="text-lg" htmlFor="phoneNumber">
              Phone number
            </Label>
            <Input
              type="number"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={user?.phone}
              className="bg-slate-200 w-full md:w-11/12"
            />
          </div>
        </div>

        <Button className="mt-10 bg-red-600">Update Profile</Button>
        <Button className="ml-3 bg-blue-400">Reset</Button>
      </div>
    </main>
  );
}
