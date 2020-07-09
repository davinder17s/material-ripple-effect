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
    event.stopPropagation()
    this.clear()
    let target = event.target
    if (!target || !target.dataset.ripple === undefined) {
      target = event.currentTarget
    }
    if (!target || !target.dataset.ripple === undefined) {
      target = this.scope
    }
    if (!target || !target.dataset.ripple === undefined) {
      return
    }
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
        const nodes = document.querySelector(options)
        scopes = Array.from(nodes)
        break
      default:
        throw new Error('Invalid operation')
    }
    this.scopes = scopes.map(scope => new RippleScope(scope))
  }
}

export default RippleEffect
