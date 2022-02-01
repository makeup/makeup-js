import * as keyboardTrap from '../src/index.js';
import testData from './data.js';

testData.forEach(function(data) {

    var trapEl;
    var onTrap;
    var onUntrap;

    describe('given trap is not active,', function() {
        describe('when trap method is called', function() {
            beforeAll(function() {
                document.body.innerHTML = data.html;
                trapEl = document.querySelector('.dialog');
                onTrap = jasmine.createSpy('onTrap');
                onUntrap = jasmine.createSpy('onUntrap');

                trapEl.addEventListener('keyboardTrap', onTrap);
                trapEl.addEventListener('keyboardUntrap', onUntrap);
                keyboardTrap.trap(trapEl);
            });

            afterAll(function() {
                keyboardTrap.untrap();
                onTrap.calls.reset();
                onUntrap.calls.reset();
            });

            it('it should have class keyboard-trap--active on trap', function() {
                expect(trapEl.classList.contains('keyboard-trap--active')).toEqual(true);
            });
            it('it should have six trap boundaries in body', function() {
                expect(document.querySelectorAll('.keyboard-trap-boundary').length).toEqual(6);
            });
            it('it should observe one trap event', function() {
                expect(onTrap).toHaveBeenCalledTimes(1);
            });
            it('it should observe zero untrap events', function() {
                expect(onUntrap).toHaveBeenCalledTimes(0);
            });
        });
    });

    describe('given trap is active,', function() {
        beforeAll(function() {
            document.body.innerHTML = data.html;
            trapEl = document.querySelector('.dialog');
            onTrap = jasmine.createSpy('onTrap');
            onUntrap = jasmine.createSpy('onUntrap');

            trapEl.addEventListener('keyboardTrap', onTrap);
            trapEl.addEventListener('keyboardUntrap', onUntrap);

            keyboardTrap.trap(trapEl);
            onTrap.calls.reset();
        });

        describe('when untrap method is called', function() {
            beforeAll(function() {
                keyboardTrap.untrap();
            });

            it('it should have zero trap boundaries in body', function() {
                expect(document.querySelectorAll('.keyboard-trap-boundary').length).toEqual(0);
            });
            it('it should not have class keyboard-trap--active on trap', function() {
                expect(trapEl.classList.contains('keyboard-trap--active')).toEqual(false);
            });
            it('it should observe 0 trap events', function() {
                expect(onTrap).toHaveBeenCalledTimes(0);
            });
            it('it should observe 1 untrap event', function() {
                expect(onUntrap).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('given trap is active', function() {
        beforeAll(function() {
            document.body.innerHTML = data.html;
            trapEl = document.querySelector('.dialog');
            onTrap = jasmine.createSpy('onTrap');
            onUntrap = jasmine.createSpy('onUntrap');

            trapEl.addEventListener('keyboardTrap', onTrap);
            trapEl.addEventListener('keyboardUntrap', onUntrap);

            keyboardTrap.trap(trapEl);
            onTrap.calls.reset();
            onUntrap.calls.reset();
        });

        describe('when DOM is changed', function() {
            beforeAll(function() {
                document.querySelector('.keyboard-trap-boundary').remove();
            });

            afterAll(function() {
                onTrap.calls.reset();
                onUntrap.calls.reset();
            });

            it('it should not throw an error when untrap is called', function() {
                expect(keyboardTrap.untrap.bind()).not.toThrow();
            });
        });
    });
});
