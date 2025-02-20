import floatingLabel from "../src/index.js";
import { describe, expect, beforeEach, test } from "vitest";

describe("makeup-floating-label", function () {
  describe("when module is imported", function () {
    test("module should not be undefined", function () {
      expect(floatingLabel).not.to.be.undefined;
    });
  });
});
