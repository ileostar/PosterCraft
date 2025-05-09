"use client";

import { createWork } from "@/http/work";
import { useWorkStore } from "@/stores/work";
import { Link } from "@/utils/i18n/routing";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import BaseTyped from "./BaseTyped";

interface BaseIntroProps {}

const BaseIntro: React.FC<BaseIntroProps> = () => {
  const t = useTranslations();
  const { setWork } = useWorkStore();
  const router = useRouter();

  async function newWork() {
    try {
      const res = await createWork({
        title: "未命名海报",
        desc: "",
        coverImg: "",
        content: {
          components: undefined,
          props: undefined,
        },
        isTemplate: false,
        isPublic: false,
        status: 0,
      });
      console.log("res", res);
      router.push(`/editor/${res.data.data.workId}`);
      setWork(res.data.data.workId);
    } catch (error) {
      // 创建作品失败
      console.error("创建作品失败:", error);
    }
  }

  return (
    <div className="w-full h-full -mt-8 lg:-mt-16 flex flex-col md:flex-row justify-center items-center">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <div className="flex">
          <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 leading-6 text-sm xl:text-base text-gray-700 dark:text-white xl:font-semibold border hover:bg-rose-400/60 dark:border-[#CACACA]/60 bg-transparent hover:bg-rose-400 dark:hover:bg-[#E730CA] hover:text-white hover:border-transparent transition-colors">
            <Link
              href="#"
              className="flex items-center gap-x-1"
            >
              {t("new-features-added")}
              <svg
                className="-mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
        <h1 className="mt-10 text-3xl sm:text-6xl lg:text-5xl font-semibold text-gray-700 dark:text-white xl:text-7xl tracking-tight leading-relaxed">
          {t("create-posters-with")}{" "}
          <span className="text-rose-400 dark:text-[#FF33DE]">PosterCraft!</span>
        </h1>
        <BaseTyped strings={[t("desc")]} />
        <div className="mt-10 flex items-center gap-x-6">
          <div
            onClick={newWork}
            className="rounded-xl bg-rose-400 dark:bg-[#E730CA] w-32 xl:w-40 py-2.5 font-semibold text-sm xl:text-base text-white hover:text-gray dark:text-white hover:text-gray-700 text-center border border-transparent hover:border-rose-400 dark:hover:border-[#E730CA]/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 hover:bg-transparent dark:hover:bg-transparent focus-visible:outline-none focus-visible:outline-0 focus-visible:outline-offset-0 focus-visible:outline-transparent transition-colors cursor-pointer"
          >
            {t("start-designing")}
          </div>
          <Link
            href={"/templates"}
            className="border border-rose-400 dark:border-[#E730CA] border-rose-500/50 dark:hover:border-[#E730CA]/30 bg-transparent hover:bg-rose-400/30 dark:hover:bg-[#E730CA]/30 rounded-xl w-36 xl:w-48 py-2.5 font-semibold leading-6 text-sm xl:text-base text-rose-400 dark:text-[#E730CA] hover:text-white text-center transition-colors"
          >
            {t("exploreTemplates")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BaseIntro;
