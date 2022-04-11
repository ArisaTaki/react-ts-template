# 此项目使用的是
## React Hooks
为什么使用react hooks？
- 如果您是用过类组件的react前端，那你一定知道类组件是多么的重，并且代码量很大
- 使用函数组件，是从16.8之后官方也明确支持的写法，如果您觉得不能使用请立即关闭该仓库

> https://zh-hans.reactjs.org/docs/hooks-intro.html
## typescript
这是什么好东西就不需要多说了
为了减少尽可能多的bug，还请各位使用typescript
官方文档：
> https://www.tslang.cn/

## express
为什么前端会用到express？这可不是后端项目的专利，为了使前端的mock能够脱离传统，自定义性高，我们使用了express来作为前端mock的服务器，也可以调试请求

## 你能通过这个快速模板得到什么？
1. CRA脚手架黑盒创建项目，在config-overrides.js里可以自行覆盖掉配置，并且不会影响webpack自己的更新
2. react路由不自带路由拦截，在声明路由时使用Switch，内套我们自定义的组件就可以实现简单的拦截
3. 使用TS封装好了的axios请求方法，自由度高，可以自己加上一些AxiosConfig
4. 一些常用的抽象类方法比如compare.ts里的对象与数组深拷贝比较，history的页面跳转方法等等
5. 跨页面存储方法，pagesCrossMemory
6. 自由度极高的页面开发，只需要自己声明后续的类型，请求方法，页面就可以得到一个完整的项目。

## 后话
该项目遵循各个组件应该尽量抽象的原则，所有的方法和属性都应该有自己独立存在的地方
请按照代码所示的规范来coding吧，没关系，一次之后就能够获得一套对你好处多多的项目搭建规范。
