"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Login = ({ loading, form, handleSubmit }) => {
  return (
    <div className="h-full w-screen flex flex-col xl:flex-row items-center justify-center relative">
      <div className=" h-full w-full flex items-center justify-center relative">
        <div className="h-full w-full bg-slate-100 relative">
          <Image
            src="/loginPic3.avif"
            sizes="100px"
            fill
            priority
            className=" w-full h-full  object-cover"
            alt="Login Image"
          />
        </div>
        <Image
          src="/prioritySolutionLogo.png"
          width={100}
          height={100}
          className="absolute top-5 left-2 lg:top-10 lg:left-10 h-16 sm:h-24 w-16 sm:w-24"
          alt="Login Image"
        />
      </div>
      <div className=" w-full flex items-center justify-center h-full bg-secondary py-16">
        <div className=" w-[720px] flex flex-col items-start justify-center gap-16 border-2 border-primary rounded-lg p-2 sm:p-10 h-full xl:h-fit">
          <div className="text-center w-full">
            <h1 className="text-4xl font-[600] mb-6 text-primary ">
              Welcome to Co-operative Solution
            </h1>
            <p className="text-gray-800 text-xl">
              Please login to start your session
            </p>
          </div>
          <div className="w-full  h-full">
            <Form {...form} className="">
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-5"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="bg-gray-50 px-4 py-6 text-base  border-primary  "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter password"
                          type="password"
                          className="bg-gray-50 px-4 py-6 text-base border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-end">
                  <Link
                    className=" hover:text-primary"
                    href={`/forgotpassword`}
                  >
                    Forgot password
                  </Link>
                </div>
                <div className="flex items-center justify-end w-full">
                  <Button
                    type="submit"
                    className=" w-1/2 text-lg py-6 hover:bg-primary"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <footer className="absolute w-full h-[50px] bottom-0 left-0 flex items-center justify-start px-2 text-sm">
        <p>
          Designed and Developed by{" "}
          <span className="font-[500]">Priority Solution</span>
        </p>
      </footer>
    </div>
  );
};

export default Login;
