"use client";

import { defaultSignIn, loginBySMS } from "@/api/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import Dialog from "@/components/pages/auth/Dialog";
import Oauth2 from "@/components/pages/auth/Oauth2";
import renderSignIn from "@/components/pages/auth/SignIn";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useToken } from "@/hooks/useToken";
import { useUserStore } from "@/stores/user";
import { loginFormSchema, loginFormSchemaType } from "@/utils/formSchema";
import { Link } from "@/utils/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const [_, setTokenHandler] = useToken();
  const { setUserId } = useUserStore();
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

  /** 登录模式(是否为手机短信登录) */
  const [isPhoneMode, setIsPhoneMode] = useState(false);

  const handleSign = async () => {
    try {
      let res = isPhoneMode
        ? await loginBySMS({ phone: form.getValues("phone"), otp: form.getValues("code") })
        : await defaultSignIn({
            identifier: form.getValues("username"),
            password: form.getValues("password"),
          });
      if (res.data.code === 200) {
        toast({
          variant: "success",
          title: "Success",
          description: "登录成功,即将跳转至主页...",
        });
        if (res.data.token) {
          setTokenHandler(res.data.token);
        }
        setUserId(res.data.data?.userId);
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.data.msg,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100 dark:bg-[#FF33DE]/15 dark:backdrop-blur-3xl  font-serif rounded-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 p-8 rounded-2xl"
          >
            <div className="flex justify-center items-center ">
              <div className="text-red-500 dark:text-white text-2xl card-title">Sign In</div>
            </div>

            {renderSignIn({
              isPhoneMode,
              setIsPhoneMode,
              form,
            })}
            <div className="flex justify-between mt-[5px]">
              <Button
                className="w-full hover:bg-red-600 bg-[#EF4444] dark:bg-[#8d1d7a] text-white"
                onClick={() => handleSign()}
                type="submit"
              >
                登 录
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <label className="label">
                <Link
                  href="/auth/register"
                  className="label-text-alt link link-hover hover:text-gray-500 dark:hover:text-white/80 text-[#EF4444] dark:text-white"
                >
                  点此注册
                </Link>
              </label>
              <Oauth2 />
            </div>
          </form>
        </Form>
      </div>
      <Dialog />
    </AuthLayout>
  );
}
