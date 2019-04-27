import { createStore } from '../src/store'
import reducer from './empty_reducer'
// Get the initial state from the reducer
const initialState = reducer() || {}

// Initialize the store with the initialState, and reducer
const store = createStore(reducer, initialState)

export default store

