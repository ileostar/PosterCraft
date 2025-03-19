import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useRef, useState } from "react";

import BaseProps from "./BaseProps";
import BorderProps from "./BorderProps";
import EventProps from "./EventProps";
import PositionProps from "./PositionProps";
import ShadowProps from "./ShadowProps";
import SizeProps from "./SizeProps";

import "@/styles/base/hiddenScroll.css";

function SetProps() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [childStyle, setChildStyle] = useState({});

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setChildStyle({ maxHeight: `${parentHeight}px`, overflowY: "auto" });
    }
  }, []);

  return (
    <div
      className="h-full "
      ref={parentRef}
    >
      <div
        style={childStyle}
        className="overflow-x-hidden hiddenScrollbar"
      >
        <Accordion
          type="single"
          collapsible
          className="text-black"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>基本属性</AccordionTrigger>
            <AccordionContent>
              <BaseProps />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>尺寸</AccordionTrigger>
            <AccordionContent>
              <SizeProps />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>边框</AccordionTrigger>
            <AccordionContent>
              <BorderProps />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>位置</AccordionTrigger>
            <AccordionContent>
              <PositionProps />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>阴影与透明度</AccordionTrigger>
            <AccordionContent>
              <ShadowProps />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>事件功能</AccordionTrigger>
            <AccordionContent>
              <EventProps />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default SetProps;
