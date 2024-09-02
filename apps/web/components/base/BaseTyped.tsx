"use client";

import { ReactTyped } from "react-typed";

interface BaseTypedProps {
  strings?: string[];
}

const BaseTyped: React.FC<BaseTypedProps> = ({ strings }) => {
  return (
    <div className="h-20 lg:h-9 md:h-4 sm:h-8 mt-2 sm:mt-6">
      <ReactTyped
        className="text-sm xl:text-lg font-medium leading-8 text-gray-700 dark:text-white max-w-[553px]"
        strings={strings}
        typeSpeed={40}
        backSpeed={20}
        loop
      />
    </div>
  );
};

export default BaseTyped;
