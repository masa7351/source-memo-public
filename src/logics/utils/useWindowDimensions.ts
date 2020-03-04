import { useState, useEffect } from 'react';

// window size
// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
const useWindowDimensions = () => {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = () => {
    const width: number | null = hasWindow ? window.innerWidth : null;
    const height: number | null = hasWindow ? window.innerHeight : null;
    return {
      width,
      height
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
  };

  useEffect(
    () => {
      if (hasWindow) {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    },
    // eslint-disable-next-line
    [hasWindow]
  );

  return windowDimensions;
};

export default useWindowDimensions;
