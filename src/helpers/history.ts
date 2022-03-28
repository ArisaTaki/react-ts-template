import { History } from 'history';
import routerPath from '@/router/router-path';

const DELAY_TIME_DEFAULT = 100;

export const pushWithDelay = (
  history: History,
  to: string,
  state?: any,
  delay = DELAY_TIME_DEFAULT,
): void => {
  setTimeout(() => {
    history.push(to, state);
  }, delay);
};

export const replaceWithDelay = (
  history: History,
  to: string,
  state?: any,
  delay = DELAY_TIME_DEFAULT,
): void => {
  setTimeout(() => {
    history.replace(to, state);
  }, delay);
};

export const goWithDelay = (history: History, to: number, delay = DELAY_TIME_DEFAULT): void => {
  setTimeout(() => {
    history.go(to);
  }, delay);
};

export const moveToSystemError404Page = (history: History, replace?: boolean, delay?: number) => {
  if (history) {
    const navi = replace ? replaceWithDelay : pushWithDelay;
    navi(history, routerPath.NotFind, null, delay);
  }
};

export const moveToSystemError403Page = (history: History, replace?:boolean, delay?: number) => {
  if (history) {
    const navi = replace ? replaceWithDelay : pushWithDelay;
    navi(history, routerPath.NoAuth, null, delay);
  }
};
