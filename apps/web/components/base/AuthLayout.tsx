"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const modalElement = document.getElementById("my_modal_0") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  }, []);

  const router = useRouter();
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return (
        <dialog
          id="my_modal_0"
          className="modal"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">提示!</h3>
            <p className="py-4">请先登录</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn"
                  onClick={() => {
                    router.push("/auth");
                  }}
                >
                  确认
                </button>
              </form>
            </div>
          </div>
        </dialog>
      );
    } else {
      return <>{children}</>;
    }
  }
}

export default AuthLayout;
