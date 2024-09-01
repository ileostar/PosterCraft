"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import Left from "@/components/page/editor/Left";
import Middle from "@/components/page/editor/Middle";
import Right from "@/components/page/editor/Right";

function Index(props: any) {
  return (
    <AuthLayout>
      <div className="h-screen flex flex-col">
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
