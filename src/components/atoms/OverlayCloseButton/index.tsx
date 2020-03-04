import React from 'react';
import Icon from '../Icon';
import styled from 'styled-components';

type OverlayCloseButtonProps = {
  onClose: () => void;
};

// https://codepen.io/megsterDotNet/pen/dqugc
const OverlayCloseButton: React.FC<OverlayCloseButtonProps> = ({ onClose }) => {
  return (
    <StyledCloseDiv className="close">
      <Icon name="fa-times-circle" onClick={onClose} />
    </StyledCloseDiv>
  );
};

export default OverlayCloseButton;

// Styles

const StyledCloseDiv = styled.div`
  position: absolute;
  top: -13px;
  right: -13px;
  color: var(--primary-color);
  background: white;
  border-radius: 50%;
  cursor: pointer;
`;
