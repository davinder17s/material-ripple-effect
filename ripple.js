/**
 *
 *
 */
function RippleEffect(element){
    this.element = element;
    this.element.addEventListener('click', this.run.bind(this), false);
}
RippleEffect.prototype = {
    run: function(event){
        var ripplerContainer = this.element.querySelector('.ripple-container');
        var offsetInfo = this.element.getBoundingClientRect();
        if(ripplerContainer) {
            ripplerContainer.remove();
        }
        var rippleContainer = document.createElement('div');
        rippleContainer.style.position = 'absolute';
        rippleContainer.style.zIndex = 99;
        rippleContainer.style.width = offsetInfo.width + 'px';
        rippleContainer.style.height = offsetInfo.height + 'px';
        rippleContainer.style.borderRadius = 'inherit';
        rippleContainer.className = 'ripple-container';
        rippleContainer.style.overflow = 'hidden';
        this.element.appendChild(rippleContainer);
        
         // fixed the bug
        var maxLength = offsetInfo.width > offsetInfo.height ? offsetInfo.width : offsetInfo.height;
        var circleD = maxLength * 2;

        var ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = circleD + 'px';
        ripple.style.height = circleD + 'px';
        ripple.style.borderRadius = '500px';
        ripple.style.left = ((event.pageX - offsetInfo.left) - circleD/2) + 'px';
        ripple.style.top = ((event.pageY - offsetInfo.top) - circleD/2) + 'px';
        ripple.style.animation = 'ripple 2s forwards cubic-bezier(0, 0, 0.2, 1)';
        ripple.className = 'ripple';
        rippleContainer.appendChild(ripple);
        ripple.addEventListener('animationend', function(){
            rippleContainer.remove();
        }.bind(this), false);
    }
};
