import { expect } from 'chai';
import sinon from 'sinon';
import * as NavigationEmitter from '../src/index.js';
const timeoutInterval = 500;

var testEl,
    testEmitter,
    onNavigationModelChange,
    onNavigationModelInit,
    onNavigationModelReset,
    onNavigationModelMutation;

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
    before(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        before(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 3 matching items', function() {
            expect(testEmitter.model.items.length).to.equal(3);
        });
    });
});

describe('given a list of 3 items with 1 hidden', function() {
    before(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li hidden>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        before(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 3 items', function() {
            expect(testEmitter.model.items.length).to.equal(3);
        });
    });
});

describe('given a list of 3 hidden items', function() {
    before(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li hidden>Item 1</li>
                <li hidden>Item 2</li>
                <li hidden>Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        before(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 3 items', function() {
            expect(testEmitter.model.items.length).to.equal(3);
        });
    });
});

describe('given a list of 3 items with 1 aria-disabled', function() {
    before(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-disabled="true">Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        before(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 3 items', function() {
            expect(testEmitter.model.items.length).to.equal(3);
        });
    });
});

describe('given a list of 3 aria-disabled items', function() {
    before(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li aria-disabled="true">Item 1</li>
                <li aria-disabled="true">Item 2</li>
                <li aria-disabled="true">Item 3</li>
            </ul>
        `;
    });

    describe('when instantiated', function() {
        before(function() {
            testEl = document.querySelector('.widget');
            testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
        });

        it('model should have 3 items', function() {
            expect(testEmitter.model.items.length).to.equal(3);
        });
    });
});

/* END STATIC MODEL SIZE TESTS */

/* BEGIN MUTATION TESTS */

describe('given a list of 3 visible items', function() {
    before(function() {
        document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

        testEl = document.querySelector('.widget');
        onNavigationModelMutation = sinon.spy();
        testEl.addEventListener('navigationModelMutation', onNavigationModelMutation.bind(this));
        testEmitter = NavigationEmitter.createLinear(testEl, 'li'); // eslint-disable-line
    });

    describe('when second item is hidden', function() {
        before(function() {
           testEmitter.model.items[1].hidden = true;
        });

        it('should trigger 1 navigationModelMutation event', function() {
            setTimeout(function () {
                expect(onNavigationModelMutation.callCount).to.equal(1);
            }, timeoutInterval);
        });
    });
});

/* END MUTATION TESTS */

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

        onNavigationModelChange = sinon.spy();
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    before(setup);
    afterEach(setup);

    describe('when arrow left is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when arrow up is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when arrow right is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 1 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when arrow right is pressed twice', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 2);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(2);
        });
    });

    describe('when arrow right is pressed three times', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 3);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(2);
        });
    });

    describe('when arrow right is pressed once after emitter is destroyed', function() {
        before(function() {
            testEmitter.destroy();
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when arrow down is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 1 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when arrow down is pressed once after emitter is destroyed', function() {
        before(function() {
            testEmitter.destroy();
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
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

        onNavigationModelChange = sinon.spy();
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    before(setup);
    afterEach(setup);

    describe('when home key is pressed once', function() {
        before(function() {
            triggerKeyPress(testEl, 'home');
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when end key is pressed once', function() {
        before(function() {
            triggerKeyPress(testEl, 'end');
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });
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

        onNavigationModelChange = sinon.spy();
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    before(setup);
    afterEach(setup);

    describe('when arrow left is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when arrow up is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when arrow right is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when arrow right is pressed twice', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 2);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(2);
        });
    });

    describe('when arrow right is pressed three times', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 3);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(3);
        });
    });

    describe('when arrow down is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
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

        onNavigationModelChange = sinon.spy();
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    before(setup);
    afterEach(setup);

    describe('when index set to current index', function() {
        beforeEach(function() {
            testEmitter.model.index = 0;
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when index set within bounds', function() {
        beforeEach(function() {
            testEmitter.model.index = 1;
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when index set out of bounds', function() {
        beforeEach(function() {
            testEmitter.model.index = 100;
        });

        it('should trigger 0 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
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

        onNavigationModelChange = sinon.spy();
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    before(setup);
    afterEach(setup);

    describe('when arrow down is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when arrow up is pressed once after arrow down', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(2);
        });
    });

    describe('when arrow right is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when arrow left is pressed once after arrow right', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(2);
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

        onNavigationModelChange = sinon.spy();
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    before(setup);
    afterEach(setup);

    describe('when arrow down is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when arrow up is pressed once after arrow down', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when arrow right is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 1 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(1);
        });
    });

    describe('when arrow left is pressed once after arrow right', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(2);
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

        onNavigationModelChange = sinon.spy();
        testEl.addEventListener('navigationModelChange', onNavigationModelChange);
    }

    before(setup);
    afterEach(setup);

    describe('when arrow right is pressed once', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when arrow left is pressed once after arrow right', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Right', 1);
            triggerArrowKeyPress(testEl, 'Left', 1);
        });

        it('should trigger 0 navigationModelChange event', function() {
            expect(onNavigationModelChange.callCount).to.equal(0);
        });
    });

    describe('when arrow Down is pressed twice', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Down', 2);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(2);
        });
    });

    describe('when arrow Up is pressed once after arrow down', function() {
        before(function() {
            triggerArrowKeyPress(testEl, 'Down', 1);
            triggerArrowKeyPress(testEl, 'Up', 1);
        });

        it('should trigger 2 navigationModelChange events', function() {
            expect(onNavigationModelChange.callCount).to.equal(2);
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

        onNavigationModelInit = sinon.spy();
        testEl = document.querySelector('.widget');
        testEl.addEventListener('navigationModelInit', onNavigationModelInit);
    }

    before(setup);
    afterEach(setup);

    describe('when autoInit is null', function() {
        before(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoInit: null}); // eslint-disable-line
        });

        it('should trigger navigationModelInit event', function() {
            setTimeout(function() { 
                expect(onNavigationModelInit.callCount).to.equal(1);
            }, timeoutInterval);
        });

        it('should have index value of null', function() {
            expect(testEmitter.model.index).to.be.null;
        });
    });

    describe('when autoInit is 0', function() {
        before(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoInit: 0}); // eslint-disable-line
        });

        it('should trigger navigationModelInit event once', function() {
            setTimeout(function() { 
                expect(onNavigationModelInit.callCount).to.equal(1);
            }, timeoutInterval);
        });

        it('should have index value of 0', function() {
            expect(testEmitter.model.index).to.equal(0);
        });
    });

    describe('when autoInit is 1', function() {
        before(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoInit: 1}); // eslint-disable-line
        });

        it('should trigger navigationModelInit event once', function() {
            setTimeout(function() { 
                expect(onNavigationModelInit.callCount).to.equal(1);
            }, timeoutInterval);
        });

        it('should have index value of 1', function() {
            expect(testEmitter.model.index).to.equal(1);
        });
    });

    describe('when autoInit is ariaSelected', function() {
        before(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoInit: 'ariaSelected'}); // eslint-disable-line
        });

        it('should trigger navigationModelInit event once', function() {
            setTimeout(function() { 
                expect(onNavigationModelInit.callCount).to.equal(1);
            }, timeoutInterval);
        });

        it('should have index value of 1', function() {
            expect(testEmitter.model.index).to.equal(1);
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

        onNavigationModelReset = sinon.spy();
        testEl.addEventListener('navigationModelReset', onNavigationModelReset);
    }

    before(setup);
    afterEach(setup);

    describe('and autoReset is 1', function() {
        before(function() {
            testEmitter = NavigationEmitter.createLinear(testEl, 'li', {autoReset: 1}); // eslint-disable-line
        });

        describe('when testEmitter gets reset', function() {
            before(function() {
                testEmitter.model.reset();
            });

            it('should trigger 1 onNavigationModelReset event', function() {
                expect(onNavigationModelReset.callCount).to.equal(1);
            });
        });
    });

    describe('when focus exits the widget', function() {
        before(function() {
            buttonEl.focus();
        });

        it('should set focus to item with index 1', function() {
            expect(testEmitter.model.index).to.equal(1);
        });

        it('should trigger 1 onNavigationModelReset event', function() {
            setTimeout(function() { 
                expect(onNavigationModelReset.callCount).to.equal(1);
            }, timeoutInterval);
        });
    });
});

/* END AUTO RESET TESTS */
