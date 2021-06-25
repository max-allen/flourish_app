import {
  LOGIN_USER_ACTION_TYPES
} from '../actions'

const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS
} = LOGIN_USER_ACTION_TYPES

const defaultState = {
  loading: null,
  results: null,
  fetchError: null
}

export const usersReducer = (state = defaultState, action) => {
  const { payload: { response = {} } = {}, type = '' } = action
  const { error = {} } = response

  switch (type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loading: true,
        fetchError: defaultState.fetchError
      }
    }

    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        fetchError: error.message
      }
    }

    case LOGIN_USER_SUCCESS: {
      const { user } = response

      return {
        ...state,
        loading: false,
        results: user,
        fetchError: defaultState.fetchError
      }
    }

    default:
      return state
  }
}
