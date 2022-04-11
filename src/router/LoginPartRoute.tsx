import React from 'react';
import {
  Redirect, RouteProps, Route as ReactRouter,
} from 'react-router-dom';
import { getUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';
import Home from '@/pages/Home';

export const LoginPartRoute: React.FC<RouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  if (!Component) return null;

  return (
    <ReactRouter
      {...rest}
      render={() => {
        if (getUser()) {
          return (
            <>
              <Redirect to={routerPath.Home} />
              <Home />
            </>
          );
        }
        return (
          <ReactRouter {...props} />
        );
      }}
    />
  );
};
