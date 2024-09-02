"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import Left from "@/components/pages/editor/Left";
import Middle from "@/components/pages/editor/Middle";
import Right from "@/components/pages/editor/Right";

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
