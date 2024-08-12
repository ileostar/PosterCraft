import { useEffect,useState } from 'react';

const useClickOutside = (elementRef: React.MutableRefObject<HTMLElement | null>) => {
  const [isClickOutside, setIsClickOutside] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.current?.contains(event.target as HTMLElement)) {
      setIsClickOutside(false);
    }
    else {
      setIsClickOutside(true);
    }
  };

  useEffect(() => {
    // 确保DOM元素已经挂载
    if (elementRef.current) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      // 清理函数
      document.removeEventListener('click', handleClickOutside);
    };
  }, [elementRef]); 

  return isClickOutside;
};

export default useClickOutside;