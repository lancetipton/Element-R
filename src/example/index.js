document.addEventListener('DOMContentLoaded', () => {

  const elementR = window.elementR
  const { eR, elements } = elementR
  const { div, span, button, input, h2, p, b, style } = elements

  const header = div(
    { class:"container" },
    h2('Element-'),
    div(
      { class:"icon-wrapper" },
      div({ class:"r-icon" }, 'R')
    ),
    p('Simple and dynamic dom node creator')
  )

  const headerEl = document.getElementById('header')
  headerEl.appendChild(header)
  
  const rootEl = document.getElementById('element-r')
  const removeNodes = () => {
    rootEl.innerHTML = ''
    rootEl.appendChild(
      div(
        { class: 'dynamic-div', onClick: addNodes },
        button(
          { class: 'dynamic-span' },
          'Add content!'
        )
      )
    )
  }

  const addNodes = async () => {
    rootEl.innerHTML = ''
    rootEl.appendChild(
      div(
        { class: 'dynamic-div', onClick: removeNodes },
        style(`
          .dynamic-div {
            padding: 10px;
            background-color: #03a9f4;
          }
          .dynamic-div:hover {
            color: #FFFFFF;
            cursor: pointer;
          }
        `),
        span(
          { class: 'dynamic-span' },
          'Click me...',
          b('I am dynamic!')
        )
      )
    )
  }

  addNodes()

})
