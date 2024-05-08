'use client';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Inputs = {
  username: string;
  password: string;
};

export function Login() {
  // const axios = useApiAuth();
  const { control, register, handleSubmit } = useForm<Inputs>({
    mode: 'onChange',
  });
  const handleResgistration: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <div className="border-2 rounded-md h-full xl:h-[450px] w-full xl:w-[550px] bg-white">
      <div className="pt-10 pb-10 px-10 flex flex-col text-black">
        <div className="mb-10 justify-center align-middle text-center">
          <h1 className="text-3xl font-semibold pb-2">Login to Account</h1>
          <p className="font-medium text-sm px-6">
            Please enter your email and password to continue
          </p>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(handleResgistration)}>
            <div className="flex flex-col gap-y-5">
              <div>
                <div className="mb-2">
                  <Label htmlFor="username" className="font-semibold">
                    Username:
                  </Label>
                </div>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Username" />
                  )}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="password" className="font-semibold">
                    Password:
                  </Label>
                  <Label htmlFor="password" className="font-medium">
                    <a href="/register">Forgor Password? </a>
                  </Label>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Password" type="password" />
                  )}
                />
              </div>
            </div>
          </form>
          <div>
            <div className="flex justify-center mt-6 px-16">
              <Button variant={'loginButton'}>Login</Button>
            </div>
            <div className="flex justify-center mt-4 px-16">
              <p>
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-blue-500 underline underline-offset-4"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
