"use client";

import ThreeModel from "@/components/base/BaseModel";
import { Loading } from "@/components/base/Loading";
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
        className="flex-1 md:items-center md:justify-center max-w-[500px] max-h-[500px] w-4/5 h-full hidden md:flex xl:min-w-[40vw] rounded-full overflow-hidden"
        ref={boxRef}
      >
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-full">
              <Loading />
            </div>
          }
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
        </Suspense>
      </div>
    </div>
  );
};

export default ModelContainer;