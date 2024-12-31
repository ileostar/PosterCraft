"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

import BaseProps from "./BaseProps";
import BorderProps from "./BorderProps";
import EventProps from "./EventProps";
import PositionProps from "./PositionProps";
import ShadowProps from "./ShadowProps";
import SizeProps from "./SizeProps";

import "@/styles/base/hiddenScroll.css";

interface PropSection {
  id: string;
  title: string;
  component: React.ReactNode;
}

function SetProps() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [containerStyle, setContainerStyle] = useState<CSSProperties>({
    maxHeight: "0px",
    overflowY: "auto",
  });

  // 属性面板配置
  const propSections: PropSection[] = [
    { id: "item-1", title: "基本属性", component: <BaseProps /> },
    { id: "item-2", title: "尺寸", component: <SizeProps /> },
    { id: "item-3", title: "边框", component: <BorderProps /> },
    { id: "item-4", title: "位置", component: <PositionProps /> },
    { id: "item-5", title: "阴影与透明度", component: <ShadowProps /> },
    { id: "item-6", title: "事件功能", component: <EventProps /> },
  ];

  // 更新容器高度
  const updateContainerHeight = useCallback(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setContainerStyle({
        maxHeight: `${parentHeight}px`,
        overflowY: "auto",
      });
    }
  }, []);

  // 监听父容器高度变化
  useEffect(() => {
    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);

    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, [updateContainerHeight]);

  return (
    <div
      className="h-full"
      ref={parentRef}
    >
      <div
        style={containerStyle}
        className="overflow-x-hidden hiddenScrollbar"
      >
        <Accordion
          type="single"
          collapsible
        >
          {propSections.map(({ id, title, component }) => (
            <AccordionItem
              key={id}
              value={id}
            >
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{component}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default SetProps;
