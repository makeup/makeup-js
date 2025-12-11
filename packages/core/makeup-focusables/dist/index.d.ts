/**
 * Returns an array of all focusable descendants of the given element, excluding elements that are hidden
 * or children of hidden elements.
 *
 * @param el - The element to search for focusable descendants
 * @param keyboardOnly - If true, return only elements focusable in sequential keyboard navigation (default: false)
 * @param callback - Optional callback function. If provided, will call focusables after `requestAnimationFrame`
 *                   and pass the list of focusables in the callback method. Returns a cleanup function.
 * @returns Array of focusable HTMLElement instances, or cleanup function if callback is provided
 *
 * @example
 * ```ts
 * import focusables from "makeup-focusables";
 *
 * const widgetEl = document.querySelector(".widget");
 *
 * // Get all focusable elements (keyboard and programmatic)
 * const allItems = focusables(widgetEl);
 *
 * // Get only keyboard focusable elements
 * const keyboardItems = focusables(widgetEl, true);
 *
 * // With callback
 * const cleanup = focusables(widgetEl, false, (items) => {
 *   console.log(items);
 * });
 * cleanup(); // Cancel the requestAnimationFrame
 * ```
 */
declare function focusables(el: HTMLElement): HTMLElement[];
declare function focusables(el: HTMLElement, keyboardOnly: boolean): HTMLElement[];
declare function focusables(
  el: HTMLElement,
  keyboardOnly: boolean,
  callback: (items: HTMLElement[]) => void
): () => void;

export default focusables;

