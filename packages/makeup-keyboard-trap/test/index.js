import { expect } from 'chai';
import sinon from 'sinon';
import * as keyboardTrap from '../src/index.js';
import testData from './data.js';

testData.forEach(function(data) {

    var trapEl;
    var onTrap;
    var onUntrap;

    describe('given trap is not active,', function() {
        describe('when trap method is called', function() {
            before(function() {
                document.body.innerHTML = data.html;
                trapEl = document.querySelector('.dialog');
                onTrap = sinon.spy();
                onUntrap = sinon.spy();

                trapEl.addEventListener('keyboardTrap', onTrap);
                trapEl.addEventListener('keyboardUntrap', onUntrap);
                keyboardTrap.trap(trapEl);
            });

            after(function() {
                keyboardTrap.untrap();
                onTrap.resetHistory();
                onUntrap.resetHistory();
            });

            it('it should have class keyboard-trap--active on trap', function() {
                expect(trapEl.classList.contains('keyboard-trap--active')).to.equal(true);
            });
            it('it should have six trap boundaries in body', function() {
                expect(document.querySelectorAll('.keyboard-trap-boundary').length).to.equal(6);
            });
            it('it should observe one trap event', function() {
                expect(onTrap.callCount).to.equal(1);
            });
            it('it should observe zero untrap events', function() {
                expect(onUntrap.callCount).to.equal(0);
            });
        });
    });

    describe('given trap is active,', function() {
        before(function() {
            document.body.innerHTML = data.html;
            trapEl = document.querySelector('.dialog');
            onTrap = sinon.spy();
            onUntrap = sinon.spy();

            trapEl.addEventListener('keyboardTrap', onTrap);
            trapEl.addEventListener('keyboardUntrap', onUntrap);

            keyboardTrap.trap(trapEl);
            onTrap.resetHistory();
        });

        describe('when untrap method is called', function() {
            before(function() {
                keyboardTrap.untrap();
            });

            it('it should have zero trap boundaries in body', function() {
                expect(document.querySelectorAll('.keyboard-trap-boundary').length).to.equal(0);
            });
            it('it should not have class keyboard-trap--active on trap', function() {
                expect(trapEl.classList.contains('keyboard-trap--active')).to.be.false;
            });
            it('it should observe 0 trap events', function() {
                expect(onTrap.callCount).to.equal(0);
            });
            it('it should observe 1 untrap event', function() {
                expect(onUntrap.callCount).to.equal(1);
            });
        });
    });

    describe('given trap is active', function() {
        before(function() {
            document.body.innerHTML = data.html;
            trapEl = document.querySelector('.dialog');
            onTrap = sinon.spy();
            onUntrap = sinon.spy();

            trapEl.addEventListener('keyboardTrap', onTrap);
            trapEl.addEventListener('keyboardUntrap', onUntrap);

            keyboardTrap.trap(trapEl);
            onTrap.resetHistory();
            onUntrap.resetHistory();
        });

        describe('when DOM is changed', function() {
            before(function() {
                document.querySelector('.keyboard-trap-boundary').remove();
            });

            it('it should not throw an error when untrap is called', function() {
                expect(keyboardTrap.untrap.bind()).not.to.throw();
            });
        });
    });
});
