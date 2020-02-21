/* eslint-env jest */

import nextId from '../src/index.js';

const containerEl = document.createElement('div');
let testEls;

function nodeListToArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
}

document.body.appendChild(containerEl);

describe('given three elements without an existing id', () => {
    describe('when nextId is called on each element in sequence', () => {
        const nids = [];

        beforeAll(() => {
            containerEl.innerHTML = '<div></div><div></div><div></div>';
            testEls = nodeListToArray(containerEl.querySelectorAll('div'));

            nids.push(nextId(testEls[0]));
            nids.push(nextId(testEls[1]));
            nids.push(nextId(testEls[2]));
        });

        it('then first el should have id={id}'.replace('{id}', nids[0]), () => {
            expect(testEls[0].id).toEqual(nids[0]);
        });

        it('then second el should have id={id}'.replace('{id}', nids[1]), () => {
            expect(testEls[1].id).toEqual(nids[1]);
        });

        it('then third el id should have id={id}'.replace('{id}', nids[2]), () => {
            expect(testEls[2].id).toEqual(nids[2]);
        });
    });

    describe('when nextId is called on each element in sequence using custom prefix', () => {
        const nids = [];

        beforeAll(() => {
            containerEl.innerHTML = '<div></div><div></div><div></div>';
            testEls = nodeListToArray(containerEl.querySelectorAll('div'));

            nids.push(nextId(testEls[0], 'foo-'));
            nids.push(nextId(testEls[1], 'foo-'));
            nids.push(nextId(testEls[2], 'foo-'));
        });

        it('then first el should have id={id}'.replace('{id}', nids[0]), () => {
            expect(testEls[0].id).toEqual(nids[0]);
        });

        it('then second el should have id={id}'.replace('{id}', nids[1]), () => {
            expect(testEls[1].id).toEqual(nids[1]);
        });

        it('then third el id should have id={id}'.replace('{id}', nids[2]), () => {
            expect(testEls[2].id).toEqual(nids[2]);
        });
    });
});

describe('given three elements with an existing id', () => {
    describe('when nextId is called on each element in sequence', () => {
        beforeAll(() => {
            containerEl.innerHTML = '<div id="foo-0"></div><div id="foo-1"></div><div id="foo-2"></div>';
            testEls = nodeListToArray(containerEl.querySelectorAll('div'));

            nextId(testEls[0]);
            nextId(testEls[1]);
            nextId(testEls[2]);
        });

        it('should maintain id=foo-0 on first element', () => {
            expect(testEls[0].id).toEqual('foo-0');
        });

        it('should maintain id=foo-1 on second element', () => {
            expect(testEls[1].id).toEqual('foo-1');
        });

        it('should maintain id=foo-2 on third element', () => {
            expect(testEls[2].id).toEqual('foo-2');
        });
    });

    describe('when nextId is called on each element in sequence using custom prefix', () => {
        beforeAll(() => {
            containerEl.innerHTML = '<div id="foo-0"></div><div id="foo-1"></div><div id="foo-2"></div>';
            testEls = nodeListToArray(containerEl.querySelectorAll('div'));

            nextId(testEls[0]);
            nextId(testEls[1]);
            nextId(testEls[2]);
        });

        it('should maintain id=foo-0 on first element', () => {
            expect(testEls[0].id).toEqual('foo-0');
        });

        it('should maintain id=foo-1 on second element', () => {
            expect(testEls[1].id).toEqual('foo-1');
        });

        it('should maintain id=foo-2 on third element', () => {
            expect(testEls[2].id).toEqual('foo-2');
        });
    });
});
