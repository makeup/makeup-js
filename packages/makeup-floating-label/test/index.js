describe('makeup-floating-label', function() {
    var floatingLabel = require('../src/index.js');

    describe('when module is imported', function() {
        it('module should not be undefined', function() {
            expect(floatingLabel).not.toEqual(undefined);
        });
    });
});
