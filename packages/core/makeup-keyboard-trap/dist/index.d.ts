/**
 * Restricts keyboard tabindex to a single subtree in the DOM.
 * This behaviour is useful when implementing a modal interface (e.g. a modal dialog).
 *
 * It will ignore programmatically focusable items with a tabindex of `-1`.
 *
 * @example
 * ```ts
 * import * as keyboardTrap from "makeup-keyboard-trap";
 *
 * // Trap an element
 * keyboardTrap.trap(document.querySelector("el"));
 *
 * // Untrap the current trapped element
 * keyboardTrap.untrap();
 * ```
 */

/**
 * Traps keyboard focus within the specified element
 * @param el - Element to trap keyboard focus within
 * @returns The trapped element
 */
export function trap(el: HTMLElement): HTMLElement;

/**
 * Removes keyboard trap from the currently trapped element
 */
export function untrap(): void;

/**
 * Refreshes the keyboard trap by recalculating focusable elements
 * Useful when DOM changes occur within the trapped element
 */
export function refresh(): void;

