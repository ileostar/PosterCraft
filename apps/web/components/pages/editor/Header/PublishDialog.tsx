"use client";

import { publishWorkToTemplate } from "@/api/work";
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

function DialogDemo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast } = useToast();
  const handleClick = async () => {
    const workId = localStorage.getItem("currentWorkId");
    try {
      if (workId) {
        const res = await publishWorkToTemplate(workId);
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
    } catch (error) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>tip</DialogTitle>
        </DialogHeader>

        <div className="w-[80%] mx-auto">
          <DialogTitle> 确认要发布作品吗？</DialogTitle>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleClick}
              className="bg-[#3d7fff] text-white"
              variant="secondary"
            >
              确认
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDemo;
