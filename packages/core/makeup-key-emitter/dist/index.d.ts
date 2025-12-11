/**
 * Emits custom events for common accessibility keys (arrowRightKeyDown, escKeyDown, etc).
 *
 * Supported keys: Enter, Escape, PageUp, PageDown, End, Home, ArrowLeft, ArrowUp, ArrowRight, ArrowDown, Spacebar
 *
 * @example
 * ```ts
 * import * as KeyEmitter from "makeup-key-emitter";
 *
 * const el = document.getElementById("widget1");
 *
 * KeyEmitter.addKeyDown(el);
 *
 * el.addEventListener("arrowRightKeyDown", function (e) {
 *   console.log(this, e.type);
 * });
 * ```
 */

/**
 * Adds keydown event listener to emit custom key events
 * @param el - Element to attach keydown listener to
 */
export function addKeyDown(el: HTMLElement): void;

/**
 * Adds keyup event listener to emit custom key events
 * @param el - Element to attach keyup listener to
 */
export function addKeyUp(el: HTMLElement): void;

/**
 * Removes keydown event listener
 * @param el - Element to remove keydown listener from
 */
export function removeKeyDown(el: HTMLElement): void;

/**
 * Removes keyup event listener
 * @param el - Element to remove keyup listener from
 */
export function removeKeyUp(el: HTMLElement): void;

/**
 * Adds both keydown and keyup event listeners
 * @param el - Element to attach listeners to
 */
export function add(el: HTMLElement): void;

/**
 * Removes both keydown and keyup event listeners
 * @param el - Element to remove listeners from
 */
export function remove(el: HTMLElement): void;

