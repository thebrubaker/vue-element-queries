module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "aYM4");
/******/ })
/************************************************************************/
/******/ ({

/***/ "KtZj":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
;
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {

    //Make sure it does not throw in a SSR (Server Side Rendering) situation
    if (typeof window === "undefined") {
        return null;
    }
    // Only used for the dirty checking, so the event callback count is limted to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (fn) {
            return window.setTimeout(fn, 20);
        };

    /**
     * Iterate over each of the provided element(s).
     *
     * @param {HTMLElement|HTMLElement[]} elements
     * @param {Function}                  callback
     */
    function forEachElement(elements, callback){
        var elementsType = Object.prototype.toString.call(elements);
        var isCollectionTyped = ('[object Array]' === elementsType
            || ('[object NodeList]' === elementsType)
            || ('[object HTMLCollection]' === elementsType)
            || ('[object Object]' === elementsType)
            || ('undefined' !== typeof jQuery && elements instanceof jQuery) //jquery
            || ('undefined' !== typeof Elements && elements instanceof Elements) //mootools
        );
        var i = 0, j = elements.length;
        if (isCollectionTyped) {
            for (; i < j; i++) {
                callback(elements[i]);
            }
        } else {
            callback(elements);
        }
    }

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function(element, callback) {
        /**
         *
         * @constructor
         */
        function EventQueue() {
            var q = [];
            this.add = function(ev) {
                q.push(ev);
            };

            var i, j;
            this.call = function() {
                for (i = 0, j = q.length; i < j; i++) {
                    q[i].call();
                }
            };

            this.remove = function(ev) {
                var newQueue = [];
                for(i = 0, j = q.length; i < j; i++) {
                    if(q[i] !== ev) newQueue.push(q[i]);
                }
                q = newQueue;
            }

            this.length = function() {
                return q.length;
            }
        }

        /**
         * @param {HTMLElement} element
         * @param {String}      prop
         * @returns {String|Number}
         */
        function getComputedStyle(element, prop) {
            if (element.currentStyle) {
                return element.currentStyle[prop];
            } else if (window.getComputedStyle) {
                return window.getComputedStyle(element, null).getPropertyValue(prop);
            } else {
                return element.style[prop];
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element.resizedAttached) {
                element.resizedAttached = new EventQueue();
                element.resizedAttached.add(resized);
            } else if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.className = 'resize-sensor';
            var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
            var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

            element.resizeSensor.style.cssText = style;
            element.resizeSensor.innerHTML =
                '<div class="resize-sensor-expand" style="' + style + '">' +
                    '<div style="' + styleChild + '"></div>' +
                '</div>' +
                '<div class="resize-sensor-shrink" style="' + style + '">' +
                    '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' +
                '</div>';
            element.appendChild(element.resizeSensor);

            if (getComputedStyle(element, 'position') == 'static') {
                element.style.position = 'relative';
            }

            var expand = element.resizeSensor.childNodes[0];
            var expandChild = expand.childNodes[0];
            var shrink = element.resizeSensor.childNodes[1];
            var dirty, rafId, newWidth, newHeight;
            var lastWidth = element.offsetWidth;
            var lastHeight = element.offsetHeight;

            var reset = function() {
                expandChild.style.width = '100000px';
                expandChild.style.height = '100000px';

                expand.scrollLeft = 100000;
                expand.scrollTop = 100000;

                shrink.scrollLeft = 100000;
                shrink.scrollTop = 100000;
            };

            reset();

            var onResized = function() {
                rafId = 0;

                if (!dirty) return;

                lastWidth = newWidth;
                lastHeight = newHeight;

                if (element.resizedAttached) {
                    element.resizedAttached.call();
                }
            };

            var onScroll = function() {
                newWidth = element.offsetWidth;
                newHeight = element.offsetHeight;
                dirty = newWidth != lastWidth || newHeight != lastHeight;

                if (dirty && !rafId) {
                    rafId = requestAnimationFrame(onResized);
                }

                reset();
            };

            var addEvent = function(el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);
        }

        forEachElement(element, function(elem){
            attachResizeEvent(elem, callback);
        });

        this.detach = function(ev) {
            ResizeSensor.detach(element, ev);
        };
    };

    ResizeSensor.detach = function(element, ev) {
        forEachElement(element, function(elem){
            if(elem.resizedAttached && typeof ev == "function"){
                elem.resizedAttached.remove(ev);
                if(elem.resizedAttached.length()) return;
            }
            if (elem.resizeSensor) {
                if (elem.contains(elem.resizeSensor)) {
                    elem.removeChild(elem.resizeSensor);
                }
                delete elem.resizeSensor;
                delete elem.resizedAttached;
            }
        });
    };

    return ResizeSensor;

}));


/***/ }),

/***/ "aYM4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /Users/mattchaffe/.nvm/versions/node/v9.8.0/lib/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("fR5a");

// CONCATENATED MODULE: ./VueElementQuery.js
class VueElementQuery {
  /**
   * Constructor for the class
   * @param  {VueComponent} component
   */
  constructor (ResizeSensor, element) {
    this.ResizeSensor = ResizeSensor
    this.breakpoints = {
      'min-width': [],
      'max-width': []
    }
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
    this.setBreakpoints(element)
    this.watchElement(element)
    this.setInitialResize(element)
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
  watchElement (element) {
    new this.ResizeSensor(element, () => {
      element.setAttribute('min-width', this.setMinWidth(element.clientWidth))
      element.setAttribute('max-width', this.setMaxWidth(element.clientWidth))
    })
  }

  /**
   * Crawl the document stylesheets and capture all breakpoints for
   * this element
   * @param {HTMLElement} element
   */
  setBreakpoints (element) {
    this.crawlStylesheets(document, rules => {
      this.readRules(rules, rule => {
        if (this.matchesScope(element, rule.selectorText)) {
          this.breakpoints[rule.selector].push(rule.value)
        }
      })
    })
  }

  /**
   * Determine if an element has a scoped stylesheet. This prevents
   * us from crawling stylesheet rules that aren't relevant.
   * @param  @param {HTMLElement} element
   * @param  {String} selectorText
   * @return {void}
   */
  matchesScope (element, selectorText) {
    let scope = this.getScopeTag(element)
    return selectorText.match(scope)
  }

  /**
   * Returns a regex to determine if an element is scoped
   * @param  @param {HTMLElement}  element
   * @param  {RegExp}  regex
   * @return {RegExp}
   */
  getScopeTag (element) {
    // grab the scope tag from the element, such as `v-12jn123n123`
    let scope = Object.keys(element.dataset).find(key => key.match(/v-/))
    if (!scope) {
      console.error('[VueElementQuery] Vue element queries only work on scoped stylesheets. Did you forget to add `scoped` to your stylesheet?', element)
      return null
    }
    return new RegExp(scope)
  }

  /**
   * Set the string for the min-width attribute that will be used for element
   * queries. Example result: "500px 600px 900px"
   * @param {Number} elementWidth
   */
  setMinWidth (elementWidth) {
    return this.breakpoints['min-width'].reduce((string, key) => {
      return elementWidth >= key ? string + key + 'px ' : string
    }, '').slice(0, -1)
  }

  /**
   * Set the string for the max-width attribute that will be used for element
   * queries. Example result: "500px 600px 900px"
   * @param {Number} elementWidth
   */
  setMaxWidth (elementWidth) {
    return this.breakpoints['max-width'].reduce((string, key) => {
      return elementWidth <= key ? string + key + 'px ' : string
    }, '').slice(0, -1)
  }

  /**
   * Crawl the document for stylesheets, and if valid for reading rules,
   * pass to a callback function with the rules as the first argument.
   * @param  {HTMLDocument}  document
   * @param  {Function}  callback
   * @return {void}
   */
  crawlStylesheets (document, callback) {
    for (var i = 0, j = document.styleSheets.length; i < j; i++) {
      this.ifValidRules(document.styleSheets[i], callback)
    }
  }

  /**
   * Determine if the rules are valid for crawling on a stylesheet.
   * @param  {CSSStyleSheet}  stylesheet
   * @param  {Function}  callback
   * @return {void}
   */
  ifValidRules (stylesheet, callback) {
    if (stylesheet.href === null && stylesheet.cssRules) {
      callback(stylesheet.cssRules)
    }
  }

  /**
   * Read from the list of rules and build a map
   * @param  {CSSRuleList}  rules
   * @return {[type]}
   */
  readRules (rules, callback) {
    this.crawlRules(rules, selectorText => {
      callback(selectorText)
    })
  }

  /**
   * Crawl rules and execute a callback if the rule has valid
   * selectorText.
   * @param  {CSSRuleList}  rules
   * @param  {Function}  callback
   * @return {void}
   */
  crawlRules (rules, callback) {
    for (var i = 0, j = rules.length; i < j; i++) {
      if (rules[i].selectorText) this.getValidSelector(rules[i].selectorText, callback)
    }
  }

  /**
   * Check for a valid selector
   * @param  {String}  selectorText
   * @param  {Function} callback
   * @return {void}
   */
  getValidSelector (selectorText, callback) {
    // List of valid selectors
    const matches = ['min-width', 'max-width']
    // Check selector for a match, and if so execute the callback.
    matches.forEach(selector => {
      if (selectorText.indexOf(selector) !== -1) {
        let regex = new RegExp(`${selector}~="(.*)px"]`)
        callback({
          selectorText,
          selector,
          value: selectorText.match(regex)[1]
        })
      }
    })
  }
}

// EXTERNAL MODULE: ./node_modules/css-element-queries/src/ResizeSensor.js
var ResizeSensor = __webpack_require__("KtZj");
var ResizeSensor_default = /*#__PURE__*/__webpack_require__.n(ResizeSensor);

// CONCATENATED MODULE: ./Plugin.js



/* harmony default export */ var Plugin = ({
  install (Vue, options) {
    Vue.directive('query', {
      inserted (element) {
        new VueElementQuery(ResizeSensor_default.a, element)
      },
      unbind (element) {
        ResizeSensor_default.a.detach(element)
      }
    })
  }
});

// CONCATENATED MODULE: /Users/mattchaffe/.nvm/versions/node/v9.8.0/lib/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (Plugin);



/***/ }),

/***/ "fR5a":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  let i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ })

/******/ });
//# sourceMappingURL=vue-element-queries.common.js.map