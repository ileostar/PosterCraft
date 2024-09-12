"use client";

import BaseDivider from "@/components/base/BaseDivider";
import BaseLayout from "@/components/layouts/BaseLayout";
import MyWorks from "@/components/pages/user/MyWorks";
import UserInfos from "@/components/pages/user/UserInfos";
import { useEffect, useState } from "react";

function Main({ params }: { params: { userId: string } }) {
  const [isMyself, setIsMyself] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    console.log(params.userId);
    if (userId && params.userId === userId) {
      setIsMyself(true);
    } else {
      setIsMyself(false);
    }
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
