describe('makeup-active-descendant', function() {
    var ActiveDescendant = require('../src/index.js');
    var dom = '<div class="widget">'
                + '<input/>'
                + '<ul>'
                    + '<li>Button 1</li>'
                    + '<li>Button 2</li>'
                    + '<li>Button 3</li>'
                + '</ul>'
            + '</div>';

    document.body.innerHTML = dom;

    describe('when module is imported', function() {
        it('module should not be undefined', function() {
            expect(ActiveDescendant).not.toEqual(undefined);
        });
    });
});
