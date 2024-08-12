import { useEffect } from "react";

const useKeyPress = (key: string, cb: () => any) => {
   
  useEffect(() => {
    const trigger = (event: KeyboardEvent) => {
        if (event.key === key) {
          cb();
        }
      };
    document.addEventListener("keydown", trigger);
    return () => {
      document.removeEventListener("keydown", trigger);
    };
  }, [cb, key]);
};

export default useKeyPress;
