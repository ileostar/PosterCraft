"use client";

import { useToken } from "@/hooks/useToken";
import { useRouter } from "next/navigation";

import { Dialog } from "../ui/dialog";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token] = useToken();

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  return !token ? (
    <Dialog
      open
      aria-label="提示"
    >
      <div className="modal-box">
        <h2 className="py-4">请先登录</h2>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn"
              onClick={handleLoginRedirect}
            >
              确认
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  ) : (
    <>{children}</>
  );
}

export default AuthGuard;
