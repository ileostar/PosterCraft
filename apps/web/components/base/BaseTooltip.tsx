import React from "react";

interface BaseTooltipsProps {
  children: React.ReactNode;
  tooltipText: string;
  position: "top" | "left" | "right" | "bottom";
}

const BaseTooltips: React.FC<BaseTooltipsProps> = ({ children, tooltipText, position }) => {
  const getTooltipPositionClasses = () => {
    switch (position) {
      case "top":
        return {
          tooltip: "absolute -top-2 -translate-y-full left-1/2 -translate-x-1/2",
          arrow: "absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2",
        };
      case "left":
        return {
          tooltip: "absolute top-1/2 -translate-y-1/2 -left-2 -translate-x-full",
          arrow: "absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2",
        };
      case "right":
        return {
          tooltip: "absolute top-1/2 -translate-y-1/2 -right-2 translate-x-full",
          arrow: "absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2",
        };
      case "bottom":
        return {
          tooltip: "absolute -bottom-2 translate-y-full left-1/2 -translate-x-1/2",
          arrow: "absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2",
        };
      default:
        return {
          tooltip: "",
          arrow: "",
        };
    }
  };

  const { tooltip, arrow } = getTooltipPositionClasses();

  return (
    <div className="group relative w-full h-full">
      {children}
      <div className={`bg-zinc-800 p-2 rounded-md group-hover:flex hidden z-50 ${tooltip}`}>
        <span className="text-zinc-400 whitespace-nowrap">{tooltipText}</span>
        <div className={`bg-inherit rotate-45 p-1 absolute ${arrow}`}></div>
      </div>
    </div>
  );
};

export default BaseTooltips;
