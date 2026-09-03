const TRANSITION_END = "transitionend";
const IMMEDIATE_TRANSITION_REG = /0m?s(?:, )?/g;
function transition(el, baseClass, cb) {
  let ended;
  let pending;
  let ran = 0;
  let timer;
  const classList = el.classList;
  const initClass = "".concat(baseClass, "-init");
  let cancelFrame = nextFrame(function() {
    el.addEventListener(TRANSITION_END, listener, true);
    classList.add(baseClass);
    classList.remove(initClass);
    pending = getTransitionCount(el);
    const transitionTimeout = getLongestTransitionTime(el);
    cancelFrame = void 0;
    if (pending === 0 || transitionTimeout === 0) {
      complete();
    } else {
      timer = setTimeout(complete, transitionTimeout + 50);
    }
  });
  classList.add(initClass);
  return cancel;
  function cancel() {
    if (ended) {
      return;
    }
    ended = true;
    clearTimeout(timer);
    el.removeEventListener(TRANSITION_END, listener, true);
    if (cancelFrame) {
      cancelFrame();
      classList.remove(initClass);
    } else {
      classList.remove(baseClass);
    }
  }
  function listener() {
    if (++ran >= pending) {
      complete();
    }
  }
  function complete() {
    if (ended) {
      return;
    }
    ended = true;
    clearTimeout(timer);
    el.removeEventListener(TRANSITION_END, listener, true);
    classList.remove(baseClass);
    if (cb) {
      cb();
    }
  }
}
function getTransitionCount(el) {
  let count = window.getComputedStyle(el).transitionDuration.replace(IMMEDIATE_TRANSITION_REG, "") ? 1 : 0;
  let child = el.firstElementChild;
  while (child) {
    count += getTransitionCount(child);
    child = child.nextElementSibling;
  }
  return count;
}
function getLongestTransitionTime(el) {
  const computedStyle = window.getComputedStyle(el);
  const duration = getLongestTimeFromList(computedStyle.transitionDuration);
  const delay = getLongestTimeFromList(computedStyle.transitionDelay);
  let max = duration + delay;
  let child = el.firstElementChild;
  while (child) {
    max = Math.max(max, getLongestTransitionTime(child));
    child = child.nextElementSibling;
  }
  return max;
}
function getLongestTimeFromList(value) {
  return value.split(",").reduce((max, item) => {
    const trimmed = item.trim();
    const next = trimmed.endsWith("ms") ? Number.parseFloat(trimmed) : Number.parseFloat(trimmed) * 1e3;
    return Number.isFinite(next) ? Math.max(max, next) : max;
  }, 0);
}
function nextFrame(fn) {
  let frame;
  let cancelFrame;
  if (window.requestAnimationFrame) {
    frame = requestAnimationFrame(function() {
      frame = requestAnimationFrame(fn);
    });
    cancelFrame = cancelAnimationFrame;
  } else {
    frame = setTimeout(fn, 26);
    cancelFrame = clearTimeout;
  }
  return function() {
    if (frame) {
      cancelFrame(frame);
      frame = void 0;
    }
  };
}
export {
  transition as default
};
