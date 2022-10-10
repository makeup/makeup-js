import * as ExitEmitter from '../src/index.js';

const timeoutInterval = 500;

let testEl;
let testElSibling;
let onFocusExit;

describe('given an element with focus', function() {
    function setup() {
        document.body.innerHTML = `
            <div id="test-element" tabindex="0">
                <button></button>
            </div>
            <div id="test-element-sibling" tabindex="0">
                <button></button>
            </div>
        `;

        testEl = document.querySelector('#test-element');
        testElSibling = document.querySelector('#test-element-sibling');
        ExitEmitter.addFocusExit(testEl);
        testEl.addEventListener('onFocusExit', onFocusExit);
        onFocusExit = jasmine.createSpy('onFocusExit');
        testEl.focus();
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when focus moves to sibling', function() {
        beforeAll(function() { 
            testElSibling.focus();
        });

        it('should trigger focusExit once', function() {
            setTimeout(function() {
                expect(onFocusExit).toHaveBeenCalledTimes(1); 
            }, timeoutInterval);
        });
    });

    describe('when focus moves to descendant', function() {
        beforeAll(function() { 
            testEl.querySelector('button').focus();
        });

        it('should not trigger focusExit', function() {
            setTimeout(function() {
                expect(onFocusExit).not.toHaveBeenCalled();
            }, timeoutInterval);
        });
    });
});

describe('given an element with focus on descendant', function() {
    function setup() {
        document.body.innerHTML = `
            <div id="test-element" tabindex="0">
                <button></button>
            </div>
            <div id="test-element-sibling" tabindex="0">
                <button></button>
            </div>
        `;

        testEl = document.querySelector('#test-element');
        testElSibling = document.querySelector('#test-element-sibling');
        ExitEmitter.addFocusExit(testEl);
        testEl.addEventListener('onFocusExit', onFocusExit);
        onFocusExit = jasmine.createSpy('onFocusExit');
        testEl.querySelector('button').focus();
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when focus moves to sibling of element root', function() {
        beforeAll(function() { 
            testElSibling.focus();
        });

        it('should trigger focusExit once', function() {
            setTimeout(function() {
                expect(onFocusExit).toHaveBeenCalledTimes(1); 
            }, timeoutInterval);
        });
    });

    describe('when focus is reset on descendant', function() {
        beforeAll(function() { 
            testEl.querySelector('button').focus();
        });

        it('should not trigger focusExit', function() {
            setTimeout(function() {
                expect(onFocusExit).not.toHaveBeenCalled();
            }, timeoutInterval);
        });
    });

    describe('when focus moves to element root', function() {
        beforeAll(function() { 
            testEl.focus();
        });

        it('should not trigger focusExit', function() {
            setTimeout(function() {
                expect(onFocusExit).not.toHaveBeenCalled();
            }, timeoutInterval);
        });
    });
});
