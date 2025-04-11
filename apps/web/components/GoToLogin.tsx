import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoToLoginStore } from "@/stores/loginDialog";
import { useRouter } from "@/utils/i18n/routing";
import { useTranslations } from "next-intl";

import { Button } from "./ui/button";

interface GoToLoginProps {}

const GoToLogin: React.FC<GoToLoginProps> = () => {
  const t = useTranslations("common");
  const router = useRouter();
  const { isOpen, setIsOpen } = useGoToLoginStore();

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
