"use client";

import { defaultSignUp } from "@/api/auth";
import CustomFormField from "@/components/shared/CustomFormField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useGithubUsername, useOauth2Dialog } from "@/stores/auth";
import { phoneFormSchema, phoneFormSchemaType } from "@/utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function DialogDemo() {
  const form = useForm<phoneFormSchemaType>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: "",
      otp: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { githubUsername } = useGithubUsername();
  const { setIsOpen, isOpen } = useOauth2Dialog();

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  async function onSubmit(values: phoneFormSchemaType) {
    try {
      let res = await defaultSignUp({
        username: githubUsername,
        password: null,
        phone: values.phone,
        otp: values.otp,
      });
      if (res.data.code === 200) {
        toast({
          variant: "success",
          title: "Success",
          description: "手机号绑定成功",
        });
        setOpen(false);
        setIsOpen(false);
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: res.data.msg,
        });
        return;
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>请绑定手机号!</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 p-8 rounded-2xl"
          >
            <div className="flex flex-col gap-1 mb-1">
              <CustomFormField
                form={form}
                name={"phone"}
                placeholder={"请输入手机号码"}
                label={"手机号码"}
              />
              <CustomFormField
                form={form}
                name={"code"}
                placeholder={"请输入验证码"}
                label={"验证码"}
                isVerify={true}
              />
            </div>
            <div className="flex justify-end mt-[5px]">
              <Button
                className="bg-[#3d7fff] text-white"
                type="submit"
              >
                绑定
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
