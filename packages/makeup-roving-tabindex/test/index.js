import * as RovingTabindex from '../src/index.js';

describe("makeup-roving-tabindex", function() {
    var dom = '<ul class="widget">'
                + '<li>Button 1</li>'
                + '<li>Button 2</li>'
                + '<li>Button 3</li>'
            + '</ul>';

    document.body.innerHTML = dom;

    var testEl;
    var testRovingIndex; // eslint-disable-line

    describe('when module is imported', function() {
        it("module should not be undefined", function() {
            expect(RovingTabindex).not.toEqual(undefined);
        });
    });

    describe('when rovingTabIndex is created with default options in default state', function() {
        var onNavigationModelChange;

        beforeEach(function() {
            document.body.innerHTML = dom;

            testEl = document.querySelector('.widget');
            testRovingIndex = RovingTabindex.createLinear(testEl, 'li'); // eslint-disable-line

            onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
            testEl.addEventListener('navigationModelChange', onNavigationModelChange);
        });

        it('should trigger 0 navigationModelChange event on arrow left', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger 0 navigationModelChange event on arrow up', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger 1 navigationModelChange event on arrow right', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // assert tabindex values
            expect(testEl.childNodes[0].getAttribute('tabindex')).toEqual('-1');
            expect(testEl.childNodes[1].getAttribute('tabindex')).toEqual('0');
            expect(testEl.childNodes[2].getAttribute('tabindex')).toEqual('-1');
            // remove the listeners
            testRovingIndex.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 1 navigationModelChange event on arrow down', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testRovingIndex.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 0 navigationModelChange event when index set to current index', function() {
            // execute
            testRovingIndex.index = 0;
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
            // assert tabindex values
            expect(testEl.childNodes[0].getAttribute('tabindex')).toEqual('0');
            expect(testEl.childNodes[1].getAttribute('tabindex')).toEqual('-1');
            expect(testEl.childNodes[2].getAttribute('tabindex')).toEqual('-1');
        });

        it('should trigger 1 navigationModelChange event when index set within bounds', function() {
            // execute
            testRovingIndex.index = 1;
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 0 navigationModelChange event when index set out of bounds', function() {
            // execute
            testRovingIndex.index = 100;
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when rovingTabIndex is created with default options in default state with autoWrap', function() {
        var onNavigationModelChange;

        beforeEach(function() {
            document.body.innerHTML = dom;

            testEl = document.querySelector('.widget');
            testRovingIndex = RovingTabindex.createLinear(testEl, 'li', {wrap: true}); // eslint-disable-line

            onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
            testEl.addEventListener('navigationModelChange', onNavigationModelChange);
        });

        it('should trigger 1 navigationModelChange event on arrow left', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testRovingIndex.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 1 navigationModelChange event on arrow up', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testRovingIndex.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 1 navigationModelChange event on arrow right', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testRovingIndex.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowRightKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 1 navigationModelChange event on arrow down', function() {
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
            // remove the listeners
            testRovingIndex.destroy();
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', {detail:{target:{tagName:''}}}));
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 0 navigationModelChange event when index set to current index', function() {
            // execute
            testRovingIndex.index = 0;
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger 1 navigationModelChange event when index set within bounds', function() {
            // execute
            testRovingIndex.index = 1;
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 0 navigationModelChange event when index set out of bounds', function() {
            // execute
            testRovingIndex.index = 100;
            // assert
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });

        it('should set tab focus to first item with arrowDownKeyDown event from last item', function() {
            // execute
            testRovingIndex.index = 2;
            // execute
            testEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', {detail:{target:{tagName:''}}}));
            // assert tabindex values
            expect(testEl.childNodes[0].getAttribute('tabindex')).toEqual('0');
            expect(testEl.childNodes[1].getAttribute('tabindex')).toEqual('-1');
            expect(testEl.childNodes[2].getAttribute('tabindex')).toEqual('-1');
        });
    });
});
