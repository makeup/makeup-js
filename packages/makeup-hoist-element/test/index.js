var hoist = require('../src/index.js');
var testData = '<div><div>one</div><div class="hoist-me">two</div></div>';
var hoistEl;
var onHoist;
var onUnHoist;

function doBeforeAll() {
    document.querySelector('body').innerHTML = testData;

    hoistEl = document.querySelector('.hoist-me');
    onHoist = jasmine.createSpy('onHoist');
    onUnHoist = jasmine.createSpy('onUnHoist');

    hoistEl.addEventListener('hoist', onHoist);
    hoistEl.addEventListener('unhoist', onUnHoist);
}

describe('makeup-hoist', function() {
    describe('when hoist is called', function() {
        beforeAll(function() {
            doBeforeAll(testData);
            hoist.hoist(hoistEl);
        });

        afterAll(function() {
            onHoist.calls.reset();
            onUnHoist.calls.reset();
        });

        it('should observe one hoist event', function() {
            expect(onHoist).toHaveBeenCalledTimes(1);
        });
        it('should observe zero unHoist events', function() {
            expect(onUnHoist).toHaveBeenCalledTimes(0);
        });
    });
    describe('when hoist then unHoist are called', function() {
        beforeAll(function() {
            doBeforeAll(testData);
            hoist.hoist(hoistEl);
            hoist.unHoist();
        });

        afterAll(function() {
            onHoist.calls.reset();
            onUnHoist.calls.reset();
        });

        it('should observe one hoist events', function() {
            expect(onHoist).toHaveBeenCalledTimes(1);
        });

        it('should observe one unHoist event', function() {
            expect(onUnHoist).toHaveBeenCalledTimes(1);
        });
    });
});
