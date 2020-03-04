import React from 'react';
import styled from 'styled-components';

type OverlayProps = {
  zIndex?: 1 | 2 | 3 | 4 | 5 | 99;
  onClose: (element: HTMLElement) => void;
};

const Overlay: React.FC<OverlayProps> = ({ zIndex = 1, onClose, children }) => {
  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (onClose && event.target instanceof HTMLElement) {
      onClose(event.target);
    }
  };
  return (
    <OverlayDiv zIndex={zIndex} onClick={onClickHandler}>
      {children}
    </OverlayDiv>
  );
};

export default Overlay;

const OverlayDiv = styled.div`
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: ${props => props.zIndex};
  /* z-index: 1; */
  background: rgba(0, 0, 0, 0.5); /* TODO: const化したい */
  overflow-y: auto;
`;
