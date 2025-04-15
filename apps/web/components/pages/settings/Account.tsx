"use client";

import { useToast } from "@/components/ui/use-toast";
import { getUserInfo } from "@/http/user";
import { useUserStore } from "@/stores/user";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import AccountClosureSection from "./AccountClosureSection";
import AuthAnimation from "./Animation-1743407808319.json";
import VerificationForm from "./VerificationForm";

/**
 * @description 账户设置页面组件
 * @param className - 可选的CSS类名
 */
export default function Account({ className }: Readonly<{ className?: string }>) {
  const t = useTranslations();
  const { toast } = useToast();
  const { userId } = useUserStore();

  // 状态管理
  const [userData, setUserData] = useState<{ phone?: string; email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @description 获取用户数据
   */
  const fetchUserData = useCallback(async () => {
    try {
      if (!userId) return;
      const { data } = await getUserInfo(userId);
      if (data?.data) {
        setUserData({
          phone: data.data.phone || "",
          email: data.data.email || "",
        });
      }
      console.log("============", data); // TODO: remove this log inf
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("errors.common.serverError"),
        description: t("errors.connection.failed"),
      });
    }
  }, [userId, toast, t]);

  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId, fetchUserData]);

  return (
    <div className={`h-full grid grid-cols-2 gap-8 ${className}`}>
      <div className="flex flex-col gap-8">
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-primary">{t("account.settings")}</h2>

          {/* 邮箱验证表单 */}
          <VerificationForm
            initialValue={userData.email}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            onSuccess={fetchUserData}
            isEmailBound={!!userData.email}
          />
        </section>

        {/* 账号注销部分 */}
        <AccountClosureSection />
      </div>

      {/* 动画展示区 */}
      <div className="flex items-center justify-center bg-muted/20 rounded-lg">
        <Lottie
          className="w-4/5"
          animationData={AuthAnimation}
          loop={true}
        />
      </div>
    </div>
  );
}
