/**
 * Implements a roving tab index on given collection of elements
 *
 * @example
 * ```ts
 * import * as RovingTabindex from "makeup-roving-tabindex";
 *
 * const widgetEl = document.querySelector(".widget");
 *
 * const rovingTabindex = RovingTabindex.createLinear(widgetEl, "li");
 *
 * widgetEl.addEventListener("rovingTabindexChange", function (e) {
 *   console.log(e.detail);
 * });
 * ```
 */

import type { AutoInitOption, AutoResetOption, AxisOption } from "makeup-navigation-emitter";

/**
 * Options for creating a linear roving tabindex
 */
export interface RovingTabindexOptions {
  /**
   * Declares the initial roving tabindex item (default: "interactive")
   * - "none": no index position is set (useful in programmatic active-descendant)
   * - "interactive": first non aria-disabled or hidden element (default)
   * - "ariaChecked": first element with aria-checked=true (useful in ARIA menu)
   * - "ariaSelected": first element with aria-selected=true (useful in ARIA tabs)
   * - "ariaSelectedOrInteractive": first element with aria-selected=true, falling back to "interactive" if not found (useful in ARIA listbox)
   * - number: specific index position of items (throws error if non-interactive)
   */
  autoInit?: AutoInitOption;
  /**
   * Declares the roving tabindex item after a reset and/or when keyboard focus exits the widget (default: "current")
   * - "none": no index position is set (useful in programmatic active-descendant)
   * - "current": index remains current (radio button like behaviour)
   * - "interactive": index moves to first non aria-disabled or hidden element
   * - "ariaChecked": index moves to first element with aria-checked=true
   * - "ariaSelected": index moves to first element with aria-selected=true
   * - number: specific index position of items (throws error if non-interactive)
   */
  autoReset?: AutoResetOption;
  /**
   * Specify whether arrow keys should wrap/loop (default: false)
   */
  wrap?: boolean;
  /**
   * Specify 'x' for left/right arrow keys, 'y' for up/down arrow keys, or 'both' (default: 'both')
   */
  axis?: AxisOption;
}

/**
 * Event detail for rovingTabindexInit event
 */
export interface RovingTabindexInitEventDetail {
  /** All items that match item selector */
  items: HTMLElement[];
  /** Index position before initialization */
  fromIndex: number | null;
  /** Index position after initialization */
  toIndex: number | null;
}

/**
 * Event detail for rovingTabindexChange event
 */
export interface RovingTabindexChangeEventDetail {
  /** Index position before change */
  fromIndex: number | null;
  /** Index position after change */
  toIndex: number | null;
}

/**
 * Event detail for rovingTabindexReset event
 */
export interface RovingTabindexResetEventDetail {
  /** Index position before reset */
  fromIndex: number | null;
  /** Index position after reset */
  toIndex: number | null;
}

/**
 * Event detail for rovingTabindexMutation event
 */
export interface RovingTabindexMutationEventDetail {
  /** Index position before mutation */
  fromIndex: number | null;
  /** Index position after mutation */
  toIndex: number | null;
}

/**
 * Roving tabindex instance
 */
export interface LinearRovingTabindex {
  /** The index position of the roving tabindex (i.e. the element with tabindex="0") */
  index: number | null;
  /** The current item at the index position */
  currentItem: HTMLElement | undefined;
  /** All items that match item selector */
  items: HTMLElement[];
  /** Whether arrow keys should wrap/loop */
  wrap: boolean;
  /**
   * Will force a reset to the value specified by `autoReset`
   */
  reset(): void;
  /**
   * Destroys all event listeners
   */
  destroy(): void;
}

/**
 * Creates a linear roving tabindex instance
 * @param el - Root element containing the navigation items
 * @param itemSelector - CSS selector for navigation items
 * @param selectedOptions - Optional configuration
 * @returns Roving tabindex instance
 */
export function createLinear(
  el: HTMLElement,
  itemSelector: string,
  selectedOptions?: RovingTabindexOptions
): LinearRovingTabindex;

