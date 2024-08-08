import useKeyPress from "@/hooks/useKeyPress";
import useClickOutside from "@/hooks/useClickOutside";
import { UseElementStore } from "@/store/element";
import { error } from "console";
import { useEffect, useRef, useState } from "react";

function InlineEdit({
  value,id
}: Readonly<{
  value?: string;
  id: string;
}>) {
  const { updateElement } = UseElementStore();

  const [innerValue, setInnerValue] = useState(value);
  const [isEdited, setIsEdited] = useState(false);
  const [isOutside, setIsOutside] = useState(false);

  const wrapper = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const isOutsideRef = useClickOutside(wrapper)

  // 创建一个函数来计算validateCheck，这个函数可以在渲染时调用
  const getValidateCheck = () => {
    if (innerValue === undefined) {
      return false;
    }
    return innerValue.trim() !== "";
  };

  const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsEdited(true);
    inputRef.current?.focus();
  }

  useKeyPress('Enter', () => {
    if (!getValidateCheck()) {
      return
    }
    if (isEdited) {
      setIsEdited(false);
      updateElement(id,undefined,undefined,undefined,undefined,undefined,innerValue);
    }
  })
  useKeyPress('Escape', () => {
    if (isEdited) {
        setIsEdited(false);
      setInnerValue(value);
    }
  })

  useEffect(()=>{
    setIsOutside(isOutsideRef)
},[isOutsideRef])  

useEffect(()=>{
    if (!getValidateCheck()) {
        return
      }
      if (isOutside && isEdited) {
        setIsEdited(false);
        updateElement(id,undefined,undefined,undefined,undefined,undefined,innerValue);
      }
    //  setIsOutside(false)
},[isOutside])

  return (
    <div
      ref={wrapper}
      onClick={(e)=>handleClick(e)}
      className="m-2 w-3/6"
    >
      {isEdited ? (
        <input
          ref={inputRef}
          value={innerValue}
          placeholder="文本不能为空"
          className={`pl-2 text-sm w-full h-full border rounded-full ${getValidateCheck() ? "border-gray-500" : " border-red-500"}`}
          onChange={(e) => setInnerValue(e.target.value)}
        />
      ) : (
        <div className="text-sm text-center m-1">{innerValue}</div>
      )}
    </div>
  );
}

export default InlineEdit;
