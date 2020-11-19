var typeahead = require('../src/index.js');

var testData = '<ul><li>Albania</li><li>Alcania</li><li>Alcbnia</li></ul>';
var TIMEOUT_LENGTH = 1000;

var testDataEmpty = '<ol></ol>';

describe('typeahead', function() {
    it('should generate proper answer based on chars given', function() {
        document.querySelector('body').innerHTML = testData;
        const getIndex = typeahead();
        getIndex(document.querySelector('ul').children, 'a', TIMEOUT_LENGTH);
        var result1 = getIndex(document.querySelector('ul').children, 'l', TIMEOUT_LENGTH);

        expect(result1).toEqual(0);

        var result2 = getIndex(document.querySelector('ul').children, 'c', TIMEOUT_LENGTH);
        expect(result2).toEqual(1);

        var result3 = getIndex(document.querySelector('ul').children, 'b', TIMEOUT_LENGTH);
        expect(result3).toEqual(2);
    });

    it('should not error when empty list given', function() {
        document.querySelector('body').innerHTML = testDataEmpty;
        const getIndex = typeahead();
        var result = getIndex(document.querySelector('ol').children, 'a', TIMEOUT_LENGTH);
        expect(result).toEqual(-1);
    });

    it('should not error when null given for list', function() {
        const getIndex = typeahead();
        var result = getIndex(null, 'a', TIMEOUT_LENGTH);
        expect(result).toEqual(-1);
    });
});
