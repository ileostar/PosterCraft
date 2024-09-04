"use client";

import { defaultSignIn, defaultSignUp, loginBySMS } from "@/api/auth";
import { sendBySMS } from "@/api/sms";
import Layout from "@/components/pages/auth/AuthBackGround";
import Oauth2 from "@/components/pages/auth/Oauth2";
import renderSignIn from "@/components/pages/auth/SignIn";
import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useGithubUsername, useOauth2Dialog } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import "@/styles/base/formFieldError.css";

import { ToastAction } from "@/components/ui/toast";

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
  username: z.string().min(2, { message: "用户名长度不能少于2个字符" }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
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
      sendBySMS({ phone: form.getValues("phone") });
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
    try {
      let res = isPhoneMode
        ? await loginBySMS({ phone: form.getValues("phone"), otp: form.getValues("code") })
        : await defaultSignIn({
            identifier: form.getValues("username"),
            password: form.getValues("password"),
          });

      if (res.data.code !== 200) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.data.msg,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      if (res.data.token) {
        window.localStorage.setItem("token", res.data.token); //存入本地
      }
      window.localStorage.setItem("userId", res.data.data.userId);
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.msg,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  const { githubUsername } = useGithubUsername();
  const { setIsOpen, isOpen } = useOauth2Dialog();

  const addPhoneByGithub = async () => {
    let res = await defaultSignUp({
      username: githubUsername,
      password: null,
      phone: form.getValues("phone"),
      otp: form.getValues("code"),
    });
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 p-8 bg-slate-100 rounded-2xl"
          >
            <div className="flex justify-center items-center ">
              <div className="text-red-500 text-2xl card-title">Sign In</div>
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
        </Form>
      </div>

      <dialog
        id="my_modal_1"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">请绑定手机号!</h3>
          <Form {...form}>
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
