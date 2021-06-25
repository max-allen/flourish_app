import { ADD_PLAYLIST_ACTION_TYPES } from '../actions'

const {
  ADD_PLAYLIST_REQUEST,
  ADD_PLAYLIST_FAILURE,
  ADD_PLAYLIST_SUCCESS
} = ADD_PLAYLIST_ACTION_TYPES

const defaultState = {
  loading: null,
  results: null,
  addError: null
}

export const playlistsReducer = (state = defaultState, action) => {
  const { payload: { response = {} } = {}, type = '' } = action
  const { error = {} } = response

  switch (type) {
    case ADD_PLAYLIST_REQUEST: {
      return {
        ...state,
        loading: true,
        addError: defaultState.addError
      }
    }

    case ADD_PLAYLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        addError: error.message
      }
    }

    case ADD_PLAYLIST_SUCCESS: {
      const { playlist } = response

      return {
        ...state,
        loading: false,
        results: playlist,
        addError: defaultState.addError
      }
    }

    default:
      return state
  }
}
