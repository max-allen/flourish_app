import { callApi } from '../../api'
import { actionWith } from './actionWith'

export const api = () => next => async action => {
  const { payload = {} } = action

  if (!payload.api) return next(action)

  const [requestType, successType, failureType] = payload.actionTypes

  next(actionWith({ type: requestType, payload }, action))

  const { requestData = {} } = payload

  try {
    const { data: response } = await callApi(requestData)
    const successPayload = {
      response,
      requestData
    }
    return next(actionWith({
      type: successType,
      payload: successPayload
    }, action))
  } catch (error) {
    const failurePayload = {
      response: { error: error.response && error.response.data },
      requestData,
      status: error.status
    }
    return next(actionWith({
      type: failureType,
      payload: failurePayload
    }, action))
  }
}
