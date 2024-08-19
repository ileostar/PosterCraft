import type { GetProp, UploadProps } from "antd";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

interface ChildProps {
  handleOssUrl: (msg: string) => void; // 根据需要调整参数类型
  img: string;
}

const UploadAvatar: React.FC<ChildProps> = ({ handleOssUrl, img }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps["onChange"] = (info) => {
    handleOssUrl(info.file.response?.url);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const [token, setToken] = useState<string>();

  useEffect(() => {
    const s = "bearer " + window.localStorage.getItem("token");
    setToken(s);
    setImageUrl(img);
  }, [img]);

  let headers: { Authorization?: string } = { Authorization: token };

  return (
    <Upload
      name="file"
      headers={headers}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="http://127.0.0.1:3001/oss/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="avatar"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadAvatar;
