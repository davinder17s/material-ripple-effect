import RippleEffect from './index'

if (!('RippleEffect' in window)) {
  Object.defineProperty(window, 'RippleEffect', {
    value: RippleEffect,
    configurable: false,
    writable: false
  })
}
