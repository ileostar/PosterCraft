"use client";

import { bindEmail, updateEmail, verifyEmail } from "@/api/email";
import { getUserInfo } from "@/api/user";
import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const emailFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
  otp: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
});

export type emailFormSchemaType = z.infer<typeof emailFormSchema>;

export default function Account({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations();
  const { toast } = useToast();
  const { userId } = useUserStore();
  const [isBindEmail, setIsBindEmail] = useState<boolean>(false);
  const [emailStep, setEmailStep] = useState<number>(0); //用于控制表单显示的步骤变化
  const [emailDisabled, setEmailIsDisabled] = useState<boolean>(true);
  const [countdownZero, setCountdownZero] = useState<boolean>(false); //用于控制验证码倒计时

  const emailForm = useForm<emailFormSchemaType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const getUserData = async (userId: string) => {
    const res = await getUserInfo(userId);
    emailForm.setValue("email", res.data.data?.email || "");
    emailForm.setValue("otp", "000000"); //初始化验证码
    if (!res.data.data?.email) {
      setEmailStep(2);
      setIsBindEmail(false);
    } else {
      setEmailStep(0);
      setIsBindEmail(true);
    }
    setEmailIsDisabled(false);
  };

  useEffect(() => {
    if (userId !== null) {
      getUserData(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="flex-1 flex flex-col">
        <div className="text-[#f43f5e] dark:text-[#d048ef] text-xl card-title">
          {t("bind-account")}
        </div>
        <div className="h-[80%] flex flex-col justify-center">
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onSubmitEmail)}
              className="sm:w-[40%] mx-auto flex flex-col gap-4 "
            >
              <CustomFormField
                form={emailForm}
                name={"email"}
                placeholder={"请输入邮箱"}
                label={"绑定邮箱"}
                disabled={emailDisabled}
              />
              <CustomFormField
                form={emailForm}
                name={"otp"}
                placeholder={"请输入验证码"}
                label={"验证码"}
                isShowLabel={false}
                isVerify={true}
                hidden={emailStep === 0 || emailStep === 2}
                countdownZero={countdownZero}
                isEmail={true}
              />

              <div className="w-full flex gap-4">
                <Button
                  className=" btn  bg-[#f43f5e] dark:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-red-600  text-white"
                  type="submit"
                >
                  {emailStep === 0 ? t("change-email") : t("next-step")}
                </Button>
                {emailStep === 0 || !isBindEmail ? null : (
                  <Button
                    onClick={() => {
                      window.location.reload();
                    }}
                    className=" btn  bg-[#ebedef] dark:bg-[#727477]  hover:bg-red-600  text-black dark:text-white"
                  >
                    {t("return")}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="flex-1 h-full bg-blue-500/30 rounded-lg"></div>
    </div>
  );
}
