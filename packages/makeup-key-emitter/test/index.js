import * as KeyEmitter from '../src/index.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

describe("makeup-key-emitter", function() {
    var dom = '<ul class="widget">'
            + '<li><button>Button 1</button></li>'
            + '<li><button>Button 2</button></li>'
            + '<li><button>Button 3</button></li>'
            + '</ul>';

    document.body.innerHTML = dom;

    var testEl = document.querySelector('.widget');

    describe('when emitter class is imported', function() {
        it("KeyEmitter module should not be undefined", function() {
            expect(KeyEmitter).not.toEqual(undefined);
        });
    });

    describe('when emitter is added', function() {
        beforeAll(function() {
            KeyEmitter.addKeyDown(testEl);
        });

        it("should trigger arrowLeftKeyDown event", function(done) {
            // assert
            testEl.addEventListener('arrowLeftKeyDown', done());
            // execute
            var keyDownEvent = new Event('keydown');
            keyDownEvent.keyCode = 37;
            keyDownEvent.key = 'ArrowLeft';
            testEl.dispatchEvent(keyDownEvent);
        });

        it("should trigger arrowUpKeyDown event", function(done) {
            // assert
            testEl.addEventListener('arrowUpKeyDown', done());
            // execute
            var keyDownEvent = new Event('keydown');
            keyDownEvent.keyCode = 38;
            keyDownEvent.key = 'ArrowUp';
            testEl.dispatchEvent(keyDownEvent);
        });

        it("should trigger arrowRightKeyDown event", function(done) {
            // assert
            testEl.addEventListener('arrowRightKeyDown', done());
            // execute
            var keyDownEvent = new Event('keydown');
            keyDownEvent.keyCode = 39;
            keyDownEvent.key = 'ArrowRight';
            testEl.dispatchEvent(keyDownEvent);
        });

        it("should trigger arrowDownKeyDown event", function(done) {
            // assert
            testEl.addEventListener('arrowDownKeyDown', done());
            // execute
            var keyDownEvent = new Event('keydown');
            keyDownEvent.keyCode = 40;
            keyDownEvent.key = 'ArrowDown';
            testEl.dispatchEvent(keyDownEvent);
        });
    });
});
