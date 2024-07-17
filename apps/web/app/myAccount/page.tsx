"use client";

import { Icons } from "@/components/base/Icon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Head from "../../components/page-components/index/Head";



const loginFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
  username: z.string().min(1, {
    message: "不能为空",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  nickname: z.string().min(1, {
    message: "不能为空",
  }),
  phone: z.string().min(1, {
    message: "不能为空",
  }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

function Index(props: any) {
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      nickname: "",
      phone: "",
    },
  });
  async function onSubmit(values: loginFormSchemaType) {
    console.log(values);
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (provider: string) => {
    setIsLoading(true);

    signIn(provider).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div>
      <Head />
      <div
        className="w-4/5 mx-auto  mt-8"
        id="my-work"
      >
        <div
          className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
          style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
        >
          个人中心
        </div>

<div className="flex justify-center"> 
        {/* //表单 */}
        <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100 font-serif rounded-2xl">
          <Form {...form}>
            <div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2 p-8 bg-slate-100 rounded-2xl"
              >
                <div className="flex justify-center items-center card-title">
                  {/* //头像 */}
                  <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
                    <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          className="input-bordered"
                          {...field}
                          placeholder="username"
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
                    <FormItem className="form-control mt-[5px]">
                      <FormLabel className="label">Password</FormLabel>
                      <FormControl>
                        <Input
                          className="input-bordered border-red-500/30"
                          type="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="form-control mt-[5px]">
                      <FormLabel className="label">Password</FormLabel>
                      <FormControl>
                        <Input
                          className="input-bordered border-red-500/30"
                          placeholder="phone"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem className="form-control mt-[5px]">
                      <FormLabel className="label">Nickname</FormLabel>
                      <FormControl>
                        <Input
                          className="input-bordered border-red-500/30"
                          placeholder="nickname"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="form-control mt-[5px]">
                      <FormLabel className="label">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="input-bordered border-red-500/30"
                          placeholder="email"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-between mt-[5px]">
                  <Button
                    className="btn w-full hover:bg-red-600 bg-[#EF4444] text-white"
                    onClick={() => handleSignIn("email")}
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </Form>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Index;
