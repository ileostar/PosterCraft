"use client";

import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AuthAnimation from "./Animation-1743407808319.json";

export default function Password({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations();
  const { toast } = useToast();
  const { userId } = useUserStore();

  const passwordSchema = z
    .object({
      currentPassword: z.string().min(6, {
        message: t("form.password.minLength"),
      }),
      newPassword: z.string().min(6, {
        message: t("form.password.minLength"),
      }),
      confirmPassword: z.string().min(6, {
        message: t("form.password.minLength"),
      }),
    })
    .refine((data) => data.confirmPassword === data.newPassword, {
      message: t("form.confirmPassword.notMatch"),
      path: ["confirmPassword"],
    });

  type PasswordFormValues = z.infer<typeof passwordSchema>;
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    toast({
      title: t("toast.password.success"),
      description: t("toast.password.your-password-has-been-updated"),
    });
  };

  return (
    <div className={`h-full flex flex-row justify-between gap-10 ${className}`}>
      <div className="flex-1 flex flex-col gap-6">
        <div className="text-[#f43f5e] dark:text-[#d048ef] text-xl card-title">
          {t("change-password")}
        </div>
        <div className="flex flex-col justify-start gap-6">
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onSubmit)}
              className="sm:w-[40%] flex flex-col gap-4"
            >
              <CustomFormField
                form={passwordForm}
                name="currentPassword"
                placeholder={t("form.confirmPassword.enter-old-password")}
                label={t("form.confirmPassword.old-password")}
                isPassword
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-red-500 text-sm">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}

              <CustomFormField
                form={passwordForm}
                name="newPassword"
                placeholder={t("form.confirmPassword.enter-new-password")}
                label={t("form.confirmPassword.new-password")}
                isPassword
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}

              <CustomFormField
                form={passwordForm}
                name="confirmPassword"
                placeholder={t("form.confirmPassword.confirm-new-password")}
                label={t("form.confirmPassword.required")}
                isPassword
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm">{t("form.confirmPassword.notMatch")}</p>
              )}

              <Button
                type="submit"
                className="w-full"
              >
                {t("save")}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Lottie 动画占位 */}
      <div className="h-full flex-1 flex justify-center items-center bg-blue-500/10 rounded-lg">
        <Lottie
          className="w-[80%] my-3xl"
          animationData={AuthAnimation}
          loop={true}
        />
      </div>
    </div>
  );
}
