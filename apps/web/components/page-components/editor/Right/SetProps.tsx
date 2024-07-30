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
        <button
          onClick={() => toggleDropDown("base")}
          className="w-full py-3 border"
        >
          基本属性
        </button>
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
      <button
          onClick={() => toggleDropDown("size")}
          className="w-full py-3  border"
        >
          尺寸
        </button>
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
      <button
          onClick={() => toggleDropDown("border")}
          className="w-full py-3  border"
        >
          边框
        </button>
        <div className={` bg-white dropdown-content ${isExpandedBorder ? "expanded-border" : ""}`}>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
      <button
          onClick={() => toggleDropDown("position")}
          className="w-full py-3  border"
        >
          位置
        </button>
        <div className={` bg-white dropdown-content ${isExpandedPosition ? "expanded-position" : ""}`}>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
      <button
          onClick={() => toggleDropDown("shadow")}
          className="w-full py-3  border"
        >
          阴影与透明度
        </button>
        <div className={` bg-white dropdown-content ${isExpandedShadow ? "expanded-shadow" : ""}`}>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
      <button
          onClick={() => toggleDropDown("event")}
          className="w-full py-3 border "
        >
          事件功能
        </button>
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
