import { uploadFile } from "@/http/oss";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ChildProps {
  handleOssUrl: (msg: string) => void;
  img: string;
}

const UploadAvatar: React.FC<ChildProps> = ({ handleOssUrl, img }) => {
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
    <div>
      {imageUrl ? (
        <button
          className="w-24 rounded-full overflow-hidden"
          onClick={() => handleClickButton()}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden rounded-full"
            onChange={(e) => handleFileChange(e)}
            accept="image/jpeg, image/png"
          ></input>
          <Image
            src={imageUrl}
            alt="avatar"
            width={0}
            height={0}
            sizes="10vw"
            className="w-full h-full rounded-full"
          />
        </button>
      ) : (
        <div>
          <input
            ref={inputRef}
            type="file"
            className="hidden rounded-full"
            onChange={(e) => handleFileChange(e)}
            accept="image/jpeg, image/png"
          ></input>
          <button
            style={{ background: "none", cursor: "pointer" }}
            className="border-2 border-solid !bg-gray-200/20 rounded-full hover:border-dotted w-24 h-24"
            type="button"
            onClick={() => handleClickButton()}
          >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;
