import React from 'react';
import { Router as BaseRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routerPath from '@/router/router-path';
import Home from '@/pages/Home';
import User from '@/pages/User';
import Login from '@/pages/Login';
import { Route as NeedLoginRoute } from './Route';
import NotFind from '@/pages/NotFind';
import Register from '@/pages/Register';

const Router: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <BaseRouter history={history}>
      <Switch>
        <Route path={routerPath.Login} exact component={Login} />
        <Route path={routerPath.Register} exact component={Register} />
        <NeedLoginRoute path={routerPath.Home} exact component={Home} />
        <NeedLoginRoute path={routerPath.User} exact component={User} />
        <Route component={NotFind} />
      </Switch>
    </BaseRouter>
  );
};

export default Router;
