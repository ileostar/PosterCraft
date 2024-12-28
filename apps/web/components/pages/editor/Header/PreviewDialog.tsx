"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getPreviewUrl } from "@/http/work";
import { UseElementStore } from "@/stores/element";
import { useWorkStore } from "@/stores/work";
import { takeScreenshot } from "@/utils/others/takeScreenshot";
import Image from "next/image";
import { useEffect, useState } from "react";

function PreviewDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast } = useToast();
  const { currentWorkId } = useWorkStore();
  const [imgUrl, setImgUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [open, setOpen] = useState(false);

  const getPreview = async () => {
    try {
      if (!currentWorkId) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "请先保存作品",
        });
        return;
      }

      // 获取预览图
      const img = await takeScreenshot();
      if (img) {
        setImgUrl(img);
      }

      // 获取预览链接
      const res = await getPreviewUrl(currentWorkId);
      if (res.data.code === 200) {
        setPreviewUrl(res.data.data.url);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "获取预览失败",
      });
    }
  };

  useEffect(() => {
    if (open) {
      getPreview();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>预览</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div className="w-[150px] h-[267px] border border-gray-500">
            <Image
              className="w-full h-full object-cover"
              src={imgUrl}
              alt="预览"
              width={0}
              height={0}
              sizes="100vh"
            />
          </div>

          {previewUrl && (
            <Button
              type="button"
              className="bg-[#3d7fff] text-white"
              onClick={() => window.open(previewUrl)}
            >
              打开预览链接
            </Button>
          )}
        </div>

        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            关闭
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialog;
