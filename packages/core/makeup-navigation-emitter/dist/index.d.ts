/**
 * Emits custom `navigationModelChange` event when keyboard navigation keys (e.g ARROW-UP, ARROW-DOWN)
 * occur on given array of elements, their container element or other associated owner.
 *
 * This module can be used as the underlying logic & state for both roving-tabindex and active-descendant
 * (hierarchical & programmatic) behaviour.
 *
 * @example
 * ```ts
 * import * as NavigationEmitter from "makeup-navigation-emitter";
 *
 * const widgetEl = document.querySelector(".widget");
 *
 * const emitter = NavigationEmitter.createLinear(widgetEl, "li");
 *
 * widgetEl.addEventListener("navigationModelChange", function (e) {
 *   console.log(e.detail.fromIndex, e.detail.toIndex);
 * });
 * ```
 */

/**
 * Auto init/reset option values
 */
export type AutoInitOption = "none" | "interactive" | "ariaChecked" | "ariaSelected" | "ariaSelectedOrInteractive" | number;
export type AutoResetOption = "none" | "current" | "interactive" | "ariaChecked" | "ariaSelected" | number;
export type AxisOption = "x" | "y" | "both";

/**
 * Options for creating a linear navigation emitter
 */
export interface NavigationEmitterOptions {
  /**
   * Declares the initial item (default: "interactive")
   * - "none": no index position is set (useful in programmatic active-descendant)
   * - "interactive": first non aria-disabled or hidden element (default)
   * - "ariaChecked": first element with aria-checked=true (useful in ARIA menu)
   * - "ariaSelected": first element with aria-selected=true (useful in ARIA tabs)
   * - "ariaSelectedOrInteractive": first element with aria-selected=true, falling back to "interactive" if not found (useful in ARIA listbox)
   * - number: specific index position of items (throws error if non-interactive)
   */
  autoInit?: AutoInitOption;
  /**
   * Declares the item after a reset and/or when keyboard focus exits the widget (default: "current")
   * - "none": no index position is set (useful in programmatic active-descendant)
   * - "current": index remains current (radio button like behaviour)
   * - "interactive": index moves to first non aria-disabled or hidden element
   * - "ariaChecked": index moves to first element with aria-checked=true
   * - "ariaSelected": index moves to first element with aria-selected=true
   * - number: specific index position of items (throws error if non-interactive)
   */
  autoReset?: AutoResetOption;
  /**
   * Specify 'x' for left/right arrow keys, 'y' for up/down arrow keys, or 'both' (default: 'both')
   */
  axis?: AxisOption;
  /**
   * CSS selector of descendant elements that will be ignored by the key event delegation
   * (i.e. these elements will _not_ operate the navigation emitter) (default: null)
   */
  ignoreByDelegateSelector?: string | null;
  /**
   * Specify whether arrow keys should wrap/loop (default: false)
   */
  wrap?: boolean;
}

/**
 * Event detail for navigationModelInit event
 */
export interface NavigationModelInitEventDetail {
  /** All items that match item selector */
  items: HTMLElement[];
  /** Index position before initialization */
  fromIndex: number | null;
  /** Index position after initialization */
  toIndex: number | null;
  /** First interactive index */
  firstInteractiveIndex: number;
}

/**
 * Event detail for navigationModelChange event
 */
export interface NavigationModelChangeEventDetail {
  /** Index position before change */
  fromIndex: number | null;
  /** Index position after change */
  toIndex: number | null;
}

/**
 * Event detail for navigationModelReset event
 */
export interface NavigationModelResetEventDetail {
  /** Index position before reset */
  fromIndex: number | null;
  /** Index position after reset */
  toIndex: number | null;
}

/**
 * Event detail for navigationModelMutation event
 */
export interface NavigationModelMutationEventDetail {
  /** Index position before mutation */
  fromIndex: number | null;
  /** Index position after mutation */
  toIndex: number | null;
}

/**
 * Navigation emitter instance
 */
export interface NavigationEmitter {
  /** The navigation model */
  model: NavigationModel;
  /** The element the emitter is attached to */
  el: HTMLElement;
  /**
   * Destroys all event listeners
   */
  destroy(): void;
}

/**
 * Navigation model instance
 */
export interface NavigationModel {
  /** Current index position */
  index: number | null;
  /** Current item at index position */
  currentItem: HTMLElement | undefined;
  /** All items that match item selector */
  items: HTMLElement[];
  /** Navigation options */
  options: NavigationEmitterOptions;
  /**
   * Will force a reset to the value specified by `autoReset`
   */
  reset(): void;
  /**
   * Get index of an element in the items array
   */
  indexOf(element: HTMLElement): number;
}

/**
 * Creates a linear navigation emitter
 * @param el - Root element containing the navigation items
 * @param itemSelector - CSS selector for navigation items
 * @param selectedOptions - Optional configuration
 * @returns Navigation emitter instance
 */
export function createLinear(
  el: HTMLElement,
  itemSelector: string,
  selectedOptions?: NavigationEmitterOptions
): NavigationEmitter;

