import { ENDPOINTS } from '../../api'
import { generateApiActionTypes } from './generateApiActionTypes'

export const ADD_PLAYLIST_ACTION_TYPES = generateApiActionTypes('ADD_PLAYLIST')

export const addPlaylist = (episodeId, userId) => ({
  payload: {
    api: true,
    requestData: {
      endpoint: ENDPOINTS.playlists,
      method: 'post',
      body: { userId, episodeId }
    },
    actionTypes: Object.keys(ADD_PLAYLIST_ACTION_TYPES)
  }
})
