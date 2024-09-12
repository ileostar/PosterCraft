import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);
  const thresholdRef = useRef(threshold);

  const onScroll = useCallback(() => {
    setScrolled(window.pageYOffset > thresholdRef.current);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    thresholdRef.current = threshold;
  }, [threshold]);

  return scrolled;
}
