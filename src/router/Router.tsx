import React from 'react';
import {
  Router as BaseRouter, Switch, Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routerPath from '@/router/router-path';
import Equipment from '@/pages/Equipment';
import User from '@/pages/User';
import Login from '@/pages/Login';
import { NeedLoginRoute } from './NeedLoginRoute';
import NotFind from '@/pages/NotFind';
import { LoginPartRoute } from '@/router/LoginPartRoute';
import Question from '@/pages/Question';
import Home from '@/pages/Home';
import EquipmentAdd from '@/pages/EquipmentAdd';
import EquipmentEdit from '@/pages/EquipmentEdit';
import CameraList from '@/pages/CameraList';
import NoAuth from '@/pages/NoAuth';
import history from '@/utils/getHistory';

const Router: React.FC = () => (
  <BaseRouter history={history}>
    <Switch>
      <LoginPartRoute path={routerPath.Login} exact component={Login} />
      <NeedLoginRoute path={routerPath.Home} exact component={Home} />
      <NeedLoginRoute path={routerPath.User} exact component={User} />
      <NeedLoginRoute path={routerPath.Question} exact component={Question} />
      <NeedLoginRoute path={routerPath.Equipment} exact component={Equipment} />
      <NeedLoginRoute path={routerPath.EquipmentAdd} exact component={EquipmentAdd} />
      <NeedLoginRoute path={routerPath.EquipmentEdit} exact component={EquipmentEdit} />
      <NeedLoginRoute path={routerPath.CameraList} exact component={CameraList} />
      <Route path={routerPath.NoAuth} exact component={NoAuth} />
      <Route path="*" exact component={NotFind} />
    </Switch>
  </BaseRouter>
);

export default Router;
