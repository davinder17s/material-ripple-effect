!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";n.r(t);class i{constructor(e,t){this.element=e,this.style=window.getComputedStyle(this.element),this.evtStart=this.run.bind(this),this.evtClear=this.clear.bind(this),this.element.addEventListener("click",this.evtStart,!1),this.run(t)}run(e){e.stopPropagation();const t=this.element.parentElement,n=this.style.getPropertyValue("position");["relative","absolute","fixed"].includes(n)||(this.element.style.position="relative");const i=this.element.getBoundingClientRect();let o,r;if("fixed"===n)o=i.top,r=i.left;else{const e=window.getComputedStyle(t).getPropertyValue("position");["relative","absolute","fixed"].includes(e)||(t.style.position="relative");const n=t.getBoundingClientRect();o=i.top-n.top,r=i.left-n.left}const s=i.width>i.height?i.width:i.height,l=document.documentElement.scrollTop||document.body.scrollTop,a=document.documentElement.scrollLeft||document.body.scrollLeft,c=2*s,d=document.createElement("div");d.style.position="absolute",d.style.zIndex=99,d.style.borderRadius=this.style.getPropertyValue("border-radius"),d.style.pointerEvents="none",d.style.left=r+"px",d.style.right=0,d.style.top=o+"px",d.style.bottom=0,d.style.width=i.width+"px",d.style.height=i.height+"px",d.classList.add("ripple-container"),d.style.overflow="hidden";const u=document.createElement("div");u.style.position="absolute",u.style.width=c+"px",u.style.height=c+"px",u.style.borderRadius="9999px",u.style.left=e.pageX-a-i.left-c/2+"px",u.style.top=e.pageY-l-i.top-c/2+"px",u.style.animation="ripple 2s forwards cubic-bezier(0, 0, 0.2, 1)",u.classList.add("ripple");const p={timeout:0,container:d,ripple:u,event(){window.setTimeout(this.timeout),this.container&&this.ripple.removeEventListener("animationend",this.event,{capture:!1,once:!0}),this.container.remove(),this.container=null,this.ripple=null}},h=p.event.bind(p);d.appendChild(u),t.appendChild(d),u.addEventListener("animationend",h,{capture:!1,once:!0}),p.timeout=setTimeout(h,2e3)}clear(e){e&&(e.removeEventListener("animationend",event,{capture:!1,once:!0}),e.remove())}}class o{constructor(e){this.scope=e,this.evtStart=this.run.bind(this),this.scope.addEventListener("click",this.evtStart,!1),this.targets=[],this.elements=[]}run(e){let t=e.target;if(t&&void 0!==t.dataset.ripple||(t=e.currentTarget),t&&void 0!==t.dataset.ripple||(t=this.scope),t&&void 0!==t.dataset.ripple&&!this.elements.includes(t)){const n=new i(t,e);this.targets.push(t),this.targets.push(n)}}}class r{constructor(e){let t;switch(!0){case!e:t=[document.body];break;case e instanceof HTMLElement:t=[e];break;case e instanceof NodeList:t=Array.from(e);break;case"string"==typeof e:const n=document.querySelectorAll(e);t=Array.from(n);break;default:throw new Error("Invalid operation")}this.scopes=t.map(e=>new o(e))}}r.create=function(e){return new r(e)};var s=r;"RippleEffect"in window||Object.defineProperty(window,"RippleEffect",{value:s,configurable:!1,writable:!1})}]);