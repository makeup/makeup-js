import * as NavigationEmitter from '../src/index.js';

var testEl,
    testEmitter,
    onNavigationModelChange;

function triggerArrowKeyPress(el, dir, num) {
    for(let i = 0; i < num; i++) {
        el.dispatchEvent(new CustomEvent(`arrow${dir}KeyDown`, {detail:{target:{tagName:''}}}));
    }
}

/* BEGIN MODEL SIZE TESTS */

describe('given a list of 3 visible items', function() {
    beforeAll(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        beforeAll(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 3 items', function() {
            expect(testEmitter.model.filteredItems.length).toEqual(3);
        });
    });
});

describe('given a list of 2 visible items, 1 hidden', function() {
    beforeAll(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li hidden>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        beforeAll(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 2 items', function() {
            expect(testEmitter.model.filteredItems.length).toEqual(2);
        });
    });
});

describe('given a list of 3 hidden items', function() {
    beforeAll(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li hidden>Item 1</li>
                <li hidden>Item 2</li>
                <li hidden>Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        beforeAll(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 0 items', function() {
            expect(testEmitter.model.filteredItems.length).toEqual(0);
        });
    });
});

/* END MODEL SIZE TESTS */

/* BEGIN ARROW KEY TESTS */

describe('given 3 items with default options', function() {
    function setup() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        testEl = document.querySelector('.widget');
        testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line

        onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when arrow left is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when arrow up is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when arrow right is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 1 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when arrow right is pressed twice', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 2);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
        });
    });

    describe('when arrow right is pressed three times', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 3);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
        });
    });

    describe('when arrow right is pressed once after emitter is destroyed', function() {
        beforeAll(function() {
            testEmitter.destroy();
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when arrow down is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 1 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when arrow down is pressed once after emitter is destroyed', function() {
        beforeAll(function() {
            testEmitter.destroy();
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });
});

/* END ARROW KEYS TESTS */

/* BEGIN AUTOWRAP ARROW KEY TESTS */

describe('given 3 items with autoWrap on', function() {
    function setup() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        testEl = document.querySelector('.widget');
        testEmitter = NavigationEmitter.createLinear(testEl, 'li', { wrap: true }); // eslint-disable-line

        onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when arrow left is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when arrow up is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when arrow right is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when arrow right is pressed twice', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 2);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
        });
    });

    describe('when arrow right is pressed three times', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 3);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(3);
        });
    });

    describe('when arrow down is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });
});

/* END AUTOWRAP ARROW KEYS TESTS */

/* BEGIN INDEX SETTER TESTS */

describe('given 3 items with default options', function() {
    function setup() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        testEl = document.querySelector('.widget');
        testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line

        onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when index set to current index', function() {
        beforeEach(function() {
            testEmitter.model.index = 0;
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when index set within bounds', function() {
        beforeEach(function() {
            testEmitter.model.index = 1;
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when index set out of bounds', function() {
        beforeEach(function() {
            testEmitter.model.index = 100;
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });
});

/* END INDEX SETTER TESTS */