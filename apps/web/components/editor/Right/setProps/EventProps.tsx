import { useElementStore } from "@/stores/element";
import { useEffect, useState } from "react";

function EventProps() {
  const [clickURL, setClickURL] = useState<string>("");

  const { updateElement, currentElement, getElement } = useElementStore();

  const reset = () => {
    setClickURL("");
  };

  useEffect(() => {
    reset();
    const res = getElement(currentElement);
    const resUrl = res?.url;
    setClickURL(resUrl);
  }, [currentElement, getElement]);

  return (
    <div className="py-1 px-6 ">
      <div className="flex justify-between items-center my-4">
        <label
          htmlFor="fontSize"
          className="block mb-1 w-1/3"
        >
          点击跳转：
        </label>
        <input
          type="text"
          id="fontSize"
          value={clickURL}
          onChange={(e) => {
            setClickURL(e.target.value);
            updateElement(currentElement, undefined, undefined, e.target.value);
          }}
          placeholder="输入跳转URL"
          className="input input-bordered w-2/3"
        />
      </div>
    </div>
  );
}

export default EventProps;
