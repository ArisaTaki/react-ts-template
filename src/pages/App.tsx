// 在index.tsx里绑定了App.tsx的内容，在这里导入router的内容就可以将全部页面托管到整个项目上
import React from 'react';
import './App.scss';
import Router from '@/router/Router';

function App() {
  return <Router />;
}

export default App;
