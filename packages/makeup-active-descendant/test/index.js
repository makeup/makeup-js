import * as ActiveDescendant from '../src/index.js';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

describe('makeup-active-descendant', function() {
    var timeoutInterval = 50;
    var dom = '<div class="widget">'
                + '<input type="text"/>'
                + '<input type="button" value="button">'
                + '<ul>'
                    + '<li>Button 1</li>'
                    + '<li>Button 2</li>'
                    + '<li>Button 3</li>'
                + '</ul>'
            + '</div>';

    var hierarchyDom = '<div class="widget">'
            + '<ul>'
                + '<li>Button 1</li>'
                + '<li>Button 2</li>'
                + '<li>Button 3</li>'
            + '</ul>'
        + '</div>';

    document.body.innerHTML = dom;

    var widgetEl = document.querySelector('.widget');
    var containerEl = widgetEl.querySelector('ul');
    var testActiveDescendant;
    var onActiveDescendantChange;

    describe('when module is imported', function() {
        it('module should not be undefined', function() {
            expect(ActiveDescendant).not.toEqual(undefined);
        });
    });

    describe('when module is created with default options in programmatic relationship', function() {
        var focusEl = widgetEl.querySelector('input');

        beforeEach(function() {
            document.body.innerHTML = dom;
            testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, 'li'); // eslint-disable-line

            onActiveDescendantChange = jasmine.createSpy('onActiveDescendantChange');
            widgetEl.addEventListener('activeDescendantChange', onActiveDescendantChange);

            focusEl.focus();
        });

        afterEach(function() {
            testActiveDescendant.destroy();
            onActiveDescendantChange.calls.reset();
        });

        it('the focus el should have correct aria-owns attribute', function() {
            setTimeout(function() {
                // assert
                expect(focusEl.getAttribute('aria-owns')).toEqual(containerEl.getAttribute('id'));
            }, timeoutInterval);
        });

        it('should trigger 0 onActiveDescendantChange event on arrow left', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger 0 onActiveDescendantChange event on arrow up', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger onActiveDescendantChange event and set active-descendant class on arrow down', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
            // assert
            expect(containerEl.firstElementChild.className).toEqual('active-descendant');
            // assert
            // eslint-disable-next-line max-len
            expect(focusEl.getAttribute('aria-activedescendant')).toEqual(containerEl.firstElementChild.getAttribute('id'));
        });
    });

    describe('when module is created in programmatic relationship with axis y', function() {
        var focusEl = widgetEl.querySelector('input');

        beforeAll(function() {
            document.body.innerHTML = dom;
            testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, 'li', { axis: 'y' }); // eslint-disable-line

            onActiveDescendantChange = jasmine.createSpy('onActiveDescendantChange');
            widgetEl.addEventListener('activeDescendantChange', onActiveDescendantChange);

            focusEl.focus();
        });

        beforeEach(function() {
            focusEl.focus();
        });

        afterEach(function() {
            onActiveDescendantChange.calls.reset();
        });

        afterAll(function() {
            testActiveDescendant.destroy();
        });

        it('should trigger 0 onActiveDescendantChange event on arrow right', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowRightKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger onActiveDescendantChange event on arrow down', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger 0 onActiveDescendantChange event on arrow left', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger 0 onActiveDescendantChange event on arrow up', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when module is created in programmatic relationship with autowrap', function() {
        var focusEl = widgetEl.querySelector('input');

        beforeEach(function() {
            document.body.innerHTML = dom;
            testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, 'li', { wrap: true }); // eslint-disable-line

            onActiveDescendantChange = jasmine.createSpy('onActiveDescendantChange');
            widgetEl.addEventListener('activeDescendantChange', onActiveDescendantChange);

            focusEl.focus();
        });

        afterEach(function() {
            testActiveDescendant.destroy();
            onActiveDescendantChange.calls.reset();
        });

        it('should trigger onActiveDescendantChange event on arrow left', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
            // execute
            onActiveDescendantChange.calls.reset();
            widgetEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger onActiveDescendantChange event on arrow up', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
            // execute
            onActiveDescendantChange.calls.reset();
            widgetEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when module is created in programmatic relationship with autoInit', function() {
        var focusEl = widgetEl.querySelector('input');

        beforeEach(function() {
            document.body.innerHTML = dom;
            testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, 'li', { autoInit: 2 }); // eslint-disable-line

            onActiveDescendantChange = jasmine.createSpy('onActiveDescendantChange');
            widgetEl.addEventListener('activeDescendantChange', onActiveDescendantChange);
        });

        afterEach(function() {
            testActiveDescendant.destroy();
            onActiveDescendantChange.calls.reset();
        });

        it('should set aria-activedescendant to last element child', function() {
            // eslint-disable-next-line max-len
            expect(focusEl.getAttribute('aria-activedescendant')).toEqual(containerEl.lastElementChild.getAttribute('id'));
        });
    });

    // describe('when module is created in programmatic relationship with autoReset', function() {
    //     var focusEl = widgetEl.querySelector('input');

    //     beforeEach(function() {
    //         document.body.innerHTML = dom;
    //         testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, 'li', { autoReset: 2 }); // eslint-disable-line
    //         onActiveDescendantChange = jasmine.createSpy('onActiveDescendantChange');
    //         widgetEl.addEventListener('activeDescendantChange', onActiveDescendantChange);
    //         // execute
    //         focusEl.focus();
    //     });

    //     afterEach(function() {
    //         testActiveDescendant.destroy();
    //     });
    //     it('should set active-descendant to first element child on focus', function() {
    //         setTimeout(function() {
    //             console.log(document.activeElement);
    //             // assert
    //             expect(containerEl.firstElementChild.className).toEqual('active-descendant');
    //         }, timeoutInterval);
    //     });

    //     it('should set active-descendant to selected element child on blur', function() {
    //         focusEl.blur();
    //         console.log(document.activeElement);
    //         setTimeout(function() {
    //             // assert
    //             // eslint-disable-next-line max-len
    //             expect(containerEl.lastElementChild.className).toEqual('active-descendant');
    //         }, timeoutInterval);
    //     });
    // });

    describe('when module is created with default options in hierarchial relationship', function() {
        var focusEl;

        beforeEach(function() {
            document.body.innerHTML = hierarchyDom;
            // in this scenario the container element is the same as the focusable element
            focusEl = containerEl;
            testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, 'li');

            onActiveDescendantChange = jasmine.createSpy('onActiveDescendantChange');
            widgetEl.addEventListener('activeDescendantChange', onActiveDescendantChange);

            widgetEl.focus();
        });

        afterEach(function() {
            testActiveDescendant.destroy();
            onActiveDescendantChange.calls.reset();
        });

        it('the container el should not have aria-owns attribute', function() {
            expect(focusEl.getAttribute('aria-owns')).toEqual(null);
        });

        it('should trigger 0 onActiveDescendantChange event on arrow left', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger 0 onActiveDescendantChange event on arrow up', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(0);
        });

        it('should trigger onActiveDescendantChange event and set active-descendant class on arrow down', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', { detail: { target: { tagName: '' } } }));
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', { detail: { target: { tagName: '' } } }));
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowDownKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(containerEl.lastElementChild.className).toEqual('active-descendant');
            // assert
            // eslint-disable-next-line max-len
            expect(focusEl.getAttribute('aria-activedescendant')).toEqual(containerEl.lastElementChild.getAttribute('id'));
        });
    });

    describe('when module is created in hierarchial relationship with autowrap', function() {
        var focusEl;

        beforeEach(function() {
            document.body.innerHTML = hierarchyDom;
            // in this scenario the container element is the same as the focusable element
            focusEl = containerEl;
            testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, 'li', { wrap: true }); // eslint-disable-line

            onActiveDescendantChange = jasmine.createSpy('onActiveDescendantChange');
            widgetEl.addEventListener('activeDescendantChange', onActiveDescendantChange);

            widgetEl.focus();
        });

        afterEach(function() {
            testActiveDescendant.destroy();
            onActiveDescendantChange.calls.reset();
        });

        it('should trigger onActiveDescendantChange event on arrow left', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
            // execute
            onActiveDescendantChange.calls.reset();
            widgetEl.dispatchEvent(new CustomEvent('arrowLeftKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
        });

        it('should trigger onActiveDescendantChange event on arrow up', function() {
            // execute
            widgetEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
            // execute
            onActiveDescendantChange.calls.reset();
            widgetEl.dispatchEvent(new CustomEvent('arrowUpKeyDown', { detail: { target: { tagName: '' } } }));
            // assert
            expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when module is created in hierarchial relationship with autoInit', function() {
        var focusEl;

        beforeEach(function() {
            document.body.innerHTML = hierarchyDom;
            // in this scenario the container element is the same as the focusable element
            focusEl = containerEl;
            testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, 'li', { autoInit: 2 }); // eslint-disable-line

            onActiveDescendantChange = jasmine.createSpy('onActiveDescendantChange');
            widgetEl.addEventListener('activeDescendantChange', onActiveDescendantChange);

            widgetEl.focus();
        });

        afterEach(function() {
            testActiveDescendant.destroy();
            onActiveDescendantChange.calls.reset();
        });

        it('should set aria-activedescendant to last element child', function() {
            // eslint-disable-next-line max-len
            expect(focusEl.getAttribute('aria-activedescendant')).toEqual(containerEl.lastElementChild.getAttribute('id'));
        });
    });
});
