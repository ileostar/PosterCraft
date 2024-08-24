"use client";

import { Card } from "@/components/base/Card";
import { useScrollAnimate } from "@/hooks/useScrollAnimate";
import Image from "next/image";
import { useRef } from "react";

function Index(props: any) {
  const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  useScrollAnimate(boxRef);

  return (
    <div
      className="min-w-96 px-5 sm:px-16 md:px-20 lg:px-32 xl:px-0 sm:gap-1 md:gap-2 xl:gap-4 sm:max-w-7xl mx-auto mt-8 mb-8 flex max-w-7xl justify-between flex-col lg:flex-row"
      ref={boxRef}
    >
      <Card className="sm:flex-1">
        <div className="bg-gray-200/50 h-80 w-full"></div>
      </Card>
      <Card className="sm:flex-1">
        <div className="bg-gray-200/50 h-80 w-full"></div>
      </Card>
    </div>
  );
}

export default Index;
