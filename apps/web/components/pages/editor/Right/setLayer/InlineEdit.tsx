"use client";

import useClickOutside from "@/hooks/useClickOutside";
import useKeyPress from "@/hooks/useKeyPress";
import { useEditorStore } from "@/stores/editor";
import { useCallback, useEffect, useRef, useState } from "react";

interface InlineEditProps {
  value?: string;
  id: string;
}

function InlineEdit({ value, id }: Readonly<InlineEditProps>) {
  const { updateComponent } = useEditorStore();
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOutside = useClickOutside(wrapperRef);

  const isValidValue = useCallback(() => {
    return editValue !== undefined && editValue.trim() !== "";
  }, [editValue]);

  const handleValueUpdate = useCallback(() => {
    if (!isValidValue()) return;
    updateComponent({
      key: "layerName",
      value: String(editValue),
      id,
      isRoot: true,
    });
    setIsEditing(false);
  }, [editValue]);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
    inputRef.current?.focus();
  };

  useKeyPress("Enter", () => {
    if (isEditing) handleValueUpdate();
  });

  useKeyPress("Escape", () => {
    if (isEditing) {
      setIsEditing(false);
      setEditValue(value);
    }
  });

  useEffect(() => {
    if (isOutside && isEditing) {
      handleValueUpdate();
    }
  }, [isOutside, isEditing, handleValueUpdate]);

  return (
    <div
      ref={wrapperRef}
      onClick={handleEdit}
      className="m-2 w-3/6 flex items-center justify-center"
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          placeholder="文本不能为空"
          className={`input input-bordered pl-2 text-sm w-full h-full rounded-full ${
            isValidValue() ? "border-gray-500" : "border-red-500"
          }`}
          onChange={(e) => setEditValue(e.target.value)}
        />
      ) : (
        <div className="text-sm text-center m-2">{editValue}</div>
      )}
    </div>
  );
}

export default InlineEdit;
