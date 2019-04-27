const Dispatcher = require('../dispatcher.js')
const dispatcher = Dispatcher.default
const reducer = () => {}
const state = { test: 'data' }
const oldWarn = console.warn
const updateWarn = (test) => {
  if(test) console.warn = jest.fn()
  else console.warn = oldWarn
}

describe('Dispatcher', () => {
  
  beforeEach(() => dispatcher.destroy())
  
  describe('create', () => {
    beforeEach(() => dispatcher.destroy())
    
    it('should return a copy of the initial state', () => {
      const initState = dispatcher.create(reducer, state)
      expect(initState).not.toBe(state)
      expect(initState.test).toEqual(state.test)
      expect(Object.keys(initState).length).toBe(Object.keys(state).length)
    })

    it('should return undefined, and call console.warn when called more then once', () => {
      const firstState = dispatcher.create(reducer, state)
      updateWarn(true)
      const initState = dispatcher.create(reducer, state)
      expect(initState).toBe(undefined)
      expect(console.warn).toHaveBeenCalled()
      updateWarn()
    })

    it('should return undefined, and call console.warn if first param is not a function', () => {
      updateWarn(true)
      const initState = dispatcher.create(false, state)
      expect(initState).toBe(undefined)
      expect(console.warn).toHaveBeenCalled()
      updateWarn()
    })

    it('should return undefined, and call console.warn if second param is not a object', () => {
      updateWarn(true)
      const initState = dispatcher.create(reducer, false)
      expect(initState).toBe(undefined)
      expect(console.warn).toHaveBeenCalled()
      updateWarn()
    })

  })

  describe('destroy', () => {

    it('should remove all watcher from the WATCHER object', () => {
      dispatcher.watch('testWatch', () => {})
      const firstWatchers = dispatcher.getWatchers()
      expect(Object.keys(firstWatchers).length).toBe(1)
      dispatcher.destroy()
      const secondWatchers = dispatcher.getWatchers()
      expect(Object.keys(firstWatchers).length).toBe(0)
    })

    it('should call the destroy method of the passed in watcher', () => {
      const watcher = () => {}
      watcher.destroy = jest.fn(() => {})
      dispatcher.watch('testWatch', watcher)
      dispatcher.destroy()
      expect(watcher.destroy).toHaveBeenCalled()
    })

    it('should set the cached state and dispatch method to undefined', () => {
      const initState = dispatcher.create(reducer, state)
      expect(dispatcher.getState()).not.toBe(undefined)
      expect(dispatcher.getDispatch()).not.toBe(undefined)
      dispatcher.destroy()
      expect(dispatcher.getState()).toBe(undefined)
      expect(dispatcher.getDispatch()).toBe(undefined)
    })

  })

  describe('dispatch', () => {
    it('should ', () => {

    })
  })

  describe('forget', () => {
    it('should ', () => {

    })
  })

  describe('getWatchers', () => {
    it('should ', () => {

    })
  })

  describe('watch', () => {
    it('should ', () => {

    })
  })

  describe('update', () => {
    it('should ', () => {

    })
  })


})