import { uploadFile } from "@/http/oss";
import html2canvas from "html2canvas-pro";

export async function takeScreenshot() {
  console.log("takeScreenshot");
  const ele = document.getElementById("canvas-area") as HTMLElement;
  const canvas = await html2canvas(ele, { width: 375, useCORS: true, scale: 1 });
  const canvasBlob = await getCanvasBlob(canvas);
  if (canvasBlob) {
    const data = await upload(canvasBlob);
    return data;
  } else return "";
}

export async function upload(file: Blob) {
  const newFile = file instanceof File ? file : new File([file], "file");
  const formData = new FormData();
  formData.append("file", newFile);
  try {
    const response = await uploadFile(formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.url;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}
function getCanvasBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    });
  });
}
