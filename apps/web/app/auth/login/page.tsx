"use client";

import { defaultSignIn, defaultSignUp, loginBySMS } from "@/api/auth";
import {  sendBySMS } from "@/api/sms";
import MyFormField from "@/components/base/MyFormField";
import Layout from "@/components/page-components/auth/AuthBackGround";
import Oauth2 from "@/components/page-components/auth/Oauth2";
import renderSignIn from "@/components/page-components/auth/SignIn";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGithubUsername, useOauth2Dialog } from "../../../store/auth";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
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
    // .min(4, { message: "用户名长度不能少于4个字符" })
    // .max(12, { message: "用户名长度不能超过20个字符" }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      code: "",
      username: "",
    },
  });
  async function onSubmit(values: loginFormSchemaType) {
    console.log(values);
  }

  //登录模式(是否为手机短信登录)
  const [isPhoneMode, setIsPhoneMode] = useState(false);
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
    let res = isPhoneMode
      ? await loginBySMS(form.getValues("phone"), form.getValues("code"))
      : await defaultSignIn(form.getValues("username"), form.getValues("password"));
    window.localStorage.setItem("token", res.token); //存入本地
    window.localStorage.setItem("userId", res.data?.userId); 
    // if(isPhoneMode) {
    //   window.localStorage.setItem("userId", res.data.id); 
    // }
    // else{
    //   window.localStorage.setItem("userId", res.data.userId); 
    // }
    console.log(res.token);
    router.push("/");
  };

  const { githubUsername } = useGithubUsername();
  const { setIsOpen, isOpen } = useOauth2Dialog();

  const addPhoneByGithub = async () => {
    let res = await defaultSignUp(
      githubUsername,
      "",
      form.getValues("phone"),
      form.getValues("code"),
    );
    console.log(res);
    CloseModal();
    router.push("/");
  };

  const showModal = () => {
    const modalElement = document.getElementById("my_modal_1") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const CloseModal = () => {
    const modalElement = document.getElementById("my_modal_1") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.close();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      showModal();
    }
  }, [isOpen]);

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
                <p className="text-red-500 text-2xl card-title">Sign In</p>
              </div>

              {renderSignIn({
                isPhoneMode,
                setIsPhoneMode,
                isDisabled,
                form,
                handleClick,
                countdown,
              })}
              <div className="flex justify-between mt-[5px]">
                <Button
                  className="btn w-full hover:bg-red-600 bg-[#EF4444] text-white"
                  onClick={() => handleSign()}
                  type="submit"
                >
                  登录
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <label className="label">
                  <Link
                    href="/auth/register"
                    className="label-text-alt link link-hover text-[#EF4444] "
                  >
                    点此注册
                  </Link>
                </label>
                <Oauth2 />
              </div>
            </form>
          </div>
        </Form>
      </div>

      <dialog
        id="my_modal_1"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">请绑定手机号!</h3>
          <Form {...form}>
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
              className={`btn btn-outline btn-error mt-4`}
              onClick={handleClick}
              disabled={isDisabled}
            >
              {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
            </button>
          </Form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  addPhoneByGithub();
                }}
              >
                {" "}
                绑定
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </Layout>
  );
}
