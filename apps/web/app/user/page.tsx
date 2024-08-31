"use client";

import { bindEmail, sendCodeByEmail, updateEmail, verifyEmail } from "@/api/email";
import { sendBySMS, updatePhone, verifyPhone } from "@/api/sms";
import { deleteUser, getUserInfo, updateUserInfo } from "@/api/user";
import AuthLayout from "@/components/base/AuthLayout";
import ThreeD from "@/components/base/BaseModel";
import MyFormField from "@/components/base/MyFormField";
import UploadAvatar from "@/components/base/UploadAvatar";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Head from "../../components/page/index-old/Header";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "不能为空",
  }),
  nickname: z.any(),
  avatar: z.any(),
});
const FormSchema_phone = z.object({
  phone: z.string().min(1, {
    message: "不能为空",
  }),
});
const FormSchema_email = z.object({
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
});
const FormSchema_phone_verify = z.object({
  code: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
});
const FormSchema_phone_update = z.object({
  code: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
  phone: z.string().min(1, {
    message: "不能为空",
  }),
});
const FormSchema_email_verify = z.object({
  code: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
});
const FormSchema_email_update = z.object({
  code: z.string().length(6, { message: "无效的验证码" }).regex(/^\d+$/, {
    message: "无效的验证码",
  }),
  email: z.string().email({
    message: "无效的邮箱格式",
  }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
export type FormSchemaType_phone = z.infer<typeof FormSchema_phone>;
export type FormSchemaType_email = z.infer<typeof FormSchema_email>;
export type FormSchemaType_phone_verify = z.infer<typeof FormSchema_phone_verify>;
export type FormSchemaType_email_verify = z.infer<typeof FormSchema_email_verify>;
export type FormSchemaType_phone_update = z.infer<typeof FormSchema_phone_update>;
export type FormSchemaType_email_update = z.infer<typeof FormSchema_email_update>;

function Index(_props: any) {
  const [userId, setUserId] = useState<string>("0");
  const [avatar, setAvatar] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      nickname: "",
      avatar: "",
    },
  });
  const form_phone = useForm<FormSchemaType_phone>({
    resolver: zodResolver(FormSchema_phone),
    defaultValues: {
      phone: "",
    },
  });
  const form_email = useForm<FormSchemaType_email>({
    resolver: zodResolver(FormSchema_email),
    defaultValues: {
      email: "",
    },
  });
  const form_phone_verify = useForm<FormSchemaType_phone_verify>({
    resolver: zodResolver(FormSchema_phone_verify),
    defaultValues: {
      code: "",
    },
  });
  const form_phone_update = useForm<FormSchemaType_phone_update>({
    resolver: zodResolver(FormSchema_phone_update),
    defaultValues: {
      code: "",
      phone: "",
    },
  });
  const form_email_verify = useForm<FormSchemaType_email_verify>({
    resolver: zodResolver(FormSchema_email_verify),
    defaultValues: {
      code: "",
    },
  });
  const form_email_update = useForm<FormSchemaType_email_update>({
    resolver: zodResolver(FormSchema_email_update),
    defaultValues: {
      code: "",
      email: "",
    },
  });
  async function onSubmit(values: any) {
    console.log(values);
  }

  //子组件的回调函数
  const handleOssUrl = (url: string) => {
    form.setValue("avatar", url);
  };

  /**
   * 更新用户其他信息
   */
  const handleUpdateOther = async () => {
    let data: {
      [key: string]: string | number | undefined; // 添加索引签名以允许使用字符串作为键
      username?: string;
      nickname?: string;
      avatar?: string;
    } = {
      username: form.getValues("username") as string | undefined,
      nickname: form.getValues("nickname") === "" ? undefined : form.getValues("nickname"),
      avatar: form.getValues("avatar") === "" ? undefined : form.getValues("avatar"),
    };
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });
    const res = await updateUserInfo(userId, data);
    console.log(res);
  };

  /**
   * 更新用户手机号码
   */
  const handleUpdatePhone = async () => {
    const res = await updatePhone({
      phone: form_phone_update.getValues("phone"),
      otp: form_phone_update.getValues("code"),
    });
    if (res.data.msg === "手机号已存在") {
      console.log("待定");
    }
  };

  /**
   * 更新用户邮箱
   */
  const handleUpdateEmail = async () => {
    const res = email
      ? await updateEmail({
          userId: userId,
          email: form_email_update.getValues("email"),
          otp: form_email_update.getValues("code"),
        })
      : await bindEmail({
          userId: userId,
          email: form_email_update.getValues("email"),
          otp: form_email_update.getValues("code"),
        });
    if (res.data.msg === "邮箱已存在") {
      console.log("待定");
    }
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
    form.setValue("username", res.data.data.username || "");
    form_phone.setValue("phone", res.data.data.phone || "");
    form_email.setValue("email", res.data.data.email || "");
    form.setValue("nickname", res.data.data.nickname || "");
    form.setValue("avatar", res.data.data.avatar || "");
    setAvatar(res.data.data.avatar || "");
    setEmail(res.data.data.email || "");
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
  const handleSendCode = (mode: string) => {
    if (!isDisabled) {
      if (mode === "phone") {
        sendBySMS({ phone: form_phone.getValues("phone") });
      } else {
        sendCodeByEmail({ email: form_email.getValues("email") });
      }
      setIsDisabled(true);
      setCountdown(60);
    }
  };

  const handleVerify = async (mode: string) => {
    if (mode === "phone") {
      const res = await verifyPhone({
        phone: form_phone.getValues("phone"),
        otp: form_phone_verify.getValues("code"),
      });
      console.log("res", res);
      if (res.data.msg === "手机号校验成功") {
        CloseModal("modal_phone_verify");
        showModal("modal_phone_update");
      } else {
        CloseModal("modal_phone_verify");
        console.log("待定");
      }
    } else {
      const res = await verifyEmail({
        email: form_email.getValues("email"),
        otp: form_email_verify.getValues("code"),
      });
      console.log("res", res);
      if (res.data.msg.includes("校验成功")) {
        CloseModal("modal_email_verify");
        showModal("modal_email_update");
      } else {
        CloseModal("modal_email_verify");
        console.log("待定");
      }
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

  const showModal = (id: string) => {
    const modalElement = document.getElementById(id) as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
    }
  };

  const CloseModal = (id: string) => {
    const modalElement = document.getElementById(id) as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.close();
    }
  };

  /**
   * 渲染Three.js球体部分
   *
   */
  const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  const [boxWidth, setBoxWidth] = useState<number | undefined>(undefined);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);
  const [isReady, setIsReady] = useState(false); //dom是否已挂载

  useEffect(() => {
    const timer = setTimeout(() => {
      if (boxRef.current) {
        const width = boxRef.current.offsetWidth;
        const height = boxRef.current.offsetHeight;
        setBoxWidth(width);
        setBoxHeight(height);
        setIsReady(true);
      }
    }, 10);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AuthLayout>
      <div>
        <Head mode={"sticky"} />
        <div
          className="w-4/5 mx-auto  mt-4"
          id="my-work"
        >
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <div
              className="w-1/2"
              style={{ background: "linear-gradient(to bottom, #11e8bb 0%, #8200c9 100%)" }}
              ref={boxRef}
            >
              {isReady ? (
                <ThreeD
                  boxWidth={boxWidth}
                  boxHeight={boxHeight}
                />
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <div className="card-body">
              <div
                className="bg-red-500 w-1/6 text-center text-white pt-4 pb-4 font-semibold"
                style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
              >
                个人中心
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

              <div className="flex justify-center mb-8">
                {/* //表单 */}
                <div className="w-[92vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] min-w-[320px] card shrink-0 max-w-sm  bg-base-100 font-serif rounded-2xl">
                  <Form {...form}>
                    <div>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-0 p-8  rounded-2xl"
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
                          name={"nickname"}
                          placeholder={""}
                          label={"昵称"}
                        />
                        <div className="flex justify-between mt-[5px]">
                          <button
                            className="btn btn-sm w-full hover:bg-red-600 bg-[#EF4444] text-white"
                            type="submit"
                            onClick={() => handleUpdateOther()}
                          >
                            更新信息
                          </button>
                        </div>
                      </form>
                    </div>
                  </Form>
                  <Form {...form_phone}>
                    <div>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="relative flex flex-col gap-0 p-8  rounded-2xl"
                      >
                        <MyFormField
                          form={form_phone}
                          name={"phone"}
                          placeholder={""}
                          label={"手机号"}
                          readonly={true}
                        />
                        <button
                          className="absolute right-0 top-5 btn btn-sm  hover:bg-red-600 bg-[#EF4444] text-white"
                          type="submit"
                          onClick={() => {
                            showModal("modal_phone_verify");
                          }}
                        >
                          更新手机号
                        </button>
                      </form>
                    </div>
                  </Form>
                  <Form {...form_email}>
                    <div>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="relative flex flex-col gap-0 p-8  rounded-2xl"
                      >
                        <MyFormField
                          form={form_email}
                          name={"email"}
                          placeholder={""}
                          label={"电子邮箱"}
                          readonly={true}
                        />
                        <button
                          className="absolute right-0 top-5 btn btn-sm  hover:bg-red-600 bg-[#EF4444] text-white"
                          type="submit"
                          onClick={() => {
                            email
                              ? showModal("modal_email_verify")
                              : showModal("modal_email_update");
                          }}
                        >
                          更新邮箱
                        </button>
                      </form>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <dialog
          id="modal_phone_verify"
          className="modal"
        >
          {
            <div className="modal-box">
              <h3 className="font-bold text-lg">请输入手机验证码!</h3>
              <Form {...form_phone_verify}>
                <MyFormField
                  form={form_phone_verify}
                  name={"code"}
                  placeholder={"请输入验证码"}
                />
                <button
                  className={`btn btn-outline btn-error mt-4`}
                  onClick={() => handleSendCode("phone")}
                  disabled={isDisabled}
                >
                  {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
                </button>
              </Form>
              <div className="modal-action">
                <form
                  method="dialog"
                  className="flex flex-row gap-2"
                >
                  <button
                    className="btn"
                    onClick={() => {
                      handleVerify("phone");
                    }}
                  >
                    验证
                  </button>
                  <button className="btn"> 取消</button>
                </form>
              </div>
            </div>
          }
        </dialog>

        <dialog
          id="modal_phone_update"
          className="modal"
        >
          {
            <div className="modal-box">
              <h3 className="font-bold text-lg">请输入新的手机号和验证码!</h3>
              <Form {...form_phone_update}>
                <MyFormField
                  form={form_phone_update}
                  name={"phone"}
                  placeholder={"请输入手机号"}
                  label={"手机号"}
                />
                <MyFormField
                  form={form_phone_update}
                  name={"code"}
                  label={"验证码"}
                  placeholder={"请输入验证码"}
                />
                <button
                  className={`btn btn-outline btn-error mt-4`}
                  onClick={() => handleSendCode("phone")}
                  disabled={isDisabled}
                >
                  {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
                </button>
              </Form>
              <div className="modal-action">
                <form
                  method="dialog"
                  className="flex flex-row gap-2"
                >
                  <button
                    className="btn"
                    onClick={() => {
                      handleUpdatePhone();
                    }}
                  >
                    确认
                  </button>
                  <button className="btn"> 取消</button>
                </form>
              </div>
            </div>
          }
        </dialog>

        <dialog
          id="modal_email_verify"
          className="modal"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">请输入邮箱验证码!</h3>
            <Form {...form_email_verify}>
              <MyFormField
                form={form_email_verify}
                name={"code"}
                placeholder={"请输入验证码"}
              />
              <button
                className={`btn btn-outline btn-error mt-4`}
                onClick={() => handleSendCode("email")}
                disabled={isDisabled}
              >
                {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
              </button>
            </Form>
            <div className="modal-action">
              <form
                method="dialog"
                className="flex flex-row gap-2"
              >
                <button
                  className="btn"
                  onClick={() => {
                    handleVerify("email");
                  }}
                >
                  绑定
                </button>
                <button className="btn"> 取消</button>
              </form>
            </div>
          </div>
        </dialog>

        <dialog
          id="modal_email_update"
          className="modal"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">请输入新的邮箱和验证码!</h3>
            <Form {...form_phone_update}>
              <MyFormField
                form={form_email}
                name={"email"}
                placeholder={"请输入邮箱"}
                label={"电子邮箱"}
              />
              <MyFormField
                form={form_phone_update}
                name={"code"}
                label={"验证码"}
                placeholder={"请输入验证码"}
              />
              <button
                className={`btn btn-outline btn-error mt-4`}
                onClick={() => handleSendCode("phone")}
                disabled={isDisabled}
              >
                {!isDisabled ? "发送验证码" : `${countdown}s后再试`}
              </button>
            </Form>
            <div className="modal-action">
              <form
                method="dialog"
                className="flex flex-row gap-2"
              >
                <button
                  className="btn"
                  onClick={() => {
                    handleUpdateEmail();
                  }}
                >
                  {email ? "确认" : "绑定"}
                </button>
                <button className="btn"> 取消</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </AuthLayout>
  );
}

export default Index;
