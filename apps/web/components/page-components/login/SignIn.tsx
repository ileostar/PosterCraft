"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface FormType {
  [key: string]: any;
}

function renderSignIn({
  isPhoneMode,
  setPhoneMode,
  isDisabled,
  form,
  handleClick,
  countdown
}: {
  isPhoneMode: boolean;
  setPhoneMode: (value: boolean) => void;
  isDisabled: boolean;
  form: FormType;
  handleClick: () => void;
  countdown: number;
}) {
  if (isPhoneMode) {
    return (
      <div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>手机号码</FormLabel>
              <FormControl>
                <Input
                  className="input-bordered"
                  {...field}
                  placeholder="请输入手机号码"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="form-control mt-[5px]">
              <FormLabel className="label">验证码</FormLabel>
              <FormControl>
                <Input
                  className="input-bordered"
                  type="code"
                  placeholder="请输入验证码"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <button
          className={`btn btn-outline btn-error mt-2`}
          onClick={handleClick}
          disabled={isDisabled}
        >
          {isPhoneMode && (!isDisabled ? "发送验证码" : `${countdown}s后再试`)}
        </button>
        <label className="label justify-end">
          <Link
            href="#"
            onClick={() => {
              setPhoneMode(!isPhoneMode);
            }}
            className="label-text-alt link link-hover text-[#EF4444] "
          >
            使用邮箱登录
          </Link>
        </label>
      </div>
    );
  }
  return (
    <div>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>用户名/邮箱</FormLabel>
            <FormControl>
              <Input
                className="input-bordered"
                {...field}
                placeholder="请输入用户名/邮箱"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="form-control mt-[5px]">
            <FormLabel className="label">密码</FormLabel>
            <FormControl>
              <Input
                className="input-bordered"
                type="password"
                placeholder="请输入密码"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <label className="label justify-end">
        <Link
          href="#"
          onClick={() => {
            setPhoneMode(!isPhoneMode);
          }}
          className="label-text-alt link link-hover text-[#EF4444] "
        >
          使用短信登录
        </Link>
      </label>
    </div>
  );
}

export default renderSignIn;
