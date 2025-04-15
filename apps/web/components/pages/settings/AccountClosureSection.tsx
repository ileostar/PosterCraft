import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteUser } from "@/http/user";
import { useUserStore } from "@/stores/user";
import { useTranslations } from "next-intl";

/**
 * @description 账号注销部分组件
 */
export default function AccountClosureSection() {
  const t = useTranslations();

  /**
   * @description 处理账号注销请求
   */
  const handleAccountClosure = async () => {
    const { userId } = useUserStore();
    if (!userId) {
      console.error("用户ID未提供");
      return;
    }
    try {
      const res = await deleteUser(userId);
      if (res.status === 200) {
        toast({
          title: t("account.close.success"),
          description: t("account.close.success.description"),
        });
      }
    } catch (error) {
      console.error("账号注销请求失败:", error);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-destructive">{t("account.close")}</h2>
      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
        {t("account.close.description")}
      </p>
      <Button
        variant="destructive"
        className="w-1/3"
        onClick={handleAccountClosure}
      >
        {t("account.close.confirm")}
      </Button>
    </section>
  );
}
