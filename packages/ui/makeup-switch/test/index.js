import MakeupSwitch from "../src/index.js";
import { describe, expect, beforeEach, test } from "vitest";
import sinon from "sinon";

const defaultMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0"></span>
  <span class="switch__button"></span>
</span>`;

const checkedMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0" aria-checked="true"></span>
  <span class="switch__button"></span>
</span>`;

const disabledMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0" aria-disabled="true"></span>
  <span class="switch__button"></span>
</span>`;

describe("given a switch with default markup", function () {
  document.body.innerHTML = defaultMarkup;

  const switch1 = new MakeupSwitch(document.querySelector(".switch"));

  test("then it should not be disabled", function () {
    expect(switch1.disabled).to.be.false;
  });

  test("then it should not be checked", function () {
    expect(switch1.checked).to.be.false;
  });
});

describe('given a switch with aria-checked="true"', function () {
  document.body.innerHTML = checkedMarkup;

  const switch1 = new MakeupSwitch(document.querySelector(".switch"));

  test("it should be programmatically checked", function () {
    expect(switch1.checked).to.be.true;
  });
});

describe('given a switch with aria-disabled="true"', function () {
  document.body.innerHTML = disabledMarkup;

  const switch1 = new MakeupSwitch(document.querySelector(".switch"));

  test("then it should be programmatically disabled", function () {
    expect(switch1.disabled).to.be.true;
  });
});

describe("given a switch that is unchecked", function () {
  document.body.innerHTML = defaultMarkup;
  const switchEl = document.querySelector(".switch");

  let onToggle = sinon.spy();
  switchEl.addEventListener("makeup-switch-toggle", onToggle);

  const switch1 = new MakeupSwitch(switchEl);

  describe("when switch is clicked", function () {
    document.querySelector(".switch__control").click();

    test("then it should be checked", function () {
      expect(switch1.checked).to.be.true;
    });

    test("then it should trigger one toggle event", function () {
      expect(onToggle.callCount).to.equal(1);
    });
  });
});
