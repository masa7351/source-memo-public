import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

/**
 * Redirect when an logged in user access.
 *
 * reference:
 * https://stackoverflow.com/questions/53104165/implement-react-router-privateroute-in-typescript-project
 */
interface PublicRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PublicRoute = (props: PublicRouteProps) => {
  const { component: Component, ...rest } = props;
  const isAuthenticated = useSelector<RootState, boolean>(
    state => state.auth.isAuthenticated
  );
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
