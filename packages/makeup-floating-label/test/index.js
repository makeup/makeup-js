import floatingLabel from '../src/index.js';
import { expect } from 'chai';

describe('makeup-floating-label', function() {
    describe('when module is imported', function() {
        it('module should not be undefined', function() {
            expect(floatingLabel).not.to.be.undefined;
        });
    });
});
