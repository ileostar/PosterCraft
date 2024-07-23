"use client";

import Head from "../../components/page-components/index/Head";
import AuthLayout from "@/components/base/AuthLayout";

function Index(props: any) {
  return (
    <AuthLayout> 
    <div>
      <Head />
      这里是编辑器
    </div>
    </AuthLayout>
  );
}

export default Index;
