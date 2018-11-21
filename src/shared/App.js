import React, { Component } from 'react'
import routes from './routes'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import NoMatch from './NoMatch'
import store from './store'
import { Provider } from 'mobx-react'
import { hot } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Provider Store={store}>
          <Switch>
            {routes.map(({ path, exact, component: Component, ...rest }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={props => <Component {...props} {...rest} />}
              />
            ))}
            <Route render={props => <NoMatch {...props} />} />
          </Switch>
        </Provider>
      </div>
    )
  }
}

export default hot(module)(App)
