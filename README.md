# react ssr start
---

## develop scripts

 - `npm run dev`


## start script

- `webpack`

- `npm run start`

## 需求

- 增加服务端渲染 提高页面渲染速度，
- 按需加载 减少额外资源请求 ，
- 追求页面性能 lighthouse评分越高越好， 
- 按需配置PWA 增加缓存控制。
- 脚手架可升级。
- 可配置性强 ,  webpack配置文件外置
- 与业务代码完全分开，升级无冲突
- 参考的项目 github star >500  最近更新时间 < 1m

## 选型

### 路由：`react router`
> 服务端渲染配置 https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/server-rendering.md

### 按需加载 `react-loadable`
> 服务端渲染配置 https://github.com/jamiebuilds/react-loadable 

### 美化
- webpackbar   https://www.npmjs.com/package/webpackbar


### 开发模式方案

- browserSync nodeman
- webpack-dev-middleware
- webpack -w