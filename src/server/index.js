import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import Loadable from "react-loadable"
import { getBundles } from 'react-loadable/webpack'
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'
import stats from '../../dist/react-loadable.json';

const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data } // 服务端获取的数据
    let modules = ['react']; // Loadable 获取的组件 (写上需要手动加载的)
    const markup = renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Loadable.Capture>
    )

    // 导入js css bundles
    const bundles = getBundles(stats, modules);
    const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));
    const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));

    
    res.send(`
<!doctype html>
<html>
  <head>
    <title>SSR with RR</title>
    <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
    ${styles
      .map(style => {
        return `<link href="/${style.file}" rel="stylesheet"/>`;
      })
      .join('\n')}
  </head>

  <body>
    <div id="app">${markup}</div>
  </body>
  ${chunks
    .map(
      chunk => `<script src="/${chunk.file}"></script>`
    )
    .join('\n')}
</html>
`)
    // 测试 <script src="/bundle.js" defer></script>
  }).catch(next)
})

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`)
  })
})


/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/