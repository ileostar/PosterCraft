"use client";

import { sendCodeByEmail } from "@/http/email";
import { sendBySMS } from "@/http/sms";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

interface FormType {
  [key: string]: any;
}

function CustomFormField({
  form,
  name,
  placeholder,
  label,
  readonly,
  disabled,
  isVerify,
  hidden,
  isShowLabel = true,
  countdownZero,
  isEmail,
  isPassword,
}: Readonly<{
  form: FormType;
  name: string;
  placeholder: string;
  label?: string;
  readonly?: boolean;
  isVerify?: boolean;
  disabled?: boolean;
  isShowLabel?: boolean;
  hidden?: boolean;
  countdownZero?: boolean;
  isEmail?: boolean;
  isPassword?: boolean;
}>) {
  //按钮禁用
  const [isDisabled, setIsDisabled] = useState(false);
  //倒计时
  const [countdown, setCountdown] = useState(0);
  const t = useTranslations();

  // 发送验证码并启动倒计时
  const handleClick = () => {
    if (!isDisabled) {
      if (isEmail) {
        sendCodeByEmail({ email: form.getValues("email") });
      } else {
        sendBySMS({ phone: form.getValues("phone") });
      }
      toast({
        title: "验证码已发送",
        description: "请在1分钟内完成验证",
      });
      setIsDisabled(true);
      setCountdown(60);
    }
  };
  useEffect(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown: number) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    if (countdown === 0) {
      setIsDisabled(false);
    }
  }, [countdown]);

  useEffect(() => {
    if (countdownZero) {
      setIsDisabled(false);
      setCountdown(0);
    }
  }, [countdownZero]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {isShowLabel ? (
            <FormLabel>
              <span className={`${hidden ? "hidden" : ""} font-serif text-black dark:text-white`}>
                {label}
              </span>
            </FormLabel>
          ) : null}
          <FormControl>
            {!isVerify ? (
              <Input
                className={`${hidden ? "hidden" : ""} input-bordered`}
                {...field}
                placeholder={placeholder}
                readOnly={readonly}
                disabled={disabled}
                type={isPassword ? "password" : "text"}
              />
            ) : (
              <div className={`${hidden ? "hidden" : ""} flex gap-3`}>
                <Input
                  className={`input-bordered`}
                  {...field}
                  placeholder={placeholder}
                  readOnly={readonly}
                  disabled={disabled}
                />
                <Button
                  onClick={handleClick}
                  disabled={isDisabled}
                  className="text-white bg-[#f43f5e] dark:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-red-600"
                >
                  {!isDisabled ? t("sendCode") : `${countdown}s后再试`}
                </Button>
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
