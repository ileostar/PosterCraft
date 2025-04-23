"use client";

import CustomFormField from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import UploadAvatar from "@/components/UploadAvatar";
import { getUserInfo, updateUserInfo } from "@/http/user";
import { useUserStore } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AuthAnimation from "./Animation-1743407808319.json";

export default function Profile() {
  const t = useTranslations();
  const { toast } = useToast();
  const { userId } = useUserStore();
  const [avatar, setAvatar] = useState<string>("");
  const userFormSchema = z.object({
    username: z.string().min(1, {
      message: t("form.required"),
    }),
    nickname: z.string().min(1, {
      message: t("form.required"),
    }),
    avatar: z.any(),
  });
  type UserFormSchemaType = z.infer<typeof userFormSchema>;
  const form = useForm<UserFormSchemaType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      nickname: "",
      avatar: "",
    },
  });

  const getUserData = async (id: string) => {
    const res = await getUserInfo(id);
    form.setValue("username", res.data.data?.username || "");
    form.setValue("nickname", res.data.data?.nickname || "");
    form.setValue("avatar", res.data.data?.avatar || "");
    setAvatar(res.data.data?.avatar || "");
  };

  useEffect(() => {
    userId !== null && getUserData(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar, form]);

  /** 更新用户信息 */
  async function updateUserInfos(values: UserFormSchemaType) {
    try {
      const res = await updateUserInfo(userId as string, values);

      if (res.data.code !== 200) {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.data.msg,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      } else {
        toast({
          variant: "success",
          title: "Success",
          description: res.data.msg,
        });
        return;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.msg,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  /** 暂存头像 */
  const handleOssUrl = (url: string) => {
    form.setValue("avatar", url);
  };

  return (
    <div className="h-full flex flex-row justify-between">
      <div className="h-full flex flex-1 flex-col justify-between max-sm:gap-6">
        <div className="text-[#f43f5e] dark:text-[#d048ef]  text-xl card-title">{t("my-card")}</div>
        <div className="h-[85%] flex flex-col justify-around max-sm:gap-8 items-start gap-6">
          <UploadAvatar
            handleOssUrl={handleOssUrl}
            img={avatar}
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateUserInfos)}
              className="mx-auto w-full flex flex-col items-start justify-between max-sm:gap-8 gap-6"
            >
              <CustomFormField
                form={form}
                name={"username"}
                placeholder={"请输入用户名"}
                label={"用户名"}
              />
              <CustomFormField
                form={form}
                name={"nickname"}
                placeholder={"请输入昵称"}
                label={"昵称"}
              />
              <div className="w-full flex flex-start mt-5 mb-10">
                <Button
                  className="btn w-[20%] max-sm:w-[60%] bg-[#f43f5e] dark:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-red-600  text-white"
                  type="submit"
                >
                  保存
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {/* Lottie 动画占位 */}
      <div className="h-full flex-1 flex justify-center items-center bg-blue-500/10 rounded-lg">
        <Lottie
          className="w-[80%] my-3xl"
          animationData={AuthAnimation}
          loop={true}
        />
      </div>
    </div>
  );
}
