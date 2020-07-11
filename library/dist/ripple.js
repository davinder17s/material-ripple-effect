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
class RippleElement {
  constructor (element, event) {
    this.element = element
    this.style = window.getComputedStyle(this.element)
    this.evtStart = this.run.bind(this)
    this.evtClear = this.clear.bind(this)
    this.element.addEventListener('click', this.evtStart, false);
    this.run(event)
  }

  run (event) {
    event.stopPropagation()

    // const parent = this.element.parentElement
    const position = this.style.getPropertyValue('position')
    if (!['relative', 'absolute', 'fixed'].includes(position)) {
      this.element.style.position = 'relative'
    }
    const offset = this.element.getBoundingClientRect()
    // let top, left
    // if (position === 'fixed') {
    //   top = offset.top
    //   left = offset.left
    // } else {
    //   const parentStyle = window.getComputedStyle(parent)
    //   const parentPosition = parentStyle.getPropertyValue('position')
    //   if (!['relative', 'absolute', 'fixed'].includes(parentPosition)) {
    //     parent.style.position = 'relative'
    //   }
    //   const parentOffset = parent.getBoundingClientRect()
    //   top = offset.top - parentOffset.top
    //   left = offset.left - parentOffset.left
    // }

    const maxLength = offset.width > offset.height ? offset.width : offset.height
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    const circleD = maxLength * 2
    
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.zIndex = 99
    // container.style.borderRadius = this.style.getPropertyValue('border-radius')
    container.style.borderRadius = 'inherit'
    container.style.pointerEvents = 'none'
    // container.style.left = left + 'px'
    container.style.left = '0px'
    // container.style.top = top + 'px'
    container.style.top = '0px'
    container.style.width = offset.width + 'px' 
    container.style.height = offset.height + 'px' 
    container.classList.add('ripple-container')
    container.style.overflow = 'hidden'

    const ripple = document.createElement('div')
    ripple.style.position = 'absolute'
    ripple.style.width = circleD + 'px'
    ripple.style.height = circleD + 'px'
    ripple.style.borderRadius = '9999px'
    ripple.style.left = ((event.pageX - scrollLeft - offset.left) - circleD/2) + 'px'
    ripple.style.top = ((event.pageY - scrollTop - offset.top) - circleD/2) + 'px'
    ripple.style.animation = 'ripple 2s forwards cubic-bezier(0, 0, 0.2, 1)'
    ripple.classList.add('ripple')

    const handler = {
      timeout: 0,
      container: container,
      ripple: ripple,
      event () {
        clearTimeout(this.timeout)
        if (this.container)
          this.ripple.removeEventListener('animationend', this.event, { capture: false, once: true })
          this.container.remove()
          this.container = null
          this.ripple = null
      } 
    }
    
    const onAnimationEnd = handler.event.bind(handler)
    container.appendChild(ripple)
    this.element.appendChild(container)
    ripple.addEventListener('animationend', onAnimationEnd, { capture: false, once: true })
    handler.timeout = setTimeout(onAnimationEnd, 3000)
  }

  clear (container) {
    if (container) {
      container.removeEventListener('animationend', event, { capture: false, once: true })
      container.remove();
    }
  }
}

class RippleScope {
  constructor (scope) {
    this.scope = scope;
    this.evtStart = this.run.bind(this)
    this.scope.addEventListener('click', this.evtStart, false);
    this.targets = []
    this.elements = []
  }

  run (event) {
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
    if (!this.elements.includes(target)) {
      const element = new RippleElement(target, event)
      this.targets.push(target)
      this.elements.push(element)
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

RippleEffect.create = function (options) {
  return new RippleEffect(options)
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