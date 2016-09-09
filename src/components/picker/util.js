export const getElement = (str) => {
  return (typeof str === 'string') ? document.querySelector(str) : str
}

export const getComputedStyle = (el, key) => {
  var computedStyle = window.getComputedStyle(el)
  return computedStyle[key] || ''
}

// Easing Equations (c) 2003 Robert Penner, all rights reserved.
// Open source under the BSD License.
export const easeInOutCubic = (pos) => {
  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(pos, 3)
  }
  return 0.5 * (Math.pow((pos - 2), 3) + 2)
}

export const easeOutCubic = (pos) => {
  return (Math.pow((pos - 1), 3) + 1)
}
