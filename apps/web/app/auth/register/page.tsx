"use client";

import {defaultSignUp,sendBySMS} from "@/api/api";
import MyFormField from "@/components/base/MyFormField";
import Layout from "@/components/page-components/auth/LoginBackGround";
import Oauth2 from "@/components/page-components/auth/Oauth2";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  phone: z
    .string()
    .length(11, { message: "无效的手机号码" })
    .regex(/^\d+$/, {
      message: "无效的手机号码",
    }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  code: z
    .string()
    .length(6, { message: "无效的验证码" })
    .regex(/^\d+$/, {
      message: "无效的验证码",
    }),
  username: z
    .string()
    .min(4, { message: "用户名长度不能少于4个字符" })
    .max(12, { message: "用户名长度不能超过20个字符" }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phone: "",
      password: "",
      code: "",
      username: "",
    },
  });
  async function onSubmit(values: loginFormSchemaType) {
    console.log(values);
  }

  //按钮禁用
  const [isDisabled, setIsDisabled] = useState(false);
  //倒计时
  const [countdown, setCountdown] = useState(0);

  // 发送验证码并启动倒计时
  const handleClick = () => {
    if (!isDisabled) {
      sendBySMS(form.getValues("phone"));
      setIsDisabled(true);
      setCountdown(60);
    }
  };
  useEffect(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    if (countdown === 0) {
      setIsDisabled(false);
    }
  }, [countdown]);

  const handleSign = async () => {
    let res = await defaultSignUp(
      form.getValues("username"),
      form.getValues("password"),
      form.getValues("phone"),
      form.getValues("code"),
    );
    console.log(res);
    router.push("/auth/login");
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
              <div className="flex justify-center items-center ">
                <p className="text-red-500 text-2xl card-title">Sign Up</p>
              </div>

              <div>
                <MyFormField
                  form={form}
                  name={"username"}
                  placeholder={"请输入用户名"}
                  label={"用户名"}
                />
                <MyFormField
                  form={form}
                  name={"password"}
                  placeholder={"请输入密码"}
                  label={"密码"}
                />
                <MyFormField
                  form={form}
                  name={"phone"}
                  placeholder={"请输入手机号码"}
                  label={"手机号码"}
                />
                <MyFormField
                  form={form}
                  name={"code"}
                  placeholder={"请输入验证码"}
                  label={"验证码"}
                />

                <button
                  className={`btn btn-outline btn-error mt-2`}
                  onClick={handleClick}
                  disabled={isDisabled}
                >
                  {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
                </button>
              </div>

              <div className="flex justify-between mt-[5px]">
                <Button
                  className="btn w-full hover:bg-red-600 bg-[#EF4444] text-white"
                  onClick={() => handleSign()}
                  type="submit"
                >
                  注册
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <label className="label">
                  <Link
                    href="/auth/login"
                    className="label-text-alt link link-hover text-[#EF4444] "
                  >
                    点此登录
                  </Link>
                </label>
                <Oauth2/>
                
              </div>
            </form>
          </div>
        </Form>
      </div>


    </Layout>
  );
}
