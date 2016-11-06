import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { app } from './reducers'

// Add dev tools in development
const addDevTools = (
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
const composeEnhancers = addDevTools ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
: compose;

const loggerMiddleware = (store) => (next) => (action) => {
  console.log(action)
  next(action)
  console.log(store.getState())
}

export default () => {
  return createStore(
    app,
    {},
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
  )
}