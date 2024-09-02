import BaseLayout from "@/components/layouts/BaseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Main() {
  return (
    <BaseLayout>
      <Tabs
        defaultValue="account"
        className="flex gap-5"
      >
        <TabsList className="flex flex-col gap-2 h-[50vh]  bg-white dark:bg-gray-200/10 p-3 w-[10vw] justify-start rounded-xl">
          <TabsTrigger
            className="w-full rounded-lg"
            value="profile"
          >
            个人资料
          </TabsTrigger>
          <TabsTrigger
            className="w-full rounded-lg"
            value="account"
          >
            账号设置
          </TabsTrigger>
          <TabsTrigger
            className="w-full rounded-lg"
            value="password"
          >
            密码设置
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className="flex-1 p-5 mt-0 rounded-xl bg-white dark:bg-gray-200/10 overflow-hidden"
          value="profile"
        >
          <div className="flex flex-col gap-2 h-[100vh] w-full justify-start">profile settings</div>
        </TabsContent>
        <TabsContent
          className="flex-1 p-5 mt-0 rounded-xl bg-white dark:bg-gray-200/10 overflow-hidden"
          value="account"
        >
          <div className="flex flex-col gap-2 h-[100vh] w-full justify-start">Account settings</div>
        </TabsContent>
        <TabsContent
          className="flex-1 p-5 mt-0 rounded-xl bg-white dark:bg-gray-200/10 overflow-hidden"
          value="password"
        >
          <div className="flex flex-col gap-2 h-[100vh] w-full justify-start">
            password settings
          </div>
        </TabsContent>
      </Tabs>
    </BaseLayout>
  );
}

export default Main;
