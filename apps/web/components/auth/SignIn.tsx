"use client";

import CustomFormField from "@/components/CustomFormField";
import { Link } from "@/utils/i18n/routing";
import { useTranslations } from "next-intl";

interface FormType {
  [key: string]: any;
}

const RenderSignIn = ({
  isPhoneMode,
  setIsPhoneMode,
  form,
}: {
  isPhoneMode: boolean;
  setIsPhoneMode: (value: boolean) => void;
  form: FormType;
}) => {
  const t = useTranslations();

  if (isPhoneMode) {
    return (
      <div className="flex flex-col gap-1">
        <CustomFormField
          form={form}
          name={"phone"}
          placeholder={t("phonePlaceholder")}
          label={t("phone")}
        />
        <CustomFormField
          form={form}
          name={"code"}
          placeholder={t("otpPlaceholder")}
          label={t("otp")}
          isVerify={true}
        />
        <label className="label justify-end">
          <Link
            href="#"
            onClick={() => {
              setIsPhoneMode(!isPhoneMode);
              form.reset();
            }}
            className="label-text-alt link link-hover text-[#EF4444] dark:text-white"
          >
            {t("loginByUsernameOrEmail")}
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
          placeholder={t("usernameOrEmailPlaceholder")}
          label={t("usernameOrEmail")}
        />
        <CustomFormField
          form={form}
          name={"password"}
          placeholder={t("passwordPlaceholder")}
          label={t("password")}
          isPassword={true}
        />

        <label className="label justify-end">
          <Link
            href="#"
            onClick={() => {
              setIsPhoneMode(!isPhoneMode);
              form.reset();
            }}
            className="label-text-alt link link-hover text-[#EF4444] dark:text-white"
          >
            {t("loginByPhone")}
          </Link>
        </label>
      </div>
    );
  }
};

export default RenderSignIn;
