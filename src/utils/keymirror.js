export const keymirror = obj => Object.keys(obj).reduce((acc, key) => {
  acc[key] = key
  return acc
}, {})
