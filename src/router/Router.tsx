import React from 'react';
import {
  Redirect, Router as BaseRouter, Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routerPath from '@/router/router-path';
import Home from '@/pages/Home';
import User from '@/pages/User';
import Login from '@/pages/Login';
import { Route } from './Route';
import NotFind from '@/pages/NotFind';

const Router: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <BaseRouter history={history}>
      <Switch location={history.location}>
        <Route path={routerPath.Home} exact component={Home} />
        <Route path={routerPath.Login} component={Login} />
        <Route path={routerPath.User} component={User} />
        <Route path="*">
          <Redirect to={routerPath.NotFind} />
          <NotFind />
        </Route>
      </Switch>
    </BaseRouter>
  );
};

export default Router;
