export const actionWith = (data = {}, action = {}) => {
  const finalAction = { ...action, ...data }
  delete finalAction[action.payload]
  return finalAction
}
