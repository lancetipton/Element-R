const dispatcher = { create: jest.fn() }
jest.setMock('../dispatcher', dispatcher)

const Store = require('../store')
const store = Store.default

describe('Store', () => {
  it('should call the dispatcher.create method', () => {
    const reducer = ()=>{}
    const state = {}
    store(reducer, state)
    expect(dispatcher.create).toHaveBeenCalledWith(reducer, state)
  })
})