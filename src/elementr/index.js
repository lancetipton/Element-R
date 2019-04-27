const ATTR_EXCEPTIONS = [
  'role',
  'dataset',
  'd',
  'r',
  'cx',
  'cy',
  'width',
  'height',
  'viewBox',
  'fill',
]
const SVG_NAMESPACE = "http://www.w3.org/2000/svg"
const PROPS_TYPES = ['string', 'number', 'object']
const NO_EL_TYPES = ['string', 'number', 'boolean']

/**
 * Adds text to the passed in parent element
 * @param  { dom node } el - element to add text to
 * @param  { string } text - text to add to the element
 * @return { void }
 */
const appendText = (el, text) => (
  el && (text || text === false) &&
    el.appendChild(document.createTextNode(text))
)
  
/**
 * Loops the passed in array and adds them to the passed in el based on the type
 * @param  { dom node } el - dom node to add the array of children to
 * @param  { array } children - group of element or text to add to the passed in element
 * @return { void }
 */
const appendArray = (el, children) => (
  children
    .map((child) => (
      Array.isArray(child)
        ? appendArray(el, child)
        : child instanceof window.Element
          ? el.appendChild(child)
          : NO_EL_TYPES.includes(typeof child)
            ? appendText(el, child)
            : null
    ))
)

/**
 * Adds styles property to the element based on passed in styles object
 * @param  { dom node } el - dom node to add the styles to
 * @param  { object } styles - css styles in js in css format 
 * @return { void }
 */
const setStyles = (el, styles) => (
  !styles 
    ? el.removeAttribute(`styles`)
    : Object
      .keys(styles)
      .map(styleName => (
        styleName in el.style
          ? ( el.style[styleName] = styles[styleName] )
          : console.warn(
            `${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`
          )
      ))
)

/**
 * Adds data atrributes to the passed in element
 * @param  { dom node } el - dom node to add the styles to
 * @param  { object } dataAttrs - object of data attributes to add to the element
 * @return { void }
 */
const setDataAttributes = (el, dataAttrs) => (
  Object
    .keys(dataAttrs)
    .map((dataAttr) => {
      el.setAttribute(`data-${dataAttr}`, dataAttrs[dataAttr])
    })
)

/**
 * Maps passed in element properties to the passed in element
* @param  { dom node } el - dom node to add the properties to
 * @param  { object } props - properties to add to the element
 * @return { void }
 */
const mapProps = (el, props) => (
  Object
    .keys(props)
    .map(prop => {
      const value = props[prop]
      if(props[prop] === undefined || props[prop] === null) return

      if(prop === 'for') prop = 'htmlFor'
      if(prop === 'class') prop = 'className'

      if (!(prop in el) && !ATTR_EXCEPTIONS.includes(prop))
        return null

      switch(prop){
        case 'style':
          return setStyles(el, value)
        case 'dataset':
          return setDataAttributes(el, value)
        case 'className':
          return (el[prop] = value)
        default:
          return typeof value === `function` && prop.indexOf('on') === 0
            ? (el[prop] = value)
            : value && el.setAttribute(prop, value)
      }
    })
)

/**
 * Checks if the passed in type should be svg
 * @param  { string } type - to be checked
 * @return { boolean }
 */
const isSvg = type => ([`path`, `svg`, `circle`].includes(type))

/**
 * Checks the passed in props, and adds them to the element base on the passed in propType
  * @param  { dom node } el - dom node to add the properties to
 * @param  { any } props - data that should be added to the element
 * @param  { string } propsType - type of prop to make
 * @return {void}
 */
const makeProps = (el, props, propsType) => (
  propsType === `string` || propsType === `number`
    ? appendText(el, props)
    : Array.isArray(props)
      ? appendArray(el, props)
      : props instanceof window.Element
        ? el.appendChild(props)
        : mapProps(el, props)  
)

/**
 * Creates a dom node based on the type
 * @param  { string } type - type of dom node that should be created
 * @return { dom node } - created dom node
 */
const makeEl = type => (
  isSvg(type)
    ? document.createElementNS(SVG_NAMESPACE, type)
    : document.createElement(type)
)

export const domTree = (type, props, ...children) => {
  const el = makeEl(type)

  const propsType = typeof props
  PROPS_TYPES.includes(propsType) &&
    makeProps(el, props, propsType)

  children && 
    appendArray(el, children)

  return el
}
export const a = (...args) => domTree(`a`, ...args)
export const button = (...args) => domTree(`button`, ...args)
export const div = (...args) => domTree(`div`, ...args)
export const h1 = (...args) => domTree(`h1`, ...args)
export const h2 = (...args) => domTree(`h2`, ...args)
export const h3 = (...args) => domTree(`h3`, ...args)
export const h4 = (...args) => domTree(`h4`, ...args)
export const h5 = (...args) => domTree(`h5`, ...args)
export const h6 = (...args) => domTree(`h6`, ...args)
export const header = (...args) => domTree(`header`, ...args)
export const nav = (...args) => domTree(`nav`, ...args)
export const footer = (...args) => domTree(`footer`, ...args)
export const p = (...args) => domTree(`p`, ...args)
export const span = (...args) => domTree(`span`, ...args)
export const br = (...args) => domTree(`br`, ...args)
export const i = (...args) => domTree(`i`, ...args)
export const ol = (...args) => domTree(`ol`, ...args)
export const ul = (...args) => domTree(`ul`, ...args)
export const li = (...args) => domTree(`li`, ...args)
export const svg = (...args) => domTree('svg', ...args)
export const path = (...args) => domTree(`path`, ...args)
export const circle = (...args) => domTree(`circle`, ...args)
export const style = (...args) => domTree(`style`, ...args)

export default {
  domTree,
  a,
  button,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  nav,
  footer,
  p,
  span,
  br,
  i,
  ol,
  ul,
  li,
  svg,
  path,
  circle,
  style,
}