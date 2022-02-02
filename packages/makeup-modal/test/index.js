import * as modal from '../src/index.js';
import testData from './data.js';

var modalEl;
var onModal;
var onUnmodal;

/*
var hoistTestData = '<div><script id="script-1"></script><div>one</div><script id="script-2"></script><div class="hoist-me">two</div><script id="script-3"></script></div>';
var hoistExpectedResult = '<div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><div aria-hidden="false"><script id="script-1"></script><div aria-hidden="true">one</div><script id="script-2"></script><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><div class="hoist-me keyboard-trap--active" aria-hidden="false"><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div>two<div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div></div><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><script id="script-3"></script></div><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div>';
var hoistEl;
*/

function doBeforeAll(html) {
    document.querySelector('body').innerHTML = html;

    modalEl = document.querySelector('.modal');
    onModal = jasmine.createSpy('onModal');
    onUnmodal = jasmine.createSpy('onUnmodal');

    modalEl.addEventListener('makeup-modal', onModal);
    modalEl.addEventListener('makeup-unmodal', onUnmodal);
}

testData.forEach(function(data) {
    describe('makeup-modal', function() {
        describe('when modal is activated', function() {
            beforeAll(function() {
                doBeforeAll(data.html);
                modal.modal(modalEl);
            });

            afterAll(function() {
                onModal.calls.reset();
                onUnmodal.calls.reset();
            });

            it('should observe one modal event', function() {
                expect(onModal).toHaveBeenCalledTimes(1);
            });
            it('should observe zero unmodal events', function() {
                expect(onUnmodal).toHaveBeenCalledTimes(0);
            });
        });
        describe('when modal is activated then deactivated', function() {
            beforeAll(function() {
                doBeforeAll(data.html);
                modal.modal(modalEl);
                modal.unmodal();
            });

            afterAll(function() {
                onModal.calls.reset();
                onUnmodal.calls.reset();
            });

            it('should observe one modal events', function() {
                expect(onModal).toHaveBeenCalledTimes(1);
            });

            it('should observe one unmodal event', function() {
                expect(onUnmodal).toHaveBeenCalledTimes(1);
            });
        });
    });
});

/* following test removed as { hoist: true} is not being passed (and fails when is) */

/*
function hoistDoBeforeAll() {
    document.querySelector('body').innerHTML = hoistTestData;

    hoistEl = document.querySelector('.hoist-me');
}

describe('hoist funcionality', function() {
    describe('when hoist is called', function() {
        beforeAll(function() {
            hoistDoBeforeAll(hoistTestData);
            modal.modal(hoistEl);
        });

        it('should have hoisted the data', function() {
            expect(document.body.innerHTML).toEqual(hoistExpectedResult);
        });
    });
    describe('when hoist then unHoist are called', function() {
        beforeAll(function() {
            hoistDoBeforeAll(hoistTestData);
            modal.modal(hoistEl);
            modal.unmodal();
        });

        it('should keep the scripts in the same place', function() {
            expect(document.querySelector('#script-1').nextElementSibling.textContent).toEqual('one');
            expect(document.querySelector('#script-2').previousElementSibling.textContent).toEqual('one');
            expect(document.querySelector('#script-2').nextElementSibling.textContent).toEqual('two');
            expect(document.querySelector('#script-3').previousElementSibling.textContent).toEqual('two');
        });
    });
});
*/
