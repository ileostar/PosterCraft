"use client";

import { sendBySMS } from "@/api/sms";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormType {
  [key: string]: any;
}

function CustomFormField({
  form,
  name,
  placeholder,
  label,
  readonly,
  isVerify,
}: Readonly<{
  form: FormType;
  name: string;
  placeholder: string;
  label?: string;
  readonly?: boolean;
  isVerify?: boolean;
}>) {
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
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <span className="font-serif">{label}</span>
          </FormLabel>
          <FormControl>
            {!isVerify ? (
              <Input
                className="input-bordered"
                {...field}
                placeholder={placeholder}
                readOnly={readonly}
              />
            ) : (
              <div className="flex gap-3">
                <Input
                  className="input-bordered"
                  {...field}
                  placeholder={placeholder}
                  readOnly={readonly}
                />
                <Button
                  onClick={handleClick}
                  disabled={isDisabled}
                >
                  {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
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
