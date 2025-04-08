"use client";

import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { createWork, getWork, updateWork } from "@/http/work";
import { useElementStore } from "@/stores/element";
import { useWorkStore } from "@/stores/work";
import { takeScreenshot } from "@/utils/others/takeScreenshot";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function PublishDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Elements, pageBackgroundStyle } = useElementStore();
  const { currentWorkId } = useWorkStore();

  const FormSchema = z.object({
    title: z
      .string()
      .min(1, { message: "标题不能少于1个字符" })
      .max(30, { message: "标题不能超过30个字符" }),
    desc: z.string(),
    coverImg: z.string(),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      desc: "",
      coverImg: "",
    },
  });

  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  async function onSubmit(values: FormSchemaType) {
    const params = {
      title: values.title,
      desc: values.desc,
      coverImg: form.getValues("coverImg"),
      content: {
        Elements,
        pageBackgroundStyle,
      },
      isTemplate: false,
      isPublic: false,
      status: 1,
    };
    console.log(params);
    try {
      const res = currentWorkId
        ? await updateWork(currentWorkId, params)
        : await createWork(params);
      if (res.data.code === 200) {
        toast({
          variant: "success",
          title: "Success",
          description: "作品保存成功",
        });
      }
      setOpen(false);
    } catch (error: any) {
      Error(error);
    }
  }
  const [imgUrl, setImgUrl] = useState("");

  const getTheWork = async () => {
    const img = await takeScreenshot();
    if (img) {
      setImgUrl(img);
      form.setValue("coverImg", img);
    }
    if (currentWorkId) {
      const res = await getWork(currentWorkId);
      form.setValue("title", res.data.data.title);
      form.setValue("desc", res.data.data.desc);
    }
  };

  useEffect(() => {
    getTheWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>作品信息</DialogTitle>
          <DialogDescription>请输入或修改相关的作品信息</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-between">
          <div className="w-[150px] h-[267px] border border-gray-500">
            <Image
              className="w-full h-full object-cover"
              src={imgUrl}
              alt="封面"
              width={0}
              height={0}
              sizes="100vh"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2 p-8 rounded-2xl"
            >
              <div className="flex flex-col gap-1 mb-1">
                <CustomFormField
                  form={form}
                  name={"title"}
                  placeholder={"请输入作品标题"}
                  label={"作品标题"}
                />
                <CustomFormField
                  form={form}
                  name={"desc"}
                  placeholder={"请输入作品简介"}
                  label={"作品简介"}
                />
              </div>
              <div className="flex justify-end mt-[5px]">
                <Button
                  className="bg-[#3d7fff] text-white"
                  type="submit"
                >
                  确认
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PublishDialog;
