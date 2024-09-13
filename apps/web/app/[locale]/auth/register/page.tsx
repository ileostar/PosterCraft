"use client";

import { defaultSignUp } from "@/api/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import Oauth2 from "@/components/pages/auth/Oauth2";
import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { registerFormSchema, registerFormSchemaType } from "@/utils/formSchema";
import { Link } from "@/utils/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      phone: "",
      password: "",
      otp: "",
      username: "",
    },
  });
  async function onSubmit(values: registerFormSchemaType) {
    try {
      const res = await defaultSignUp({
        username: values.username,
        password: values.password,
        phone: values.phone,
        otp: values.otp,
      });
      if (res.data.code === 200) {
        toast({
          variant: "success",
          title: "Success",
          description: "注册成功,即将跳转至登录页...",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
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
  }

  return (
    <AuthLayout>
      <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100  dark:bg-[#FF33DE]/15 dark:backdrop-blur-3xl font-serif rounded-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 p-8 rounded-2xl"
          >
            <div className="flex justify-center items-center ">
              <div className="text-red-500 dark:text-white text-2xl card-title">Sign Up</div>
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
                isPassword={true}
              />
              <CustomFormField
                form={form}
                name={"phone"}
                placeholder={"请输入手机号码"}
                label={"手机号码"}
              />
              <CustomFormField
                form={form}
                name={"otp"}
                placeholder={"请输入验证码"}
                label={"验证码"}
                isVerify={true}
              />
            </div>
            <div className="flex justify-between mt-[5px]">
              <Button
                className="btn w-full bg-red-600 dark:bg-[#8d1d7a] text-white"
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
                  className="label-text-alt no-underline link link-hover text-[#EF4444] dark:text-white"
                >
                  点此登录
                </Link>
              </label>
              <Oauth2 />
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
