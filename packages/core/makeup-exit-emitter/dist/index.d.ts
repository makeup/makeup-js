/**
 * Emits custom 'focusExit' event when keyboard focus has exited an element and all of its descendants.
 *
 * @example
 * ```ts
 * import * as ExitEmitter from "makeup-exit-emitter";
 *
 * const el = document.getElementById("widget1");
 *
 * ExitEmitter.addFocusExit(el);
 *
 * el.addEventListener("focusExit", function (e) {
 *   console.log(this, e);
 * });
 * ```
 */

/**
 * Event detail for focusExit event
 */
export interface FocusExitEventDetail {
  /** The element that previously had focus */
  fromElement: HTMLElement | null;
  /** The element that now has focus (undefined if focus left the window) */
  toElement: HTMLElement | undefined;
}

/**
 * Adds focus exit tracking to an element
 * @param el - Element to track focus exit for
 * @returns The exit emitter instance (or null if already exists)
 */
export function addFocusExit(el: HTMLElement): FocusExitEmitter | null;

/**
 * Removes focus exit tracking from an element
 * @param el - Element to remove focus exit tracking from
 */
export function removeFocusExit(el: HTMLElement): void;

/**
 * Focus exit emitter instance (internal, returned by addFocusExit)
 * @internal
 */
export interface FocusExitEmitter {
  /** The element being tracked */
  el: HTMLElement;
  /** The currently focused element within the tracked element */
  currentFocusElement: HTMLElement | null;
  /** Removes all event listeners */
  removeEventListeners(): void;
}

