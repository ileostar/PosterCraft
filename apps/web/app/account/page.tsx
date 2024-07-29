"use client";

import { bindEmail, sendCodeByEmail, updateEmail } from "@/api/email";
import { deleteUser, getUserInfo, updateUserInfo } from "@/api/user";
import AuthLayout from "@/components/base/AuthLayout";
import MyFormField from "@/components/base/MyFormField";
import UploadAvatar from "@/components/base/UploadAvatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Head from "../../components/page-components/index/Head";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
  username: z.string().min(1, {
    message: "不能为空",
  }),
  nickname: z.any(),
  phone: z.string().min(1, {
    message: "不能为空",
  }),
  avatar: z.any(),
});
const loginFormSchema_l = z.object({
  code: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;
export type loginFormSchemaType_l = z.infer<typeof loginFormSchema_l>;

function Index(props: any) {
  const [userId, setUserId] = useState<string>("0");
  const [avatar, setAvatar] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      username: "",
      nickname: "",
      phone: "",
      avatar: "",
    },
  });
  const form_l = useForm<loginFormSchemaType_l>({
    resolver: zodResolver(loginFormSchema_l),
    defaultValues: {
      code: "",
    },
  });
  async function onSubmit(values: loginFormSchemaType) {
    console.log(values);
    showModal();
  }

  const handleChange = async () => {
    const res = email
      ? await updateEmail(userId, form.getValues("email"), form_l.getValues("code"))
      : await bindEmail(userId, form.getValues("email"), form_l.getValues("code"));
    if (res.msg === "邮箱已存在") {
      console.log("待定");
    } else {
      handleUpdate();
    }
    CloseModal();
  };

  //子组件的回调函数
  const handleOssUrl = (url: string) => {
    form.setValue("avatar", url);
  };

  const handleUpdate = async () => {
    let data: {
      [key: string]: string | number | undefined; // 添加索引签名以允许使用字符串作为键
      userId: string;
      username?: string;
      phone?: string;
      email?: string;
      nickname?: string;
      avatar?: string;
    } = {
      userId, // 确保 userId 已被正确定义或传入
      username: form.getValues("username") as string | undefined,
      phone: form.getValues("phone") as string | undefined,
      email: form.getValues("email") === "" ? undefined : form.getValues("email"),
      nickname: form.getValues("nickname") === "" ? undefined : form.getValues("nickname"),
      avatar: form.getValues("avatar") === "" ? undefined : form.getValues("avatar"),
    };
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });
    const res = await updateUserInfo(data);
    console.log(res);
  };

  const handleDelete = async () => {
    const res = await deleteUser(userId);
    console.log(res);
    router.push("/auth/login");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("token");
  };

  const getUserData = async (userId: string) => {
    const res = await getUserInfo(userId);
    form.setValue("username", res?.data?.username);
    form.setValue("phone", res?.data?.phone);
    form.setValue("email", res?.data?.email);
    form.setValue("nickname", res?.data?.nickname);
    form.setValue("avatar", res?.data?.avatar);
    setAvatar(res?.data?.avatar);
    setEmail(res?.data?.email);
    console.log(email);
  };

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    if (userId !== null) {
      setUserId(userId);
      getUserData(userId);
    }
  }, [avatar]);

  //按钮禁用
  const [isDisabled, setIsDisabled] = useState(false);
  //倒计时
  const [countdown, setCountdown] = useState(0);
  // 发送验证码并启动倒计时
  const handleClick = () => {
    if (!isDisabled) {
      sendCodeByEmail(form.getValues("email"));
      setIsDisabled(true);
      setCountdown(60);
    }
  };
  useEffect(() => {
    if (countdown > 0) {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
    if (countdown === 0) {
      setIsDisabled(false);
    }
  }, [countdown]);

  const showModal = () => {
    const modalElement = document.getElementById("my_modal_2") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const CloseModal = () => {
    const modalElement = document.getElementById("my_modal_2") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.close();
    }
  };

  return (
    <AuthLayout>
      <div>
        <Head />
        <div
          className="w-4/5 mx-auto  mt-8"
          id="my-work"
        >
          <div
            className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
            style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
          >
            个人中心
          </div>

          <div className="flex justify-center mb-8">
            {/* //表单 */}
            <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm shadow-2xl bg-base-100 font-serif rounded-2xl">
              <Form {...form}>
                <div>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 p-8 bg-slate-100 rounded-2xl"
                  >
                    {/* 头像 */}
                    <div className="flex justify-center items-center card-title">
                      <UploadAvatar
                        handleOssUrl={handleOssUrl}
                        img={avatar}
                      />
                    </div>

                    <MyFormField
                      form={form}
                      name={"username"}
                      placeholder={""}
                      label={"用户名"}
                    />
                    <MyFormField
                      form={form}
                      name={"phone"}
                      placeholder={""}
                      label={"手机号"}
                    />
                    <MyFormField
                      form={form}
                      name={"nickname"}
                      placeholder={""}
                      label={"昵称"}
                    />
                    <MyFormField
                      form={form}
                      name={"email"}
                      placeholder={""}
                      label={"电子邮箱"}
                    />
                    <div className="flex justify-between mt-[5px]">
                      <Button
                        className="btn w-full hover:bg-red-600 bg-[#EF4444] text-white"
                        type="submit"
                      >
                        更新信息
                      </Button>
                    </div>
                    <label className="label flex justify-end">
                      <Link
                        href="/auth/login"
                        onClick={handleDelete}
                        className="label-text-alt link link-hover text-[#EF4444] "
                      >
                        注销账号
                      </Link>
                    </label>
                  </form>
                </div>
              </Form>
            </div>
          </div>
        </div>

        <dialog
          id="my_modal_2"
          className="modal"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">请输入邮箱验证码!</h3>
            <Form {...form_l}>
              <MyFormField
                form={form_l}
                name={"code"}
                placeholder={"请输入验证码"}
              />
              <button
                className={`btn btn-outline btn-error mt-4`}
                onClick={handleClick}
                disabled={isDisabled}
              >
                {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
              </button>
            </Form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn"
                  onClick={() => {
                    handleChange();
                  }}
                >
                  {" "}
                  绑定
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </AuthLayout>
  );
}

export default Index;
