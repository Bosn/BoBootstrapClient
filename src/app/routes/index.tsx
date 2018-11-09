import history from '@app/state/store/history'
import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'
import SmartRoutes from './SmartRoutes'

const Routes = () => (
  <ConnectedRouter history={history}>
    <div>
      <SmartRoutes />
    </div>
  </ConnectedRouter>
)

export default Routes
