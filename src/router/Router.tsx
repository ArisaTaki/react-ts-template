import React from 'react';
import { Router as BaseRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routerPath from '@/router/router-path';
import Home from '@/pages/Home';
import User from '@/pages/User';

const Router: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <BaseRouter history={history}>
      <Switch location={history.location}>
        <Route path={routerPath.Home} exact component={Home} />
        <Route path={routerPath.User} exact component={User} />
      </Switch>
    </BaseRouter>
  );
};

export default Router;
