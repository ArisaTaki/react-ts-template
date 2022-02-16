import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { saveUser } from '@/utils/storageUtils';
import routerPath from '@/router/router-path';

const Login: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    console.log(history);
  });
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          saveUser('123');
          history.push(routerPath.Home);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
