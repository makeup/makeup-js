import floatingLabel from '../src/index.js';

describe('makeup-floating-label', function() {
    describe('when module is imported', function() {
        it('module should not be undefined', function() {
            expect(floatingLabel).not.toEqual(undefined);
        });
    });
});
