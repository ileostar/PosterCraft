"use client";

import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { bindEmail, updateEmail, verifyEmail } from "@/http/email";
import { updatePhone, verifyPhone } from "@/http/sms";
import { getUserInfo } from "@/http/user";
import profileAnimation from "@/public/animations/Setting.json";
import { useUserStore } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Account({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations();
  const { toast } = useToast();
  const { userId } = useUserStore();

  const [isBindEmail, setIsBindEmail] = useState<boolean>(false);
  const [phoneStep, setPhoneStep] = useState<number>(0); //用于控制表单显示的步骤变化
  const [emailStep, setEmailStep] = useState<number>(0); //用于控制表单显示的步骤变化
  const [phoneDisabled, setPhoneIsDisabled] = useState<boolean>(true);
  const [emailDisabled, setEmailIsDisabled] = useState<boolean>(true);
  const [countdownZero, setCountdownZero] = useState<boolean>(false); //用于控制验证码倒计时

  const phoneFormSchema = z.object({
    phone: z.string().regex(/^1[3-9]\d{9}$/, {
      message: t("form.phone.invalid"),
    }),
    otp: z
      .string()
      .length(6, {
        message: t("form.code.length"),
      })
      .regex(/^\d+$/, {
        message: t("form.code.length"),
      }),
  });

  type phoneFormSchemaType = z.infer<typeof phoneFormSchema>;
  const phoneForm = useForm<phoneFormSchemaType>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: "",
      otp: "",
    },
  });
  const emailFormSchema = z.object({
    email: z.string().email({
      message: t("form.email.invalid"),
    }),
    otp: z
      .string()
      .length(6, {
        message: t("form.code.length"),
      })
      .regex(/^\d+$/, {
        message: t("form.code.length"),
      }),
  });

  type emailFormSchemaType = z.infer<typeof emailFormSchema>;
  const emailForm = useForm<emailFormSchemaType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const getUserData = useCallback(
    async (userId: string) => {
      try {
        const res = await getUserInfo(userId);
        if (res.data.data) {
          phoneForm.setValue("phone", res.data.data.phone || "");
          phoneForm.setValue("otp", "000000");
          emailForm.setValue("email", res.data.data.email || "");
          emailForm.setValue("otp", "000000");
          if (!res.data.data.email) {
            setEmailStep(2);
            setIsBindEmail(false);
          } else {
            setEmailStep(0);
            setIsBindEmail(true);
          }
          setEmailIsDisabled(false);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: t("errors.common.serverError"),
          description: t("errors.connection.failed"),
          action: <ToastAction altText="Try again">{t("errors.common.tryAgain")}</ToastAction>,
        });
        console.log(error);
      }
    },
    [phoneForm, emailForm, setEmailStep, setIsBindEmail, setEmailIsDisabled, toast, t],
  );

  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId, getUserData]);

  const executePhoneStep = async (step: number) => {
    switch (step) {
      case 0:
        setPhoneIsDisabled(true);
        break;
      case 1:
        setPhoneIsDisabled(true);
        phoneForm.setValue("otp", ""); //初始化验证码
        break;
      case 2: {
        const res = await verifyPhone({
          phone: phoneForm.getValues("phone"),
          otp: phoneForm.getValues("otp"),
        });
        if (res.data.msg === "手机号校验成功") {
          toast({
            variant: "success",
            title: "Success",
            description: res.data.msg,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.data.msg,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setPhoneStep(1);
          return;
        }

        setPhoneIsDisabled(false);
        phoneForm.reset();
        phoneForm.setValue("otp", "000000"); //初始化验证码
        break;
      }
      case 3:
        setPhoneIsDisabled(true);
        phoneForm.setValue("otp", ""); //初始化验证码
        setCountdownZero(true);
        break;
      case 4: {
        phoneForm.getValues("otp");
        phoneForm.getValues("phone");
        const resp = await updatePhone({
          phone: phoneForm.getValues("phone"),
          otp: phoneForm.getValues("otp"),
        });
        if (resp.data.code === 200) {
          toast({
            variant: "success",
            title: "Success",
            description: resp.data.msg,
          });
          setPhoneStep(0);
          setCountdownZero(false);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: resp.data.msg,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setPhoneStep(3);
        }
        break;
      }
      default:
        break;
    }
  };

  async function onSubmitPhone(values: phoneFormSchemaType) {
    console.log(values);
    setPhoneStep(phoneStep + 1);
    executePhoneStep(phoneStep + 1); //因为setPhoneSteps是异步的，所以还需要直接+1
  }

  const executeEmailStep = async (step: number) => {
    switch (step) {
      case 0:
        setEmailIsDisabled(true);
        break;
      case 1:
        setEmailIsDisabled(true);
        emailForm.setValue("otp", ""); //初始化验证码
        break;
      case 2: {
        const res = await verifyEmail({
          email: emailForm.getValues("email"),
          otp: emailForm.getValues("otp"),
        });
        if (res.data.code === 200) {
          toast({
            variant: "success",
            title: "Success",
            description: res.data.msg,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: res.data.msg,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setEmailStep(1);
          return;
        }

        setEmailIsDisabled(false);
        emailForm.reset();
        emailForm.setValue("otp", "000000"); //初始化验证码
        break;
      }
      case 3:
        setEmailIsDisabled(true);
        emailForm.setValue("otp", ""); //初始化验证码
        setCountdownZero(true);
        break;
      case 4: {
        emailForm.getValues("otp");
        emailForm.getValues("email");
        const resp = isBindEmail
          ? await updateEmail({
              email: emailForm.getValues("email"),
              otp: emailForm.getValues("otp"),
            })
          : await bindEmail({
              email: emailForm.getValues("email"),
              otp: emailForm.getValues("otp"),
            });
        if (resp.data.code === 200) {
          toast({
            variant: "success",
            title: "Success",
            description: resp.data.msg,
          });
          setEmailStep(0);
          setCountdownZero(false);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: resp.data.msg,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setEmailStep(3);
        }
        break;
      }
      default:
        break;
    }
  };

  async function onSubmitEmail(values: emailFormSchemaType) {
    console.log(values);
    setEmailStep(emailStep + 1);
    executeEmailStep(emailStep + 1); //因为setPhoneSteps是异步的，所以还需要直接+1
  }
  return (
    <div className={`h-full flex flex-row justify-between gap-10 ${className}`}>
      <div className="flex-1 flex flex-col justify-between gap-10">
        <div className="flex flex-col justify-start gap-6">
          <div className="flex justify-start items-center">
            <div className="text-[#f43f5e] dark:text-[#d048ef] text-xl card-title">
              {t("bind-account")}
            </div>
          </div>
          <div className="flex flex-col justify-start gap-6">
            <Form {...phoneForm}>
              <form
                onSubmit={phoneForm.handleSubmit(onSubmitPhone)}
                className="sm:w-[40%] mx-auto flex flex-col gap-4"
              >
                <CustomFormField
                  form={phoneForm}
                  name="phone"
                  placeholder={t("phonePlaceholder")}
                  label={t("phone")}
                  disabled={phoneDisabled}
                />

                <CustomFormField
                  form={phoneForm}
                  name="otp"
                  placeholder={t("otpPlaceholder")}
                  label={t("verification-code")}
                  isShowLabel={false}
                  isVerify={true}
                  hidden={phoneStep === 0 || phoneStep === 2}
                  countdownZero={countdownZero}
                />

                <div className="w-full flex gap-4">
                  <Button
                    className="btn bg-[#f43f5e] dark:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-red-600 text-white"
                    type="submit"
                  >
                    {phoneStep === 0 ? t("change-phone") : t("next-step")}
                  </Button>
                  {phoneStep !== 0 && (
                    <Button
                      onClick={() => window.location.reload()}
                      className="btn bg-[#ebedef] dark:bg-[#727477] hover:bg-red-600 text-black dark:text-white"
                    >
                      {t("return")}
                    </Button>
                  )}
                </div>
              </form>
            </Form>

            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                className="sm:w-[40%] mx-auto flex flex-col gap-4"
              >
                <CustomFormField
                  form={emailForm}
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  label={t("email")}
                  disabled={emailDisabled}
                />
                <CustomFormField
                  form={emailForm}
                  name="otp"
                  placeholder={t("otpPlaceholder")}
                  label={t("verification-code")}
                  isShowLabel={false}
                  isVerify={true}
                  hidden={emailStep === 0 || emailStep === 2}
                  countdownZero={countdownZero}
                  isEmail={true}
                />

                <div className="w-full flex gap-4">
                  <Button
                    className="btn bg-[#f43f5e] dark:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-red-600 text-white"
                    type="submit"
                  >
                    {emailStep === 0 ? t("change-email") : t("next-step")}
                  </Button>
                  {emailStep === 0 || !isBindEmail ? null : (
                    <Button
                      onClick={() => window.location.reload()}
                      className="btn bg-[#ebedef] dark:bg-[#727477] hover:bg-red-600 text-black dark:text-white"
                    >
                      {t("return")}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="flex flex-col justify-start gap-6">
          <div className="flex justify-start items-center h-[10%]">
            <div className="text-[#f43f5e] dark:text-[#d048ef] text-xl card-title">
              {t("close-account")}
            </div>
          </div>
          <div className="w-[80%] mx-auto flex flex-col gap-4">
            <div className="bg-gray-300 rounded-xl pl-2 pt-1 pb-1">{t("close-account-desc")}</div>
            <Button
              onClick={() => window.location.reload()}
              className="sm:w-[30%] btn bg-[#f43f5e] dark:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-red-600 text-white"
            >
              {t("close-account")}
            </Button>
          </div>
        </div>
      </div>
      {/* Lottie 动画部分 */}
      <div className="h-full flex-1 flex items-center justify-center rounded-lg bg-gradient-to-br from-pink-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <Lottie
          animationData={profileAnimation}
          loop={true}
          className="w-full h-full max-w-[400px]"
          style={{
            filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
          }}
        />
      </div>
    </div>
  );
}
