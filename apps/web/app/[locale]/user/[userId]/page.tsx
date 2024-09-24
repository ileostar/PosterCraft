"use client";

import BaseDivider from "@/components/base/BaseDivider";
import BaseLayout from "@/components/layouts/BaseLayout";
import MyWorks from "@/components/pages/user/MyWorks";
import UserInfos from "@/components/pages/user/UserInfos";
import { useUserStore } from "@/stores/user";
import { useEffect, useState } from "react";

function Main({ params }: { params: { userId: string } }) {
  const [isMyself, setIsMyself] = useState(true);
  const { userId } = useUserStore();

  useEffect(() => {
    if (userId && params.userId === userId) {
      setIsMyself(true);
    } else {
      setIsMyself(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId]);

  return (
    <BaseLayout>
      <UserInfos isMyself={isMyself} />
      <BaseDivider />
      <MyWorks isMyself={isMyself} />
    </BaseLayout>
  );
}

export default Main;
