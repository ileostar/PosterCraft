import { useEffect, useState } from "react";

export function useGetScreenRatio() {
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    setRatio(window.devicePixelRatio);
  }, []);
  return ratio;
}

export default useGetScreenRatio;
