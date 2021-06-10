var hoist = require('../src/index.js');

// eslint-disable-next-line max-len
var testData = '<div><script id="script-1"></script><div>one</div><script id="script-2"></script><div class="hoist-me">two</div><script id="script-3"></script></div>';
var hoistEl;
var onHoist;
var onUnhoist;

function doBeforeAll() {
    document.querySelector('body').innerHTML = testData;

    hoistEl = document.querySelector('.hoist-me');
    onHoist = jasmine.createSpy('onHoist');
    onUnhoist = jasmine.createSpy('onUnhoist');

    hoistEl.addEventListener('hoist', onHoist);
    hoistEl.addEventListener('unhoist', onUnhoist);
}

describe('makeup-hoist', function() {
    describe('when hoist is called', function() {
        beforeAll(function() {
            doBeforeAll(testData);
            hoist.hoist(hoistEl);
        });

        afterAll(function() {
            onHoist.calls.reset();
            onUnhoist.calls.reset();
        });

        it('should observe one hoist event', function() {
            expect(onHoist).toHaveBeenCalledTimes(1);
        });
        it('should observe zero unHoist events', function() {
            expect(onUnhoist).toHaveBeenCalledTimes(0);
        });
    });
    describe('when hoist then unHoist are called', function() {
        beforeAll(function() {
            doBeforeAll(testData);
            hoist.hoist(hoistEl);
            hoist.unhoist();
        });

        afterAll(function() {
            onHoist.calls.reset();
            onUnhoist.calls.reset();
        });

        it('should observe one hoist events', function() {
            expect(onHoist).toHaveBeenCalledTimes(1);
        });

        it('should observe one unHoist event', function() {
            expect(onUnhoist).toHaveBeenCalledTimes(1);
        });

        it('should keep the scripts in the same place', function() {
            expect(document.querySelector('#script-1').nextElementSibling.textContent).toEqual('one');
            expect(document.querySelector('#script-2').previousElementSibling.textContent).toEqual('one');
            expect(document.querySelector('#script-2').nextElementSibling.textContent).toEqual('two');
            expect(document.querySelector('#script-3').previousElementSibling.textContent).toEqual('two');
        });
    });
});
