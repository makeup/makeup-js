import { expect } from "chai";
import focusable from "../src/index.js";

describe("makeup-focusables", function () {
  var body = document.body;

  describe("when module is imported", function () {
    it("module should not be undefined", function () {
      expect(focusable).not.to.equal(undefined);
    });
  });

  describe("when element contains links", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = '<a href="http://www.ebay.com"></a><a></a>';
      focusableEls = focusable(body);
    });

    it("should only return links with hrefs", function () {
      expect(focusableEls.length).to.equal(1);
    });
  });

  describe("when element contains buttons", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = "<button></button><button disabled></button>";
      focusableEls = focusable(body);
    });

    it("should only return enabled buttons", function () {
      expect(focusableEls.length).to.equal(1);
    });
  });

  describe("when element contains elements with tabindex", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = '<div tabindex="0"></div><div></div><div tabindex="0"></div>';
      focusableEls = focusable(body);
    });

    it("should return all elements with tabindex=0", function () {
      expect(focusableEls.length).to.equal(2);
    });
  });

  describe("when element contains elements with positive tabindex", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = '<div tabindex="1"></div><div></div><div tabindex="2"></div>';
      focusableEls = focusable(body);
    });

    it("should return all elements with positive tabindex", function () {
      expect(focusableEls.length).to.equal(2);
    });
  });

  describe("when element contains elements with negative tabindex", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = '<div tabindex="-1"></div><div></div><div tabindex="-1"></div>';
      focusableEls = focusable(body);
    });

    it("should return all elements with negative tabindex", function () {
      expect(focusableEls.length).to.equal(2);
    });
  });

  describe("when element contains elements with tabindex, with hidden attribute", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = '<div hidden tabindex="0"></div><div></div><div hidden tabindex="0"></div>';
      focusableEls = focusable(body);
    });

    it("should return zero elements", function () {
      expect(focusableEls.length).to.equal(0);
    });
  });

  describe("when element contains elements with tabindex, with display:none", function () {
    var focusableEls;

    before(function () {
      body.innerHTML =
        '<div style="display:none" tabindex="0"></div>' +
        "<div></div>" +
        '<div style="display:none" tabindex="0"></div>';
      focusableEls = focusable(body);
    });

    it("should return zero elements", function () {
      expect(focusableEls.length).to.equal(0);
    });
  });

  describe("when element contains elements with negative tabindex, with sequentialOnly set to true", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = '<div tabindex="-1"></div><div></div><div tabindex="-1"></div>';
      focusableEls = focusable(body, true);
    });

    it("should return all elements with negative tabindex", function () {
      expect(focusableEls.length).to.equal(0);
    });
  });

  describe("when it has a callback, should request animation frame and trigger callback", function () {
    before(function () {
      body.innerHTML = '<div tabindex="1"></div><div></div><div tabindex="2"></div>';
    });

    it("should return all elements in callback", function (done) {
      focusable(body, false, (focusableEl) => {
        expect(focusableEl.length).to.equal(2);
        done();
      });
    });
  });

  describe("when element contains nested elements with display: none", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = "<button></button>" + '<div style="display:none">' + "<button></button>" + "</div>";
      focusableEls = focusable(body);
    });

    it("should return only the element not nested in element with display: none", function () {
      expect(focusableEls.length).to.equal(1);
    });
  });

  describe("when element contains nested elements with hidden attribute", function () {
    var focusableEls;

    before(function () {
      body.innerHTML = "<button></button>" + "<div hidden>" + "<button></button>" + "</div>";
      focusableEls = focusable(body);
    });

    it("should return only the element not nested in hidden element", function () {
      expect(focusableEls.length).to.equal(1);
    });
  });
});
