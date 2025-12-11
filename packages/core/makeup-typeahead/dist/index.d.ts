/**
 * Produces a function generator. The generated function produces the index of the suggested menu item
 * to highlight / focus. It keeps track of the characters entered, adding them onto a string.
 *
 * Its parameters are a list of DOM nodes, a char, and the length of a timeout. The timeout is restarted
 * when a new char is given the function.
 *
 * When the timeout executes the callback, it will re-start the suggestions with an empty string.
 *
 * @example
 * ```ts
 * import typeahead from "makeup-typeahead";
 *
 * const list = document.querySelector("ul");
 * const selected = document.querySelector(".selected");
 * const TIMEOUT_LENGTH = 2000;
 *
 * const getIndex = typeahead();
 *
 * function handleKeyDown(e) {
 *   if (e.key.length === 1) {
 *     const listIndex = getIndex(list.children, e.key, TIMEOUT_LENGTH);
 *     if (listIndex !== -1) {
 *       selected.innerHTML = list.children[listIndex].innerHTML;
 *     }
 *   }
 * }
 * ```
 */

/**
 * Typeahead instance returned by the factory function
 */
export interface TypeaheadInstance {
  /**
   * Gets the index of the suggested menu item based on typed characters
   * @param nodeList - List of DOM nodes to search through
   * @param char - Character that was typed
   * @param timeoutLength - Length of timeout in milliseconds before resetting the typed string
   * @returns Index of matching item, or -1 if no match found
   */
  getIndex(nodeList: NodeListOf<Element> | HTMLCollection | Element[], char: string, timeoutLength: number): number;
  /**
   * Destroys the typeahead instance and clears any pending timeout
   */
  destroy(): void;
}

/**
 * Creates a typeahead instance
 * @returns Typeahead instance with getIndex and destroy methods
 */
declare function typeahead(): TypeaheadInstance;

export default typeahead;

