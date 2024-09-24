import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function MidDialog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const renderContent = {
    拷贝图层: "Ctrl+C",
    粘贴图层: "Ctrl+V",
    删除图层: "Delete",
    取消选中元素: "Esc",
    撤销: "Ctrl+Z",
    上下左右移动一像素: "⬆⬇⬅➡",
    上下左右移动十像素: "Shift+⬆⬇⬅➡",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>快捷键操作</DialogTitle>
        </DialogHeader>

        <div className="w-[80%] mx-auto">
          {Object.entries(renderContent).map(([key, value], index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div className="text-sm text-gray-500 text-left">{key}</div>
              <div className="ml-2 font-semibold text-gray-900 text-right">{value}</div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MidDialog;
