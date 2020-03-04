import React from 'react';
import styled from 'styled-components';
import PositiveButton from '../../atoms/PositiveButton';

type ConfirmModalProps = {
  message: string;
  elRef: React.RefObject<HTMLHtmlElement>;
  onClick: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  elRef,
  onClick
}) => {
  return (
    <DeleteConfirm ref={elRef}>
      <ConfirmMessage>{message}</ConfirmMessage>
      <PositiveButton onClick={onClick}>削除</PositiveButton>
    </DeleteConfirm>
  );
};

export default ConfirmModal;

const DeleteConfirm = styled.div`
  position: absolute;
  background: white;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  margin: -150px 0px 0px -150px; /* 幅と高さの半分のネガティブマージン */
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const ConfirmMessage = styled.div`
  margin: 2rem;
`;
