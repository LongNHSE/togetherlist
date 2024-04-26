"use client";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Inputs = {
  username: string;
  password: string;
};

export function Login() {
  const { control, register, handleSubmit } = useForm<Inputs>({
    mode: "onChange",
  });
  const handleResgistration: SubmitHandler<Inputs> = (data) =>
    console.log(data);
  return (
    <div className="border-2 rounded-md h-full bg-white">
      <div className="px-10 my-6 flex flex-col text-black">
        <div className="mb-9 justify-center align-middle text-center">
          <h1 className="text-2xl font-semibold pb-2">Login to Account</h1>
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
                    Forgor Password?
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
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
