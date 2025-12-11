/**
 * Restricts screen reader virtual cursor to a single subtree in the DOM.
 * This behaviour is useful when implementing a modal interface (e.g. a modal dialog).
 *
 * @example
 * ```ts
 * import * as screenreaderTrap from "makeup-screenreader-trap";
 *
 * // Trap an element
 * screenreaderTrap.trap(document.querySelector("el"));
 *
 * // Untrap the current trapped element
 * screenreaderTrap.untrap();
 * ```
 */

/**
 * Options for screenreader trap
 */
export interface ScreenreaderTrapOptions {
  /**
   * Use `hidden` property instead of `aria-hidden` (default: false)
   * Useful for fullscreen modals
   */
  useHiddenProperty?: boolean;
}

/**
 * Traps screen reader virtual cursor within the specified element
 * @param el - Element to trap screen reader within
 * @param options - Optional configuration
 */
export function trap(el: HTMLElement, options?: ScreenreaderTrapOptions): void;

/**
 * Removes screen reader trap from the currently trapped element
 */
export function untrap(): void;

