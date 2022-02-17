import React from 'react';
import {
  Redirect, RouteProps, Route as ReactRouter,
} from 'react-router-dom';
import { getUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';
import Login from '@/pages/Login';

export const NeedLoginRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  if (!Component) return null;

  return (
    <ReactRouter
      {...rest}
      render={() => {
        if (!getUser()) {
          return (
            <ReactRouter>
              <Redirect to={routerPath.Login} />
              <Login />
            </ReactRouter>
          );
        }
        return <ReactRouter {...props} />;
      }}
    />
  );
};
