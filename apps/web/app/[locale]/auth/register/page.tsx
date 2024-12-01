"use client";

import { defaultSignUp } from "@/api/auth";
import { DefaultSignUpBody } from "@/api/types/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import Oauth2 from "@/components/pages/auth/Oauth2";
import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "@/utils/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations();

  /** 表单验证相关 */
  const registerFormSchema = z.object({
    phone: z
      .string()
      .length(11, {
        message: t("form.phone.invalid"),
      })
      .regex(/^\d+$/, {
        message: t("form.phone.invalid"),
      }),
    password: z.string().min(1, {
      message: t("form.required"),
    }),
    otp: z
      .string()
      .length(6, {
        message: t("form.code.length"),
      })
      .regex(/^\d+$/, {
        message: t("form.code.length"),
      }),
    username: z
      .string()
      .min(4, { message: t("form.username.minLength") })
      .max(12, { message: t("form.username.maxLength") }),
  });

  /** 表单数据 */
  const form = useForm<DefaultSignUpBody>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      phone: "",
      password: "",
      otp: "",
      username: "",
    },
  });

  async function onSubmit(values: DefaultSignUpBody) {
    try {
      const res = await defaultSignUp(values);
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
      console.error(error);
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
              <div className="text-red-500 dark:text-white text-2xl card-title">{t("signUp")}</div>
            </div>
            <div className="flex flex-col gap-1 mb-1">
              <CustomFormField
                form={form}
                name={"username"}
                placeholder={t("usernamePlaceholder")}
                label={t("username")}
              />
              <CustomFormField
                form={form}
                name={"password"}
                placeholder={t("passwordPlaceholder")}
                label={t("password")}
                isPassword={true}
              />
              <CustomFormField
                form={form}
                name={"phone"}
                placeholder={t("phonePlaceholder")}
                label={t("phone")}
              />
              <CustomFormField
                form={form}
                name={"otp"}
                placeholder={t("otpPlaceholder")}
                label={t("otp")}
                isVerify={true}
              />
            </div>
            <div className="flex justify-between mt-[5px]">
              <Button
                className="btn w-full bg-red-600 dark:bg-[#8d1d7a] text-white"
                type="submit"
              >
                {t("register")}
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <label className="label">
                <Link
                  href="/auth/login"
                  className="label-text-alt no-underline link link-hover text-[#EF4444] dark:text-white"
                >
                  {t("loginLink")}
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
