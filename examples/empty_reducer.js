import { add, get } from './constants'
const constants = add([
  // add constants here
])
const initialState = {
  // set inital state here
}

const reducer = (state=initialState, ...action) => {
  const { type, ...payload } = action
  if(!type || !Object.keys(payload).length) return state
  
  switch(type){
    // add constants actions here
  }

  return state
}

export default reducer