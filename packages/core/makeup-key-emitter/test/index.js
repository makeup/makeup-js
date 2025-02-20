import { describe, expect, beforeEach, afterEach, it } from "vitest";
import sinon from "sinon";
import * as KeyEmitter from "../src/index.js";

var mockCallBack;

describe("Given a list of three items", function () {
  var dom =
    '<ul class="widget">' +
    "<li><button>Button 1</button></li>" +
    "<li><button>Button 2</button></li>" +
    "<li><button>Button 3</button></li>" +
    "</ul>";

  document.body.innerHTML = dom;

  var testEl = document.querySelector(".widget");

  describe("when key emitter class is imported", function () {
    it("KeyEmitter module should not be undefined", function () {
      expect(KeyEmitter).not.to.be.undefined;
    });
  });

  describe("when key emitter is added", function () {
    beforeEach(function () {
      KeyEmitter.add(testEl);
    });

    afterEach(function () {
      mockCallBack = null;
    });

    it("should trigger homeKeyUp event", function () {
      // execute
      mockCallBack = sinon.spy();
      testEl.addEventListener("homeKeyUp", mockCallBack);
      var keyUpEvent = new Event("keyup");
      keyUpEvent.keyCode = 40;
      keyUpEvent.key = "Home";
      testEl.dispatchEvent(keyUpEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(1);
    });
  });

  describe("when key emitter is added with Key Down", function () {
    beforeEach(function () {
      KeyEmitter.addKeyDown(testEl);
    });

    afterEach(function () {
      mockCallBack = null;
    });

    it("should trigger arrowLeftKeyDown event", function () {
      // execute
      mockCallBack = sinon.spy();
      testEl.addEventListener("arrowLeftKeyDown", mockCallBack);
      var keyDownEvent = new Event("keydown");
      keyDownEvent.keyCode = 37;
      keyDownEvent.key = "ArrowLeft";
      testEl.dispatchEvent(keyDownEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(1);
    });

    it("should trigger arrowUpKeyDown event", function () {
      // execute
      mockCallBack = sinon.spy();
      testEl.addEventListener("arrowUpKeyDown", mockCallBack);
      var keyDownEvent = new Event("keydown");
      keyDownEvent.keyCode = 38;
      keyDownEvent.key = "ArrowUp";
      testEl.dispatchEvent(keyDownEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(1);
    });

    it("should trigger arrowRightKeyDown event", function () {
      // execute
      mockCallBack = sinon.spy();
      testEl.addEventListener("arrowRightKeyDown", mockCallBack);
      var keyDownEvent = new Event("keydown");
      keyDownEvent.keyCode = 39;
      keyDownEvent.key = "ArrowRight";
      testEl.dispatchEvent(keyDownEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(1);
    });

    it("should trigger arrowDownKeyDown event", function () {
      // execute
      mockCallBack = sinon.spy();
      testEl.addEventListener("arrowDownKeyDown", mockCallBack);
      var keyDownEvent = new Event("keydown");
      keyDownEvent.keyCode = 40;
      keyDownEvent.key = "ArrowDown";
      testEl.dispatchEvent(keyDownEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(1);
    });
  });

  describe("when key emitter is added with Key Up", function () {
    beforeEach(function () {
      KeyEmitter.addKeyUp(testEl);
    });

    afterEach(function () {
      mockCallBack = null;
    });

    it("should trigger spaceKeyUp event", function () {
      // execute
      mockCallBack = sinon.spy();
      testEl.addEventListener("spacebarKeyUp", mockCallBack);
      var keyUpEvent = new Event("keyup");
      keyUpEvent.keyCode = 32;
      keyUpEvent.key = " ";
      testEl.dispatchEvent(keyUpEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(1);
    });

    it("should not trigger spaceKeyUp event with shiftKey", function () {
      // execute
      mockCallBack = sinon.spy();
      testEl.addEventListener("spacebarKeyUp", mockCallBack);
      var keyUpEvent = new Event("keyup");
      keyUpEvent.keyCode = 32;
      keyUpEvent.key = " ";
      keyUpEvent.shiftKey = true;
      testEl.dispatchEvent(keyUpEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(0);
    });
  });

  describe("when key emitter is added and removed", function () {
    beforeEach(function () {
      KeyEmitter.add(testEl);
    });

    afterEach(function () {
      mockCallBack = null;
    });

    it("should not trigger homeKeyUp event", function () {
      // execute
      mockCallBack = sinon.spy();
      testEl.addEventListener("homeKeyUp", mockCallBack);

      var keyUpEvent = new Event("keyup");
      keyUpEvent.keyCode = 40;
      keyUpEvent.key = "Home";
      testEl.dispatchEvent(keyUpEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(1);

      // reset the spy
      mockCallBack = sinon.spy();
      // execute
      KeyEmitter.remove(testEl);
      testEl.dispatchEvent(keyUpEvent);
      // assert
      expect(mockCallBack.callCount).to.equal(0);
    });
  });
});
