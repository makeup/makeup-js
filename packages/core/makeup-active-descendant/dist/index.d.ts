/**
 * Implements ARIA active descendant keyboard navigation.
 *
 * @example
 * ```ts
 * import * as ActiveDescendant from "makeup-active-descendant";
 *
 * const widgetEl = document.querySelector(".widget");
 * const focusEl = widgetEl.querySelector("input");
 * const containerEl = widgetEl.querySelector("ul");
 *
 * const activeDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li");
 *
 * widgetEl.addEventListener("activeDescendantChange", function (e) {
 *   console.log(e.detail);
 * });
 * ```
 */

import type { AutoInitOption, AutoResetOption, AxisOption } from "makeup-navigation-emitter";

/**
 * Options for creating a linear active descendant
 */
export interface ActiveDescendantOptions {
  /**
   * The HTML class name that will be applied to the ARIA active descendant element (default: 'active-descendant')
   */
  activeDescendantClassName?: string;
  /**
   * Declares the initial active descendant item (default: "none")
   * - "none": no index position is set (useful in programmatic active-descendant)
   * - "interactive": first non aria-disabled or hidden element
   * - "ariaChecked": first element with aria-checked=true (useful in ARIA menu)
   * - "ariaSelected": first element with aria-selected=true (useful in ARIA tabs)
   * - "ariaSelectedOrInteractive": first element with aria-selected=true, falling back to "interactive" if not found (useful in ARIA listbox)
   * - number: specific index position of items (throws error if non-interactive)
   */
  autoInit?: AutoInitOption;
  /**
   * Declares the active descendant item after a reset and/or when keyboard focus exits the widget (default: "none")
   * - "none": no index position is set (useful in programmatic active-descendant)
   * - "current": index remains current (radio button like behaviour)
   * - "interactive": index moves to first non aria-disabled or hidden element
   * - "ariaChecked": index moves to first element with aria-checked=true
   * - "ariaSelected": index moves to first element with aria-selected=true
   * - number: specific index position of items (throws error if non-interactive)
   */
  autoReset?: AutoResetOption;
  /**
   * Specify true to scroll the container as activeDescendant changes (default: false)
   */
  autoScroll?: boolean;
  /**
   * Specify 'x' for left/right arrow keys, 'y' for up/down arrow keys, or 'both' (default: 'both')
   */
  axis?: AxisOption;
  /**
   * CSS selector of descendant elements that will be ignored by the navigation emitters key event delegation
   * (i.e. these elements will _not_ operate the active descendant) (default: null)
   */
  ignoreByDelegateSelector?: string | null;
  /**
   * Specify whether arrow keys should wrap/loop (default: false)
   */
  wrap?: boolean;
}

/**
 * Event detail for activeDescendantInit event
 */
export interface ActiveDescendantInitEventDetail {
  /** All items that match item selector */
  items: HTMLElement[];
  /** Index position before initialization */
  fromIndex: number | null;
  /** Index position after initialization */
  toIndex: number | null;
}

/**
 * Event detail for activeDescendantChange event
 */
export interface ActiveDescendantChangeEventDetail {
  /** Index position before change */
  fromIndex: number | null;
  /** Index position after change */
  toIndex: number | null;
}

/**
 * Event detail for activeDescendantReset event
 */
export interface ActiveDescendantResetEventDetail {
  /** Index position before reset */
  fromIndex: number | null;
  /** Index position after reset */
  toIndex: number | null;
}

/**
 * Event detail for activeDescendantMutation event
 */
export interface ActiveDescendantMutationEventDetail {
  /** Index position before mutation */
  fromIndex: number | null;
  /** Index position after mutation */
  toIndex: number | null;
}

/**
 * Active descendant instance
 */
export interface LinearActiveDescendant {
  /** The index position of the current active descendant */
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
 * Creates a linear active descendant instance
 * @param el - Root widget element
 * @param focusEl - The focusable element that will have aria-activedescendant set
 * @param itemContainerEl - The element that contains the "descendant" items
 * @param itemSelector - CSS selector for navigation items
 * @param selectedOptions - Optional configuration
 * @returns Active descendant instance
 */
export function createLinear(
  el: HTMLElement,
  focusEl: HTMLElement,
  itemContainerEl: HTMLElement,
  itemSelector: string,
  selectedOptions?: ActiveDescendantOptions
): LinearActiveDescendant;

