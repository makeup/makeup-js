'use strict';

module.exports = [
    {
        html: ''
    + '<div class="trap"></div>',
        numSiblings: 0,
        numAncestors: 0,
        numSiblingsOfAncestors: 0,
        numAriaHiddenAfterTrap: 1,
        numAriaHiddenTrueAfterTrap: 0,
        numAriaHiddenFalseAfterTrap: 1,
        numAriaHiddenAfterUntrap: 0,
        numAriaHiddenTrueAfterUntrap: 0,
        numAriaHiddenFalseAfterUntrap: 0
    },
    {
        html: ''
        + '<div class="trap" aria-hidden="true"></div>',
        numSiblings: 0,
        numAncestors: 0,
        numSiblingsOfAncestors: 0,
        numAriaHiddenAfterTrap: 1,
        numAriaHiddenTrueAfterTrap: 0,
        numAriaHiddenFalseAfterTrap: 1,
        numAriaHiddenAfterUntrap: 1,
        numAriaHiddenTrueAfterUntrap: 1,
        numAriaHiddenFalseAfterUntrap: 0
    },
    {
        html: ''
        + '<div></div>'
        + '<div class="trap"></div>'
        + '<div></div>',
        numSiblings: 2,
        numAncestors: 0,
        numSiblingsOfAncestors: 0,
        numAriaHiddenAfterTrap: 3,
        numAriaHiddenTrueAfterTrap: 2,
        numAriaHiddenFalseAfterTrap: 1,
        numAriaHiddenAfterUntrap: 0,
        numAriaHiddenTrueAfterUntrap: 0,
        numAriaHiddenFalseAfterUntrap: 0
    },
    {
        html: ''
        + '<div>'
          + '<div></div>'
          + '<div class="trap"></div>'
          + '<div></div>'
        + '</div>',
        numSiblings: 2,
        numAncestors: 1,
        numSiblingsOfAncestors: 0,
        numAriaHiddenAfterTrap: 4,
        numAriaHiddenTrueAfterTrap: 2,
        numAriaHiddenFalseAfterTrap: 2,
        numAriaHiddenAfterUntrap: 0,
        numAriaHiddenTrueAfterUntrap: 0,
        numAriaHiddenFalseAfterUntrap: 0
    },
    {
        html: ''
        + '<div></div>'
        + '<div>'
          + '<div></div>'
          + '<div class="trap"></div>'
          + '<div></div>'
        + '</div>'
        + '<div></div>',
        numSiblings: 2,
        numAncestors: 1,
        numSiblingsOfAncestors: 2,
        numAriaHiddenAfterTrap: 6,
        numAriaHiddenTrueAfterTrap: 4,
        numAriaHiddenFalseAfterTrap: 2,
        numAriaHiddenAfterUntrap: 0,
        numAriaHiddenTrueAfterUntrap: 0,
        numAriaHiddenFalseAfterUntrap: 0
    },
    {
        html: ''
        + '<div>'
            + '<div></div>'
            + '<div>'
              + '<script></script>'
              + '<div></div>'
              + '<div class="trap"></div>'
              + '<div aria-hidden="true"></div>'
              + '<div></div>'
            + '</div>'
            + '<div></div>'
          + '</div>'
        + '<div></div>',
        numSiblings: 3,
        numAncestors: 2,
        numSiblingsOfAncestors: 3,
        numAriaHiddenAfterTrap: 9,
        numAriaHiddenTrueAfterTrap: 6,
        numAriaHiddenFalseAfterTrap: 3,
        numAriaHiddenAfterUntrap: 1,
        numAriaHiddenTrueAfterUntrap: 1,
        numAriaHiddenFalseAfterUntrap: 0
    }
];
