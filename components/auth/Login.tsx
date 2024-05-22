'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { setCookie } from 'cookies-next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import authApiRequest from '@/apiRequest/auth/auth.api';
import Image from 'next/image';
import logoImg from '@/public/logo.png';
import { useAppContext } from '@/context/user';

const loginSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

const Login = () => {
  const { setUser } = useAppContext();
  //define const
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //Define login form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  //handle login
  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    try {
      // Trim the username
      data.username = data.username.trim();
      data.password = data.password.trim();
      const result = await authApiRequest.login(data);
      console.log(result);
      if (result.statusCode === 200) {
        toast({
          variant: 'success',
          description: result.message,
          duration: 5000,
        });
        setCookie('clientSessionToken', result.token);
        setCookie('refreshToken', result.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
        router.push('/workspace');
      } else {
        toast({
          title: <TriangleAlert size={20} />,
          variant: 'destructive',
          description: result.message,
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: <TriangleAlert size={20} />,
        variant: 'destructive',
        description: 'Fail to login, please try again',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border-2 rounded-md h-full xl:h-fit w-full xl:w-[550px] bg-white">
      <div className="pt-10 pb-10 px-10 flex gap-3 flex-col text-black items-center">
        {/* Image */}
        <Image
          src={logoImg}
          height={250}
          width={250}
          priority={true}
          alt="Logo"
        />
        {/* Form */}
        <div className="mb-10 justify-center align-middle text-center">
          <h1 className="text-3xl font-semibold pb-2">Login to Account</h1>
          <p className="font-medium text-sm px-6">
            Please enter your email and password to continue
          </p>
        </div>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <div className="flex flex-col gap-y-5">
                <div>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between mb-2">
                          <FormLabel>Password</FormLabel>
                          <Label htmlFor="password" className="font-medium">
                            <a href="/register">Forgor Password? </a>
                          </Label>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-center mt-6 px-16">
                <Button
                  type="submit"
                  variant={loading ? 'loading' : 'loginButton'}
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div>
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
};

export default Login;
