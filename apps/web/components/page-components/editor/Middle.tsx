"use client";

import { UseElementStore } from "@/store/element";


function Middle(props: any) {

  const {Elements} = UseElementStore();


  return (
    <div className="bg-[#f0f2f5] w-3/5 flex justify-center items-center flex-col">
      <h3>海报区域</h3>
      <div className="bg-gray-700 mt-5" style={{width:'375px',height:'667px'}}>
        {Elements.map((item: any) => <div key={item.id} style={{...item.props}}>{item.text}</div>)}
      </div>
    </div>
  );
}

export default Middle;
