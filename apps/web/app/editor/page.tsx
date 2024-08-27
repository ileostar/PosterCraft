"use client";

import AuthLayout from "@/components/base/AuthLayout";
import Left from "@/components/page-components/editor/Left";
import Middle from "@/components/page-components/editor/Middle";
import Right from "@/components/page-components/editor/Right";

import Head from "../../components/page-components/index/Header";
import "@/style/focus.css";


function Index(props: any) {
  return (
    <AuthLayout>
      <div className="h-screen flex flex-col">
        <Head mode={"sticky"} />
        <div className="flex h-full">
          <Left />
          <Middle />
          <Right />
        </div>
      </div>
    </AuthLayout>
  );
}

export default Index;
