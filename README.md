# react ssr start
---

## develop scripts

 - `npm run dev`  

    客户端渲染 启动在 http://localhost:3001/

    已支持hot reload 改动即时生效

 - `npm run build`

    服务端渲染 启动在 http://localhost:3000/

    待添加 hot reload  现在改动后需要刷新页面


## start script 部署脚本

    待整理

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

###  按需加载 `react-loadable`
> 服务端渲染配置 https://github.com/jamiebuilds/react-loadable 

### hot reload
- webpack-dev-server
- react-hot-loader 

  结合

### 美化
- webpackbar   https://www.npmjs.com/package/webpackbar

### 开发模式方案

- browserSync nodeman
- webpack-dev-middleware
- webpack -w