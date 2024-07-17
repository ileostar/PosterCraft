"use client";

import { Icons } from "@/components/base/Icons";
import Layout from "@/components/page-components/login/LoginBackGround";
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
  phone: z
    .string()
    .length(11, { message: "无效的手机号码" })
    .regex(/^[0-9]+$/, {
      message: "无效的手机号码",
    }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  code:z.string() .length(4, { message: "无效的验证码" })
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Login() {
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      code:""
    },
  });
  async function onSubmit(values: loginFormSchemaType) {
    console.log(values);
  }

  const [isPhoneMode, setPhoneMode] = useState(false);

  const RenderForm = () => {
    if (isPhoneMode) {
      return (
        <div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号码</FormLabel>
                <FormControl>
                  <Input
                    className="input-bordered"
                    {...field}
                    placeholder="手机号码"
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
                <FormLabel className="label">验证码</FormLabel>
                <FormControl>
                  <Input
                    className="input-bordered border-red-500/30"
                    type="code"
                    placeholder="验证码"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      );
    }
    return (
      <div>
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
            </FormItem>
          )}
        />
      </div>
    );
  };

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

              {RenderForm()}

              <label className="label justify-end">
                <Link
                  href="#"
                  onClick={() => {
                    setPhoneMode(!isPhoneMode);
                  }}
                  className="label-text-alt link link-hover text-[#EF4444] "
                >
                  {isPhoneMode?'使用邮箱登录':'使用短信登录'}
                </Link>
              </label>
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
