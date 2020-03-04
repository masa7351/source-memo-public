import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../logics/reducers/rootReducer';
import PositiveButton from '../../atoms/PositiveButton';
import styled from 'styled-components';
import { Color, Radius } from '../../../styles';
import { useHistory } from 'react-router-dom';

const NavBar: React.FC = () => {
  const isAuthenticated = useSelector<RootState, boolean>(
    state => state.auth && state.auth.isAuthenticated
  );

  const history = useHistory();
  const logoutHandler = () => {
    // onSnapshotをunsubscribeするためにページ遷移してログアウト
    history.push('/logout');
  };

  return (
    <NavBarDiv id="navBar">
      <NavBarTitle>
        <StyledTitleIcon />
        <h1>
          <StyledTitleLink to="/dashboard">
            <span className="primaryText">Source</span> Memo
          </StyledTitleLink>
        </h1>
      </NavBarTitle>
      <StyledRightItems>
        {isAuthenticated ? (
          <Fragment>
            <li>
              <StyledLogoutButton onClick={logoutHandler}>
                Logout
              </StyledLogoutButton>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <StyledOuterLink href="https://qiita.com/masa7351">
                Qiita
              </StyledOuterLink>
            </li>
            <li>
              <StyledOuterLink href="https://tech-blog-masa7351.netlify.com/">
                Blog
              </StyledOuterLink>
            </li>
            <li>
              <StyledLink to="/login">Login</StyledLink>
            </li>
            {/* <li>
              <StyledLink to="createUser">Create User</StyledLink>
            </li> */}
          </Fragment>
        )}
      </StyledRightItems>
    </NavBarDiv>
  );
};

export default NavBar;

// Components

const TitleIcon: React.FC = () => <i className="fas fa-quidditch fa-2x" />;

// Styled

const NavBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background: #444;
  color: #fff;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const NavBarTitle = styled.div`
  display: flex;
`;

const StyledTitleIcon = styled(TitleIcon)`
  margin-right: 1rem;
`;

const StyledTitleLink = styled(Link)`
  text-decoration: none;
  color: #fff;

  padding: 0.75rem;
  margin: 0 0.25rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;

  padding: 0.75rem;
  margin: 0 0.25rem;

  &:hover {
    background: ${Color.LINK_HOVER};
    border-radius: ${Radius.DEFAULT};
  }
`;

const StyledOuterLink = styled.a`
  text-decoration: none;
  color: #fff;

  padding: 0.75rem;
  margin: 0 0.25rem;

  &:hover {
    background: ${Color.LINK_HOVER};
    border-radius: ${Radius.DEFAULT};
  }
`;

const StyledRightItems = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
`;

const StyledLogoutButton = styled(PositiveButton)`
  color: #fff;
  background: ${Color.PRIMARY};
  border: none;
  border-radius: ${Radius.DEFAULT};
  cursor: pointer;

  &:hover {
    background: ${Color.LINK_HOVER};
  }
`;
