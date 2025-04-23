"use client";

import BaseLayout from "@/components/layouts/BaseLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GetWorkResponse } from "@/http/types/work";
import { getWork } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WorkDetail() {
  const params = useParams();
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
        const slug = params.slug as string;
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
    if (workDetail) {
      router.push("/editor");
      setWork(workDetail.workId);
    }
  };

  return (
    <BaseLayout>
      <div className="container mx-auto py-8">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
            <Button onClick={() => router.push("/works")}>{t("back-to-works")}</Button>
          </div>
        ) : workDetail ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{workDetail.title}</h1>
              <Button onClick={handleEditWork}>{t("edit-work")}</Button>
            </div>

            {workDetail.desc && (
              <p className="text-gray-600 dark:text-gray-300">{workDetail.desc}</p>
            )}

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {workDetail.coverImg ? (
                <img
                  src={workDetail.coverImg}
                  alt={workDetail.title}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="h-64 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">{t("no-preview-available")}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-2">{t("details")}</h3>
                <p>
                  <span className="font-medium">{t("id")}:</span> {workDetail.workId}
                </p>
                <p>
                  <span className="font-medium">{t("is-template")}:</span>{" "}
                  {workDetail.isTemplate ? "是" : "否"}
                </p>
                <p>
                  <span className="font-medium">{t("is-public")}:</span>{" "}
                  {workDetail.isPublic ? "是" : "否"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">{t("not-found")}</h2>
            <Button onClick={() => router.push("/works")}>{t("back-to-works")}</Button>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}
