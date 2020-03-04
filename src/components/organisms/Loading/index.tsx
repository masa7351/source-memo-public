import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useLoading } from './use';

const Loading = () => {
  const { isLoadingUser } = useLoading();
  if (isLoadingUser) {
    return (
      <StyledLoading>
        <StyledText>Loading...</StyledText>
      </StyledLoading>
    );
  } else {
    return <Fragment />;
  }
};

export default Loading;

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 10;
`;

const StyledText = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
`;
