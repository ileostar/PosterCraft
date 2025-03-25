"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getWork, publishWorkToTemplate } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function DialogDemo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast } = useToast();
  const { currentWorkId } = useWorkStore();
  const [workInfo, setWorkInfo] = useState<{ title: string; desc: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchWorkInfo = async () => {
      if (currentWorkId) {
        try {
          const res = await getWork(currentWorkId);
          if (res.data.code === 200) {
            setWorkInfo({
              title: res.data.data.title,
              desc: res.data.data.desc,
            });
            // 设置预览URL，这里使用一个示例URL，你需要根据实际情况修改
            setPreviewUrl(`${window.location.origin}/preview/${currentWorkId}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchWorkInfo();
  }, [currentWorkId]);

  const handleClick = async () => {
    try {
      if (currentWorkId) {
        const res = await publishWorkToTemplate(currentWorkId);
        if (res.data.code === 200) {
          toast({
            variant: "success",
            title: "Success",
            description: "作品发布成功",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "请先保存作品再发布",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>作品预览</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 p-6">
          <div className="flex items-start gap-8">
            <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg shadow-md">
              <QRCode
                value={previewUrl}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
              <p className="text-sm text-gray-500">扫码预览作品</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">作品信息</h3>
                <p className="text-gray-700">标题：{workInfo?.title}</p>
                <p className="text-gray-700">简介：{workInfo?.desc}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">预览链接</h3>
                <p className="text-sm text-gray-500 break-all">{previewUrl}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="w-full justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">关闭</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                onClick={handleClick}
                className="bg-[#3d7fff] text-white"
                variant="secondary"
              >
                发布模板
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
