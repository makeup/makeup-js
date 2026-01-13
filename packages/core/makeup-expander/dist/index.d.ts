/**
 * Creates the basic interactivity for an element that expands and collapses another element.
 *
 * @example
 * ```ts
 * import Expander from "makeup-expander";
 *
 * const widgetEl = document.querySelector(".expander");
 *
 * const options = {
 *   expandOnClick: true,
 * };
 *
 * const widget = new Expander(widgetEl, options);
 * ```
 */

/**
 * Options for creating an expander
 */
export interface ExpanderOptions {
  /**
   * Whether `focusManagement` option should apply for mouse click (default: false)
   */
  alwaysDoFocusManagement?: boolean;
  /**
   * Specify whether `aria-controls` relationship should be created between host and overlay (default: true)
   */
  ariaControls?: boolean;
  /**
   * Applies a collapse behavior (`collapseOnClick`, `collapseOnFocusOut`, `collapseOnMouseOut`)
   * based on expand behaviour (default: false)
   */
  autoCollapse?: boolean;
  /**
   * Whether the content should collapse when clicking outside of content (default: false)
   */
  collapseOnClickOut?: boolean;
  /**
   * Whether the content should collapse when focus leaves the content (default: false)
   */
  collapseOnFocusOut?: boolean;
  /**
   * Whether the content should collapse when mouse leaves the content (default: false)
   */
  collapseOnMouseOut?: boolean;
  /**
   * Whether the content should collapse when focus moves back to the host from content (default: false).
   * This cannot be set to true when expandOnFocus is true
   */
  collapseOnHostReFocus?: boolean;
  /**
   * The query selector for the expandee element in relation to the widget (default: '.expander__content')
   */
  contentSelector?: string;
  /**
   * The class which will be used on the root element to signify expanded state.
   * This mirrors the `aria-expanded="true"` setting on the host element (default: null)
   */
  expandedClass?: string | null;
  /**
   * Whether the host should be click activated (default: false)
   */
  expandOnClick?: boolean;
  /**
   * Whether the host should be focus activated (default: false)
   */
  expandOnFocus?: boolean;
  /**
   * Whether the host should be hover activated (default: false)
   */
  expandOnHover?: boolean;
  /**
   * Where keyboard focus should go (null, 'content', 'focusable', 'interactive', or ID reference)
   * when expanded via `ENTER` or `SPACEBAR` (default: null)
   */
  focusManagement?: string | null;
  /**
   * The query selector for the host element in relation to the widget (default: '.expander__host')
   */
  hostSelector?: string;
  /**
   * If host element does not naturally trigger a click event on spacebar, we can force one to trigger here.
   * Careful! if host already triggers click events naturally, we end up with a "double-click". (default: false)
   */
  simulateSpacebarClick?: boolean;
}

/**
 * Expander widget class
 */
export default class Expander {
  /**
   * Creates an expander instance
   * @param el - The root widget element
   * @param selectedOptions - Optional configuration
   */
  constructor(el: HTMLElement, selectedOptions?: ExpanderOptions);

  /** The root widget element */
  el: HTMLElement;
  /** The keyboard focusable host element */
  hostEl: HTMLElement;
  /** The content element that expands/collapses */
  contentEl: HTMLElement;
  /** The expander options */
  options: ExpanderOptions;

  /**
   * Whether the content is currently expanded
   */
  get expanded(): boolean;
  set expanded(value: boolean);

  /**
   * Whether expand on click is enabled
   */
  set expandOnClick(value: boolean);

  /**
   * Whether expand on focus is enabled
   */
  set expandOnFocus(value: boolean);

  /**
   * Whether expand on hover is enabled
   */
  set expandOnHover(value: boolean);

  /**
   * Whether collapse on click out is enabled
   */
  set collapseOnClickOut(value: boolean);

  /**
   * Whether collapse on focus out is enabled
   */
  set collapseOnFocusOut(value: boolean);

  /**
   * Whether collapse on mouse out is enabled
   */
  set collapseOnMouseOut(value: boolean);

  /**
   * Whether collapse on host refocus is enabled
   */
  set collapseOnHostReFocus(value: boolean);

  /**
   * Disables all expand/collapse behaviors without destroying the instance
   */
  sleep(): void;

  /**
   * Destroys all event listeners and cleans up
   */
  destroy(): void;
}

