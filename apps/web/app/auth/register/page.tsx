"use client";

import { defaultSignUp } from "@/api/auth";
import Layout from "@/components/pages/auth/AuthBackGround";
import Oauth2 from "@/components/pages/auth/Oauth2";
import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  phone: z.string().length(11, { message: "无效的手机号码" }).regex(/^\d+$/, {
    message: "无效的手机号码",
  }),
  password: z.string().min(1, {
    message: "不能为空",
  }),
  code: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
  username: z
    .string()
    .min(4, { message: "用户名长度不能少于4个字符" })
    .max(12, { message: "用户名长度不能超过20个字符" }),
});

export type loginFormSchemaType = z.infer<typeof registerFormSchema>;

export default function Register() {
  const router = useRouter();
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      phone: "",
      password: "",
      code: "",
      username: "",
    },
  });
  async function onSubmit(values: loginFormSchemaType) {
    const res = await defaultSignUp({
      username: form.getValues("username"),
      password: form.getValues("password"),
      phone: form.getValues("phone"),
      otp: form.getValues("code"),
    });
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  }

  return (
    <Layout>
      <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100 font-serif rounded-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 p-8 bg-slate-100 rounded-2xl"
          >
            <div className="flex justify-center items-center ">
              <p className="text-red-500 text-2xl card-title">Sign Up</p>
            </div>
            <div className="flex flex-col gap-1 mb-1">
              <CustomFormField
                form={form}
                name={"username"}
                placeholder={"请输入用户名"}
                label={"用户名"}
              />
              <CustomFormField
                form={form}
                name={"password"}
                placeholder={"请输入密码"}
                label={"密码"}
              />
              <CustomFormField
                form={form}
                name={"phone"}
                placeholder={"请输入手机号码"}
                label={"手机号码"}
              />
              <CustomFormField
                form={form}
                name={"code"}
                placeholder={"请输入验证码"}
                label={"验证码"}
                isVerify={true}
              />
            </div>
            <div className="flex justify-between mt-[5px]">
              <Button
                className="btn w-full hover:bg-red-600  text-white"
                // onClick={() => handleSign()}
                type="submit"
              >
                注册
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <label className="label">
                <Link
                  href="/auth/login"
                  className="label-text-alt no-underline link link-hover text-[#EF4444] "
                >
                  点此登录
                </Link>
              </label>
              <Oauth2 />
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
