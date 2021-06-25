import { combineReducers } from 'redux'
import { podcastsReducer } from './podcasts'
import { usersReducer } from './users'

const rootReducer = combineReducers({
  podcasts: podcastsReducer,
  users: usersReducer
})

export { rootReducer }

