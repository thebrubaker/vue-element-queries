export default class ResponsiveComponent {
  /**
   * Constructor for the class
   * @param  {VueComponent} component
   */
  constructor (ResizeSensor, element, breakpoints) {
    this.ResizeSensor = ResizeSensor
    this.breakpoints = breakpoints
    this.init(element)
  }

  /**
   * Initialize ElementQuery by crawling stylesheets for breakpoints,
   * setting a resize watcher on the element, and firing the initial resize
   * event.
   * @param  {HTMLElement}  element
   * @return {void}
   */
  init (element) {
    // this.setBreakpoints(element)
    this.watchContainer(element)
    this.setInitialResize(element.parentElement)
  }

  /**
   * Fire the initial resize event
   * @param {HTMLElement} element
   */
  setInitialResize (element) {
    element.resizedAttached.call()
  }

  /**
   * Create a watcher on the element width
   * @param {HTMLElement} element
   * @return {void}
   */
  watchContainer (element) {
    new this.ResizeSensor(element.parentElement, () => {
      console.log('resized', element)
      this.setBreakpointStyles(element, this.breakpoints)
    })
  }

  /**
   * For each breakpoint, if the condition is met, set the given style
   * @param {HTMLElement} element
   * @param {Object} breakpoints
   */
  setBreakpointStyles (element, breakpoints) {
    Object.keys(breakpoints).forEach(width => {
      if (element.parentElement && element.parentElement.clientWidth > width) {
        this.setStyleForBreakpoint(element, breakpoints[width])
      }
    })
  }

  /**
   * For each style on the given breakpoint, set it on the element
   * @param {HTMLElement} element
   * @param {Object} breakpoint
   */
  setStyleForBreakpoint (element, breakpoint) {
    Object.keys(breakpoint).forEach(style => {
      element.style[style] = breakpoint[style]
    })
  }
}
