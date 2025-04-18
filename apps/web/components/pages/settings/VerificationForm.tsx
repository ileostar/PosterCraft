import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import VerificationDialog from "./VerificationDialog";

/**
 * 验证步骤枚举
 */
enum VerificationStep {
  Initial,
  SendCode,
  VerifyCode,
  Update,
}

/**
 * 表单验证schema
 */
const formSchema = z.object({
  value: z.string().email({ message: "Invalid email" }),
  otp: z.string().length(6).regex(/^\d+$/, { message: "Invalid OTP" }),
});

/**
 * @description 验证表单组件属性接口
 */
interface VerificationFormProps {
  /** 初始值 */
  initialValue?: string;
  /** 是否正在加载 */
  isLoading: boolean;
  /** 设置加载状态 */
  setIsLoading: (loading: boolean) => void;
  /** 邮箱是否已绑定 */
  isEmailBound?: boolean;
}

/**
 * @description 验证表单组件
 * @param props - 组件属性
 */
export default function VerificationForm({
  initialValue = "",
  isLoading,
  setIsLoading,
  isEmailBound = false,
}: VerificationFormProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const [step, setStep] = useState<VerificationStep>(VerificationStep.Initial);

  // 表单控制
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { value: initialValue, otp: "" },
  });

  /**
   * @description 处理验证流程
   * @param nextStep - 下一步验证步骤
   */
  const handleVerification = async (nextStep: VerificationStep) => {
    try {
      setIsLoading(true);
      setStep(nextStep);
      // 验证逻辑实现
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("errors.common.serverError"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setStep(VerificationStep.Initial);
    form.reset({ value: form.getValues("value"), otp: "" });
  };

  const onSuccess = (val: string) => {
    setStep(VerificationStep.Initial);
    form.reset({ value: form.getValues("value"), otp: "" });
    initialValue = val;
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 w-2/3 flex gap-3 items-end"
        onSubmit={(e) => e.preventDefault()}
      >
        {initialValue !== "" ? (
          <>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      className="dark:text-white h-10 text-black"
                      value={initialValue}
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <VerificationDialog
              isOpen={step > VerificationStep.Initial}
              onOpenChange={(open) => {
                if (!open) handleDialogClose();
              }}
              form={form}
              step={step}
              isLoading={isLoading}
              onSuccess={onSuccess}
              handleVerification={handleVerification}
              handleDialogClose={handleDialogClose}
              triggerText={t("change.email")}
              emailVal={initialValue}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <VerificationDialog
              isOpen={step > VerificationStep.Initial}
              onOpenChange={(open) => {
                if (!open) handleDialogClose();
              }}
              form={form}
              step={step}
              onSuccess={onSuccess}
              isLoading={isLoading}
              handleVerification={handleVerification}
              handleDialogClose={handleDialogClose}
              triggerText={t("bind.email")}
              emailVal={initialValue}
            />
          </>
        )}
      </form>
    </Form>
  );
}
