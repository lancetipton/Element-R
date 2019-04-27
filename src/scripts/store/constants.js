let _CONSTANTS = {}
const arr2Obj = acts => (
  acts.reduce((actions, action) => (
    (actions[action.toUpperCase()] = action.toUpperCase()) && actions
  ), {})
)

const add = consts => {
  if(typeof consts !== 'object')
    console.warn(`add method requires an object or array as it's only param`)

  _CONSTANTS = Object.freeze({
    ..._CONSTANTS,
    ...(Array.isArray(consts) ? arr2Obj(consts) : consts)
  })
  
  return _CONSTANTS
}

const get = () => _CONSTANTS

export default {
  add,
  get
}