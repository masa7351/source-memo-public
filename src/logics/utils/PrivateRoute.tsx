import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

/**
 * Redirect when an unlogged user access.
 *
 * reference:
 * https://stackoverflow.com/questions/53104165/implement-react-router-privateroute-in-typescript-project
 */
interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const isAuthenticated = useSelector<RootState, boolean>(
    state => state.auth.isAuthenticated
  );

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to root page
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
