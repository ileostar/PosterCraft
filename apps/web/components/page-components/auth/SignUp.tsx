 "use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormType {
    [key: string]: any;
  }

function renderSignUp({form,countdown,isLogin,handleClick,isDisabled}:{form: FormType; countdown: number;isLogin: boolean;handleClick: () => void;isDisabled: boolean;}) {
  return (
    <div>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              className="input-bordered"
              {...field}
              placeholder="username"
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
          <FormLabel className="label">Password</FormLabel>
          <FormControl>
            <Input
              className="input-bordered"
              type="password"
              placeholder="password"
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem className="mt-1">
          <FormLabel>手机号码</FormLabel>
          <FormControl>
            <Input
              className="input-bordered"
              {...field}
              placeholder="手机号码"
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
              placeholder="验证码"
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
      {!isLogin && (!isDisabled ? "发送验证码" : `${countdown}s后再试`)}
    </button>
  </div>
  );
}

export default renderSignUp;
