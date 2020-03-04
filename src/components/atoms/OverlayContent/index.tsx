import React from 'react';
import styled from 'styled-components';

const OverlayContent: React.FC = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};

export default OverlayContent;

// Styles

const StyledContent = styled.div`
  position: relative;
`;
