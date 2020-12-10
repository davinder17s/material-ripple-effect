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
    const position = this.style.getPropertyValue('position')
    if (!['relative', 'absolute', 'fixed'].includes(position)) {
      this.element.style.position = 'relative'
    }
    const offset = this.element.getBoundingClientRect()

    const maxLength = offset.width > offset.height ? offset.width : offset.height
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    const circleD = maxLength * 2
    
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.zIndex = 99
    container.style.borderRadius = 'inherit'
    container.style.pointerEvents = 'none'
    container.style.left = '0px'
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
      executed: false,
      container: container,
      ripple: ripple,
      event () {
        if (this.timeout)
          clearTimeout(this.timeout)
          this.timeout = 0
          this.ripple.removeEventListener('animationend', this.event, { capture: false, once: true })
          this.container.remove()
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

export default RippleEffect
