"use client";

import { Button } from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Head from "../../components/page-components/index/Head";
import AuthLayout from "@/components/base/AuthLayout";
import MyFormField from "@/components/base/MyFormField";

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

function Account(props: any) {

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

  const handleUpdate = () => {
    
  };

  return (
    <AuthLayout>
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

<div className="flex justify-center mb-8"> 
        {/* //表单 */}
        <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100 font-serif rounded-2xl">
          <Form {...form}>
            <div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2 p-8 bg-slate-100 rounded-2xl"
              >
                {/* 头像 */}
                <div className="flex justify-center items-center card-title">
                  <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
                    <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"></div>
                  </div>
                </div>

                 
                <MyFormField
                  form={form}
                  name={"username"}
                  placeholder={""}
                  label={"用户名"}
                />
                <MyFormField
                  form={form}
                  name={"password"}
                  placeholder={""}
                  label={"密码"}
                />
                 <MyFormField
                  form={form}
                  name={"phone"}
                  placeholder={""}
                  label={"手机号"}
                />
               <MyFormField
                  form={form}
                  name={"nickname"}
                  placeholder={""}
                  label={"昵称"}
                />
                <MyFormField
                  form={form}
                  name={"email"}
                  placeholder={""}
                  label={"电子邮箱"}
                />
                <div className="flex justify-between mt-[5px]">
                  <Button
                    className="btn w-full hover:bg-red-600 bg-[#EF4444] text-white"
                    onClick={() => handleUpdate()}
                    type="submit"
                  >
                    更新信息
                  </Button>
                </div>
                <label className="label flex justify-end">
                  <Link
                    href="/auth/login"
                    className="label-text-alt link link-hover text-[#EF4444] "
                  >
                    注销账号
                  </Link>
                </label>
              </form>
            </div>
          </Form>
          </div>
        </div>
      </div>

      
    </div>
    </AuthLayout>
  );
}

export default Account;
