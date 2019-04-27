import dispatcher from './dispatcher'
const { create } = dispatcher

export default (reducer, initialState) => create(reducer, initialState)