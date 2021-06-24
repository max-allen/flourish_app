import { combineReducers } from 'redux'
import { podcastsReducer } from './podcasts'

const rootReducer = combineReducers({
  podcasts: podcastsReducer
})

export { rootReducer }

