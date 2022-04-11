/**
 * 1.既然都已经用了react了，那router相关配置无需多解释了。
 * 2.一般情况下使用BrowserHistory
 * 3.是否需要权限请务必自行书写路由组件进行响应拦截等操作:
 *   NeedLoginRoute：需要登录权限
 *   LoginPartRoute：专供登录使用，登录后不可再进入，除非退出登录
 * */

import React from 'react';
import {
  Router as BaseRouter, Switch, Route,
} from 'react-router-dom';
import routerPath from '@/router/router-path';
import NoAuth from '@/pages/NoAuth';
import history from '@/utils/getHistory';
import NotFind from '@/pages/NotFind';
import { NeedLoginRoute } from '@/router/NeedLoginRoute';
import { LoginPartRoute } from '@/router/LoginPartRoute';
import Home from '@/pages/Home';
import Login from '@/pages/Login';

const Router: React.FC = () => (
  <BaseRouter history={history}>
    <Switch>
      <NeedLoginRoute path={routerPath.Home} exact component={Home} />
      <LoginPartRoute path={routerPath.Login} exact component={Login} />
      <Route path={routerPath.NoAuth} exact component={NoAuth} />
      <Route path="*" exact component={NotFind} />
    </Switch>
  </BaseRouter>
);

export default Router;
