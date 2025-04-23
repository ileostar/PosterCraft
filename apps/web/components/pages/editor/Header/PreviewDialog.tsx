"use client";

import BaseTooltip from "@/components/BaseTooltip";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { GlobalEnvConfig } from "@/config";
import { uploadFile } from "@/http/oss";
import { getWork, publishWorkToTemplate, updateWork } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { takeScreenshot } from "@/utils/others/takeScreenshot";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function PreviewDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast } = useToast();
  const { currentWorkId } = useWorkStore();
  const [workInfo, setWorkInfo] = useState<{ title: string; desc: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // 状态管理
  const [imgUrl, setImgUrl] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // 获取作品信息
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
            setTitle(res.data.data.title);
            setDesc(res.data.data.desc);
            setPreviewUrl(`${window.location.origin}/preview/${currentWorkId}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchWorkInfo();
  }, [currentWorkId]);

  // 获取作品预览图和封面
  const getTheWork = async () => {
    try {
      const img = await takeScreenshot();
      if (img) {
        setImgUrl(img);
      }

      if (currentWorkId) {
        const res = await getWork(currentWorkId);
        if (res.data.code === 200 && res.data.data.coverImg) {
          setCoverImgUrl(res.data.data.coverImg);
        }
      }
    } catch (error) {
      console.error("获取预览图失败:", error);
      toast({
        variant: "destructive",
        title: "错误",
        description: "获取预览图失败，请重试",
      });
    }
  };

  // 发布作品
  const handlePublish = async () => {
    if (!currentWorkId) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "请先保存作品再发布",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const res = await publishWorkToTemplate(currentWorkId);
      if (res.data.code === 200) {
        toast({
          variant: "success",
          title: "成功",
          description: "作品发布成功",
        });
      } else {
        throw new Error(res.data.msg || "发布失败");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "错误",
        description: typeof error === "string" ? error : "发布失败，请重试",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // 保存作品
  const handleSave = async () => {
    if (!currentWorkId) {
      toast({
        variant: "destructive",
        title: "错误",
        description: "未找到当前作品ID",
      });
      return;
    }

    setIsSaving(true);
    try {
      // 准备更新数据
      const updateData: any = {
        title,
        desc,
      };

      // 如果有新上传的封面图，先上传到OSS
      if (coverImg && !coverImgUrl) {
        setIsUploading(true);
        try {
          // 将base64转为文件对象
          const base64Data = coverImg.split(",")[1];
          const blob = atob(base64Data);
          const array = [];
          for (let i = 0; i < blob.length; i++) {
            array.push(blob.charCodeAt(i));
          }
          const file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });

          // 创建FormData对象
          const formData = new FormData();
          formData.append("file", file, `cover_${Date.now()}.jpg`);

          // 上传文件
          const uploadRes = await uploadFile(formData);
          if (uploadRes.data.code === 200) {
            const fileUrl = uploadRes.data.data.url;
            setCoverImgUrl(fileUrl);
            updateData.coverImg = fileUrl;
          } else {
            throw new Error("上传封面失败");
          }
        } catch (error) {
          console.error("上传封面失败:", error);
          toast({
            variant: "destructive",
            title: "错误",
            description: "上传封面失败，请重试",
          });
          setIsUploading(false);
          setIsSaving(false);
          return;
        } finally {
          setIsUploading(false);
        }
      } else if (coverImgUrl) {
        updateData.coverImg = coverImgUrl;
      }

      // 更新工作区
      const res = await updateWork(currentWorkId, updateData);
      if (res.data.code === 200) {
        toast({
          variant: "success",
          title: "成功",
          description: "保存成功",
        });
      } else {
        throw new Error(res.data.msg || "保存失败");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "错误",
        description: typeof error === "string" ? error : "保存失败，请重试",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 当对话框打开时获取预览图
  useEffect(() => {
    if (isOpen) {
      getTheWork();
    }
  }, [isOpen]);

  // 生成二维码URL
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
      <DrawerContent className="h-[100vh] w-full overflow-hidden md:w-[650px] dark:bg-[#1F2937] p-4 md:p-6 overflow-y-auto">
        <div className="flex flex-col w-full h-full">
          <h2 className="text-xl font-bold mb-6 border-b pb-2">作品设置</h2>
          <div className="flex flex-col md:flex-row gap-6 flex-1">
            {/* 左侧预览区 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="mockup-phone border-primary !rounded-2xl !p-1 !py-2 mb-4 w-full">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display w-full max-w-[280px] rounded-2xl flex justify-center items-center bg-gray-100 dark:bg-gray-800">
                  {imgUrl ? (
                    <Image
                      className="w-full h-full rounded-xl object-cover"
                      src={imgUrl}
                      alt="预览图"
                      width={280}
                      height={500}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center mt-2">
                <BaseTooltip
                  tooltipText={
                    <div className="p-2 bg-white rounded-md">
                      <QRCode
                        value={qrCodeUrl}
                        size={150}
                      />
                    </div>
                  }
                  position="top"
                >
                  <Button className="mb-2">👉扫码预览</Button>
                </BaseTooltip>
              </div>
            </div>
            {/* 右侧表单区 */}
            <div className="flex-1  space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">标题</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入作品标题"
                  className="bg-transparent border-white/50 border-[1px] border-solid"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">描述</Label>
                <Textarea
                  id="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="请输入作品描述"
                  className="bg-transparent border-white/50 border-[1px] border-solid resize-none h-24"
                />
              </div>
              <div className="space-y-2">
                <Label>封面图片</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="cursor-pointer flex-1 border-white/50 border-[1px] border-solid bg-transparent"
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
                  <div className="flex flex-1 items-center gap-4">
                    {(coverImg || coverImgUrl) && (
                      <div className="relative">
                        <img
                          src={coverImg || coverImgUrl}
                          alt="封面预览"
                          className="h-32 object-cover rounded-md border border-gray-300 border-solid"
                        />
                        <button
                          onClick={() => {
                            setCoverImg("");
                            if (!coverImgUrl) setCoverImgUrl("");
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    )}

                    {!coverImg && !coverImgUrl && (
                      <div className="w-32 h-32 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                        暂无封面
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t mt-6">
                <Button
                  onClick={handleSave}
                  disabled={isUploading || isSaving}
                  className="flex-1"
                  variant="default"
                >
                  {(isUploading || isSaving) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isUploading ? "上传中..." : isSaving ? "保存中..." : "保存"}
                </Button>

                <Button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="flex-1"
                  variant="secondary"
                >
                  {isPublishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isPublishing ? "发布中..." : "发布"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default PreviewDialog;
