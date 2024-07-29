import React, { useEffect, useRef, useState } from "react";

import "../../../../style/dropDownAnimate.css";

function SetProps() {
  const [isExpandedBase, setIsExpandedBase] = useState(false);
  const [isExpandedSize, setIsExpandedSize] = useState(false);
  const [isExpandedBorder, setIsExpandedBorder] = useState(false);
  const [isExpandedPosition, setIsExpandedPosition] = useState(false);
  const [isExpandedShadow, setIsExpandedShadow] = useState(false);
  const [isExpandedEvent, setIsExpandedEvent] = useState(false);
  
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [childStyle, setChildStyle] = useState({});

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setChildStyle({ maxHeight: `${parentHeight }px`, overflowY: 'auto' });
    }
  }, []); 

  const toggleDropDown = (type: string) => {
    if (type === "base") {
      setIsExpandedBase(!isExpandedBase);
    } else if (type === "size") {
      setIsExpandedSize(!isExpandedSize);
    } else if (type === "border") {
      setIsExpandedBorder(!isExpandedBorder);
    } else if (type === "position") {
      setIsExpandedPosition(!isExpandedPosition);
    } else if (type === "shadow") {
      setIsExpandedShadow(!isExpandedShadow);
    } else if (type === "event") {
      setIsExpandedEvent(!isExpandedEvent);
    }
  };


  return (
    <div className="h-full"  ref={parentRef}>
      <div style={childStyle}>
      <div>
        <div
          onClick={() => toggleDropDown("base")}
          className="pl-4 py-3 border border-1"
        >
          基本属性
        </div>
        <div className={` bg-white dropdown-content ${isExpandedBase ? "expanded-base" : ""}`}>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div
          onClick={() => toggleDropDown("size")}
          className="pl-4 py-3 border border-1"
        >
          尺寸
        </div>
        <div className={` bg-white dropdown-content ${isExpandedSize ? "expanded-size" : ""}`}>
          <div className="pt-2">
            <p>这里是基本属性的详细信息...</p>
            <p>这里是基本属性的详细信息...</p>
            <p>这里是基本属性的详细信息...</p>
            <p>这里是基本属性的详细信息...</p>
          </div>
        </div>
      </div>
      <div>
        <div
          onClick={() => toggleDropDown("border")}
          className="pl-4 py-3 border border-1"
        >
          边框
        </div>
        <div className={` bg-white dropdown-content ${isExpandedBorder ? "expanded-border" : ""}`}>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div
          onClick={() => toggleDropDown("position")}
          className="pl-4 py-3 border border-1"
        >
          位置
        </div>
        <div className={` bg-white dropdown-content ${isExpandedPosition ? "expanded-position" : ""}`}>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div
          onClick={() => toggleDropDown("shadow")}
          className="pl-4 py-3 border border-1"
        >
          阴影与透明度
        </div>
        <div className={` bg-white dropdown-content ${isExpandedShadow ? "expanded-shadow" : ""}`}>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div
          onClick={() => toggleDropDown("event")}
          className="pl-4 py-3 border border-1"
        >
          事件功能
        </div>
        <div className={` bg-white dropdown-content ${isExpandedEvent ? "expanded-event" : ""}`}>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SetProps;
