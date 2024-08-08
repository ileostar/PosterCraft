import { useEffect, useRef, useState } from "react";

function SetPage() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [childStyle, setChildStyle] = useState({});

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      setChildStyle({ maxHeight: `${parentHeight}px`, overflowY: "auto" });
    }
  }, []);

  return (
    <div
      className="h-full"
      ref={parentRef}
    >
      <div
        style={childStyle}
        className="overflow-x-hidden"
      ></div>
    </div>
  );
}

export default SetPage;
