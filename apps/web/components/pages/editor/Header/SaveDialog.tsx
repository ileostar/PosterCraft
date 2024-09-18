"use client";

import { createWork, getWork, updateWork } from "@/api/work";
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
import { UseElementStore } from "@/stores/element";
import { useWorkStore } from "@/stores/work";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function DialogDemo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Elements, pageBackgroundStyle } = UseElementStore();
  const { currentWorkId } = useWorkStore();

  const FormSchema = z.object({
    title: z
      .string()
      .min(1, { message: "标题不能少于1个字符" })
      .max(30, { message: "标题不能超过30个字符" }),
    desc: z.string(),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  async function onSubmit(values: FormSchemaType) {
    const params = {
      title: values.title,
      desc: values.desc,
      coverImg: "",
      content: {
        Elements,
        pageBackgroundStyle,
      },
      isTemplate: false,
      isPublic: false,
      status: 1,
    };
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

  const getTheWork = async () => {
    if (currentWorkId) {
      const res = await getWork(currentWorkId);
      form.setValue("title", res.data.data.title);
      form.setValue("desc", res.data.data.desc);
    }
  };

  useEffect(() => {
    getTheWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>作品信息</DialogTitle>
          <DialogDescription>请输入或修改相关的作品信息</DialogDescription>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
