"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { getWork, publishWorkToTemplate } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import Image from "next/image";
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
    <Drawer direction="right">
      <DrawerTrigger
        asChild
        className="overflow-visible"
      >
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] w-[650px]  dark:bg-[#1F2937] px-6 pb-6 ">
        <div className="flex gap-5">
          <div className=" mockup-phone border-primary mx-5!">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display w-72">
              <img
                alt="wallpaper"
                src="https://img.daisyui.com/images/stock/453966.webp"
              />
            </div>
          </div>
          <dl className="flex-1 flex flex-col gap-5">
            <dt className="font-sans font-bold">设置面板</dt>
            <dd className="flex gap-5">
              <div className="w-20">扫码预览：</div>
              <span>扫码预览：</span>
            </dd>
            <dd className="flex gap-5">
              <div className="w-20">上传封面：</div>
              <span>扫码预览：</span>
            </dd>
            <dd className="flex gap-5">
              <div className="w-20">标题：</div>
              <span>扫码预览：</span>
            </dd>
            <dd className="flex gap-5">
              <div className="w-20">副标题：</div>
              <span>扫码预览：</span>
            </dd>
          </dl>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default DialogDemo;
