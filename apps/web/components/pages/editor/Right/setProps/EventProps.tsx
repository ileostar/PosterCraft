"use client";

import { useEditorStore } from "@/stores/editor";
import { useEffect, useState } from "react";

function EventProps() {
  const [clickURL, setClickURL] = useState<string>("");
  const { updateComponent, currentElement, getElement } = useEditorStore();

  useEffect(() => {
    const element = getElement(currentElement);
    setClickURL(element?.props?.url || "");
  }, [currentElement, getElement]);

  const handleURLChange = (url: string) => {
    setClickURL(url);
    updateComponent({
      key: "url",
      value: url,
      id: currentElement,
    });
  };

  return (
    <div className="py-1 px-6">
      <div className="flex justify-between items-center my-4">
        <label className="block mb-1 w-1/3">点击跳转：</label>
        <input
          type="text"
          value={clickURL}
          onChange={(e) => handleURLChange(e.target.value)}
          placeholder="输入跳转URL"
          className="input input-bordered w-2/3"
        />
      </div>
    </div>
  );
}

export default EventProps;
