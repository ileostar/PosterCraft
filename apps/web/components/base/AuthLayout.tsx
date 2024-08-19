"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    const modalElement = document.getElementById("my_modal_0") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  }, []);

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
                  router.push("/auth/login");
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

export default AuthLayout;
