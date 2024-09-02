import BaseDivider from "@/components/base/BaseDivider";
import BaseLayout from "@/components/layouts/BaseLayout";
import MyWorks from "@/components/pages/user/MyWorks";
import UserInfos from "@/components/pages/user/UserInfos";

function Main() {
  return (
    <BaseLayout>
      <UserInfos />
      <BaseDivider />
      <MyWorks />
    </BaseLayout>
  );
}

export default Main;
