"use client";
import { useEffect, useRef, useState } from "react";
import "../../../style/3d.css"
import ThreeD from "../../model/MyModel"

function Index(props: any) {

  const boxRef = useRef<HTMLDivElement>(null); // 指定ref的类型为HTMLDivElement
  const [boxWidth, setBoxWidth] = useState<number | undefined>(undefined);
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);//dom是否已挂载

  useEffect(() => {  
    if (boxRef.current) {  
      const width = boxRef.current.offsetWidth;  
      const height = boxRef.current.offsetHeight;  
      setBoxWidth(width);
      setBoxHeight(height);
      // console.log(`Width: ${width}, Height: ${height}`);  
      setIsReady(true);
    }  
  }, []); // 空依赖数组表示这个effect只在组件挂载后运行  
  
  const RenderThreeD = () => {
    if (isReady) {
      return <ThreeD boxWidth={boxWidth} boxHeight={boxHeight}/>;
    }
    // 如果还没准备好，可以渲染一个加载指示器或其他占位符
    return <div>Loading...</div>;
  };

  return (
    <div className="flex items-center bg-base-200 h-full justify-center" style={{background: 'linear-gradient(to bottom, #11e8bb 0%, #8200c9 100%)'}}>
      <div className="flex flex-row  w-2/3 justify-around">  
        <div className="w-1/2">
          <h1 className="text-5xl font-bold ">可视化海报编辑器</h1>
          <p className="py-6  text-lg">
            欢迎来到我们的可视化海报编辑器网站！这里，创意与效率并肩，让设计触手可及。无需专业背景，只需简单拖拽，海量模板与素材任你挑选，轻松实现个性化海报创作。无论是商务宣传、活动邀请还是社交媒体分享，我们助你一站式搞定，让每一张海报都成为你的精彩名片！
          </p>
          <button className="btn bg-red-500 text-white hover:text-black">开始设计</button>
        </div>
        {/* <div className="bg-red-500 " style={{width:'650px',height:'450px'}}></div> */}
        <div className=" w-1/2 aspectRatio" ref={boxRef}>
        {RenderThreeD()}
        </div>
      </div>
    </div>
  );
}

export default Index;
