var screenreaderTrap = require('../src/index.js');
var util = require('../src/util.js');
var testData = require('./data.js');
var trapEl;
var onTrap;
var onUntrap;

function doBeforeAll(html) {
    document.querySelector('body').innerHTML = html;

    trapEl = document.querySelector('.trap');

    onTrap = jasmine.createSpy('onTrap');
    onUntrap = jasmine.createSpy('onUntrap');

    trapEl.addEventListener('screenreaderTrap', onTrap);
    trapEl.addEventListener('screenreaderUntrap', onUntrap);
}

function getAriaHiddenElements() {
    return document.querySelectorAll('[aria-hidden]');
}

function getAriaHiddenTrueElements() {
    return document.querySelectorAll('[aria-hidden="true"]');
}

function getAriaHiddenFalseElements() {
    return document.querySelectorAll('[aria-hidden="false"]');
}

testData.forEach(function(data) {
    describe('Util', function() {
        describe('given test data', function() {
            describe('when DOM is rendered', function() {
                beforeAll(function() {
                    doBeforeAll(data.html);
                });

                it('should find correct number of siblings', function() {
                    expect(util.getSiblings(trapEl).length).toBe(data.numSiblings);
                });

                it('should find correct number of ancestors', function() {
                    expect(util.getAncestors(trapEl).length).toBe(data.numAncestors);
                });

                it('should find correct number of siblings of ancestors', function() {
                    expect(util.getSiblingsOfAncestors(trapEl).length).toBe(data.numSiblingsOfAncestors);
                });
            });
        });
    });

    describe('Module', function() {
        describe('given test data', function() {
            describe('when DOM is rendered and trap is activated', function() {
                beforeAll(function() {
                    doBeforeAll(data.html);
                    screenreaderTrap.trap(trapEl);
                });

                afterAll(function() {
                    onTrap.calls.reset();
                    onUntrap.calls.reset();
                });

                it('should add aria-hidden=false to trapped element', function() {
                    expect(trapEl.getAttribute('aria-hidden')).toBe('false');
                });

                it('should find correct number of elements with aria-hidden attribute', function() {
                    expect(getAriaHiddenElements().length).toBe(data.numAriaHiddenAfterTrap);
                });

                it('should find correct number of elements with aria-hidden=true attribute', function() {
                    expect(getAriaHiddenTrueElements().length).toBe(data.numAriaHiddenTrueAfterTrap);
                });

                it('should find correct number of elements with aria-hidden=false attribute', function() {
                    expect(getAriaHiddenFalseElements().length).toBe(data.numAriaHiddenFalseAfterTrap);
                });

                it('should observe one trap event', function() {
                    expect(onTrap).toHaveBeenCalledTimes(1);
                });

                it('should not observe any untrap event', function() {
                    expect(onUntrap).toHaveBeenCalledTimes(0);
                });
            });

            describe('when DOM is rendered and trap is activated then deactivated', function() {
                beforeAll(function() {
                    doBeforeAll(data.html);
                    screenreaderTrap.trap(trapEl);
                    onTrap.calls.reset();
                    onUntrap.calls.reset();
                    screenreaderTrap.untrap();
                });

                afterAll(function() {
                    onTrap.calls.reset();
                    onUntrap.calls.reset();
                });

                it('should find correct number of elements with aria-hidden attribute', function() {
                    expect(getAriaHiddenElements().length).toBe(data.numAriaHiddenAfterUntrap);
                });

                it('should find correct number of elements with aria-hidden=true attribute', function() {
                    expect(getAriaHiddenTrueElements().length).toBe(data.numAriaHiddenTrueAfterUntrap);
                });

                it('should find correct number of elements with aria-hidden=false attribute', function() {
                    expect(getAriaHiddenFalseElements().length).toBe(data.numAriaHiddenFalseAfterUntrap);
                });

                it('should observe a single untrap event', function() {
                    expect(onUntrap).toHaveBeenCalledTimes(1);
                });
            });
        });
    });
});
