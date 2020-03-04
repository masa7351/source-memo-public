import React from 'react';
import styled from 'styled-components';

type InputEntranceProps = {
  text: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const InputEntrance: React.FC<InputEntranceProps> = ({ text, onClick }) => {
  return <StyledDiv onClick={onClick}>{text}</StyledDiv>;
};

export default InputEntrance;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  cursor: pointer;
  height: 5rem;
  margin-top: 1rem;
  border: 1px var(--border-color) dashed;
`;
