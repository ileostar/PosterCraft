"use client";

import { Loading } from "@/components/Loading";
import ThreeModel from "@/components/Model";
import { Suspense, useEffect, useRef, useState } from "react";

const ModelContainer: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width?: number; height?: number }>({});

  useEffect(() => {
    const updateDimensions = () => {
      if (boxRef.current) {
        const { offsetWidth: width, offsetHeight: height } = boxRef.current;
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <div className="w-full h-full hidden sm:justify-center sm:items-center sm:flex">
      <div
        className="flex-1 md:items-center md:justify-center max-w-[400px] max-h-[540px] w-4/5 h-full hidden md:flex xl:min-w-[40vw] rounded-full overflow-hidden"
        ref={boxRef}
      >
        {dimensions.width && dimensions.height ? (
          <ThreeModel
            boxWidth={dimensions.width}
            boxHeight={dimensions.height}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelContainer;
