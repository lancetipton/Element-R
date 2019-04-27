let _CONSTANTS = {}
const arr2Obj = acts => (
  acts.reduce((actions, action) => (
    (actions[action.toUpperCase()] = action.toUpperCase()) && actions
  ), {})
)

const add = actions => {
  if(typeof actions !== 'object')
    console.warn(`add method requires an object or array as it's only param`)

  _CONSTANTS = Object.freeze({
    ..._CONSTANTS,
    ...(Array.isArray(actions) ? arr2Obj(actions) : actions)
  })
  
  return _CONSTANTS
}

const get = () => _CONSTANTS

const constants = {
  add,
  get
}