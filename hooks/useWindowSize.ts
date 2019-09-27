import { useEffect, useState } from 'react';

export interface Size {
  width: number;
  height: number;
}

const useWindowSize = (): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const isClient = typeof window === 'object';

  function handleResize(): void {
    setSize({
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export default useWindowSize;
