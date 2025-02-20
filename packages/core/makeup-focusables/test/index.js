import { describe, expect, beforeEach, test } from "vitest";
import focusable from "../src/index.js";

describe("makeup-focusables", function () {
  let body = document.body;

  describe("when module is imported", function () {
    test("module should not be undefined", function () {
      expect(focusable).not.to.equal(undefined);
    });
  });

  describe("when element contains links", function () {
    let focusableEls = null;

    beforeEach(function () {
      // vi.useFakeTimers();
      body.innerHTML = '<a href="http://www.ebay.com"></a><a></a>';
      focusableEls = focusable(body);
    });

    test("should only return links with hrefs", function () {
      // vi.advanceTimersToNextFrame();
      setTimeout(() => {
        expect(focusableEls.length).to.equal(1);
      }, 100);
    });
  });

  describe("when element contains buttons", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = "<button></button><button disabled></button>";
      focusableEls = focusable(body);
    });

    test("should only return enabled buttons", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(1);
      }, 100);
    });
  });

  describe("when element contains buttons with position:fixed", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<button></button><button style="position:fixed"></button>';
      focusableEls = focusable(body);
    });

    test("should only return enabled buttons", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(2);
      }, 100);
    });
  });

  describe("when element contains elements with tabindex", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div tabindex="0"></div><div></div><div tabindex="0"></div>';
      focusableEls = focusable(body);
    });

    test("should return all elements with tabindex=0", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(2);
      }, 100);
    });
  });

  describe("when element contains elements with positive tabindex", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div tabindex="1"></div><div></div><div tabindex="2"></div>';
      focusableEls = focusable(body);
    });

    test("should return all elements with positive tabindex", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(2);
      }, 100);
    });
  });

  describe("when element contains elements with negative tabindex", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div tabindex="-1"></div><div></div><div tabindex="-1"></div>';
      focusableEls = focusable(body);
    });

    test("should return all elements with negative tabindex", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(2);
      }, 100);
    });
  });

  describe("when element contains elements with tabindex, with hidden attribute", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div hidden tabindex="0"></div><div></div><div hidden tabindex="0"></div>';
      focusableEls = focusable(body);
    });

    test("should return zero elements", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(0);
      }, 100);
    });
  });

  describe("when element contains elements with tabindex, with display:none", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML =
        '<div style="display:none" tabindex="0"></div>' +
        "<div></div>" +
        '<div style="display:none" tabindex="0"></div>';
      focusableEls = focusable(body);
    });

    test("should return zero elements", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(0);
      }, 100);
    });
  });

  describe("when element contains elements with negative tabindex, with sequentialOnly set to true", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = '<div tabindex="-1"></div><div></div><div tabindex="-1"></div>';
      focusableEls = focusable(body, true);
    });

    test("should return all elements with negative tabindex", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(0);
      }, 100);
    });
  });

  describe("when it has a callback, should request animation frame and trigger callback", function () {
    beforeEach(function () {
      body.innerHTML = '<div tabindex="1"></div><div></div><div tabindex="2"></div>';
    });

    test("should return all elements in callback", function (done) {
      focusable(body, false, (focusableEl) => {
        expect(focusableEl.length).to.equal(2);
        done();
      });
    });
  });

  describe("when element contains nested elements with display: none", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = "<button></button>" + '<div style="display:none">' + "<button></button>" + "</div>";
      focusableEls = focusable(body);
    });

    test("should return only the element not nested in element with display: none", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(1);
      }, 100);
    });
  });

  describe("when element contains nested elements with hidden attribute", function () {
    let focusableEls;

    beforeEach(function () {
      body.innerHTML = "<button></button>" + "<div hidden>" + "<button></button>" + "</div>";
      focusableEls = focusable(body);
    });

    test("should return only the element not nested in hidden element", function () {
      setTimeout(() => {
        expect(focusableEls.length).to.equal(1);
      }, 100);
    });
  });
});
