import { ENDPOINTS } from '../../api'
import { generateApiActionTypes } from './generateApiActionTypes'

export const LOGIN_USER_ACTION_TYPES = generateApiActionTypes('LOGIN_USER')

export const loginUser = (email, password) => ({
  payload: {
    api: true,
    requestData: {
      endpoint: ENDPOINTS.auth,
      method: 'post',
      body: { email, password }
    },
    actionTypes: Object.keys(LOGIN_USER_ACTION_TYPES)
  }
})

