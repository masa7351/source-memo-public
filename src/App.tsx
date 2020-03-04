import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from './logics/actions/authActions';
import PublicRoute from './logics/utils/PublicRoute';
import PrivateRoute from './logics/utils/PrivateRoute';
import NavBar from './components/organisms/NavBar';
// import CreateUserForm from './components/pages/CreateUserForm';
import LoginForm from './components/pages/LoginForm';
import DashBoard from './components/pages/Dashboard';
import Timeline from './components/pages/Timeline';
import Loading from './components/organisms/Loading';
import Logout from './components/pages/Logout';

const App: React.FC = () => {
  const dispatch = useDispatch();
  dispatch(getUser());

  return (
    <Fragment>
      <Route
        path="/(.*)"
        render={() => (
          <Fragment>
            <NavBar />
            <Loading />
            <Switch>
              {/* <PublicRoute path="/createUser" component={CreateUserForm} /> */}
              <Route exact path="/" component={Timeline} />
              <PublicRoute path="/login" component={LoginForm} />
              <PrivateRoute path="/dashboard" component={DashBoard} />
              <PrivateRoute path="/logout" component={Logout} />
            </Switch>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default App;
