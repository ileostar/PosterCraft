"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { GlobalEnvConfig, siteConfig } from "@/config";
import { getWork, publishWorkToTemplate } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { takeScreenshot } from "@/utils/others/takeScreenshot";
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

  const [imgUrl, setImgUrl] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const getTheWork = async () => {
    const img = await takeScreenshot();
    if (img) {
      setImgUrl(img);
    }
    if (currentWorkId) {
      const res = await getWork(currentWorkId);
    }
  };

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
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getTheWork();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // 生成二维码
  const qrCodeUrl = `${GlobalEnvConfig.SERVER_URL}/page/preview/demo-${currentWorkId}`;
  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="right"
    >
      <DrawerTrigger
        asChild
        className="overflow-visible"
      >
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] w-[650px]  dark:bg-[#1F2937] px-6 pb-6 ">
        <dt className="mb-5 font-sans font-bold">设置面板</dt>
        <div className="flex gap-5">
          <div className="mockup-phone border-primary  !rounded-2xl !mx-5  !p-1 !py-2">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display w-80 rounded-2xl flex justify-center items-center">
              <Image
                className="w-full h-full rounded-xl object-cover"
                src={imgUrl}
                alt="封面"
                width={300}
                height={500}
              />
            </div>
          </div>
          <dl className="flex-1 flex flex-col gap-5">
            <dd className="flex flex-col gap-5">
              <div className="w-20">扫码预览：</div>
              <QRCode
                className="border border-white border-solid p-1 rounded-sm"
                value={qrCodeUrl}
                size={100}
              />
            </dd>
            <dd className="flex flex-col gap-5 max-w-40">
              <div className="w-20">上传封面：</div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="cursor-pointer w-full"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setCoverImg(e.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {coverImg && (
                  <div className="mt-2">
                    <img
                      src={coverImg}
                      alt="预览图"
                      className="w-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
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
