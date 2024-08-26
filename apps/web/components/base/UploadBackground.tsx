import { uploadFile } from "@/api/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Cropper from "cropperjs";
import React, { useEffect, useRef, useState } from "react";

import "cropperjs/dist/cropper.css";

import Image from "next/image";

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

  const [modal, setModal] = useState(false);
  const crop = () => {
    const modalElement = document.getElementById("crop_modal") as HTMLDialogElement | null;
    if (modalElement) {
      modalElement.showModal();
      setModal(true);
    }
  };

  const cropperImg = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const cropDataRef = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    setImageUrl((value) => value.split("?")[0]);
    if (cropperImg.current) {
      cropperRef.current = new Cropper(cropperImg.current, {
        crop(event) {
          const { x, y, width, height } = event.detail;
          cropDataRef.current = {
            x: Math.floor(x),
            y: Math.floor(y),
            width: Math.floor(width),
            height: Math.floor(height),
          };
        },
      });
    }

    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, [modal, cropperImg.current]);

  const handleCropperImg = () => {
    if (cropDataRef) {
      const { x, y, width, height } = cropDataRef.current!;
      const cropperURL =
        imageUrl + `?x-oss-process=image/crop,x_${x},y_${y},w_${width},h_${height}`;
      console.log(cropperURL);
      handleOssUrl(cropperURL);
    }
  };

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
        <Button
          onClick={() => crop()}
          className="rounded-full border-solid border-[#e11d48] bg-white text-[#e11d48] border-4 hover:text-white"
        >
          裁剪图片
        </Button>
        <Button
          onClick={() => {
            handleOssUrl("");
            setImageUrl("");
          }}
          className="rounded-full border-solid border-[#e11d48] bg-white text-[#e11d48] border-4 hover:text-white"
        >
          删除图片
        </Button>
      </div>

      <dialog
        id="crop_modal"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">裁剪图片</h3>
          <div>
            <Image
              src={imageUrl}
              ref={cropperImg}
              id="image"
              alt="Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto max-w-full block"
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={() => setModal(false)}
              >
                取消
              </button>
              <button
                className="btn"
                onClick={() => {
                  setModal(false);
                  handleCropperImg();
                }}
              >
                确认
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UploadBackground;
