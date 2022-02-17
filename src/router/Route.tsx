import React from 'react';
import {
  Redirect, RouteProps, Route as ReactRouter,
} from 'react-router-dom';
import { getUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

export const Route: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  if (!Component) return null;

  return (
    <ReactRouter
      {...rest}
      render={(state) => {
        if (getUser()) {
          return (rest.path === routerPath.Login || rest.path === routerPath.Register) ? (
            <>
              <Redirect to={routerPath.Home} />
              <Home />
            </>
          ) : <Component {...state} />;
        }
        return (
          <ReactRouter>
            <Redirect to={routerPath.Login} />
            <Login />
          </ReactRouter>
        );
      }}
    />
  );
};
