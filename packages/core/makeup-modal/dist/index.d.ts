/**
 * Sets an element to a modal state using keyboard-trap and screenreader-trap.
 * All other elements become "inert".
 *
 * @example
 * ```ts
 * import * as modal from "makeup-modal";
 *
 * // Set an element to modal
 * modal.modal(document.querySelector("el"));
 *
 * // Reset the element to non-modal
 * modal.unmodal();
 * ```
 */

/**
 * Options for modal behavior
 */
export interface ModalOptions {
  /**
   * Use `hidden` property for inert content instead of `aria-hidden`
   * Useful for fullscreen modals (default: false)
   */
  useHiddenProperty?: boolean;
  /**
   * Moves the element to the document root (default: false)
   */
  hoist?: boolean;
  /**
   * If element is at document root, wraps all "inert" sibling elements
   * into a single container (default: false)
   */
  wrap?: boolean;
}

/**
 * Sets an element to modal state
 * @param el - Element to make modal
 * @param options - Optional configuration
 * @returns The modal element
 */
export function modal(el: HTMLElement, options?: ModalOptions): HTMLElement;

/**
 * Resets the element to non-modal state
 *
 * Note: the current implementation does not return the previously modal element.
 * It returns `null` (or `undefined` if called before any modal is set).
 */
export function unmodal(): null | undefined;

