import config from '@app/../config'
import * as React from 'react'
import { Route } from 'react-router-dom'
import OldPageView from '@app/views/pages/common/OldPageLoaderView'
import Loadable from 'react-loadable'
import LoadingView from '@app/views/components/common/LoadingView'
import { Switch } from 'react-router'

const V = config.VERSION

export const LOGIN_PATH = `/${V}/smart/login`
export const HOME_PATH = `/${V}/smart/`

const HomeViewLoader = Loadable({
  loader: () => import('@app/views/pages/common/HomeView'),
  loading: LoadingView,
})

const LoginViewLoader = Loadable({
  loader: () => import('@app/views/pages/common/LoginView'),
  loading: LoadingView,
})

const CustomerListViewLoader = Loadable({
  loader: () => import('@app/views/pages/smart/customer/CustomerListView'),
  loading: LoadingView,
})

const ViewCustomerViewLoader = Loadable({
  loader: () => import('@app/views/pages/smart/customer/ViewCustomerView'),
  loading: LoadingView,
})

const EmployeeListViewLoader = Loadable({
  loader: () => import('@app/views/pages/smart/employee/EmployeeListView'),
  loading: LoadingView,
})

const ViewEmployeeViewLoader = Loadable({
  loader: () => import('@app/views/pages/smart/employee/ViewEmployeeView'),
  loading: LoadingView,
})

const SmartRoutes = () => (
  <Switch>
    <Route exact={true} path={HOME_PATH} component={HomeViewLoader} />
    <Route exact={true} path={LOGIN_PATH} component={LoginViewLoader} />

    <Route exact={true} path={`/${V}/smart/customer/list`} component={CustomerListViewLoader} />
    <Route path={`/${V}/smart/customer/view/:id`} component={ViewCustomerViewLoader} />

    <Route exact={true} path={`/${V}/smart/employee/list`} component={EmployeeListViewLoader} />
    <Route path={`/${V}/smart/employee/view/:id`} component={ViewEmployeeViewLoader} />

    <Route path={`/${V}/common/loadOldPage/:url`} component={OldPageView} />
  </Switch>
)

export default SmartRoutes
