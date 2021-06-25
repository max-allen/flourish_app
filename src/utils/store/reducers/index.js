import { combineReducers } from 'redux'
import { podcastsReducer } from './podcasts'
import { playlistsReducer } from './playlists'
import { usersReducer } from './users'

const rootReducer = combineReducers({
  playlists: playlistsReducer,
  podcasts: podcastsReducer,
  users: usersReducer
})

export { rootReducer }

