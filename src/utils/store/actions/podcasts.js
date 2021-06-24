import { ENDPOINTS } from '../../api'
import { generateApiActionTypes } from './generateApiActionTypes'

export const GET_PODCASTS_ACTION_TYPES = generateApiActionTypes('GET_PODCASTS')

export const ADD_PODCAST_ACTION_TYPES = generateApiActionTypes('ADD_PODCAST')

export const getPodcasts = () => ({
  api: true,
  requestData: {
    endpoint: ENDPOINTS.podcasts
  }
})

export const addPodcast = (url, userId) => ({
  api: true,
  requestData: {
    endpoint: ENDPOINTS.podcasts,
    method: 'post',
    body: { url, userId }
  },
  actionTypes: Object.keys(ADD_PODCAST_ACTION_TYPES)
})

