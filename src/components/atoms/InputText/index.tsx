import React from 'react';
import styled from 'styled-components';

import { Color } from '../../../styles';

type InputTextGroupProps = {
  id: string;
  className?: string;
  type: 'text' | 'email' | 'password';
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputTextGroup: React.FC<InputTextGroupProps> = ({
  id,
  className,
  type,
  title,
  value,
  onChange
}) => {
  return (
    <GroupDiv className={className}>
      <StyledLabel htmlFor={id}>{title}</StyledLabel>
      <InputField type={type} id={id} value={value} onChange={onChange} />
    </GroupDiv>
  );
};

export default InputTextGroup;

const GroupDiv = styled.div`
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px ${Color.INPUT_BORDER} solid;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;
