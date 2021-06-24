import { keymirror } from '../../keymirror'

export const generateApiActionTypes = name => keymirror({
  [`${name}_REQUEST`]: null,
  [`${name}_SUCCESS`]: null,
  [`${name}_FAILURE`]: null
})
