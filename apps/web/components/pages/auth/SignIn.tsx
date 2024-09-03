"use client";

import CustomFormField from "@/components/shared/CustomFormField";
import { Link } from "next-view-transitions";

interface FormType {
  [key: string]: any;
}

function renderSignIn({
  isPhoneMode,
  setIsPhoneMode,
  form,
}: {
  isPhoneMode: boolean;
  setIsPhoneMode: (value: boolean) => void;
  isDisabled: boolean;
  form: FormType;
  handleClick: () => void;
  countdown: number;
}) {
  if (isPhoneMode) {
    return (
      <div className="flex flex-col gap-1">
        <CustomFormField
          form={form}
          name={"phone"}
          placeholder={"请输入手机号码"}
          label={"手机号码"}
        />
        <CustomFormField
          form={form}
          name={"code"}
          placeholder={"请输入验证码"}
          label={"验证码"}
          isVerify={true}
        />
        <label className="label justify-end">
          <Link
            href="#"
            onClick={() => {
              setIsPhoneMode(!isPhoneMode);
            }}
            className="label-text-alt link link-hover text-[#EF4444] "
          >
            使用邮箱登录
          </Link>
        </label>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-1">
        <CustomFormField
          form={form}
          name={"username"}
          placeholder={"请输入用户名/邮箱"}
          label={"用户名/邮箱"}
        />
        <CustomFormField
          form={form}
          name={"password"}
          placeholder={"请输入密码"}
          label={"密码"}
        />

        <label className="label justify-end">
          <Link
            href="#"
            onClick={() => {
              setIsPhoneMode(!isPhoneMode);
            }}
            className="label-text-alt link link-hover text-[#EF4444] "
          >
            使用短信登录
          </Link>
        </label>
      </div>
    );
  }
}

export default renderSignIn;
