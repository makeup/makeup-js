import { expect } from 'chai';
import sinon from 'sinon';
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
        onFocusExit =sinon.spy();
        testEl.focus();
    }

    before(setup);
    afterEach(setup);

    describe('when focus moves to sibling', function() {
        before(function() { 
            testElSibling.focus();
        });

        it('should trigger focusExit once', function() {
            setTimeout(function() {
                expect(onFocusExit.callCount).to.equal(1);
            }, timeoutInterval);
        });
    });

    describe('when focus moves to descendant', function() {
        before(function() { 
            testEl.querySelector('button').focus();
        });

        it('should not trigger focusExit', function() {
            setTimeout(function() {
                expect(onFocusExit.callCount).to.equal(0); 
            }, timeoutInterval);
        });
    });

    describe('when focus exits with blur', function() {
        before(function() { 
            testEl.blur();
        });

        it('should trigger focusExit once', function() {
            setTimeout(function() {
                expect(onFocusExit.callCount).to.equal(1);
            }, timeoutInterval);
        });
    });

    describe('when focus moves to sibling without focusExit', function() {
        before(function() { 
            ExitEmitter.removeFocusExit(testEl);
            testElSibling.focus();
        });

        it('should trigger focusExit once', function() {
            setTimeout(function() {
                expect(onFocusExit.callCount).to.equal(0);
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
        onFocusExit =sinon.spy();
        testEl.querySelector('button').focus();
    }

    before(setup);
    afterEach(setup);

    describe('when focus moves to sibling of element root', function() {
        before(function() { 
            testElSibling.focus();
        });

        it('should trigger focusExit once', function() {
            setTimeout(function() {
                expect(onFocusExit.callCount).to.equal(1);
            }, timeoutInterval);
        });
    });

    describe('when focus is reset on descendant', function() {
        before(function() { 
            testEl.querySelector('button').focus();
        });

        it('should not trigger focusExit', function() {
            setTimeout(function() {
                expect(onFocusExit.callCount).to.equal(0); 
            }, timeoutInterval);
        });
    });

    describe('when focus moves to element root', function() {
        before(function() { 
            testEl.focus();
        });

        it('should not trigger focusExit', function() {
            setTimeout(function() {
                expect(onFocusExit.callCount).to.equal(0); 
            }, timeoutInterval);
        });
    });
});
