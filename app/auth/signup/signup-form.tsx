'use client';

import { z } from 'zod';
import { emailRegex } from '@/components/const';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

import { toast } from '@/components/ui/use-toast';

//Define sign up form schema
const formSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters',
      })
      .max(50),
    password: z.string(),
    passwordConfirm: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dob: z.date({
      required_error: 'A date of birth is required.',
    }),
    gender: z.string(),
    email: z
      .string({
        required_error: 'A email is required.',
      })
      .email(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Password must match',
    path: ['passwordConfirm'], // point to the field that triggers the error
  });

//define genders
const genders = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
] as const;
export default function SignUpForm() {
  //define stage
  const [stage, setStage] = useState(1);
  const [mail, setMail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //define form using z schema as type
  const form = useForm<z.infer<typeof formSchema>>({
    //use zodResolver for checking
    resolver: zodResolver(formSchema),
  });

  //function use on submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await fetch(
        `
        ${process.env.NEXT_PUBLIC_API_URL}/auth/signup
      `,
        {
          body: JSON.stringify(values),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then((res) => res.json());
      toast({
        variant: 'default',
        title: 'Account created',
        description: 'Your account has been created',
      });
      if (result.statusCode === 201) {
        toast({
          variant: 'success',
          title: 'Account created',
          description: 'Your account has been created',
        });
      } else {
        if (result?.code === 11000) {
          form.setError('username', {
            type: 'manual',
            message: 'Username already exists',
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //handle email submit
  async function handleEmailSubmit() {
    if (!emailRegex.test(mail)) {
      // toast({
      //   variant: 'destructive',
      //   title: 'Invalid email',
      //   description: 'Please enter a valid email',
      //   duration: 5000,
      // });
      setError('Please enter a valid email');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sendOTP`,
        {
          body: JSON.stringify({ email: mail }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();

      if (result.statusCode === 200) {
        setStage(2);
      } else {
        setError(result.message);
        // toast({
        //   variant: 'destructive',
        //   title: 'Error',
        //   description: result.message,
        //   duration: 5000,
        // });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  //handdle otp submit
  async function handleOtpSubmit() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verifyOTP`,
      {
        body: JSON.stringify({ email: mail, OTP: otp }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();
    if (result.statusCode === 200) {
      form.setValue('email', mail);
      setStage(3);
    } else {
      console.log('error');
    }
  }

  //
  function EmailSubmit() {
    return (
      <div>
        <div className="mb-10 justify-center align-middle text-center">
          <h1 className="text-3xl font-semibold pb-2">Register</h1>
          <p className="font-medium text-sm px-6">
            Please enter your email to continue
          </p>
        </div>
        <div className="mb-2">
          <Label
            htmlFor="Mail"
            className={
              error
                ? 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive'
                : 'text-sm font-medium'
            }
          >
            Mail:
          </Label>
        </div>
        <Input
          placeholder="Enter your mail"
          value={mail}
          type="email"
          onChange={(event) => {
            setError('');
            setMail(event.target.value);
          }}
        />
        {error && (
          <span className="text-sm font-medium text-destructive">{error}</span>
        )}
        <div className="flex justify-center mt-6 px-16">
          <Button
            variant={loading ? 'loading' : 'loginButton'}
            onClick={() => handleEmailSubmit()}
          >
            Enter
          </Button>
        </div>
      </div>
    );
  }

  function OtpSubmit() {
    return (
      <div className="">
        <div className="mb-5 justify-center align-middle text-center">
          <h1 className="text-3xl font-semibold pb-2">Register</h1>
          <p className="font-medium text-sm px-6">Please enter your OTP</p>
        </div>
        <div className="space-y-2 justify-center flex">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              if (value.length === 6) {
                handleOtpSubmit();
              }
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex justify-center mt-6 px-16">
          <Button
            variant={loading ? 'loading' : 'loginButton'}
            onClick={() => handleOtpSubmit()}
          >
            Enter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 rounded-md h-full w-full xl:w-[650px] bg-white">
      <div className="pt-10 pb-10 px-10 flex flex-col text-black">
        {stage === 1 && EmailSubmit()}
        {stage === 2 && OtpSubmit()}
        {stage === 3 && (
          <div className="">
            <div className="mb-10 justify-center align-middle text-center">
              <h1 className="text-3xl font-semibold pb-2">Login to Account</h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                <div className="flex flex-row space-x-6">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="passwordConfirm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password Confirm</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your First Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your Last Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant={'outline'}>
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                captionLayout="dropdown-buttons"
                                fromYear={1960}
                                toYear={2030}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Gender</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'w-[200px] justify-between',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value
                                    ? genders.find(
                                        (gender) =>
                                          gender.value === field.value,
                                      )?.label
                                    : 'Select gender'}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search gender..." />
                                <CommandEmpty>No gender found.</CommandEmpty>
                                <CommandGroup>
                                  {genders.map((gender) => (
                                    <CommandItem
                                      value={gender.label}
                                      key={gender.value}
                                      onSelect={() => {
                                        form.setValue('gender', gender.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          gender.value === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {gender.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-6 px-16">
                  <Button variant={'loginButton'}>Register</Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
