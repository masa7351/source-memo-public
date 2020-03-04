import React from 'react';
import styled from 'styled-components';

type InputTextAreaProps = {
  id: string;
  value: string;
  rows: number;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const InputTextArea: React.FC<InputTextAreaProps> = ({
  id,
  value,
  rows,
  title,
  onChange
}) => {
  return (
    <StyledDiv>
      <StyledLabel htmlFor={id}>{title}</StyledLabel>
      <StyledTextArea
        name="content"
        rows={rows}
        id={id}
        value={value}
        onChange={onChange}
      ></StyledTextArea>
    </StyledDiv>
  );
};

export default InputTextArea;

const StyledDiv = styled.div`
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const StyledTextArea = styled.textarea`
  resize: vertical;
  font-size: 1rem;
  width: 100%;
  padding: 1rem;
  border: 1px var(--input-border-color) solid;
`;
