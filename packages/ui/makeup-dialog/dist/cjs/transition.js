"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;
/**
 * Author: Mr D.Piercey
 */
const TRANSITION_END = "transitionend";
const IMMEDIATE_TRANSITION_REG = /0m?s(?:, )?/g;
/**
 * Applies a primer `-init` class before starting a transition
 * to make transitioning properties that are not animatable easier.
 *
 * **Order**
 * 1. Add class: "$name-init"
 * 2. Wait one frame.
 * 3. Remove class "$name-init".
 * 4. Add class "$name".
 * 5. Wait for animation to finish.
 * 6. Remove class "$name".
 *
 * @param {HTMLElement} el The root element that contains the animation.
 * @param {string} name The base className to use for the transition.
 * @param {Function} cb A callback called after the transition as ended.
 */

function transition(el, baseClass, cb) {
  let ended;
  let pending;
  let ran = 0;
  let timer;
  const classList = el.classList;
  const initClass = "".concat(baseClass, "-init");
  let cancelFrame = nextFrame(function () {
    el.addEventListener(TRANSITION_END, listener, true);
    classList.add(baseClass);
    classList.remove(initClass);
    pending = getTransitionCount(el);
    const transitionTimeout = getLongestTransitionTime(el);
    cancelFrame = undefined;
    if (pending === 0 || transitionTimeout === 0) {
      complete();
    } else {
      timer = setTimeout(complete, transitionTimeout + 50);
    }
  });
  classList.add(initClass);
  return cancel;
  /**
   * Cancels the current transition and resets the className.
   */

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
  /**
   * Handles a single transition end event.
   * Once all child transitions have ended the overall animation is completed.
   */

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

/**
 * Walks the tree of an element and counts how many transitions have been applied.
 *
 * @param {HTMLElement} el
 * @return {number}
 */

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
    const next = trimmed.endsWith("ms") ? Number.parseFloat(trimmed) : Number.parseFloat(trimmed) * 1000;
    return Number.isFinite(next) ? Math.max(max, next) : max;
  }, 0);
}
/**
 * Runs a function during the next animation frame.
 *
 * @param {function} fn a function to run on the next animation frame.
 * @return {function} a function to cancel the callback.
 */

function nextFrame(fn) {
  let frame;
  let cancelFrame;
  if (window.requestAnimationFrame) {
    frame = requestAnimationFrame(function () {
      frame = requestAnimationFrame(fn);
    });
    cancelFrame = cancelAnimationFrame;
  } else {
    frame = setTimeout(fn, 26); // 16ms to simulate RAF, 10ms to ensure called after the frame.

    cancelFrame = clearTimeout;
  }
  return function () {
    if (frame) {
      cancelFrame(frame);
      frame = undefined;
    }
  };
}
