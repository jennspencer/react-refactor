import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

const logger = createLogger({
  collapsed: true,
})

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
}
