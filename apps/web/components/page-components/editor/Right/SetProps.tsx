 import React, { useRef, useState } from "react";
import "../../../../style/dropDownAnimate.css";

function SetProps() {
  const [isExpandedBase, setIsExpandedBase] = useState(false);
  const [isExpandedSize, setIsExpandedSize] = useState(false);
  const [isExpandedBorder, setIsExpandedBorder] = useState(false);
  const [isExpandedPosition, setIsExpandedPosition] = useState(false);
  const [isExpandedShadow, setIsExpandedShadow] = useState(false);
  const [isExpandedEvent, setIsExpandedEvent] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null); // 通常这个 ref 不需要用于此功能，但保留它以防将来需要

  const toggleDropDown = (type:string) => {
    if(type === '基本属性'){
      setIsExpandedBase(!isExpandedBase);
    }
    else if(type === '尺寸'){
      setIsExpandedSize(!isExpandedSize);
    }
    else if(type === '边框'){
      setIsExpandedBorder(!isExpandedBorder);
    }
    else if(type === '位置'){
      setIsExpandedPosition(!isExpandedPosition);
    }
    else if(type === '阴影与透明度'){
      setIsExpandedShadow(!isExpandedShadow);
    }
    else if(type === '事件功能'){
      setIsExpandedEvent(!isExpandedEvent);
    }
  };

  return (
    <div className="h-full">
      <div>
        <div onClick={()=>toggleDropDown('基本属性')} className="pl-4 py-3 border border-1">基本属性</div>
        <div
          className={` bg-white dropdown-content ${isExpandedBase ? 'expanded' : ''}`}
        >
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div onClick={()=>toggleDropDown('尺寸')} className="pl-4 py-3 border border-1">尺寸</div>
        <div
          className={` bg-white dropdown-content ${isExpandedSize ? 'expanded' : ''}`}
        >
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div onClick={()=>toggleDropDown('边框')} className="pl-4 py-3 border border-1">边框</div>
        <div
          className={` bg-white dropdown-content ${isExpandedBorder ? 'expanded' : ''}`}
        >
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div onClick={()=>toggleDropDown('位置')} className="pl-4 py-3 border border-1">位置</div>
        <div
          className={` bg-white dropdown-content ${isExpandedPosition ? 'expanded' : ''}`}
        >
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div onClick={()=>toggleDropDown('阴影与透明度')} className="pl-4 py-3 border border-1">阴影与透明度</div>
        <div
          className={` bg-white dropdown-content ${isExpandedShadow ? 'expanded' : ''}`}
        >
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
      <div>
        <div onClick={()=>toggleDropDown('事件功能')} className="pl-4 py-3 border border-1">事件功能</div>
        <div
          className={` bg-white dropdown-content ${isExpandedEvent ? 'expanded' : ''}`}
        >
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
          <p>这里是基本属性的详细信息...</p>
        </div>
      </div>
     
    </div>
  );
}

export default SetProps;