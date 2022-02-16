import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { saveUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';

const Login: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          saveUser('123');
          history.push(routerPath.Home);
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
