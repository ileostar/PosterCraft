import { toast } from "@/components/ui/use-toast";
import { RespUploadData } from "@/stores/respTypes";
import axios from "axios";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

/**
 * 数组元素移动函数
 * @param list - 要操作的数组
 * @param fromIndex - 要移动元素的原始位置
 * @param toIndex - 要移动到的目标位置
 * @returns 移动后的新数组
 * @example arrayMove([1, 2, 3, 4], 1, 3); // [1, 3, 2, 4]
 */
export function arrayMove<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const element = list[fromIndex];
  list.splice(fromIndex, 1);
  list.splice(toIndex, 0, element);
  return list;
}

/**
 * 在数组指定位置插入新元素
 * @param arr - 原始数组
 * @param index - 插入位置
 * @param newItem - 要插入的新元素
 * @returns 插入新元素后的新数组
 * @example insertAt([1, 2, 3, 4], 1, 5); // [1, 5, 2, 3, 4]
 */
export const insertAt = <T>(arr: T[], index: number, newItem: T): T[] => {
  return [...arr.slice(0, index), newItem, ...arr.slice(index)];
};

/**
 * 深拷贝对象
 * @param obj - 要拷贝的对象
 * @returns 深拷贝后的新对象
 * @example cloneDeep({ a: 1, b: 2 }); // { a: 1, b: 2 }
 */
export const cloneDeep = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

/**
 * 防抖函数
 * @param callback - 要执行的回调函数
 * @param timeout - 延迟时间(ms)
 * @returns 防抖处理后的函数
 * @example debounceChange(() => {}, 1000); // () => {}
 */
export const debounceChange = (callback: (...args: any[]) => void, timeout = 1000) => {
  let timer = 0;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = 0;
      callback(...args);
    }, timeout);
  };
};

/**
 * 文件上传前的检查条件接口
 */
interface CheckCondition {
  /** 允许的文件格式 */
  format?: string[];
  /** 最大文件大小(MB) */
  size?: number;
}

/** 错误类型 */
type ErrorType = "size" | "format" | null;

/**
 * 上传前检查文件
 * @param file - 要上传的文件
 * @param condition - 检查条件
 * @returns 检查结果
 * @example beforeUploadCheck(new File([], "test.png"), { format: ["image/jpeg", "image/png"], size: 1 }); // { passed: true, error: null }
 */
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isValidSize = size ? file.size / 1024 / 1024 < size : true;
  let error: ErrorType = null;

  if (!isValidFormat) error = "format";
  if (!isValidSize) error = "size";

  return {
    passed: isValidFormat && isValidSize,
    error,
  };
}

/**
 * 通用文件上传检查
 * @param file - 要上传的文件
 * @returns 是否通过检查
 * @example commonUploadCheck(new File([], "test.png")); // true
 */
export const commonUploadCheck = (file: File): boolean => {
  const result = beforeUploadCheck(file, {
    format: ["image/jpeg", "image/png"],
    size: 1,
  });

  if (result.error === "format") {
    toast({
      title: "格式错误",
      description: "上传图片只能是 JPG/PNG 格式!",
      variant: "destructive",
    });
  }

  if (result.error === "size") {
    toast({
      title: "文件过大",
      description: "上传图片大小不能超过 1Mb",
      variant: "destructive",
    });
  }

  return result.passed;
};

/**
 * 获取图片尺寸
 * @param url - 图片URL或File对象
 * @returns Promise<{width: number, height: number}>
 * @example getImageDimensions("https://picsum.photos/200/300"); // { width: 200, height: 300 }
 */
export const getImageDimensions = (url: string | File) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.src = typeof url === "string" ? url : URL.createObjectURL(url);
    img.addEventListener("load", () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      resolve({ width, height });
    });
    img.addEventListener("error", () => {
      reject(new Error("图片加载失败"));
    });
  });
};

/**
 * 获取指定类名的父元素
 * @param element - 起始元素
 * @param className - 要查找的类名
 * @returns 找到的父元素或null
 * @example getParentElement(document.body, "container"); // <body>
 */
export const getParentElement = (element: HTMLElement, className: string): HTMLElement | null => {
  while (element) {
    if (element.classList?.contains(className)) {
      return element;
    }
    element = element.parentNode as HTMLElement;
  }
  return null;
};

/**
 * 验证手机号
 * @param mobile - 手机号
 * @returns 是否为有效的手机号
 * @example isMobile("18888888888"); // true
 */
export function isMobile(mobile: string): boolean {
  return /^1[3-9]\d{9}$/.test(mobile);
}

/**
 * 上传文件
 * @param file - 要上传的文件
 * @param url - 上传地址
 * @param fileName - 文件名
 * @returns Promise<上传结果>
 * @example uploadFile(new File([], "test.png"), "/utils/upload-img", "test.png"); // { data: { url: "https://picsum.photos/200/300" } }
 */
export async function uploadFile<R = any>(
  file: Blob,
  url = "/utils/upload-img",
  fileName = "screenshot.png",
): Promise<R> {
  const newFile = file instanceof File ? file : new File([file], fileName);
  const formData = new FormData();
  formData.append(newFile.name, newFile);

  const { data } = await axios.post<R>(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

/**
 * 获取Canvas的Blob数据
 * @param canvas - Canvas元素
 * @returns Promise<Blob | null>
 * @example getCanvasBlob(document.createElement("canvas")); // null
 */
function getCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob));
  });
}

/**
 * 截图并上传
 * @param ele - 要截图的元素
 * @returns Promise<上传结果>
 * @example takeScreenshotAndUpload(document.body); // { data: { url: "https://picsum.photos/200/300" } }
 */
export async function takeScreenshotAndUpload(ele: HTMLElement) {
  const canvas = await html2canvas(ele, {
    width: 375,
    useCORS: true,
    scale: 1,
  });

  const canvasBlob = await getCanvasBlob(canvas);
  if (canvasBlob) {
    return await uploadFile<RespUploadData>(canvasBlob);
  }
}

/**
 * 生成二维码
 * @param id - Canvas元素ID
 * @param url - 要生成二维码的URL
 * @param width - 二维码宽度
 * @returns Promise<void>
 * @example generateQRCode("canvas", "https://picsum.photos/200/300"); // Promise<void>
 */
export function generateQRCode(id: string, url: string, width = 100) {
  const ele = document.getElementById(id) as HTMLCanvasElement;
  return QRCode.toCanvas(ele, url, { width });
}

/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 * @returns 是否复制成功
 * @example copyToClipboard("test"); // true
 */
export function copyToClipboard(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.cssText = "position:fixed;top:0;left:-9999px";

  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch (e) {
    console.warn("复制失败:", e);
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * 延时函数
 * @param ms - 延时时间(ms)
 * @returns Promise<void>
 * @example timeout(1000); // Promise<void>
 */
export function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 对象转查询字符串
 * @param queryObj - 查询对象
 * @returns 查询字符串
 * @example objToQueryString({ a: 1, b: 2 }); // "a=1&b=2"
 */
export const objToQueryString = (queryObj: Record<string, any>): string => {
  return Object.keys(queryObj)
    .map((key) => `${key}=${queryObj[key]}`)
    .join("&");
};

/**
 * 下载文件
 * @param src - 文件地址
 * @param fileName - 文件名
 * @example downloadFile("https://picsum.photos/200/300"); // void
 */
export const downloadFile = (src: string, fileName = "default.png"): void => {
  const link = document.createElement("a");
  link.download = fileName;
  link.rel = "noopener";

  if (link.origin !== location.origin) {
    axios
      .get(src, { responseType: "blob" })
      .then((data) => {
        link.href = URL.createObjectURL(data.data);
        setTimeout(() => link.dispatchEvent(new MouseEvent("click")));
        setTimeout(() => URL.revokeObjectURL(link.href), 10000);
      })
      .catch((e) => {
        console.error("下载失败:", e);
        link.target = "_blank";
        link.href = src;
        link.dispatchEvent(new MouseEvent("click"));
      });
  } else {
    link.href = src;
    link.dispatchEvent(new MouseEvent("click"));
  }
};

/**
 * 下载图片
 * @param url - 图片地址
 * @example downloadImage("https://picsum.photos/200/300"); // void
 */
export const downloadImage = (url: string): void => {
  const fileName = url.substring(url.lastIndexOf("/") + 1);
  saveAs(url, fileName);
};
