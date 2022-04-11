// 自己研究的hooks丢在hooks这个文件夹下
import { useEffect, useState, useCallback } from 'react';

const useSyncCallBack = (callback: (e?: any) => void) => {
  const [proxyState, setProxyState] = useState({ current: false });

  const Func = useCallback(() => {
    setProxyState({ current: true });
  }, [proxyState]);

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false });
  }, [proxyState]);

  useEffect(() => {
    if (proxyState.current) {
      callback();
    }
  });

  return Func;
};

export default useSyncCallBack;
