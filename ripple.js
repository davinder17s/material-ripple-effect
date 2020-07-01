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
        rippleContainer.style.borderRadius = 'inherit';
        rippleContainer.style.left = 0;
        rippleContainer.style.right = 0;
        rippleContainer.style.top = 0;
        rippleContainer.style.bottom = 0;
        rippleContainer.style.width = '100%';
        rippleContainer.style.height = '100%';
        rippleContainer.className = 'ripple-container';
        rippleContainer.style.overflow = 'hidden';
        this.element.appendChild(rippleContainer);

        var maxLength = offsetInfo.width > offsetInfo.height ? offsetInfo.width : offsetInfo.height;
        var circleD = maxLength * 2;

        var ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = circleD + 'px';
        ripple.style.height = circleD + 'px';
        ripple.style.borderRadius = '9999px';
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
