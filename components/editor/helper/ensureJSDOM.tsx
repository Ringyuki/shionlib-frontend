let ready = false
export function ensureJSDOM() {
  if (ready || typeof window !== 'undefined') return
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { JSDOM } = require('jsdom')
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'https://localhost',
    pretendToBeVisual: true,
  })
  global.window = dom.window
  global.document = dom.window.document
  global.Node = dom.window.Node
  global.Element = dom.window.Element
  global.HTMLElement = dom.window.HTMLElement
  global.navigator = dom.window.navigator
  global.getComputedStyle = dom.window.getComputedStyle

  if (!('attachShadow' in global.HTMLElement.prototype)) {
    // @ts-expect-error ignore
    global.HTMLElement.prototype.attachShadow = function () {
      return null
    }
  }
  if (!('shadowRoot' in global.HTMLElement.prototype)) {
    Object.defineProperty(global.HTMLElement.prototype, 'shadowRoot', {
      get() {
        return null
      },
    })
  }

  ready = true
}
