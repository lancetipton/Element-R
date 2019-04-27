## Example Code
```js
  const { div, span, b, style } = window.elementR.elements
  document
    .getElementById('root-el')
    .appendChild(
      div(
        { class: 'dynamic-div', },
        span(
          { class: 'dynamic-span' },
          'Click me...',
          b('I am dynamic!')
        ),
        style(`
          .dynamic-div {
            padding: 10px;
            background-color: #03a9f4;
          }
          .dynamic-div:hover {
            color: #FFFFFF;
            cursor: pointer;
          }
        `)
      )
    )
```

## Install

  * Download the repo
    ```js
      // Clone repo
      git clone https://github.com/lancetipton/Element-R.git
      // Or Add to package.json
      "dependencies": {
        "elementR": "git+https://github.com/lancetipton/Element-R.git"
        ...
      },
    ```
  * Add to your code
    ```js
      // * Import into code
        import elementR from 'elementR'
        // Or only the methods you need
        import { eR, elements, constants, createStore, dispatcher } from 'elementR'

      // * Require code
        const elementR = require('elementR')
      
      // * Add as html script
        <script src='/path/to/elementR/build/elementR.min.js'></script>
        // elementR will be available on the window 
        <script>
          const elementR = window.elementR
        </script>
    ```

## Features
  * No Dependencies
  * Build dom elements similar to jsx
  * Super fast
  * Uses native dom api

## API
  * **elementR.eR** ( Function )
    * Example
      ```js
        elementR.eR('div', { ...attrs }, children)
      ```
    * Build any dom node using this method
    * Params
      * string || text || object - type of dom node to build
      * object - dom node properties 
        * Example - `{ className: 'my-div', id: 'super-div' }`
      * string || object - child dom nodes to build
      * Example
        ```js
          elementR.eR(
            'div',
            { class: 'my-div' },
            [
              p('I am a paragraph'),
              b('I am bold text')
            ]
          )
        ```