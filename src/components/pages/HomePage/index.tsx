import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Color, Radius } from '../../../styles';

const HomePage: React.FC = () => {
  return (
    <Fragment>
      <div className="container">
        <h1>Home Page</h1>
        <br />
        <StyledLink to="/dashboard">ダッシュボードに移動</StyledLink>
      </div>
    </Fragment>
  );
};

export default HomePage;

// Styled

const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background: ${Color.PRIMARY};
  border: none;
  border-radius: ${Radius.DEFAULT};
  padding: 0.5rem;
  text-decoration: none;
  cursor: pointer;
`;
