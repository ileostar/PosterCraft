import { uploadFile } from "@/api/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "../ui/button";

interface ChildProps {
  handleOssUrl: (msg: string) => void;
  img: string;
  className?: string;
}

const UploadBackground: React.FC<ChildProps> = ({ handleOssUrl, img, className }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickButton = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    console.log(file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      console.log("待定");
      console.log("You can only upload JPG/PNG file!");
      return;
    }
    if (!isLt2M) {
      console.log("待定");
      console.log("Image must smaller than 2MB!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadFile(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.msg != "ok") {
        console.log("待定");
        throw new Error("Network response was not ok");
      }

      handleOssUrl(response.data.data.url);
      setImageUrl(response.data.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
      console.log("待定");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (img) {
      setImageUrl(img);
    }
  }, [img]);

  return (
    <div className={className}>
      <div
        className="mb-1 w-2/3 h-36"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {imageUrl ? (
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e)}
            accept="image/jpeg, image/png"
          ></input>
        ) : (
          <div className="w-full h-full">
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e)}
              accept="image/jpeg, image/png"
            ></input>
            <button
              style={{ background: "none", cursor: "pointer" }}
              className=" border-2 border-solid bg-[#696969] rounded-btn hover:border-dotted w-full h-full"
              type="button"
              onClick={() => handleClickButton()}
            >
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
            </button>
          </div>
        )}
      </div>
      <div className=" w-1/3 flex items-center flex-col gap-1">
        <Button
          onClick={() => handleClickButton()}
          className="rounded-full border-solid border-[#e11d48] bg-white text-[#e11d48] border-4 hover:text-white"
        >
          上传图片
        </Button>
        <Button className="rounded-full border-solid border-[#e11d48] bg-white text-[#e11d48] border-4 hover:text-white">
          裁剪图片
        </Button>
        <Button className="rounded-full border-solid border-[#e11d48] bg-white text-[#e11d48] border-4 hover:text-white">
          删除图片
        </Button>
      </div>
    </div>
  );
};

export default UploadBackground;
