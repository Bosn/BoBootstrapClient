import 'whatwg-fetch'
import '@babel/polyfill'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './app/state/store'
import { App } from './app/views/layout'

const render = (Component: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

render(App)