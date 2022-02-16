import React from 'react';
import {
  Redirect, RouteProps, Route as ReactRouter,
} from 'react-router-dom';
import { getUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';
import Login from '@/pages/Login';
import Home from '@/pages/Home';

export const Route: React.FC<RouteProps> = (props) => {
  const { path } = props;
  if (!getUser()) {
    return (
      <ReactRouter>
        <Redirect to={routerPath.Login} />
        <Login />
      </ReactRouter>
    );
  }
  if (path === routerPath.Login) {
    return (
      <ReactRouter>
        <Redirect to={routerPath.Home} />
        <Home />
      </ReactRouter>
    );
  }
  return <ReactRouter {...props} />;
};
