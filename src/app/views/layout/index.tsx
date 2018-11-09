import * as React from 'react'
import { Route } from 'react-router'
export { default as App } from './App'

export function RouteWithLayout({ layout, component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        React.createElement(layout, props, React.createElement(component, props))
      }
    />
  )
}
