import React from 'react';
import { Result, Button } from 'antd';
import history from '@/utils/getHistory';
import routerPath from '@/router/router-path';

const NotFind: React.FC = () => (

  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={(
      <Button
        type="primary"
        onClick={() => {
          history.replace(routerPath.Home);
        }}
      >
        Back Home
      </Button>
)}
  />
);

export default NotFind;
