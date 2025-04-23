import useClickOutside from "@/hooks/useClickOutside";
import useKeyPress from "@/hooks/useKeyPress";
import { useElementStore } from "@/stores/element";
import { useCallback, useEffect, useRef, useState } from "react";

function InlineEdit({
  value,
  id,
}: Readonly<{
  value?: string;
  id: string;
}>) {
  const { updateElement } = useElementStore();

  const [innerValue, setInnerValue] = useState(value);
  const [isEdited, setIsEdited] = useState(false);
  const [isOutside, setIsOutside] = useState(false);

  const wrapper = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const isOutsideRef = useClickOutside(wrapper);

  // 使用 useCallback 记忆 getValidateCheck 函数
  const getValidateCheck = useCallback(() => {
    if (innerValue === undefined) {
      return false;
    }
    return innerValue.trim() !== "";
  }, [innerValue]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsEdited(true);
    inputRef.current?.focus();
  };

  useKeyPress("Enter", () => {
    if (!getValidateCheck()) {
      return;
    }
    if (isEdited) {
      setIsEdited(false);
      updateElement(id, undefined, undefined, undefined, undefined, undefined, innerValue);
    }
  });
  useKeyPress("Escape", () => {
    if (isEdited) {
      setIsEdited(false);
      setInnerValue(value);
    }
  });

  useEffect(() => {
    setIsOutside(isOutsideRef);
  }, [isOutsideRef]);

  useEffect(() => {
    if (!getValidateCheck()) {
      return;
    }
    if (isOutside && isEdited) {
      setIsEdited(false);
      updateElement(id, undefined, undefined, undefined, undefined, undefined, innerValue);
    }
    //  setIsOutside(false)
  }, [getValidateCheck, id, innerValue, isEdited, isOutside, updateElement]);

  return (
    <div
      ref={wrapper}
      onClick={(e) => handleClick(e)}
      className="m-2 w-3/6 flex align-items-center justify-content-center"
    >
      {isEdited ? (
        <input
          ref={inputRef}
          value={innerValue}
          placeholder="文本不能为空"
          className={`input input-bordered pl-2 text-sm w-full h-full border rounded-full ${getValidateCheck() ? "border-gray-500" : " border-red-500"}`}
          onChange={(e) => setInnerValue(e.target.value)}
        />
      ) : (
        <div className="text-sm text-center m-2">{innerValue}</div>
      )}
    </div>
  );
}

export default InlineEdit;
