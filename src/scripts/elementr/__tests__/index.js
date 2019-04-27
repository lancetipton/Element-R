const elementR = require('../index.js')

describe('Element-R', () => {

  describe('eR', () => {

    it('should create a dom node element', () => {
      const div = elementR.eR('div')
      expect(div instanceof HTMLDivElement).toBe(true)
    })

    it('should add the correct props to the created node', () => {
      const div = elementR.eR('div', { className: 'test', id: 'test-id' })
      expect(div.className).toBe('test')
      expect(div.id).toBe('test-id')
    })

    it('should not add props that do not exist on the native dom node api', () => {
      const div = elementR.eR('div', { foo: 'bar' })
      expect(div.foo).toBe(undefined)
    })

    it('should handle `class and for` as dom node properties', () => {
      const div = elementR.eR('div', { class: 'my-class' })
      expect(div.className).toBe('my-class')
      const label = elementR.eR('label', { for: 'my-input' })
      expect(label.htmlFor).toBe('my-input')
    })

    it('should create a text child if a string is passed in as the second argument', () => {
      const div = elementR.eR('div', 'I should be the first child')
      expect(div.firstChild instanceof Text).toBe(true)
      expect(div.firstChild.textContent).toBe('I should be the first child')
    })

    it('should add all dom node arguments as children ', () => {
      const span = document.createElement('span')
      span.textContent = 'I am span text'
      const span2 = document.createElement('span')
      span2.textContent = 'I am span text number 2'
      
      const div = elementR.eR('div', span, span2)
      expect(div.firstChild).toBe(span)
      expect(div.firstChild.textContent).toBe('I am span text')
      expect(div.children[1]).toBe(span2)
      expect(div.children[1].textContent).toBe('I am span text number 2')
    })

    it('should handle svg elements', () => {
      const svg = elementR.eR('svg')
      expect(svg instanceof SVGSVGElement).toBe(true)
    })

  })
  
})