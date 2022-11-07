import * as NavigationEmitter from '../src/index.js';

const timeoutInterval = 500;

var testEl,
    testEmitter,
    onNavigationModelChange,
    onNavigationModelInit,
    onNavigationModelReset;

function triggerArrowKeyPress(el, dir, num) {
    for(let i = 0; i < num; i++) {
        el.dispatchEvent(new CustomEvent(`arrow${dir}KeyDown`, {detail:{target:{tagName:''}}}));
    }
}

function triggerKeyPress(el, keyType) {
    el.dispatchEvent(new CustomEvent(`${keyType}KeyDown`, {detail:{target:{tagName:''}}}));
}

/* BEGIN STATIC MODEL SIZE TESTS */

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

        it('model should have 3 matching items', function() {
            expect(testEmitter.model.matchingItems.length).toEqual(3);
        });

        it('model should have 3 navigable items', function() {
            expect(testEmitter.model.navigableItems.length).toEqual(3);
        });
    });
});

describe('given a list of 3 items with 1 hidden', function() {
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

        it('model should have 3 matching items', function() {
            expect(testEmitter.model.matchingItems.length).toEqual(3);
        });

        it('model should have 2 navigable items', function() {
            expect(testEmitter.model.navigableItems.length).toEqual(2);
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

        it('model should have 3 matching items', function() {
            expect(testEmitter.model.matchingItems.length).toEqual(3);
        });

        it('model should have 0 navigable items', function() {
            expect(testEmitter.model.navigableItems.length).toEqual(0);
        });
    });
});

describe('given a list of 3 items with 1 aria-disabled', function() {
    beforeAll(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-disabled="true">Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        beforeAll(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 3 matching items', function() {
            expect(testEmitter.model.matchingItems.length).toEqual(3);
        });

        it('model should have 2 navigable items', function() {
            expect(testEmitter.model.navigableItems.length).toEqual(2);
        });
    });
});

describe('given a list of 3 aria-disabled items', function() {
    beforeAll(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li aria-disabled="true">Item 1</li>
                <li aria-disabled="true">Item 2</li>
                <li aria-disabled="true">Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        beforeAll(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 3 matching items', function() {
            expect(testEmitter.model.matchingItems.length).toEqual(3);
        });

        it('model should have 0 navigable items', function() {
            expect(testEmitter.model.navigableItems.length).toEqual(0);
        });
    });
});

/* END STATIC MODEL SIZE TESTS */

/* BEGIN DYNAMIC MODEL SIZE TESTS */

describe('given a list of 3 visible items', function() {
    beforeAll(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        testEl = document.querySelector('.widget');
        testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
    });

    describe('when first matching item is hidden', function() {
        beforeAll(function() {
           testEmitter.model.matchingItems[0].hidden = true;
        });

        it('model should have 2 navigable items', function() {
            expect(testEmitter.model.navigableItems.length).toEqual(2);
        });
    });

    describe('when first item is hidden and then unhidden', function() {
        beforeAll(function() {
           testEmitter.model.matchingItems[0].hidden = true;
           testEmitter.model.matchingItems[0].hidden = false;
        });

        it('model should have 3 navigable items', function() {
            expect(testEmitter.model.navigableItems.length).toEqual(3);
        });
    });
});

/* END DYNAMIC MODEL SIZE TESTS */

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

/* BEGIN HOME & END KEY TESTS */

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

    describe('when home key is pressed once', function() {
        beforeAll(function() {
            triggerKeyPress(testEl, 'home');
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    // describe('when end key is pressed once', function() {
    //     beforeAll(function() {
    //         triggerKeyPress(testEl, 'end');
    //     });

    //     it('should trigger 1 navigationModelChange event', function() {
    //         expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
    //     });
    // });
});

/* END HOME & END KEYS TESTS */

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

/* BEGIN AXIS TESTS */

describe('given 3 items with axis set to both', function() {
    function setup() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        testEl = document.querySelector('.widget');
        testEmitter = NavigationEmitter.createLinear(testEl, 'li', {axis: 'both'}); // eslint-disable-line

        onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);

        onNavigationModelChange.calls.reset();
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when arrow down is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('when arrow up is pressed once after arrow down', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
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

    describe('when arrow left is pressed once after arrow right', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
        });
    });
});

describe('given 3 items with axis set to x', function() {
    function setup() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        testEl = document.querySelector('.widget');
        testEmitter = NavigationEmitter.createLinear(testEl, 'li', {axis: 'x'}); // eslint-disable-line

        onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);

        onNavigationModelChange.calls.reset();
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when arrow down is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when arrow up is pressed once after arrow down', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
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

    describe('when arrow left is pressed once after arrow right', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
        });
    });
});

describe('given 3 items with axis set to y', function() {
    function setup() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        testEl = document.querySelector('.widget');
        testEmitter = NavigationEmitter.createLinear(testEl, 'li', {axis: 'y'}); // eslint-disable-line

        onNavigationModelChange = jasmine.createSpy('onNavigationModelChange');
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when arrow right is pressed once', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when arrow left is pressed once after arrow right', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(0);
        });
    });

    describe('when arrow Down is pressed twice', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Down', 2);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
        });
    });

    describe('when arrow Up is pressed once after arrow down', function() {
        beforeAll(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
        });
    });
});

/* END AXIS TESTS */

/* BEGIN AUTO INIT TESTS */

describe('given 3 items', function() {
    function setup() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-selected="true">Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        onNavigationModelInit = jasmine.createSpy('onNavigationModelInit');
        testEl = document.querySelector('.widget');
        testEl.addEventListener('navigationModelInit', onNavigationModelInit);
    }

    beforeAll(setup);
    afterEach(setup);

    describe('when autoInit is null', function() {
        beforeAll(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoInit: null}); // eslint-disable-line
        });

        it('should trigger navigationModelInit event', function() {
            setTimeout(function() { 
                expect(onNavigationModelInit).toHaveBeenCalledTimes(1);
            }, timeoutInterval);
        });

        it('should have index value of null', function() {
            expect(testEmitter.model.index).toBe(null);
        });
    });

    describe('when autoInit is 0', function() {
        beforeAll(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoInit: 0}); // eslint-disable-line
        });

        it('should trigger navigationModelInit event once', function() {
            setTimeout(function() { 
                expect(onNavigationModelInit).toHaveBeenCalledTimes(1);
            }, timeoutInterval);
        });

        it('should have index value of 0', function() {
            expect(testEmitter.model.index).toBe(0);
        });
    });

    describe('when autoInit is 1', function() {
        beforeAll(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoInit: 1}); // eslint-disable-line
        });

        it('should trigger navigationModelInit event once', function() {
            setTimeout(function() { 
                expect(onNavigationModelInit).toHaveBeenCalledTimes(1);
            }, timeoutInterval);
        });

        it('should have index value of 1', function() {
            expect(testEmitter.model.index).toBe(1);
        });
    });

    describe('when autoInit is ariaSelected', function() {
        beforeAll(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoInit: 'ariaSelected'}); // eslint-disable-line
        });

        it('should trigger navigationModelInit event once', function() {
            setTimeout(function() { 
                expect(onNavigationModelInit).toHaveBeenCalledTimes(1);
            }, timeoutInterval);
        });

        it('should have index value of 1', function() {
            expect(testEmitter.model.index).toBe(1);
        });
    });
});

/* END AUTO INIT TESTS */

/* BEGIN AUTO RESET TEST */

describe('given 3 items', function() {
    var buttonEl;

    function setup() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
            <button>Button 1</button>
        `;

        testEl = document.querySelector('.widget');
        buttonEl = document.querySelector('button');

        onNavigationModelReset = jasmine.createSpy('onNavigationModelReset');
        testEl.addEventListener('navigationModelReset', onNavigationModelReset);
    }

    beforeAll(setup);
    afterEach(setup);

    describe('and autoReset is 1', function() {
        beforeAll(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoReset: 1}); // eslint-disable-line
        });

        describe('when testEmitter gets reset', function() {
            beforeAll(function() {
                testEmitter.model.reset();
            });

            it('should trigger 1 onNavigationModelReset event', function() {
                expect(onNavigationModelReset).toHaveBeenCalledTimes(1);
            });
        });
    });

    // describe('when focus exits the widget', function() {
    //     beforeAll(function() {
    //         buttonEl.focus();
    //     });

    //     beforeEach(function() {
    //         jasmine.clock().install();
    //     });

    //     afterEach(function() {
    //         jasmine.clock().uninstall();
    //     });

    //     it('should set focus to item with index 1', function() {
    //         jasmine.clock().tick(10000);
    //         expect(testEmitter.model.index).toBe(1);
    //     });

    //     it('should trigger 1 onNavigationModelReset event', function() {
    //         jasmine.clock().tick(10000);
    //         expect(onNavigationModelReset).toHaveBeenCalledTimes(1);
    //     });
    // });
});

/* END AUTO RESET TESTS */
