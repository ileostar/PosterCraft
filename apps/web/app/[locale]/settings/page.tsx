import BaseLayout from "@/components/layouts/BaseLayout";
import Account from "@/components/settings/Account";
import Password from "@/components/settings/Password";
import Profile from "@/components/settings/Profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

function Main() {
  const t = useTranslations();
  return (
    <BaseLayout>
      <Tabs
        defaultValue="account"
        className="flex max-sm:flex-col flex-row gap-5 mx-auto"
      >
        <TabsList className="flex max-sm:flex-row flex-col gap-2 h-[50vh] max-sm:h-[10vh]  bg-white dark:bg-gray-200/10 p-3 w-[10vw] max-sm:w-[100%] justify-start rounded-xl">
          <TabsTrigger
            className="w-full rounded-lg"
            value="profile"
          >
            {t("profile")}
          </TabsTrigger>
          <TabsTrigger
            className="w-full rounded-lg"
            value="account"
          >
            {t("account-setting")}
          </TabsTrigger>
          <TabsTrigger
            className="w-full rounded-lg"
            value="password"
          >
            {t("password-setting")}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className=" max-sm:h-[80vh] flex-1 p-8 mt-0 rounded-xl bg-white dark:bg-gray-200/10 overflow-hidden"
          value="profile"
        >
          <Profile />
        </TabsContent>
        <TabsContent
          className=" flex-1 p-8 mt-0 rounded-xl bg-white dark:bg-gray-200/10 overflow-hidden"
          value="account"
        >
          <Account />
        </TabsContent>
        <TabsContent
          className=" flex-1 p-8 mt-0 rounded-xl bg-white dark:bg-gray-200/10 overflow-hidden"
          value="password"
        >
          <Password />
        </TabsContent>
      </Tabs>
    </BaseLayout>
  );
}

export default Main;
