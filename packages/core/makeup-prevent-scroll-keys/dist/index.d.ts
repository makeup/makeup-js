/**
 * Prevents the default scroll event when pressing down arrow, page down, spacebar, etc.
 * This behaviour is required for ARIA widgets such as menu, tabs and comboboxes.
 *
 * @example
 * ```ts
 * import * as scrollKeyPreventer from "makeup-prevent-scroll-keys";
 *
 * const widgetEl = document.querySelector(".widget");
 *
 * scrollKeyPreventer.add(widgetEl);
 *
 * // To remove
 * scrollKeyPreventer.remove(widgetEl);
 * ```
 */

/**
 * Adds keydown event listener to prevent default scroll behavior for arrow keys, page keys, and spacebar
 * @param el - Element to attach prevent scroll behavior to
 */
export function add(el: HTMLElement): void;

/**
 * Removes keydown event listener that prevents default scroll behavior
 * @param el - Element to remove prevent scroll behavior from
 */
export function remove(el: HTMLElement): void;

