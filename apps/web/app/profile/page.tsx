import BaseDivider from "@/components/base/BaseDivider";
import BaseLayout from "@/components/layouts/BaseLayout";
import MyWorks from "@/components/pages/profile/MyWorks";
import UserInfos from "@/components/pages/profile/UserInfos";

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
