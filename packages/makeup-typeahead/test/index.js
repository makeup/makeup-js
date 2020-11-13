var typeahead = require('../src/index.js');

var testData = '<ul><li>Albania</li><li>Alcania</li><li>Alcbnia</li></ul>';
var TIMEOUT_LENGTH = 1000;

describe('typeahead', function() {
    it('should generate proper answer based on chars given', function() {
        document.querySelector('body').innerHTML = testData;
        typeahead(document.querySelector('ul').children, 'a', TIMEOUT_LENGTH);
        var result1 = typeahead(document.querySelector('ul').children, 'l', TIMEOUT_LENGTH);

        expect(result1).toEqual(0);

        var result2 = typeahead(document.querySelector('ul').children, 'c', TIMEOUT_LENGTH);
        expect(result2).toEqual(1);

        var result3 = typeahead(document.querySelector('ul').children, 'b', TIMEOUT_LENGTH);
        expect(result3).toEqual(2);
    });
});
