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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class RippleScope {
  constructor (scope) {
    this.container = null
    this.ripple = null
    this.scope = scope;
    this.evtStart = this.run.bind(this)
    this.evtClear = this.clear.bind(this)
    this.scope.addEventListener('click', this.evtStart, false);
  }

  run (event) {
    this.clear()
    let target = event.target
    if (!target || target.dataset.ripple === undefined) {
      target = event.currentTarget
    }
    if (!target || target.dataset.ripple === undefined) {
      target = this.scope
    }
    if (!target || target.dataset.ripple === undefined) {
      return
    }
    event.stopPropagation()
    const style = window.getComputedStyle(target)
    const position = style.getPropertyValue('position')
    if (!['relative', 'absolute', 'fixed'].includes(position)) {
      target.style.position = 'relative'
    }

    var offset = target.getBoundingClientRect()
    var maxLength = offset.width > offset.height ? offset.width : offset.height
    var circleD = maxLength * 2
    
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.container.style.zIndex = 99
    this.container.style.borderRadius = 'inherit'
    this.container.style.left = 0
    this.container.style.right = 0
    this.container.style.top = 0
    this.container.style.bottom = 0
    this.container.style.width = '100%'
    this.container.style.height = '100%'
    this.container.classList.add('ripple-container')
    this.container.style.overflow = 'hidden'

    this.ripple = document.createElement('div')
    this.ripple.style.position = 'absolute'
    this.ripple.style.width = circleD + 'px'
    this.ripple.style.height = circleD + 'px'
    this.ripple.style.borderRadius = '9999px'
    this.ripple.style.left = ((event.pageX - offset.left) - circleD/2) + 'px'
    this.ripple.style.top = ((event.pageY - offset.top) - circleD/2) + 'px'
    this.ripple.style.animation = 'ripple 2s forwards cubic-bezier(0, 0, 0.2, 1)'
    this.ripple.classList.add('ripple')
    this.ripple.addEventListener('animationend', this.evtClear, { capture: false, once: true })

    this.container.appendChild(this.ripple)
    target.appendChild(this.container)
  }

  clear () {
    if (this.container) {
      this.ripple.removeEventListener('animationend', this.evtClear, { capture: false, once: true })
      this.container.remove();
      this.container = null
      this.ripple = null
    }
  }
}

class RippleEffect {
  constructor (options) {
    let scopes
    switch (true) {
      case !options:
        scopes = [document.body]
        break
      case options instanceof HTMLElement:
        scopes = [options]
        break
      case options instanceof NodeList:
        scopes = Array.from(options)
        break
      case typeof options === 'string':
        const nodes = document.querySelectorAll(options)
        scopes = Array.from(nodes)
        break
      default:
        throw new Error('Invalid operation')
    }
    this.scopes = scopes.map(scope => new RippleScope(scope))
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RippleEffect);


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=ripple.js.map