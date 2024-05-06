import LightboxDialog from "../../../packages/ui/makeup-lightbox-dialog";
import "../../docs.css";
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/button";
import "@ebay/skin/icon-button";
import "@ebay/skin/lightbox-dialog";

/**
 * Translate kebob-case to camelCase so we can forward attributes to widget options
 *
 * TODO: Abstract once completed.
 *
 * @param {string} s
 * @returns {string}
 */
export function kebabToCamel(s) {
  return s.replace(/-./g, (x) => x.toUpperCase()[1]);
}

/**
 * Translates string-based custom element attributes to booleans. This is particularly useful in situations where the
 * attribute is simply present (and thus an empty string) and we want to register that as a true value and when 'false'
 * is explicitly set, in which case, we'll interpret it as a false boolean.
 *
 * TODO: Abstract once completed.
 *
 * @returns {boolean}
 */
export function attribToBool(attributeValue) {
  return attributeValue !== false && attributeValue !== "false";
}

/**
 * Automatically converts kebob-case attributes to camelCase and accounts for boolean attributes
 *
 * TODO: Abstract once completed.
 *
 * @param {NamedNodeMap} attributes
 * @param {string[]} booleanAttributes
 */
export function translateAttributes(attributes, booleanAttributes) {
  const options = {};
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    const name = attr.name;
    const value = attr.value;
    if (booleanAttributes.includes(name)) {
      options[kebabToCamel(name)] = attribToBool(value);
    } else {
      options[kebabToCamel(name)] = value;
    }
  }
  return options;
}

customElements.define(
  "makeup-lightbox-dialog",
  class extends HTMLElement {
    connectedCallback() {
      // TODO: Some of this can be abstracted (maybe to a super class called MakeupElement), e.g. the init of required
      //  defaults and translation of attributes can be simplified.
      const options = Object.assign(
        {
          // Necessary for custom element init.
          baseClass: ".lightbox-dialog",
        },
        translateAttributes(this.attributes, ["quick-dismiss"]), // TODO: make booleans static?
      );

      // The controlled element that we're progressively enhancing
      this.el = this.querySelector(options.baseClass);

      if (this.el) {
        this.widget = new LightboxDialog(this.el, options);
      } else {
        console.error("<makeup-lightbox-dialog>: No element found with class: " + options.baseClass);
      }
    }

    static get observedAttributes() {
      // TODO: What attributes should we watch for? Should the wrapper be the target or the controlled element?
    }

    // TODO: disconnectedCallback
    //  forward call to destroy()?
  },
);
