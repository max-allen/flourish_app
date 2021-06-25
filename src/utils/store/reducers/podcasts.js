import { ADD_PODCAST_ACTION_TYPES } from '../actions'

const {
  ADD_PODCAST_REQUEST,
  ADD_PODCAST_FAILURE,
  ADD_PODCAST_SUCCESS
} = ADD_PODCAST_ACTION_TYPES

const defaultState = {
  loading: null,
  results: null,
  addError: null
}

export const podcastsReducer = (state = defaultState, action) => {
  const { payload: { response = {} } = {}, type = '' } = action
  const { error = {} } = response

  switch (type) {
    case ADD_PODCAST_REQUEST: {
      return {
        ...state,
        loading: true,
        addError: defaultState.addError
      }
    }

    case ADD_PODCAST_FAILURE: {
      return {
        ...state,
        loading: false,
        addError: error.message
      }
    }

    case ADD_PODCAST_SUCCESS: {
      const { podcast } = response

      return {
        ...state,
        loading: false,
        results: state.results ? [...state.results, podcast] : [podcast],
        addError: defaultState.addError
      }
    }

    default:
      return state
  }
}
