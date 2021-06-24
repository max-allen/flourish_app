import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { appMiddleware } from './middleware'
import { rootReducer } from './reducers'

const presistConfig = {
  key: 'root',
  storage
}


const initStore = preloadedState => {
  const middleware = [thunkMiddleware, ...appMiddleware]
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 30 })
  const composedEnhancers = composeEnhancers(applyMiddleware(...middleware))

  const persistedReducer = persistReducer(presistConfig, rootReducer)

  const store = createStore(persistedReducer, preloadedState, composedEnhancers)
  const persistor = persistStore(store)

  return { store, persistor }
}

export const { store, persistor } = initStore()
