"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoToLoginStore } from "@/stores/loginDialog";
import eventBus, { EventTypes } from "@/utils/eventBus";
import { useRouter } from "@/utils/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Button } from "../ui/button";

interface GoToLoginProps {}

const GoToLogin: React.FC<GoToLoginProps> = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const { isOpen, setIsOpen } = useGoToLoginStore();

  // 监听未授权事件
  useEffect(() => {
    const handleAuthError = () => {
      setIsOpen(true);
    };

    // 订阅事件
    eventBus.on(EventTypes.AUTH_ERROR, handleAuthError);

    // 清理函数
    return () => {
      eventBus.off(EventTypes.AUTH_ERROR, handleAuthError);
    };
  }, [setIsOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>未登录或登录已过期</DialogTitle>
          <DialogDescription>您的登录状态异常，请重新登录以继续使用。</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              router.push("/auth/login");
              setIsOpen(false);
            }}
          >
            {t("relogin")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoToLogin;
