describe('makeup-focus-exit-emitter', function() {
    var ExitEmitter = require('../src/index.js');

    var timeoutInterval = 250;
    var dom = '<div id="test-element" tabindex="0"><button></button><button></button></div>'
            + '<div id="test-element-sibling" tabindex="0"><button></button><button></button></div>';
    var eventHandlers = {
        onFocusExit: function() {}
    };

    document.body.innerHTML = dom;

    var testEl = document.querySelector('#test-element');
    var testElSibling = document.querySelector('#test-element-sibling');

    describe('when emitter class is imported', function() {
        it('FocusExitEmitter module should not be undefined', function() {
            expect(ExitEmitter).not.toEqual(undefined);
        });
    });

    describe('when emitter is added', function() {
        beforeAll(function() {
            ExitEmitter.addFocusExit(testEl);
        });

        afterAll(function() {
            ExitEmitter.removeFocusExit(testEl);
        });

        it('should trigger focusexit when focus moves from element root to sibling', function(done) {
            // async assert
            testEl.addEventListener('focusExit', done);

            // excecute
            testEl.focus();
            testElSibling.focus();
        });

        it('should trigger when focus moves from element descendant to element sibling', function(done) {
            // async assert
            testEl.addEventListener('focusExit', done);

            // excecute
            testEl.querySelector('button').focus();
            testElSibling.querySelector('button').focus();
        });

        it('should NOT trigger when focus moves from element root to element descendant', function(done) {
            // spy
            spyOn(eventHandlers, 'onFocusExit');

            // execute
            testEl.addEventListener('focusExit', eventHandlers.onFocusExit);
            testEl.focus();
            testEl.querySelector('button').focus();

            // async assert
            setTimeout(function() {
                expect(eventHandlers.onFocusExit).not.toHaveBeenCalled();
                done();
            }, timeoutInterval);
        });

        it('should NOT trigger when focus moves from element descendant to element descendant', function(done) {
            // spy
            spyOn(eventHandlers, 'onFocusExit');

            // execute
            testEl.querySelector('button').focus();
            testEl.querySelector('button').focus();

            // async assert
            setTimeout(function() {
                expect(eventHandlers.onFocusExit).not.toHaveBeenCalled();
                done();
            }, timeoutInterval);
        });

        it('should NOT trigger when focus moves from element descendant to element root', function(done) {
            // spy
            spyOn(eventHandlers, 'onFocusExit');

            // execute
            testEl.querySelector('button').focus();
            testEl.focus();

            // async assert
            setTimeout(function() {
                expect(eventHandlers.onFocusExit).not.toHaveBeenCalled();
                done();
            }, timeoutInterval);
        });
    });
});
