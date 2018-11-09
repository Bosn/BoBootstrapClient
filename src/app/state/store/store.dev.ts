import { connectRouter, routerMiddleware } from 'connected-react-router'
import { applyMiddleware, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import RootReducer from '../rootReducer'
import rootSaga from '../rootSaga'
import history from './history'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()
const myRouterMiddleware = routerMiddleware(history)

const store = createStore(
  connectRouter(history)(RootReducer),
  composeWithDevTools(
    applyMiddleware(myRouterMiddleware, loggerMiddleware, apiMiddleware, sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)

export default store
