import * as scrollKeyPreventer from '../src/index.js';
import { expect } from 'chai';

describe('makeup-prevent-scroll-keys', function() {
    describe('when module is imported', function() {
        it("module should not be undefined", function() {
            expect(scrollKeyPreventer).not.to.be.undefined;
        });
    });
});
