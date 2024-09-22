"use client";

import { getUserInfo, updateUserInfo } from "@/api/user";
import CustomFormField from "@/components/shared/CustomFormField";
import UploadAvatar from "@/components/shared/UploadAvatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "不能为空",
  }),
  // nickname: z.any(),
  nickname: z.string().min(1, {
    message: "不能为空",
  }),
  avatar: z.any(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function Profile() {
  const t = useTranslations();
  const { toast } = useToast();
  const { userId } = useUserStore();
  const [avatar, setAvatar] = useState<string>("");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
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
    if (userId !== null) {
      getUserData(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar, form]);

  async function onSubmit(values: FormSchemaType) {
    try {
      let data: {
        [key: string]: string | number | undefined; // 添加索引签名以允许使用字符串作为键
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
      const res = await updateUserInfo(userId as string, data);

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

  //子组件的回调函数
  const handleOssUrl = (url: string) => {
    form.setValue("avatar", url);
  };

  return (
    <div className="h-full flex flex-row justify-between">
      <div className="h-full flex flex-1 flex-col justify-between max-sm:gap-6">
        <div className="flex justify-start items-center h-[10%] ">
          <div className="text-[#f43f5e] dark:text-[#d048ef]  text-2xl card-title">
            {t("my-card")}
          </div>
        </div>
        <div className="h-[85%] flex flex-col justify-around max-sm:gap-2 items-center">
          <UploadAvatar
            handleOssUrl={handleOssUrl}
            img={avatar}
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[40%] mx-auto flex flex-col justify-between max-sm:gap-6"
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
              <div className="w-full flex justify-center mt-5 mb-5">
                <Button
                  className="mx-auto btn w-[20%] max-sm:w-[60%] bg-[#f43f5e] dark:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-red-600  text-white"
                  // onClick={() => handleSign()}
                  type="submit"
                >
                  保存
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="h-full flex-1  bg-blue-500/30 rounded-lg "></div>
    </div>
  );
}
