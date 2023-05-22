export default function transition(type) {
  let t;
  let el = document.createElement('fakeelement');
  let transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  let animations = {
    animation: 'animationend',
    OAnimation: 'oanimationend',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };
  // this.$().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'

  if (type === 'animation') {
    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  } else {
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }
}
