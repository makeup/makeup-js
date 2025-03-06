import { describe, expect, beforeEach, it } from "vitest";
import focusable from "../src/index.js";

function setupMockEnv() {
  // Mock these properties only in test environment
  // but tests with display:none and hidden attribute will fail
  // those tests need to shift to browser tests
  if (
    typeof window !== "undefined" &&
    (window.navigator.userAgent.includes("Node.js") || window.navigator.userAgent.includes("jsdom"))
  ) {
    // Save original methods to restore later if needed
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetWidth");
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "offsetHeight");
    const originalGetClientRects = HTMLElement.prototype.getClientRects;

    // Mock offsetWidth/Height
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

    // Mock getClientRects
    HTMLElement.prototype.getClientRects = function () {
      return [{ width: 1, height: 1 }];
    };
  }
}

describe("makeup-focusables", function () {
  let body = document.body;

  describe("when module is imported", function () {
    it("module should not be undefined", function () {
      expect(focusable).not.to.equal(undefined);
    });
  });

  describe("when element contains links", function () {
    let focusableEls;

    beforeEach(function () {
      setupMockEnv();
      body.innerHTML = '<a href="http://www.ebay.com"></a><a></a>';
      focusableEls = focusable(body);
    });

    it("should only return links with hrefs", function () {
      expect(focusableEls.length).to.equal(1);
    });
  });

  describe("when element contains buttons", function () {
    let focusableEls;

    beforeEach(function () {
      setupMockEnv();
      body.innerHTML = "<button></button><button disabled></button>";
      focusableEls = focusable(body);
    });

    it("should only return enabled buttons", function () {
      expect(focusableEls.length).to.equal(1);
    });
  });

  describe("when element contains buttons with position:fixed", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<button></button><button style="position:fixed"></button>';
      focusableEls = focusable(body);
    });

    it("should only return enabled buttons", function () {
      expect(focusableEls.length).to.equal(2);
    });
  });

  describe("when element contains elements with tabindex", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div tabindex="0"></div><div></div><div tabindex="0"></div>';
      focusableEls = focusable(body);
    });

    it("should return all elements with tabindex=0", function () {
      expect(focusableEls.length).to.equal(2);
    });
  });

  describe("when element contains elements with positive tabindex", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div tabindex="1"></div><div></div><div tabindex="2"></div>';
      focusableEls = focusable(body);
    });

    it("should return all elements with positive tabindex", function () {
      expect(focusableEls.length).to.equal(2);
    });
  });

  describe("when element contains elements with negative tabindex", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div tabindex="-1"></div><div></div><div tabindex="-1"></div>';
      focusableEls = focusable(body);
    });

    it("should return all elements with negative tabindex", function () {
      expect(focusableEls.length).to.equal(2);
    });
  });

  // describe("when element contains elements with tabindex, with hidden attribute", function () {
  //   let focusableEls;

  //   beforeEach(function () {
  //     body.innerHTML = '<div hidden tabindex="0"></div><div></div><div hidden tabindex="0"></div>';
  //     focusableEls = focusable(body);
  //   });

  //   it("should return zero elements", function () {
  //     expect(focusableEls.length).to.equal(0);
  //   });
  // });

  // describe("when element contains elements with tabindex, with display:none", function () {
  //   let focusableEls;

  //   beforeEach(function () {
  //     body.innerHTML =
  //       '<div style="display:none" tabindex="0"></div>' +
  //       "<div></div>" +
  //       '<div style="display:none" tabindex="0"></div>';
  //     focusableEls = focusable(body);
  //   });

  //   it("should return zero elements", function () {
  //     expect(focusableEls.length).to.equal(0);
  //   });
  // });

  describe("when element contains elements with negative tabindex, with sequentialOnly set to true", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div tabindex="-1"></div><div></div><div tabindex="-1"></div>';
      focusableEls = focusable(body, true);
    });

    it("should return all elements with negative tabindex", function () {
      expect(focusableEls.length).to.equal(0);
    });
  });

  describe("when it has a callback, should request animation frame and trigger callback", function () {
    beforeEach(function () {
      body.innerHTML = '<div tabindex="1"></div><div></div><div tabindex="2"></div>';
    });

    it("should return all elements in callback", async function () {
      const focusableEls = await new Promise((resolve) => {
        focusable(body, false, (focusableEl) => {
          resolve(focusableEl);
        });
      });
      expect(focusableEls.length).to.equal(2);
    });
  });

  // describe("when element contains nested elements with display: none", function () {
  //   let focusableEls;

  //   beforeEach(function () {
  //     body.innerHTML = "<button></button>" + '<div style="display:none">' + "<button></button>" + "</div>";
  //     focusableEls = focusable(body);
  //   });

  //   it("should return only the element not nested in element with display: none", function () {
  //     expect(focusableEls.length).to.equal(1);
  //   });
  // });

  // describe("when element contains nested elements with hidden attribute", function () {
  //   let focusableEls;

  //   beforeEach(function () {
  //     body.innerHTML = "<button></button>" + "<div hidden>" + "<button></button>" + "</div>";
  //     focusableEls = focusable(body);
  //   });

  //   it("should return only the element not nested in hidden element", function () {
  //     expect(focusableEls.length).to.equal(1);
  //   });
  // });
});
