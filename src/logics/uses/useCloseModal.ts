import { useRef } from 'react';

// elementRefの外側の領域をタップしたときに、closeActionを実行
export const useCloseModal = (closeAction: () => void) => {
  const elementRef = useRef<HTMLElement>(null);
  const closeModal = (element: HTMLElement) => {
    // https://ichiki.netlify.com/blog/20191218_react_click_out/
    // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value
    // e.currentTargeでは正しく動作しない。
    if (elementRef.current && !elementRef.current.contains(element)) {
      closeAction();
    }
  };

  return { elementRef, closeModal };
};
