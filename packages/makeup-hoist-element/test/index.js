/* eslint-disable max-len */
var hoist = require('../src/index.js');

var testData = '<div><script id="script-1"></script><div>one</div><script id="script-2"></script><div class="hoist-me">two</div><script id="script-3"></script></div>';
var hoistExpectedResult = '<div><div><script id="script-1"></script><div>one</div><script id="script-2"></script><div></div><script id="script-3"></script></div></div><div class="hoist-me">two</div>';
var hoistEl;

function doBeforeAll() {
    document.querySelector('body').innerHTML = testData;

    hoistEl = document.querySelector('.hoist-me');
}

describe('makeup-hoist', function() {
    describe('when hoist is called', function() {
        beforeAll(function() {
            doBeforeAll(testData);
            hoist.hoist(hoistEl);
        });

        it('should have hoisted the data', function() {
            expect(document.body.innerHTML).toEqual(hoistExpectedResult);
        });
    });
    describe('when hoist then unHoist are called', function() {
        beforeAll(function() {
            doBeforeAll(testData);
            hoist.hoist(hoistEl);
            hoist.unhoist();
        });

        it('should keep the scripts in the same place', function() {
            expect(document.querySelector('#script-1').nextElementSibling.textContent).toEqual('one');
            expect(document.querySelector('#script-2').previousElementSibling.textContent).toEqual('one');
            expect(document.querySelector('#script-2').nextElementSibling.textContent).toEqual('two');
            expect(document.querySelector('#script-3').previousElementSibling.textContent).toEqual('two');
        });
    });
});
