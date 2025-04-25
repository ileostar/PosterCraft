"use client";

import BaseLayout from "@/components/layouts/BaseLayout";
import { Button } from "@/components/ui/button";
import { GetWorkResponse } from "@/http/types/work";
import { copyWork, getWork } from "@/http/work";
import { useUserStore } from "@/stores/user";
import { useWorkStore } from "@/stores/work";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DetailProps {
  params: {
    id: string;
  };
}

// TODO 海报详情信息更换
const deatilInfo = {
  title: "海报标题",
  author: "作者",
  date: "2022-01-01",
  pu: ["标签1", "标签2"],
};

const Detail: React.FC<DetailProps> = ({ params }) => {
  const t = useTranslations("work");
  const router = useRouter();
  const { setWork } = useWorkStore();
  const [workDetail, setWorkDetail] = useState<GetWorkResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkDetail = async () => {
      try {
        setLoading(true);
        // 从动态路由参数中获取工作区ID
        const slug = params.id as string;
        if (!slug || slug.length === 0) {
          setError(t("invalid-id"));
          return;
        }

        const workId = slug;
        const response = await getWork(workId);

        if (response.data.code === 200) {
          setWorkDetail(response.data.data);
        } else {
          setError(response.data.msg || t("fetch-error"));
        }
      } catch (err) {
        console.error("获取工作区详情出错:", err);
        setError(t("fetch-error"));
      } finally {
        setLoading(false);
      }
    };

    fetchWorkDetail();
  }, [params, t]);

  const handleEditWork = () => {
    router.push("/editor/" + workDetail?.workId);
  };

  const isVisible = () => {
    const currentUserInfos = useUserStore((state) => state.userInfos);
    return workDetail?.author == currentUserInfos.username;
  };

  const handleCopied = async () => {
    try {
      if (!workDetail?.workId) {
        return;
      }

      const response = await copyWork(workDetail.workId);

      if (response.data.code === 200) {
        // 复制成功后，跳转到编辑页面
        router.push(`/editor/${response.data.data.workId}`);
        // 设置当前工作区
        setWork(response.data.data.workId);
        // 可以添加一个成功提示
        console.log("工作区复制成功");
      } else {
        console.error("复制工作区失败:", response.data.msg);
      }
    } catch (error) {
      console.error("复制工作区出错:", error);
    }
  };

  return (
    <BaseLayout>
      <div className="px-5">
        <button
          onClick={() => {
            router.back();
          }}
          className="bg-slate-300/10 w-8 h-8 flex items-center justify-center rounded-full p-2"
        >
          <i className="icon-[carbon--arrow-left]" />
        </button>
      </div>
      <div className="px-5 pt-5 flex gap-10">
        <div className="bg-gray-500/20 min-w-[35%] max-w-[40%] flex justify-center items-center rounded-2xl">
          <div className="text-5xl font-bold p-3 text-gray-300/50">
            <Image
              src={
                workDetail?.coverImg ||
                "https://cimg.co/news/100430/248406/polina-kondrashova-fhrwah2hmnm-unsplash.jpg"
              }
              className="w-full group-hover:scale-105 transition-transform duration-300"
              alt={"avatar"}
              width={500}
              height={800}
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1 pt-5">
          <h2 className="font-bold text-3xl">{workDetail?.title}</h2>
          {/* <span>{t("id")}： {workDetail?.workId}</span> */}
          <div className="relative overflow-visible flex gap-5 items-center">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              className="rounded-full w-8 h-8 group-hover:scale-105 transition-transform duration-300"
              alt={"avatar"}
              width={100}
              height={100}
            />
            <span>{workDetail?.author}</span>
          </div>
          <div className="flex gap-3 flex-col">
            描述：
            <h3 className="w-full bg-gray-400/10 py-2 px-3 rounded-md">
              {workDetail?.desc || "暂无"}
            </h3>
          </div>
          <div className="flex gap-5">{workDetail?.copiedCount} 人使用</div>
          {isVisible() && (
            <Button
              className="w-20"
              onClick={handleEditWork}
            >
              {t("edit-work")}
            </Button>
          )}
          <div className="flex gap-5">
            <Button
              className="w-20"
              onClick={handleCopied}
            >
              复制
            </Button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Detail;
