/**
 * Assigns the next id in sequence to an element, if an id property does not already exist.
 *
 * The id will consist of a configurable prefix (default: 'nid'), followed by three randomly generated chars,
 * then a number in sequence. For example: `nid-sdv-1`, `nid-sdv-2`, `nid-sdv-3`, etc.
 *
 * @param el - The element to assign an id to
 * @param prefix - Optional prefix for the id (default: 'nid')
 * @returns The assigned id (or existing id if element already had one)
 *
 * @example
 * ```ts
 * import nextId from "makeup-next-id";
 *
 * const widgetEls = document.querySelectorAll(".widget");
 * widgetEls.forEach((el) => nextId(el));
 * ```
 */
declare function nextId(el: HTMLElement, prefix?: string): string;

export default nextId;

