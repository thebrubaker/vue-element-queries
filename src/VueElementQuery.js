export default class VueElementQuery {
  /**
   * Constructor for the class
   * @param  {VueComponent} component
   */
  constructor(ResizeSensor, element) {
    this.ResizeSensor = ResizeSensor;
    this.breakpoints = {
      'min-width': [],
      'max-width': [],
    };
    this.init(element);
  }

  /**
   * Initialize ElementQuery by crawling stylesheets for breakpoints,
   * setting a resize watcher on the element, and firing the initial resize
   * event.
   * @param  {HTMLElement}  element
   * @return {void}
   */
  init(element) {
    this.setBreakpoints(element);
    this.watchElement(element);
    this.setInitialResize(element);
  }

  /**
   * Fire the initial resize event
   * @param {HTMLElement} element
   */
  setInitialResize(element) {
    element.resizedAttached.call();
  }

  /**
   * Create a watcher on the element width
   * @param {HTMLElement} element
   * @return {void}
   */
  watchElement(element) {
    new this.ResizeSensor(element, () => {
      element.setAttribute('min-width', this.setMinWidth(element.clientWidth));
      element.setAttribute('max-width', this.setMaxWidth(element.clientWidth));
    });
  }

  /**
   * Crawl the document stylesheets and capture all breakpoints for
   * this element
   * @param {HTMLElement} element
   */
  setBreakpoints(element) {
    this.crawlStylesheets(document, rules => {
      this.readRules(rules, rule => {
        if (this.matchesScope(element, rule.selectorText)) {
          this.breakpoints[rule.selector].push(rule.value);
        }
      });
    });
  }

  /**
   * Determine if an element has a scoped stylesheet. This prevents
   * us from crawling stylesheet rules that aren't relevant.
   * @param  @param {HTMLElement} element
   * @param  {String} selectorText
   * @return {void}
   */
  matchesScope(element, selectorText) {
    let scope = this.getScopeTag(element);
    return selectorText.match(scope);
  }

  /**
   * Returns a regex to determine if an element is scoped
   * @param  @param {HTMLElement}  element
   * @param  {RegExp}  regex
   * @return {RegExp}
   */
  getScopeTag(element) {
    // grab the scope tag from the element, such as `v-12jn123n123`
    let scope = Object.keys(element.dataset).find(key => key.match(/v-/));
    if (!scope) {
      throw new Error({
        message:
          '[VueElementQuery] Vue element queries only work on scoped stylesheets. Did you forget to add `scoped` to your stylesheet?',
      });
    }
    return new RegExp(scope);
  }

  /**
   * Set the string for the min-width attribute that will be used for element
   * queries. Example result: "500px 600px 900px"
   * @param {Number} elementWidth
   */
  setMinWidth(elementWidth) {
    return this.breakpoints['min-width']
      .reduce((string, key) => {
        return elementWidth >= key ? string + key + 'px ' : string;
      }, '')
      .slice(0, -1);
  }

  /**
   * Set the string for the max-width attribute that will be used for element
   * queries. Example result: "500px 600px 900px"
   * @param {Number} elementWidth
   */
  setMaxWidth(elementWidth) {
    return this.breakpoints['max-width']
      .reduce((string, key) => {
        return elementWidth <= key ? string + key + 'px ' : string;
      }, '')
      .slice(0, -1);
  }

  /**
   * Crawl the document for stylesheets, and if valid for reading rules,
   * pass to a callback function with the rules as the first argument.
   * @param  {HTMLDocument}  document
   * @param  {Function}  callback
   * @return {void}
   */
  crawlStylesheets(document, callback) {
    for (var i = 0, j = document.styleSheets.length; i < j; i++) {
      this.ifValidRules(document.styleSheets[i], callback);
    }
  }

  /**
   * Determine if the rules are valid for crawling on a stylesheet.
   * @param  {CSSStyleSheet}  stylesheet
   * @param  {Function}  callback
   * @return {void}
   */
  ifValidRules(stylesheet, callback) {
    if (stylesheet.cssRules) {
      callback(stylesheet.cssRules);
    }
  }

  /**
   * Read from the list of rules and build a map
   * @param  {CSSRuleList}  rules
   * @return {[type]}
   */
  readRules(rules, callback) {
    this.crawlRules(rules, selectorText => {
      callback(selectorText);
    });
  }

  /**
   * Crawl rules and execute a callback if the rule has valid
   * selectorText.
   * @param  {CSSRuleList}  rules
   * @param  {Function}  callback
   * @return {void}
   */
  crawlRules(rules, callback) {
    for (var i = 0, j = rules.length; i < j; i++) {
      if (rules[i].selectorText)
        this.getValidSelector(rules[i].selectorText, callback);
    }
  }

  /**
   * Check for a valid selector
   * @param  {String}  selectorText
   * @param  {Function} callback
   * @return {void}
   */
  getValidSelector(selectorText, callback) {
    // List of valid selectors
    const matches = ['min-width', 'max-width'];
    // Check selector for a match, and if so execute the callback.
    matches.forEach(selector => {
      if (selectorText.indexOf(selector) !== -1) {
        let regex = new RegExp(`${selector}~="(.*)px"]`);
        const selectorTextMatches = selectorText.match(regex);
        // check if selectorText matches the regex
        if (selectorTextMatches && selectorTextMatches.length >= 2) {
          callback({
            selectorText,
            selector,
            value: selectorTextMatches[1],
          });
        }
      }
    });
  }
}
