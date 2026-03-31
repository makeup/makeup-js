import { describe, expect, beforeAll, beforeEach, it, vi } from "vitest";
import focusable from "../src/index.js";

// jsdom does not compute layout, so we mock offsetWidth/Height and getClientRects
// to simulate visible elements. Tests for display:none and hidden attribute
// require a real browser environment (see commented-out tests below).
beforeAll(() => {
  Object.defineProperties(HTMLElement.prototype, {
    offsetWidth: {
      get() {
        return 1;
      },
    },
    offsetHeight: {
      get() {
        return 1;
      },
    },
  });
  HTMLElement.prototype.getClientRects = () => [{ width: 1, height: 1 }];
});

describe("given an element containing links", () => {
  let focusableEls;

  beforeEach(() => {
    document.body.innerHTML = '<a href="http://www.ebay.com"></a><a></a>';
    focusableEls = focusable(document.body);
  });

  describe("when focusables is called", () => {
    it("should return only links with hrefs", () => {
      expect(focusableEls.length).toBe(1);
    });
  });
});

describe("given an element containing buttons", () => {
  let focusableEls;

  beforeEach(() => {
    document.body.innerHTML = "<button></button><button disabled></button>";
    focusableEls = focusable(document.body);
  });

  describe("when focusables is called", () => {
    it("should return only enabled buttons", () => {
      expect(focusableEls.length).toBe(1);
    });
  });
});

describe("given an element containing buttons with position:fixed", () => {
  let focusableEls;

  beforeEach(() => {
    document.body.innerHTML = '<button></button><button style="position:fixed"></button>';
    focusableEls = focusable(document.body);
  });

  describe("when focusables is called", () => {
    it("should return both buttons", () => {
      expect(focusableEls.length).toBe(2);
    });
  });
});

describe("given an element containing elements with tabindex=0", () => {
  let focusableEls;

  beforeEach(() => {
    document.body.innerHTML = '<div tabindex="0"></div><div></div><div tabindex="0"></div>';
    focusableEls = focusable(document.body);
  });

  describe("when focusables is called", () => {
    it("should return all elements with tabindex", () => {
      expect(focusableEls.length).toBe(2);
    });
  });
});

describe("given an element containing elements with positive tabindex", () => {
  let focusableEls;

  beforeEach(() => {
    document.body.innerHTML = '<div tabindex="1"></div><div></div><div tabindex="2"></div>';
    focusableEls = focusable(document.body);
  });

  describe("when focusables is called", () => {
    it("should return all elements with positive tabindex", () => {
      expect(focusableEls.length).toBe(2);
    });
  });
});

describe("given an element containing elements with negative tabindex", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div tabindex="-1"></div><div></div><div tabindex="-1"></div>';
  });

  describe("when focusables is called", () => {
    it("should return all elements including those with negative tabindex", () => {
      expect(focusable(document.body).length).toBe(2);
    });
  });

  describe("when focusables is called with keyboardOnly set to true", () => {
    it("should return no elements", () => {
      expect(focusable(document.body, true).length).toBe(0);
    });
  });
});

describe("given an element with a callback", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div tabindex="1"></div><div></div><div tabindex="2"></div>';
  });

  describe("when focusables is called with a callback", () => {
    it("should pass focusable elements to the callback via requestAnimationFrame", async () => {
      const focusableEls = await new Promise((resolve) => {
        focusable(document.body, false, (els) => resolve(els));
      });
      expect(focusableEls.length).toBe(2);
    });
  });

  describe("when the returned cancel function is called", () => {
    it("should prevent the callback from being invoked", async () => {
      vi.useFakeTimers();
      const callback = vi.fn();
      const cancel = focusable(document.body, false, callback);
      cancel();
      vi.runAllTimers();
      expect(callback).not.toHaveBeenCalled();
      vi.useRealTimers();
    });
  });
});

// describe("given an element containing elements with tabindex, with hidden attribute", () => {
//   describe("when focusables is called", () => {
//     it("should return zero elements", () => {
//       document.body.innerHTML = '<div hidden tabindex="0"></div><div></div><div hidden tabindex="0"></div>';
//       expect(focusable(document.body).length).toBe(0);
//     });
//   });
// });

// describe("given an element containing elements with tabindex, with display:none", () => {
//   describe("when focusables is called", () => {
//     it("should return zero elements", () => {
//       document.body.innerHTML =
//         '<div style="display:none" tabindex="0"></div>' +
//         "<div></div>" +
//         '<div style="display:none" tabindex="0"></div>';
//       expect(focusable(document.body).length).toBe(0);
//     });
//   });
// });

// describe("given an element containing nested elements with display:none", () => {
//   describe("when focusables is called", () => {
//     it("should return only the element not nested in element with display:none", () => {
//       document.body.innerHTML = "<button></button>" + '<div style="display:none">' + "<button></button>" + "</div>";
//       expect(focusable(document.body).length).toBe(1);
//     });
//   });
// });

// describe("given an element containing nested elements with hidden attribute", () => {
//   describe("when focusables is called", () => {
//     it("should return only the element not nested in hidden element", () => {
//       document.body.innerHTML = "<button></button>" + "<div hidden>" + "<button></button>" + "</div>";
//       expect(focusable(document.body).length).toBe(1);
//     });
//   });
// });
