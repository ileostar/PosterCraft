"use client";

import { createWork } from "@/api/work";
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
import { UseElementStore } from "@/stores/element";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function DialogDemo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Elements, pageBackgroundStyle } = UseElementStore();

  const FormSchema = z.object({
    title: z
      .string()
      .min(4, { message: "标题不能少于4个字符" })
      .max(12, { message: "标题不能超过20个字符" }),
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

  const [open, setOpen] = useState(false);

  async function onSubmit(values: FormSchemaType) {
    try {
      const res = await createWork({
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
      });
      console.log(res);
      setOpen(false);
    } catch (error) {}
  }

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
