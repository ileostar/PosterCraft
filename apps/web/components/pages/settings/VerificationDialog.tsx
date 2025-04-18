import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { sendCodeByEmail, updateEmail, verifyEmail } from "@/http/email";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

/**
 * 验证步骤枚举 (与 VerificationForm 保持一致)
 */
enum VerificationStep {
  Initial,
  SendCode,
  VerifyCode,
  Update,
}

/**
 * @description 验证对话框组件属性接口
 */
interface VerificationDialogProps {
  /** 对话框是否打开 */
  isOpen: boolean;
  /** 对话框打开状态变化回调 */
  onOpenChange: (open: boolean) => void;
  /** 表单控制对象 */
  form: UseFormReturn<{
    value: string;
    otp: string;
  }>;
  /** 当前验证步骤 */
  step: VerificationStep;
  /** 是否正在加载 */
  isLoading: boolean;
  /** 验证处理函数 */
  handleVerification: (nextStep: VerificationStep) => Promise<void>;
  /** 对话框关闭处理函数 */
  handleDialogClose: () => void;
  /** 触发按钮文本 */
  triggerText: string;
  /** 初始邮箱值 */
  emailVal?: string;
  /** 成功 */
  onSuccess: (val: string) => void;
}

/**
 * @description 验证对话框组件
 * @param props - 组件属性
 */
export default function VerificationDialog({
  isOpen,
  onOpenChange,
  form,
  step,
  isLoading,
  handleVerification,
  handleDialogClose,
  triggerText,
  emailVal,
  onSuccess,
}: VerificationDialogProps) {
  const t = useTranslations();
  // 验证码倒计时状态
  const [countdown, setCountdown] = useState(0);

  /** 发送验证码 */
  const sendCode = async () => {
    const eVal = step === VerificationStep.SendCode ? emailVal : form.watch("value");
    if (!eVal) return;
    try {
      const { data } = await sendCodeByEmail({
        email: eVal,
      });
      if (data) {
        toast({
          title: t("verification.codeSent"),
          description: t("verification.codeSentDescription"),
          variant: "success",
        });
      }
    } catch (error) {
      console.log("发送邮箱错误:", error);
      toast({
        variant: "destructive",
        title: t("errors.common.serverError"),
      });
    }
  };

  /** 验证处理 */
  const verifyEmailByOpt = async () => {
    try {
      if (step !== VerificationStep.SendCode) return;
      const res = await verifyEmail({
        email: emailVal || "",
        otp: form.watch("otp"),
      });
      if (res.data.code === 200) {
        toast({
          title: t("verification.codeVerified"),
          description: t("verification.codeVerifiedDescription"),
          variant: "success",
        });
        // 清除验证码
        clearOtp();
        return true;
      }
    } catch (error) {
      console.log("============", error);
      toast({
        variant: "destructive",
        title: t("errors.common.serverError"),
      });
    }
    return false;
  };

  /** 更换邮箱 */
  const changeEmail = async () => {
    try {
      const res = await updateEmail({
        email: form.watch("value"),
        otp: form.watch("otp"),
      });
      if (res.data.code === 200) {
        toast({
          title: t("verification.codeVerified"),
          description: t("verification.success"),
          variant: "success",
        });
        // 清除验证码
        clearOtp();
        return true;
      } else {
        toast({
          variant: "destructive",
          title: t("errors.common.serverError"),
          description: res.data.msg,
        });
      }
    } catch (error) {
      console.log("============", error);
      toast({
        variant: "destructive",
        title: t("errors.common.serverError"),
      });
    }
    return false;
  };

  /** 清除验证码 */
  const clearOtp = () => {
    form.setValue("otp", "");
    setCountdown(0);
  };

  /** 处理每个阶段的点击事件 */
  async function handleClick() {
    // 验证逻辑实现
    if (step === VerificationStep.SendCode) {
      const vs = await verifyEmailByOpt();
      if (vs) {
        handleVerification(VerificationStep.Update);
      }
    }
    // 更换邮箱
    if (step === VerificationStep.Update) {
      const vs = await changeEmail();
      if (vs) {
        onSuccess(form.watch("value"));
        handleDialogClose();
      }
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          disabled={isLoading}
          className="text-white  h-10"
          onClick={() => handleVerification(VerificationStep.SendCode)}
        >
          {triggerText}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("verification.title")}</DialogTitle>
        </DialogHeader>

        {step > VerificationStep.SendCode && (
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("verification.newEmail")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("verification.code")}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-1">
                  <Input {...field} />
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={countdown > 0}
                    onClick={() => {
                      sendCode();
                      setCountdown(30);
                      const timer = setInterval(() => {
                        setCountdown((prev) => {
                          if (prev <= 1) {
                            clearInterval(timer);
                            return 0;
                          }
                          return prev - 1;
                        });
                      }, 1000);
                    }}
                  >
                    {countdown > 0 ? `${countdown}s` : t("account.close.sendCode")}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleDialogClose}
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleClick}
          >
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
