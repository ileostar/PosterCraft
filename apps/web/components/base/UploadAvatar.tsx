import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ChildProps {
  handleOssUrl: (msg: string) => void; // 根据需要调整参数类型
  img: string;
}

const UploadAvatar: React.FC<ChildProps> = ({ handleOssUrl, img }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(img);
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickButton=()=>{
    inputRef.current?.click();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFile(file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      console.log('待定')
      console.log("You can only upload JPG/PNG file!");
      return
    }
    if (!isLt2M) {
      console.log('待定')
      console.log("Image must smaller than 2MB!");
      return
    }
    handleUpload()
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const token = "bearer " + window.localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };

    try {
      const response = await fetch("http://127.0.0.1:3001/oss/upload", {
        method: "POST",
        body: formData,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response)

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      handleOssUrl(data.url); // 假设响应中包含一个 url 字段
      // 这里可以根据需要处理响应，获取图片的 URL 并更新状态
    } catch (error) {
      console.error("Error uploading file:", error);
      console.log('待定')
    }

    setLoading(false);
  };

   
  useEffect(() => {
    if (img) {
      // 可以在这里处理 img 字符串，如果需要的话
      // 例如，如果 img 是一个 URL，可以直接设置为 imageUrl
      setImageUrl(img);
    }
  }, [img]);

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="avatar"
          width={100}
          height={100}
          className="w-full h-auto"
        />
      ) : (
        <div>
          <input
             ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e)=>handleFileChange(e)}
            accept="image/jpeg, image/png"
          ></input>
          <button
            style={{ background: "none", cursor: "pointer" }}
            className=" border-2 border-solid bg-[#696969] rounded-btn hover:border-dotted w-24 h-24"
            type="button"
            onClick={()=>handleClickButton()}
          >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadAvatar;
