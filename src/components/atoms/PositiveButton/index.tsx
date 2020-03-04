import React from 'react';
import styled, { css } from 'styled-components';
import { Color } from '../../../styles';

type PositiveButtonProps = {
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const PositiveButton: React.FC<PositiveButtonProps> = ({
  children,
  disabled = false,
  className = '',
  onClick
}) => {
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <Button className={className} onClick={clickHandler} disabled={disabled}>
      {children}
    </Button>
  );
};

export default PositiveButton;

// Style

const Button = styled.button`
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background: ${Color.PRIMARY};
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  ${props => props.disabled && disabledCss}
`;

// https://qiita.com/NeGI1009/items/6199725a2000c081711b
const disabledCss = css`
  opacity: 0.5;
  cursor: default;
`;
