"use client";

import Layout from "@/components/page-components/login/LoginBackGround";
import { Icons } from "@/components/base/icon";
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
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Login() {
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
    <Layout>
      <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100 font-serif rounded-2xl">
        <Form {...form}>
          <div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 p-8 bg-slate-100 rounded-2xl"
            >
              <div className="flex justify-center items-center card-title">
                <p className="text-center text-red-500 text-2xl">Sign In</p>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="input-bordered"
                        {...field}
                        placeholder="email"
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
                    <label className="label">
                      <Link
                        href="#"
                        className="label-text-alt link link-hover text-[#EF4444]"
                      >
                        Forgot password?
                      </Link>
                    </label>
                  </FormItem>
                )}
              />
              <div className="flex justify-between mt-[5px]">
                <Button
                  className="btn w-full hover:bg-red-600 bg-[#EF4444] text-white"
                  onClick={() => handleSignIn("email")}
                  type="submit"
                >
                  Login
                </Button>
              </div>
              <div className="flex justify-end gap-2 mt-2 items-center">
                <span className="text-xs font-serif">其他登录方式：</span>
                <div
                  className="cursor-pointer hover:animate-pulse"
                  onClick={() => handleSignIn("google")}
                >
                  <Icons.google />
                </div>
                <div
                  className="text-gray cursor-pointer hover:animate-pulse"
                  onClick={() => handleSignIn("github")}
                >
                  <Icons.gitHub />
                </div>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </Layout>
  );
}
