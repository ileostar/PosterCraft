"use client";

import { defaultSignIn, defaultSignUp, loginBySMS } from "@/api/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import Oauth2 from "@/components/pages/auth/Oauth2";
import renderSignIn from "@/components/pages/auth/SignIn";
import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useGithubUsername, useOauth2Dialog } from "@/stores/auth";
import { loginFormSchema, loginFormSchemaType } from "@/utils/formSchema";
import { Link } from "@/utils/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("login");
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const { githubUsername } = useGithubUsername();
  const { setIsOpen, isOpen } = useOauth2Dialog();

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

  const handleSign = useCallback(async () => {
    try {
      const values = form.getValues();
      const res = isPhoneMode
        ? await loginBySMS({ phone: values.phone, otp: values.code })
        : await defaultSignIn({
            identifier: values.username,
            password: values.password,
          });

      if (res.data.code === 200) {
        toast({
          variant: "success",
          title: t("success"),
          description: t("loginSuccess"),
        });
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        localStorage.setItem("userId", res.data.data.userId);
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: t("error"),
          description: res.data.msg,
          action: <ToastAction altText={t("tryAgain")}>{t("tryAgain")}</ToastAction>,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [form, isPhoneMode, router, t, toast]);

  const addPhoneByGithub = useCallback(async () => {
    try {
      const values = form.getValues();
      await defaultSignUp({
        username: githubUsername,
        password: null,
        phone: values.phone,
        otp: values.code,
      });
      closeModal();
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("bindingFailed"),
      });
    }
  }, [form, githubUsername, router, t, toast]);

  const showModal = useCallback(() => {
    const modalElement = document.getElementById("my_modal_1") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    const modalElement = document.getElementById("my_modal_1") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.close();
    }
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      showModal();
    }
  }, [isOpen, showModal]);

  return (
    <AuthLayout>
      <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100 dark:bg-[#FF33DE]/15 dark:backdrop-blur-3xl font-serif rounded-2xl">
        <Form {...form}>
          <form className="flex flex-col gap-2 p-8 rounded-2xl">
            <div className="flex justify-center items-center">
              <div className="text-red-500 dark:text-white text-2xl card-title">{t("signIn")}</div>
            </div>

            {renderSignIn({
              isPhoneMode,
              setIsPhoneMode,
              form,
            })}
            <div className="flex justify-between mt-[5px]">
              <Button
                className="w-full hover:bg-red-600 bg-[#EF4444] dark:bg-[#8d1d7a] text-white"
                onClick={handleSign}
                type="button"
              >
                {t("signIn")}
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <label className="label">
                <Link
                  href="/auth/register"
                  className="label-text-alt link link-hover hover:text-gray-500 dark:hover:text-white/80 text-[#EF4444] dark:text-white"
                >
                  {t("registerHere")}
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
          <h3 className="font-bold text-lg">{t("bindPhoneNumber")}</h3>
          <Form {...form}>
            <CustomFormField
              form={form}
              name="phone"
              placeholder={t("enterPhoneNumber")}
              label={t("phoneNumber")}
            />
            <CustomFormField
              form={form}
              name="code"
              placeholder={t("enterVerificationCode")}
              label={t("verificationCode")}
              isVerify={true}
            />
          </Form>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={addPhoneByGithub}
              >
                {t("bind")}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </AuthLayout>
  );
}
